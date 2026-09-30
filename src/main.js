(function () {
  var WA = window.BR.wa;
  var d = document;
  d.documentElement.classList.add("js");

  // ---- menü
  var ust = d.getElementById("ust"), dugme = d.getElementById("menuDugme");
  if (dugme) dugme.addEventListener("click", function () {
    var acik = ust.classList.toggle("menu-acik");
    dugme.setAttribute("aria-expanded", acik);
    dugme.setAttribute("aria-label", acik ? "Menüyü kapat" : "Menüyü aç");
  });

  // ---- kısa bildirim
  var bildirim = d.getElementById("bildirim"), zaman;
  function bildir(metin, sure) {
    bildirim.textContent = metin;
    bildirim.hidden = false;
    clearTimeout(zaman);
    zaman = setTimeout(function () { bildirim.hidden = true; }, sure || 5000);
  }

  // ---- görünme animasyonu
  var gozlenecek = d.querySelectorAll(".kas-semasi, .menu-kat, .surec li, .hizmet-kart, .rehber-kart, .salon-ozellik li");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (girdiler) {
      girdiler.forEach(function (g) {
        if (g.isIntersecting) { g.target.classList.add("gorundu"); io.unobserve(g.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    gozlenecek.forEach(function (el) {
      if (!el.classList.contains("kas-semasi")) el.classList.add("gozle");
      io.observe(el);
    });
  } else gozlenecek.forEach(function (el) { el.classList.add("gorundu"); });

  // ---- randevu formu: WhatsApp mesajı hazırlar, hiçbir yere kaydetmez
  var form = d.getElementById("randevu");
  if (!form) return;
  var GUN = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  var GUN_K = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  var AY = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  var iso = function (t) { return t.getFullYear() + "-" + ("0" + (t.getMonth() + 1)).slice(-2) + "-" + ("0" + t.getDate()).slice(-2); };
  var yaz = function (t) { return t.getDate() + " " + AY[t.getMonth()] + " " + GUN[t.getDay()]; };

  var secilenGun = null;
  var gunler = d.getElementById("gunler"), tarih = d.getElementById("tarih");
  var bugun = new Date(); bugun.setHours(12, 0, 0, 0);
  tarih.min = iso(bugun);
  for (var i = 0; i < 7; i++) {
    var t = new Date(bugun); t.setDate(bugun.getDate() + i);
    var b = d.createElement("button");
    b.type = "button"; b.className = "gun"; b.setAttribute("role", "radio"); b.setAttribute("aria-checked", "false");
    b.dataset.tarih = iso(t);
    b.innerHTML = "<span>" + (i === 0 ? "Bugün" : i === 1 ? "Yarın" : GUN_K[t.getDay()]) + "</span><b>" + t.getDate() + "</b><span>" + AY[t.getMonth()].slice(0, 3) + "</span>";
    b.title = yaz(t);
    gunler.appendChild(b);
  }
  function gunSec(deger) {
    secilenGun = deger;
    gunler.querySelectorAll(".gun").forEach(function (g) { g.setAttribute("aria-checked", g.dataset.tarih === deger ? "true" : "false"); });
    ozetle();
  }
  gunler.addEventListener("click", function (e) {
    var g = e.target.closest(".gun"); if (!g) return;
    tarih.value = "";
    gunSec(secilenGun === g.dataset.tarih ? null : g.dataset.tarih);
  });
  tarih.addEventListener("change", function () { gunSec(tarih.value || null); });

  // ?hizmet=slug ile gelinirse ön seçim
  var q = new URLSearchParams(location.search).get("hizmet");
  if (q) form.querySelectorAll('input[name=hizmet]').forEach(function (k) { if (k.dataset.slug === q) k.checked = true; });

  var ozet = d.getElementById("rOzet"), hata = d.getElementById("hizmetHata");
  function secimler() {
    return Array.prototype.map.call(form.querySelectorAll("input[name=hizmet]:checked"), function (k) { return k.value; });
  }
  function tarihMetni() {
    if (!secilenGun) return "";
    var p = secilenGun.split("-"); return yaz(new Date(+p[0], +p[1] - 1, +p[2], 12));
  }
  function ozetle() {
    var s = secimler();
    if (s.length) hata.hidden = true;
    ozet.innerHTML = s.length ? "<b>" + s.length + " hizmet</b> · " + (tarihMetni() || "gün seçilmedi") + " · " + form.saat.value : "";
  }
  form.addEventListener("change", ozetle);
  ozetle();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var s = secimler();
    if (!s.length) { hata.hidden = false; form.querySelector("input[name=hizmet]").focus(); return; }
    var ad = (form.ad.value || "").trim(), not = (form.not.value || "").trim();
    var satirlar = [
      "Merhaba, randevu almak istiyorum.",
      "Hizmet: " + s.join(", "),
      "Gün: " + (tarihMetni() || "Size uygun ilk gün"),
      "Saat: " + form.saat.value,
    ];
    if (ad) satirlar.push("Ad: " + ad);
    if (not) satirlar.push("Not: " + not);
    if (!WA) { bildir("WhatsApp numarası henüz eklenmedi."); return; }
    if (window.gtag) window.gtag("event", "randevu_gonder", { hizmet_sayisi: s.length });
    location.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(satirlar.join("\n"));
  });
})();

// ---- dönüşüm ölçümü (GA4 eklendiğinde çalışır)
document.addEventListener("click", function (e) {
  var a = e.target.closest("[data-track]");
  if (a && window.gtag) window.gtag("event", a.dataset.track === "call" ? "telefon_tiklama" : "whatsapp_tiklama");
});
