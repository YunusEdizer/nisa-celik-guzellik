// Statik site üreticisi: site.config.json + src/icerik.mjs → dist/
// Kullanım: node build.mjs   ·   Kontrol: node tools/kontrol.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { HIZMETLER, KATEGORILER, SSS_GENEL, SUREC } from "./src/icerik.mjs";
import { REHBER } from "./src/rehber.mjs";

const c = JSON.parse(readFileSync("site.config.json", "utf8"));
const OUT = "dist";
const BUGUN = new Date().toISOString().slice(0, 10);
const CSS = readFileSync("src/font.css", "utf8") + readFileSync("src/style.css", "utf8");
const JS = readFileSync("src/main.js", "utf8");
if (!c.whatsapp) console.warn("! site.config.json: whatsapp numarası boş — randevu düğmeleri çalışmaz");

const surum = {};
const v = (yol) => (surum[yol] ??= existsSync("public" + yol) ? `${yol}?v=${createHash("md5").update(readFileSync("public" + yol)).digest("hex").slice(0, 8)}` : yol);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const duz = (s) => String(s).replace(/<[^>]+>/g, "");
const url = (yol) => c.alanAdi + yol;
const waLink = (metin = "Merhaba, randevu almak istiyorum.") => `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(metin)}`;
const saatMetni = c.calismaSaatleri || "Randevu ile";
const tamAdres = c.adres ? `${c.adres}, ${c.il}` : c.il;
const yolTarifi = c.googleHaritaLinki || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.adres} ${c.il}`)}`;
const sahipler = c.ortakAdi ? `${c.sahip} ve ${c.ortakAdi}` : c.sahip;

const hizmetYol = (h) => `/hizmetler/${h.slug}/`;
const rehberYol = (r) => `/rehber/${r.slug}/`;
const bulHizmet = (slug) => HIZMETLER.find((h) => h.slug === slug);
const katHizmet = (id) => HIZMETLER.filter((h) => h.kat === id);
const katAd = (id) => KATEGORILER.find((k) => k.id === id).ad;

// ---------------------------------------------------------------- ikonlar (24px çizgi)
const IK = {
  kas: '<path d="M2.5 14.5C6 10 12 8.2 21.5 10.2"/><path d="M2.5 14.5c4-2.6 9.5-3.6 15.5-2.6"/><path d="M4 18.5c2.6-1.6 5.6-2.3 8.5-2"/>',
  kasLift: '<path d="M3 16C7 11.5 13 9.8 21 11.5"/><path d="M6 13.4 5.2 10M9 12l-.4-3.6M12 11.2V7.6M15 11l.4-3.4M18 11.2l.9-3.1"/>',
  kirpik: '<path d="M2 13.5s3.6-5 10-5 10 5 10 5-3.6 5-10 5-10-5-10-5z"/><circle cx="12" cy="13.5" r="2.6"/><path d="M5.2 9.6 4 7.4M8.4 8.2 7.8 5.8M12 7.8V5.3M15.6 8.2l.6-2.4M18.8 9.6 20 7.4"/>',
  kirpikLift: '<path d="M2.5 12c2.6 3.4 5.8 5 9.5 5s6.9-1.6 9.5-5"/><path d="M6 14.8c-1.6-.4-2.6-1.6-2.8-3.4M9.5 16.3c-1-.8-1.5-2.2-1.2-4M14.5 16.3c1-.8 1.5-2.2 1.2-4M18 14.8c1.6-.4 2.6-1.6 2.8-3.4M12 17c0-1.6 0-3.6.3-5.4"/>',
  cilt: '<path d="M12 2.8c-4.3 0-7 3.3-7 7.7 0 5.6 3.8 10.7 7 10.7s7-5.1 7-10.7c0-4.4-2.7-7.7-7-7.7z"/><path d="M9.3 14.8c1.6 1.3 3.8 1.3 5.4 0"/><path d="M19.5 2.5v3M18 4h3"/>',
  dudak: '<path d="M2.5 12.2c2.3-3.3 4.6-5 6.6-5 1.2 0 2.1.6 2.9 1.4.8-.8 1.7-1.4 2.9-1.4 2 0 4.3 1.7 6.6 5-2.6 3.5-5.6 5.1-9.5 5.1s-6.9-1.6-9.5-5.1z"/><path d="M2.5 12.2c3 .9 6 1.2 9.5 1.2s6.5-.3 9.5-1.2"/>',
  lazer: '<circle cx="12" cy="12" r="3.4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8"/>',
  drenaj: '<path d="M3 7.5c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M3 12.5c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M3 17.5c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0"/>',
  ems: '<path d="M2 12h4.2l2.3-6 4 12 2.6-6H22"/>',
  tirnak: '<path d="M7.5 22V9.5a4.5 4.5 0 0 1 9 0V22"/><path d="M9.6 10.6a2.4 2.4 0 0 1 4.8 0v3.2H9.6z"/>',
  manikur: '<rect x="6.5" y="10" width="11" height="11.5" rx="2.8"/><path d="M9.5 10V7.2h5V10M11 7.2V2.5h2v4.7"/><path d="M9.5 14.5h5"/>',
  sac: '<path d="M7 3c-2.2 4.6 1.8 7.6 0 12.6-.9 2.5.4 4.3 1.2 5.4M12 3c-2.2 4.6 1.8 7.6 0 12.6-.9 2.5.4 4.3 1.2 5.4M17 3c-2.2 4.6 1.8 7.6 0 12.6-.9 2.5.4 4.3 1.2 5.4"/>',
  tel: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  takvim: '<rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"/>',
  saat: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3.2 2"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><path d="M17.3 6.7h.01"/>',
  ok: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  tik: '<path d="M20 6 9 17l-5-5"/>',
  yildiz: '<path d="M12 2.5c.6 4.8 2.7 6.9 7.5 7.5-4.8.6-6.9 2.7-7.5 7.5-.6-4.8-2.7-6.9-7.5-7.5 4.8-.6 6.9-2.7 7.5-7.5z"/>',
  kalkan: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  bilgi: '<circle cx="12" cy="12" r="9.5"/><path d="M12 11v5.5M12 7.5h.01"/>',
  kitap: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  yol: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16"/>',
  bina: '<path d="M4 21V9l8-6 8 6v12"/><path d="M4 14.5h16"/><path d="M9 21v-3.5h6V21"/><path d="M9 10.5h.01M15 10.5h.01"/>',
  kalp: '<path d="M19.5 12.6 12 20l-7.5-7.4A4.8 4.8 0 0 1 12 6.5a4.8 4.8 0 0 1 7.5 6.1z"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  kapat: '<path d="M18 6 6 18M6 6l12 12"/>',
};
const ikon = (ad, cls = "") => `<svg class="ik${cls ? " " + cls : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IK[ad]}</svg>`;
const WA_SVG = '<svg class="ik" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .78.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.46-.72-1.7-.8-.22-.08-.39-.12-.55.13-.17.24-.63.8-.78.96-.14.17-.29.19-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43l-.75-1.8c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.7 2.7 0 0 0-.85 2.02 4.7 4.7 0 0 0 1 2.5 10.8 10.8 0 0 0 4.14 3.66c1.54.66 2.14.72 2.9.6.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.15-1.18-.07-.1-.23-.16-.48-.28z"/></svg>';

// ---------------------------------------------------------------- altın spiral (Fibonacci kareleri)
const PHI = (1 + Math.sqrt(5)) / 2;
function altinSpiral(x, y, w, n) {
  let h = w / PHI, d = "", kareler = "";
  const f = (a) => +a.toFixed(2);
  for (let i = 0; i < n; i++) {
    let s, kare, bas, son;
    switch (i % 4) {
      case 0: s = h; kare = [x, y]; bas = [x, y + s]; son = [x + s, y]; x += s; w -= s; break;
      case 1: s = w; kare = [x, y]; bas = [x, y]; son = [x + s, y + s]; y += s; h -= s; break;
      case 2: s = h; kare = [x + w - s, y]; bas = [x + w, y]; son = [x + w - s, y + s]; w -= s; break;
      case 3: s = w; kare = [x, y + h - s]; bas = [x + w, y + h]; son = [x, y + h - s]; h -= s; break;
    }
    kareler += `<rect x="${f(kare[0])}" y="${f(kare[1])}" width="${f(s)}" height="${f(s)}"/>`;
    d += (i === 0 ? `M${f(bas[0])} ${f(bas[1])}` : "") + `A${f(s)} ${f(s)} 0 0 1 ${f(son[0])} ${f(son[1])}`;
  }
  return { d, kareler };
}

// Logo işareti: dairenin içinde altın spiral — yukarıdan bakılan gül goncası. favicon.svg ile aynı çizim.
const LOGO_SP = altinSpiral(8.2, 14.9, 31.6, 9);
const LOGO_ISARET = `<svg class="logo-isaret" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" fill="#141011"/><circle cx="24" cy="24" r="21.2" fill="none" stroke="#c9a45c" stroke-width="1.1"/><path d="${LOGO_SP.d}" fill="none" stroke="#e2c68c" stroke-width="2.1" stroke-linecap="round" transform="rotate(-18 24 24)"/></svg>`;
const logo = () => `<a class="logo" href="/">${LOGO_ISARET}<span class="logo-yazi"><b>${esc(c.markaKisa)}</b><small><i>&amp;</i> ${esc(c.markaAlt.toLocaleUpperCase("tr"))}</small></span></a>`;

// ---------------------------------------------------------------- kahraman görseli: kemer + altın oran ızgarası + damga
function kahramanGorsel() {
  const sp = altinSpiral(20, 150, 400, 11);
  const damga = `${c.markaKisa} · ${c.markaAlt} · ${c.il} · Güzellik · `.toLocaleUpperCase("tr");
  return `<div class="k-gorsel" aria-hidden="true">
  <div class="kemer">
    <svg class="kemer-svg" viewBox="0 0 440 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="kParilti" cx="62%" cy="58%" r="60%"><stop offset="0" stop-color="#b76e79" stop-opacity=".55"/><stop offset=".55" stop-color="#5b2a33" stop-opacity=".35"/><stop offset="1" stop-color="#141011" stop-opacity="0"/></radialGradient>
        <linearGradient id="kAltin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1dcaa"/><stop offset=".5" stop-color="#c9a45c"/><stop offset="1" stop-color="#8e6a2e"/></linearGradient>
      </defs>
      <rect width="440" height="600" fill="url(#kParilti)"/>
      <g class="k-kare" fill="none" stroke="#c9a45c" stroke-opacity=".28" stroke-width="1">${sp.kareler}</g>
      <path class="k-spiral" d="${sp.d}" fill="none" stroke="url(#kAltin)" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
    <span class="kemer-yazi">1 : 1,618</span>
  </div>
  <div class="yuzen y1">${ikon("kas")}<span><b>Altın oran kaş</b><small>Yüzünüze özel ölçü</small></span></div>
  <div class="yuzen y2">${ikon("kirpik")}<span><b>Kirpik lifting</b><small>Doğal, kalkık kirpikler</small></span></div>
  <div class="yuzen y3">${ikon("cilt")}<span><b>Cilt bakımı</b><small>Cildinize göre plan</small></span></div>
  <svg class="damga" viewBox="0 0 200 200"><circle cx="100" cy="100" r="99" fill="#1c1618" stroke="#c9a45c" stroke-opacity=".35"/><defs><path id="dYol" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0"/></defs><text><textPath href="#dYol" textLength="488">${esc(damga)}</textPath></text><g transform="translate(76 76) scale(1)"><circle cx="24" cy="24" r="22" fill="none" stroke="#c9a45c" stroke-width="1"/><path d="${LOGO_SP.d}" fill="none" stroke="#e2c68c" stroke-width="2" stroke-linecap="round" transform="rotate(-18 24 24)"/></g></svg>
</div>`;
}

// ---------------------------------------------------------------- altın oran kaş şeması
function kasSemasi() {
  const N = [215, 332];              // burun kanadı
  const bitis = (P, y) => { const t = (N[1] - y) / (N[1] - P[1]); return [N[0] + (P[0] - N[0]) * t, y]; };
  const I = [226, 218], P = [306, 212], O = [398, 202];
  const S = bitis(I, 150), A = bitis(P, 106), E = bitis(O, 146);
  const cizgi = (Q, cls) => `<line class="ks-cizgi ${cls}" x1="${N[0]}" y1="${N[1]}" x2="${Q[0].toFixed(1)}" y2="${(Q[1] - 18).toFixed(1)}"/>`;
  const uzat = (Q) => { const t = (N[1] - (Q[1] - 18)) / (N[1] - Q[1]); return [N[0] + (Q[0] - N[0]) * t, Q[1] - 18]; };
  const [s2, a2, e2] = [uzat(S), uzat(A), uzat(E)];
  const f = (n) => n.toFixed(1);
  // Üst kapak eğrisi üzerinde, dışa doğru kıvrılan kirpikler
  const kirpikler = (p0, p1, p2, p3) => [0.46, 0.58, 0.69, 0.79, 0.88, 0.96].map((t, i) => {
    const u = 1 - t, nok = (k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k];
    const tur = (k) => 3 * u * u * (p1[k] - p0[k]) + 6 * u * t * (p2[k] - p1[k]) + 3 * t * t * (p3[k] - p2[k]);
    const x = nok(0), y = nok(1), tx = tur(0), ty = tur(1), l = Math.hypot(tx, ty), nx = ty / l, ny = -tx / l;
    const b = 11 + i * 2.2, e = 0.35 + i * 0.12;
    return `M${f(x)} ${f(y)}q${f(nx * b * 0.6)} ${f(ny * b * 0.6)} ${f(nx * b + (tx / l) * b * e)} ${f(ny * b + (ty / l) * b * e)}`;
  }).join("");
  return `<svg class="kas-semasi" viewBox="0 0 560 380" role="img" aria-labelledby="ksBaslik ksAciklama">
<title id="ksBaslik">Altın oran kaş ölçüsü</title>
<desc id="ksAciklama">Burun kanadından çıkan üç çizgi: gözün iç köşesinden geçen çizgi kaşın başlangıcını, göz bebeğinin dış kenarından geçen çizgi kemeri, gözün dış köşesinden geçen çizgi kaşın bitişini gösterir.</desc>
<defs>
  <linearGradient id="ksKas" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b4a3a" stop-opacity=".55"/><stop offset=".35" stop-color="#4a2f25"/><stop offset="1" stop-color="#3a241c"/></linearGradient>
  <radialGradient id="ksIris" cx=".45" cy=".4"><stop offset="0" stop-color="#8a5a3c"/><stop offset=".7" stop-color="#4b2e1f"/><stop offset="1" stop-color="#2a1a12"/></radialGradient>
</defs>
<path class="ks-yuz" d="M196 96C192 170 196 250 184 300c-6 22 6 38 28 38 12 0 22-4 30-10"/>
<path class="ks-goz-ic" d="M${I[0]} ${I[1]}C262 178 350 170 ${O[0]} ${O[1]}C352 244 270 250 ${I[0]} ${I[1]}Z"/>
<clipPath id="ksGozKes"><path d="M${I[0]} ${I[1]}C262 178 350 170 ${O[0]} ${O[1]}C352 244 270 250 ${I[0]} ${I[1]}Z"/></clipPath>
<g clip-path="url(#ksGozKes)"><circle cx="${P[0] - 25}" cy="${P[1]}" r="25" fill="url(#ksIris)"/><circle cx="${P[0] - 25}" cy="${P[1]}" r="10" fill="#140c08"/><circle cx="${P[0] - 32}" cy="${P[1] - 8}" r="4" fill="#fff" opacity=".85"/></g>
<path class="ks-goz" d="M${I[0]} ${I[1]}C262 178 350 170 ${O[0]} ${O[1]}"/>
<path class="ks-goz ince" d="M${I[0]} ${I[1]}C270 250 352 244 ${O[0]} ${O[1]}"/>
<path class="ks-kirpik" d="${kirpikler(I, [262, 178], [350, 170], O)}"/>
<path class="ks-kas" d="M${f(S[0] - 4)} ${f(S[1] + 14)}C${f(S[0] + 30)} ${f(S[1] - 16)} ${f(A[0] - 50)} ${f(A[1] - 2)} ${f(A[0])} ${f(A[1] - 4)}C${f(A[0] + 30)} ${f(A[1] - 5)} ${f(E[0] - 30)} ${f(E[1] - 18)} ${f(E[0] + 2)} ${f(E[1])}C${f(E[0] - 30)} ${f(E[1] - 10)} ${f(A[0] + 26)} ${f(A[1] + 10)} ${f(A[0])} ${f(A[1] + 14)}C${f(A[0] - 50)} ${f(A[1] + 18)} ${f(S[0] + 26)} ${f(S[1] + 22)} ${f(S[0] - 4)} ${f(S[1] + 30)}Z"/>
${cizgi(s2, "c1")}${cizgi(a2, "c2")}${cizgi(e2, "c3")}
<circle class="ks-nokta n0" cx="${N[0]}" cy="${N[1]}" r="6"/>
<circle class="ks-nokta n1" cx="${f(S[0])}" cy="${f(S[1])}" r="6"/>
<circle class="ks-nokta n2" cx="${f(A[0])}" cy="${f(A[1])}" r="6"/>
<circle class="ks-nokta n3" cx="${f(E[0])}" cy="${f(E[1])}" r="6"/>
<g class="ks-etiket">
  <text x="${f(s2[0] - 14)}" y="${f(s2[1] - 6)}" text-anchor="end">1 · Başlangıç</text>
  <text x="${f(a2[0])}" y="${f(a2[1] - 12)}" text-anchor="middle">2 · Kemer</text>
  <text x="${f(e2[0] + 4)}" y="${f(e2[1] - 14)}" text-anchor="middle">3 · Bitiş</text>
  <text x="${N[0] + 16}" y="${N[1] + 6}" class="soluk">Burun kanadı</text>
</g>
<g class="ks-oran"><path d="M${f(S[0])} 30v10M${f(A[0])} 30v10M${f(E[0])} 30v10M${f(S[0])} 35H${f(E[0])}"/><text x="${f((S[0] + A[0]) / 2)}" y="24" text-anchor="middle">1,618</text><text x="${f((A[0] + E[0]) / 2)}" y="24" text-anchor="middle">1</text></g>
</svg>`;
}

// ---------------------------------------------------------------- ortak parçalar
const NAV = [["/hizmetler/", "Hizmetler"], ["/hizmetler/altin-oran-kas-alimi/", "Altın Oran Kaş"], ["/rehber/", "Rehber"], ["/randevu/", "Randevu"], ["/iletisim/", "İletişim"]];

const ustKisim = (aktif) => `
<a class="atla" href="#icerik">İçeriğe geç</a>
<header class="ust" id="ust">
  <div class="kap ust-ic">
    ${logo()}
    <nav class="nav" id="nav" aria-label="Ana menü">
      <ul>${NAV.map(([h, a]) => `<li><a href="${h}"${aktif === h ? ' aria-current="page"' : ""}>${a}</a></li>`).join("")}</ul>
      <div class="nav-mobil">
        <a class="btn btn-altin btn-blok" href="/randevu/">${ikon("takvim")}Randevu oluştur</a>
        <a class="btn btn-cizgi btn-blok" href="tel:${c.telefon}" data-track="call">${ikon("tel")}${c.telefonGorunen}</a>
      </div>
    </nav>
    <div class="ust-sag">
      <a class="ust-tel" href="tel:${c.telefon}" data-track="call">${ikon("tel")}<span>${c.telefonGorunen}</span></a>
      <a class="btn btn-altin btn-kucuk ust-randevu" href="/randevu/">Randevu al</a>
      <button class="menu-dugme" id="menuDugme" aria-label="Menüyü aç" aria-expanded="false" aria-controls="nav">${ikon("menu", "ac")}${ikon("kapat", "kapa")}</button>
    </div>
  </div>
</header>`;

const altCubuk = () => `
<div class="alt-cubuk" aria-label="Hızlı iletişim">
  <a href="tel:${c.telefon}" data-track="call">${ikon("tel")}<span>Ara</span></a>
  <a href="${waLink()}" target="_blank" rel="noopener" data-track="whatsapp">${WA_SVG}<span>WhatsApp</span></a>
  <a href="/randevu/" class="ac-randevu">${ikon("takvim")}<span>Randevu</span></a>
</div>`;

const altBilgi = () => `
<footer class="alt">
  <div class="kap alt-ust">
    <div class="alt-marka">
      ${logo()}
      <p>${esc(c.ildeki)} güzellik salonu: kaş, kirpik, cilt bakımı, lazer epilasyon, vücut uygulamaları, tırnak ve saç.</p>
      <ul class="alt-bilgi">
        <li><a href="tel:${c.telefon}" data-track="call">${ikon("tel")}${c.telefonGorunen}</a></li>
        <li><a href="${waLink()}" target="_blank" rel="noopener" data-track="whatsapp">${WA_SVG}WhatsApp'tan yazın</a></li>
        ${c.instagram ? `<li><a href="https://instagram.com/${esc(c.instagram)}" target="_blank" rel="noopener">${ikon("insta")}@${esc(c.instagram)}</a></li>` : ""}
        <li><a href="${esc(yolTarifi)}" target="_blank" rel="noopener">${ikon("pin")}<span>${esc(tamAdres)}</span></a></li>
        <li>${ikon("saat")}${esc(saatMetni)}</li>
      </ul>
    </div>
    ${KATEGORILER.slice(0, 2).map((k) => `<div><h2>${k.ad}</h2><ul>${katHizmet(k.id).map((h) => `<li><a href="${hizmetYol(h)}">${h.ad}</a></li>`).join("")}</ul></div>`).join("")}
    <div><h2>Vücut, Tırnak & Saç</h2><ul>${[...katHizmet("vucut"), ...katHizmet("tirnak"), ...katHizmet("sac")].map((h) => `<li><a href="${hizmetYol(h)}">${h.ad}</a></li>`).join("")}</ul></div>
    <div><h2>Güzellik Rehberi</h2><ul>${REHBER.map((r) => `<li><a href="${rehberYol(r)}">${r.h1}</a></li>`).join("")}<li><a href="/randevu/">Randevu</a></li><li><a href="/iletisim/">İletişim</a></li></ul></div>
  </div>
  <div class="kap alt-alt">
    <span>© ${new Date().getFullYear()} ${esc(c.marka)} · ${esc(sahipler)}</span>
    <span>Randevu formu yalnızca WhatsApp mesajınızı hazırlar; bu sitede kişisel veri saklanmaz.</span>
  </div>
</footer>`;

const kirinti = (yollar) => `<nav class="kirinti" aria-label="Sayfa yolu"><ol>${yollar.map(([h, a], i) => i === yollar.length - 1 ? `<li aria-current="page">${a}</li>` : `<li><a href="${h}">${a}</a></li>`).join("")}</ol></nav>`;
const kirintiSema = (yollar) => ({ "@type": "BreadcrumbList", itemListElement: yollar.map(([h, a], i) => ({ "@type": "ListItem", position: i + 1, name: duz(a), item: url(h) })) });

const ctaDugmeler = (hizmet) => `<div class="cta-dugmeler">
  <a class="btn btn-altin btn-buyuk" href="/randevu/${hizmet ? `?hizmet=${hizmet.slug}` : ""}">${ikon("takvim")}Randevu oluştur</a>
  <a class="btn btn-cizgi btn-buyuk" href="${waLink(hizmet ? `Merhaba, ${hizmet.ad} hakkında bilgi almak istiyorum.` : undefined)}" target="_blank" rel="noopener" data-track="whatsapp">${WA_SVG}WhatsApp'tan sorun</a>
</div>`;

const ctaBant = (baslik = "Size ayrılan zaman, <em>yalnızca size</em> ait.") => `
<section class="cta-bant"><div class="kap cta-bant-ic">
  <div><p class="ust-baslik">Randevu</p><h2>${baslik}</h2><p>Hizmetinizi ve size uygun günü seçin, mesajınız WhatsApp'ta hazır olsun. Uygun saati hemen onaylayalım.</p></div>
  <div class="cta-dugmeler">
    <a class="btn btn-altin btn-buyuk" href="/randevu/">${ikon("takvim")}Randevu oluştur</a>
    <a class="btn btn-cizgi btn-buyuk" href="tel:${c.telefon}" data-track="call">${ikon("tel")}${c.telefonGorunen}</a>
  </div>
</div></section>`;

const blokHtml = (icerik) => {
  if (Array.isArray(icerik)) return icerik.map((p) => `<p>${p}</p>`).join("");
  if (icerik.tablo) return `<div class="tablo-kap"><table class="tablo"><thead><tr>${icerik.tablo.baslik.map((b) => `<th scope="col">${b}</th>`).join("")}</tr></thead><tbody>${icerik.tablo.satirlar.map(([ilk, ...r]) => `<tr><th scope="row">${ilk}</th>${r.map((x) => `<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  if (icerik.liste) return `<ul class="tikli">${icerik.liste.map((x) => `<li>${ikon("yildiz")}<span>${x}</span></li>`).join("")}</ul>`;
  if (icerik.sirali) return `<ol class="sirali">${icerik.sirali.map((x) => `<li><span>${x}</span></li>`).join("")}</ol>`;
  return "";
};
const bolumlerHtml = (bolumler) => bolumler.map(([h, b]) => `<h2>${h}</h2>${blokHtml(b)}`).join("");

const sssHtml = (liste, baslik = "Sık sorulan sorular") => `<div class="sss"><h2>${baslik}</h2>${liste.map(([s, cv], i) => `<details${i === 0 ? " open" : ""}><summary>${s}<i aria-hidden="true"></i></summary><div><p>${cv}</p></div></details>`).join("")}</div>`;
const sssSema = (liste) => ({ "@type": "FAQPage", mainEntity: liste.map(([s, cv]) => ({ "@type": "Question", name: duz(s), acceptedAnswer: { "@type": "Answer", text: duz(cv) } })) });

const hizmetKart = (h) => `<a class="kart hizmet-kart" href="${hizmetYol(h)}"><span class="kart-ikon">${ikon(h.ikon)}</span><span class="kart-kat">${katAd(h.kat)}</span><h3>${h.ad}</h3><p>${h.kisa}</p><span class="kart-ok">Ayrıntılar${ikon("ok")}</span></a>`;
const rehberKart = (r) => `<a class="kart rehber-kart" href="${rehberYol(r)}"><span class="rk-ust"><span class="rk-ikon">${ikon(r.ikon)}</span><span class="rk-etiket">${ikon("kitap")}Rehber</span></span><h3>${r.h1}</h3><p>${r.kisaCevap.split(/(?<=[.;])\s/)[0]}</p><span class="kart-ok">Okuyun${ikon("ok")}</span></a>`;
const trTarih = (t) => new Date(t).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

// Menü düzeni: kategori başlığı solda, hizmetler sağda satır satır
const hizmetMenusu = () => `<div class="menu-liste">${KATEGORILER.map((k) => `
  <div class="menu-kat" id="${k.id}">
    <div class="menu-kat-bas"><span class="menu-no">${k.no}</span><h3>${k.ad}</h3><p>${k.ozet}</p></div>
    <ul>${katHizmet(k.id).map((h) => `<li><a href="${hizmetYol(h)}"><span class="mk-ikon">${ikon(h.ikon)}</span><span class="mk-metin"><b>${h.ad}${h.imza ? '<em class="imza">İmza</em>' : ""}</b><small>${h.kisa}</small></span>${ikon("ok", "mk-ok")}</a></li>`).join("")}</ul>
  </div>`).join("")}
</div>`;

// ---------------------------------------------------------------- randevu formu (WhatsApp mesajı oluşturur, veri saklamaz)
const randevuFormu = (onSecili) => `
<form class="randevu" id="randevu" novalidate>
  <fieldset class="r-adim"><legend><span>1</span>Hangi hizmet(ler)?</legend>
    ${KATEGORILER.map((k) => `<div class="r-grup"><p class="r-grup-ad">${k.ad}</p><div class="secimler">${katHizmet(k.id).map((h) => `<label><input type="checkbox" name="hizmet" value="${h.ad}" data-slug="${h.slug}"${onSecili === h.slug ? " checked" : ""}><span>${h.ad}</span></label>`).join("")}</div></div>`).join("")}
    <p class="r-hata" id="hizmetHata" hidden>En az bir hizmet seçin.</p>
  </fieldset>
  <fieldset class="r-adim"><legend><span>2</span>Ne zaman?</legend>
    <div class="gunler" id="gunler" role="radiogroup" aria-label="Gün seçin"></div>
    <label class="r-alan r-tarih"><span>ya da başka bir tarih</span><input type="date" name="tarih" id="tarih"></label>
    <p class="r-grup-ad">Saat aralığı</p>
    <div class="secimler">${["Sabah", "Öğleden sonra", "Akşamüstü", "Fark etmez"].map((s, i) => `<label><input type="radio" name="saat" value="${s}"${i === 3 ? " checked" : ""}><span>${s}</span></label>`).join("")}</div>
  </fieldset>
  <fieldset class="r-adim"><legend><span>3</span>Size nasıl hitap edelim?</legend>
    <label class="r-alan"><span>Adınız</span><input type="text" name="ad" autocomplete="given-name" maxlength="60" placeholder="Örn. Ayşe"></label>
    <label class="r-alan"><span>Not <small>(isteğe bağlı: alerji, hassasiyet, istediğiniz model)</small></span><textarea name="not" rows="2" maxlength="400"></textarea></label>
  </fieldset>
  <div class="r-ozet" id="rOzet" aria-live="polite"></div>
  <button type="submit" class="btn btn-wa btn-blok btn-gonder">${WA_SVG}WhatsApp'ta randevu iste</button>
  <p class="form-not">${ikon("kalkan")}Bu form yalnızca WhatsApp mesajınızı hazırlar; bilgileriniz bu sitede saklanmaz. Randevunuz, uygun saati onayladığımızda kesinleşir.</p>
</form>`;

// ---------------------------------------------------------------- sayfa kabuğu
const ISLETME_ID = url("/#isletme");
const isletmeSema = () => ({
  "@type": "BeautySalon",
  "@id": ISLETME_ID,
  name: c.marka,
  alternateName: [c.markaKisa, c.markaAlt, `${c.markaKisa} ${c.markaAlt}`, `${c.markaKisa} ${c.markaAlt} ${c.il}`, `${c.sahip} Güzellik`],
  url: url("/"),
  telephone: c.telefon,
  image: url(v("/og.png")),
  logo: url(v("/icon-512.png")),
  founder: [{ "@type": "Person", name: c.sahip }, ...(c.ortakAdi ? [{ "@type": "Person", name: c.ortakAdi }] : [])],
  address: { "@type": "PostalAddress", ...(c.adres ? { streetAddress: c.adres } : {}), ...(c.postaKodu ? { postalCode: c.postaKodu } : {}), addressLocality: c.il, addressRegion: c.il, addressCountry: "TR" },
  areaServed: { "@type": "City", name: c.il },
  ...(c.saatler ? { openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: c.saatler.gunler, opens: c.saatler.acilis, closes: c.saatler.kapanis }] } : {}),
  knowsAbout: HIZMETLER.map((h) => h.ad),
  hasOfferCatalog: { "@type": "OfferCatalog", name: "Hizmetler", itemListElement: KATEGORILER.map((k) => ({ "@type": "OfferCatalog", name: k.ad, itemListElement: katHizmet(k.id).map((h) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: h.ad, url: url(hizmetYol(h)) } })) })) },
  hasMap: yolTarifi,
  ...([c.googleHaritaLinki, c.instagram && `https://instagram.com/${c.instagram}`].filter(Boolean).length ? { sameAs: [c.googleHaritaLinki, c.instagram && `https://instagram.com/${c.instagram}`].filter(Boolean) } : {}),
});

const sayfalar = [];
function sayfa({ yol, baslik, aciklama, govde, sema = [], aktif, noindex = false, tur = "WebPage", sinif = "" }) {
  // Sığıyorsa başlık sonuna kısa değil tam marka adı yazılır (60 karakter sınırı)
  const tam = baslik.replace(new RegExp(`\\| ${c.markaKisa}$`), `| ${c.marka}`);
  if ([...tam].length <= 60) baslik = tam;
  const graf = [
    { "@type": "WebSite", "@id": url("/#site"), url: url("/"), name: c.marka, inLanguage: "tr-TR", publisher: { "@id": ISLETME_ID } },
    isletmeSema(),
    { "@type": tur, "@id": url(yol) + "#sayfa", url: url(yol), name: baslik, description: aciklama, inLanguage: "tr-TR", isPartOf: { "@id": url("/#site") }, about: { "@id": ISLETME_ID } },
    ...sema,
  ];
  const ld = JSON.stringify({ "@context": "https://schema.org", "@graph": graf }).replace(/</g, "\\u003c");
  const html = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(baslik)}</title>
<meta name="description" content="${esc(aciklama)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url(yol)}">`}
<meta name="theme-color" content="#141011">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="${esc(c.marka)}">
<meta property="og:title" content="${esc(baslik)}">
<meta property="og:description" content="${esc(aciklama)}">
<meta property="og:url" content="${url(yol)}">
<meta property="og:image" content="${url(v("/og.png"))}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
${c.googleDogrulama ? `<meta name="google-site-verification" content="${esc(c.googleDogrulama)}">` : ""}
<link rel="icon" href="${v("/favicon.ico")}" sizes="48x48">
<link rel="icon" href="${v("/favicon.svg")}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${v("/apple-touch-icon.png")}">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/font/cormorant-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/font/cormorant-latin-ext.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/font/cormorant-italic-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/font/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/font/manrope-latin-ext.woff2" as="font" type="font/woff2" crossorigin>
<style>${CSS}</style>
<script type="application/ld+json">${ld}</script>
${c.ga4 ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(c.ga4)}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${esc(c.ga4)}");</script>` : ""}
</head>
<body${sinif ? ` class="${sinif}"` : ""}>
${ustKisim(aktif)}
<main id="icerik">
${govde}
</main>
${altBilgi()}
${altCubuk()}
<div class="bildirim" id="bildirim" role="status" aria-live="polite" hidden></div>
<script>window.BR={wa:"${c.whatsapp}"};${JS}</script>
</body>
</html>`;
  const dosya = yol === "/404.html" ? join(OUT, "404.html") : join(OUT, yol, "index.html");
  mkdirSync(dirname(dosya), { recursive: true });
  writeFileSync(dosya, html);
  if (!noindex) sayfalar.push(yol);
}

// ---------------------------------------------------------------- salonumuz: iki katlı salon, iki ortak, adres
function katCizimi() {
  const kemerler = (y) => [0, 1, 2].map((i) => { const x = 46 + i * 92; return `<path d="M${x} ${y + 92}V${y + 34}a32 32 0 0 1 64 0V${y + 92}"/>`; }).join("");
  return `<svg class="kat-cizim" viewBox="0 0 376 300" aria-hidden="true">
  <g fill="none" stroke="#c9a45c" stroke-width="1.4">
    <rect x="20" y="20" width="336" height="260" rx="6" stroke-opacity=".5"/>
    <path d="M20 150H356" stroke-opacity=".5"/>
    <g stroke-opacity=".9">${kemerler(38)}${kemerler(168)}</g>
  </g>
  <g class="kat-no"><text x="340" y="44" text-anchor="end">2. KAT</text><text x="340" y="174" text-anchor="end">1. KAT</text></g>
</svg>`;
}
const salonBolumu = () => `
<section class="bolum koyu salon-bolum" id="salonumuz"><div class="kap salon-duzen">
  <div class="salon-metin">
    <p class="ust-baslik acik">Salonumuz</p>
    <h2>İki katlı salonumuzda <em>size ayrılan zaman</em></h2>
    <p>${esc(c.marka)}, ${esc(c.il)} merkezde İsmet İnönü Caddesi üzerindeki iki katlı salonumuzda hizmet veriyor. Salonun iki ortağı ${c.ortakAdi ? `<b>${esc(c.sahip)}</b> ve <b>${esc(c.ortakAdi)}</b>` : `${esc(c.sahip)} ve ortağı`}; salonu birlikte yönetiyorlar.</p>
    <ul class="salon-ozellik">
      <li>${ikon("bina")}<span><b>İki katlı salon</b><small>Uygulamalar için ayrılmış, ferah bir alan</small></span></li>
      <li>${ikon("kalp")}<span><b>İki ortak, tek özen</b><small>Her uygulamada aynı titizlik</small></span></li>
      <li>${ikon("takvim")}<span><b>Randevuyla, acele etmeden</b><small>Size ayrılan zaman yalnızca sizin</small></span></li>
    </ul>
  </div>
  <div class="adres-kart">
    ${katCizimi()}
    <div class="adres-ic">
      <p class="adres-etiket">${ikon("pin")}Adres</p>
      <address>${c.adres ? esc(c.adres).replace(/ No:/, "<br>No:") : ""}<br>${esc(c.il)} Merkez</address>
      <div class="adres-dugme">
        <a class="btn btn-altin" href="${esc(yolTarifi)}" target="_blank" rel="noopener">${ikon("yol")}Yol tarifi al</a>
        <a class="btn btn-cizgi" href="tel:${c.telefon}" data-track="call">${ikon("tel")}Arayın</a>
      </div>
    </div>
  </div>
</div></section>`;

// ---------------------------------------------------------------- ANA SAYFA
function anaSayfa() {
  const kayan = HIZMETLER.map((h) => `<span>${h.ad}</span>${ikon("yildiz")}`).join("");
  const govde = `
<section class="kahraman">
  <div class="kap kahraman-ic">
    <div class="k-metin">
      <p class="ust-baslik acik"><span>${esc(c.il)} · Güzellik salonu<span class="mobil-gizle"> · İsmet İnönü Caddesi</span></span></p>
      <h1>Güzelliğinize <em>altın oran</em> dokunuşu</h1>
      <p class="giris">${esc(c.ildeki)} ${esc(c.markaDa)} kaş, kirpik, cilt bakımı, lazer epilasyon, vücut uygulamaları, tırnak ve saç: her işlem yüzünüze, cildinize ve size ayrılan zamana göre planlanır.</p>
      ${ctaDugmeler()}
      <ul class="k-ozet">
        <li><b>${HIZMETLER.length}</b><span>uygulama</span></li>
        <li><b>1 : 1,618</b><span>altın oran kaş</span></li>
        <li><b>${ikon("takvim")}</b><span>WhatsApp ile randevu</span></li>
      </ul>
    </div>
    ${kahramanGorsel()}
  </div>
</section>

<div class="kayan" aria-hidden="true"><div class="kayan-ic">${kayan}${kayan}</div></div>

<section class="bolum" id="hizmetler"><div class="kap">
  <div class="bolum-bas satir"><div><p class="ust-baslik">Hizmetlerimiz</p><h2>Baştan ayağa <em>özenle</em></h2></div><p class="bolum-yan">Bir hizmetin üzerine dokunun: nasıl uygulandığını, kimlere uygun olduğunu ve sonrasında nelere dikkat etmeniz gerektiğini okuyun.</p></div>
  ${hizmetMenusu()}
</div></section>

<section class="bolum koyu imza-bolum" id="altin-oran"><div class="kap imza-duzen">
  <div class="imza-metin">
    <p class="ust-baslik acik">İmza uygulamamız</p>
    <h2>Altın oran <em>kaş alımı</em></h2>
    <p>Kaşınız ezbere bir kalıpla değil, yüzünüzün kendi ölçüleriyle çizilir. Burun kanadından çıkan üç çizgi; kaşın nerede başlayacağını, en yüksek noktasının nerede olacağını ve nerede biteceğini gösterir.</p>
    <ol class="imza-adim">
      <li><b>Başlangıç</b><span>Burun kanadı → gözün iç köşesi</span></li>
      <li><b>Kemer</b><span>Burun kanadı → göz bebeğinin dış kenarı</span></li>
      <li><b>Bitiş</b><span>Burun kanadı → gözün dış köşesi</span></li>
    </ol>
    <a class="metin-link acik" href="/hizmetler/altin-oran-kas-alimi/">Altın oran kaşı yakından tanıyın${ikon("ok")}</a>
  </div>
  <figure class="sema-kart">${kasSemasi()}<figcaption>Taslak yüzünüzde çizilir; kalınlık ve kemere son kararı siz verirsiniz.</figcaption></figure>
</div></section>

${salonBolumu()}

<section class="bolum krem" id="surec"><div class="kap">
  <div class="bolum-bas orta"><p class="ust-baslik">Nasıl çalışıyoruz?</p><h2>Randevudan <em>aynaya</em></h2></div>
  <ol class="surec">${SUREC.map(([b, m], i) => `<li><span class="surec-no">0${i + 1}</span><h3>${b}</h3><p>${m}</p></li>`).join("")}</ol>
</div></section>

<section class="bolum" id="randevu-olustur"><div class="kap randevu-duzen">
  <div class="randevu-metin">
    <p class="ust-baslik">Online randevu</p>
    <h2>Randevunuzu <em>bir dakikada</em> oluşturun</h2>
    <p>Hizmetleri seçin, gün ve saat aralığını belirtin. Mesajınız WhatsApp'ta hazır açılır; gönderin, size uygun saati onaylayalım.</p>
    <ul class="tikli">
      <li>${ikon("yildiz")}<span>Birden fazla hizmeti aynı randevuda birleştirebilirsiniz.</span></li>
      <li>${ikon("yildiz")}<span>Mesajı göndermeden önce görür, düzenleyebilirsiniz.</span></li>
      <li>${ikon("yildiz")}<span>Aramayı tercih ederseniz: <a href="tel:${c.telefon}" data-track="call">${c.telefonGorunen}</a></span></li>
    </ul>
  </div>
  ${randevuFormu()}
</div></section>

<section class="bolum krem" id="rehber"><div class="kap">
  <div class="bolum-bas satir"><div><p class="ust-baslik">Güzellik rehberi</p><h2>Karar vermeden <em>önce okuyun</em></h2></div><a class="metin-link" href="/rehber/">Tüm yazılar${ikon("ok")}</a></div>
  <div class="izgara-3">${REHBER.slice(0, 3).map(rehberKart).join("")}</div>
</div></section>

<section class="bolum"><div class="kap dar">${sssHtml(SSS_GENEL)}</div></section>
${ctaBant()}`;
  sayfa({
    yol: "/", aktif: "/", sinif: "ana",
    baslik: `${c.il} Güzellik Salonu | ${c.marka}`,
    aciklama: `${c.ildeki} ${c.marka}: altın oran kaş, kirpik lifting, ipek kirpik, cilt bakımı, lazer epilasyon, tırnak ve saç. Randevu: ${c.telefonGorunen}`,
    govde, sema: [sssSema(SSS_GENEL)],
  });
}

// ---------------------------------------------------------------- HİZMET SAYFALARI
function hizmetSayfalari() {
  const kir = [["/", "Ana sayfa"], ["/hizmetler/", "Hizmetler"]];
  sayfa({
    yol: "/hizmetler/", aktif: "/hizmetler/",
    baslik: `Güzellik Hizmetleri ${c.il} | ${c.marka}`,
    aciklama: `${c.ilde} kaş ve kirpik, cilt bakımı, dudak dolgusu, lazer epilasyon, lenf drenaj, vakum ve EMS, tırnak ve saç boyama. Tüm hizmetler ve randevu.`.replace(c.dudakDolgusu ? "" : "dudak dolgusu, ", ""),
    sema: [kirintiSema(kir)],
    govde: `
<section class="sayfa-bas"><div class="kap">${kirinti(kir)}<p class="ust-baslik acik">${HIZMETLER.length} uygulama · 5 kategori</p><h1>Hizmetlerimiz</h1><p class="giris">Kaştan tırnağa, cilt bakımından lazer epilasyona; her uygulamayı size uygun şekilde planlıyoruz.</p><nav class="kat-cipler" aria-label="Kategoriler">${KATEGORILER.map((k) => `<a href="#${k.id}">${k.ad}</a>`).join("")}</nav></div></section>
<section class="bolum"><div class="kap">${hizmetMenusu()}</div></section>
${ctaBant()}`,
  });

  for (const h of HIZMETLER) {
    const k = [...kir, [hizmetYol(h), h.ad]];
    const ayniKat = HIZMETLER.filter((x) => x !== h && x.kat === h.kat);
    const digerleri = [...ayniKat, ...HIZMETLER.filter((x) => x !== h && x.kat !== h.kat)].slice(0, 3);
    sayfa({
      yol: hizmetYol(h), aktif: h.imza ? hizmetYol(h) : "/hizmetler/", baslik: h.baslik, aciklama: h.aciklama,
      sema: [kirintiSema(k), sssSema(h.sss), { "@type": "Service", "@id": url(hizmetYol(h)) + "#hizmet", name: h.ad, serviceType: h.ad, category: katAd(h.kat), description: duz(h.giris), provider: { "@id": ISLETME_ID }, areaServed: { "@type": "City", name: c.il }, url: url(hizmetYol(h)) }],
      govde: `
<section class="sayfa-bas"><div class="kap sayfa-bas-duzen">
  <div>${kirinti(k)}<p class="ust-baslik acik">${katAd(h.kat)}</p><h1>${h.h1}</h1><p class="giris">${h.giris}</p>${ctaDugmeler(h)}</div>
  <span class="sayfa-ikon" aria-hidden="true">${ikon(h.ikon)}</span>
</div></section>
<div class="kap icerik-duzen">
  <article class="yazi">
    ${h.imza ? `<figure class="sema-kart acik-sema">${kasSemasi()}<figcaption>Üç çizgi, üç nokta: başlangıç, kemer ve bitiş yüzünüzün ölçüleriyle bulunur.</figcaption></figure>` : ""}
    ${h.tibbi ? `<div class="uyari-kutu">${ikon("bilgi")}<p>Bu sayfa bilgilendirme amaçlıdır. Enjeksiyon uygulamaları tıbbi işlemdir; karar vermeden önce uygulamayı yapacak hekimle görüşün.</p></div>` : ""}
    ${bolumlerHtml(h.bolumler)}
    ${sssHtml(h.sss)}
    ${REHBER.some((r) => r.hizmetler.includes(h.slug)) ? `<div class="ilgili"><p class="ust-baslik">İlgili rehber</p>${REHBER.filter((r) => r.hizmetler.includes(h.slug)).map((r) => `<a href="${rehberYol(r)}">${ikon("kitap")}<span>${r.h1}</span>${ikon("ok")}</a>`).join("")}</div>` : ""}
  </article>
  <aside class="yan"><div class="yan-kart">
    <span class="yan-ikon">${ikon(h.ikon)}</span>
    <p class="yan-baslik">${h.ad}</p>
    <p class="yan-metin">Randevu oluşturun ya da aklınıza takılanı WhatsApp'tan sorun.</p>
    <a class="btn btn-altin btn-blok" href="/randevu/?hizmet=${h.slug}">${ikon("takvim")}Randevu oluştur</a>
    <a class="btn btn-wa btn-blok" href="${waLink(`Merhaba, ${h.ad} hakkında bilgi almak istiyorum.`)}" target="_blank" rel="noopener" data-track="whatsapp">${WA_SVG}WhatsApp</a>
    <a class="yan-tel" href="tel:${c.telefon}" data-track="call">${ikon("tel")}${c.telefonGorunen}</a>
  </div></aside>
</div>
<section class="bolum krem"><div class="kap"><div class="bolum-bas"><p class="ust-baslik">Bunlar da ilginizi çekebilir</p><h2>Diğer <em>uygulamalar</em></h2></div><div class="izgara-3">${digerleri.map(hizmetKart).join("")}</div></div></section>
${ctaBant(`${h.ad} için <em>randevu</em> oluşturun`)}`,
    });
  }
}

// ---------------------------------------------------------------- REHBER
function rehberSayfalari() {
  const kir = [["/", "Ana sayfa"], ["/rehber/", "Güzellik rehberi"]];
  sayfa({
    yol: "/rehber/", aktif: "/rehber/",
    baslik: `Güzellik Rehberi: Kaş, Kirpik, Cilt, Lazer | ${c.markaKisa}`,
    aciklama: `Kirpik lifting mi ipek kirpik mi, altın oran kaş nasıl ölçülür, lazer kaç seans sürer, ${c.il}'ın soğuk havasında cilt bakımı: karar vermeden önce okuyun.`,
    sema: [kirintiSema(kir), { "@type": "ItemList", itemListElement: REHBER.map((r, i) => ({ "@type": "ListItem", position: i + 1, url: url(rehberYol(r)), name: r.h1 })) }],
    govde: `
<section class="sayfa-bas"><div class="kap">${kirinti(kir)}<p class="ust-baslik acik">${REHBER.length} yazı</p><h1>Güzellik <em>rehberi</em></h1><p class="giris">Hangi uygulamanın size uygun olduğuna karar vermeden önce bilmeniz gerekenler: kısa, anlaşılır ve uygulanabilir.</p></div></section>
<section class="bolum"><div class="kap"><div class="izgara-3">${REHBER.map(rehberKart).join("")}</div></div></section>
${ctaBant()}`,
  });

  for (const r of REHBER) {
    const k = [...kir, [rehberYol(r), r.h1]];
    const hizmetler = r.hizmetler.map(bulHizmet).filter(Boolean);
    const digerleri = REHBER.filter((x) => x !== r).slice(0, 3);
    sayfa({
      yol: rehberYol(r), aktif: "/rehber/", baslik: r.baslik, aciklama: r.aciklama,
      sema: [kirintiSema(k), { "@type": "Article", "@id": url(rehberYol(r)) + "#yazi", headline: r.h1, description: r.aciklama, datePublished: r.tarih, dateModified: r.tarih, inLanguage: "tr-TR", author: { "@id": ISLETME_ID }, publisher: { "@id": ISLETME_ID }, image: url(v("/og.png")), mainEntityOfPage: url(rehberYol(r)), about: hizmetler.map((h) => ({ "@type": "Service", name: h.ad, url: url(hizmetYol(h)) })) }],
      govde: `
<section class="sayfa-bas"><div class="kap sayfa-bas-duzen">
  <div>${kirinti(k)}<p class="ust-baslik acik">Güzellik rehberi · ${trTarih(r.tarih)}</p><h1>${r.h1}</h1></div>
  <span class="sayfa-ikon" aria-hidden="true">${ikon(r.ikon)}</span>
</div></section>
<div class="kap icerik-duzen">
  <article class="yazi">
    <div class="kisa-cevap"><p class="ust-baslik">Kısa cevap</p><p>${r.kisaCevap}</p></div>
    ${r.sema ? `<figure class="sema-kart acik-sema">${kasSemasi()}<figcaption>Burun kanadından çıkan üç çizgi: başlangıç, kemer ve bitiş.</figcaption></figure>` : ""}
    ${bolumlerHtml(r.bolumler)}
    <div class="ilgili"><p class="ust-baslik">Bu yazıyla ilgili hizmetler</p>${hizmetler.map((h) => `<a href="${hizmetYol(h)}">${ikon(h.ikon)}<span>${h.ad}</span>${ikon("ok")}</a>`).join("")}</div>
  </article>
  <aside class="yan"><div class="yan-kart">
    <span class="yan-ikon">${ikon("takvim")}</span>
    <p class="yan-baslik">Uzmanına danışın</p>
    <p class="yan-metin">Hangisinin size uygun olduğundan emin değilseniz WhatsApp'tan sorun ya da randevu oluşturun.</p>
    <a class="btn btn-altin btn-blok" href="/randevu/${hizmetler[0] ? `?hizmet=${hizmetler[0].slug}` : ""}">${ikon("takvim")}Randevu oluştur</a>
    <a class="btn btn-wa btn-blok" href="${waLink(`Merhaba, "${r.h1}" yazısını okudum, bilgi almak istiyorum.`)}" target="_blank" rel="noopener" data-track="whatsapp">${WA_SVG}WhatsApp</a>
    <a class="yan-tel" href="tel:${c.telefon}" data-track="call">${ikon("tel")}${c.telefonGorunen}</a>
  </div></aside>
</div>
<section class="bolum krem"><div class="kap"><div class="bolum-bas"><p class="ust-baslik">Okumaya devam edin</p><h2>Diğer <em>yazılar</em></h2></div><div class="izgara-3">${digerleri.map(rehberKart).join("")}</div></div></section>`,
    });
  }
}

// ---------------------------------------------------------------- RANDEVU, İLETİŞİM ve 404
function digerSayfalar() {
  const kirR = [["/", "Ana sayfa"], ["/randevu/", "Randevu"]];
  sayfa({
    yol: "/randevu/", aktif: "/randevu/",
    baslik: `Online Randevu ${c.il} | ${c.marka}`,
    aciklama: `${c.marka} randevu: hizmetleri, günü ve saat aralığını seçin, mesajınız WhatsApp'ta hazır açılsın. Uygun saati hemen onaylayalım. ${c.telefonGorunen}`,
    sema: [kirintiSema(kirR)], tur: "ContactPage",
    govde: `
<section class="sayfa-bas"><div class="kap">${kirinti(kirR)}<p class="ust-baslik acik">Online randevu</p><h1>Randevu oluşturun</h1><p class="giris">Üç adımda seçiminizi yapın; mesajınız WhatsApp'ta hazır açılır. Gönderdiğinizde size uygun saati onaylarız.</p></div></section>
<section class="bolum krem"><div class="kap randevu-duzen tersine">
  ${randevuFormu()}
  <div class="randevu-metin">
    <h2>Randevu öncesi <em>küçük notlar</em></h2>
    <ul class="tikli">
      <li>${ikon("yildiz")}<span>Alerjiniz, hassasiyetiniz ya da kullandığınız ilaçlar varsa not alanına yazın.</span></li>
      <li>${ikon("yildiz")}<span>Lazer epilasyon için bölgeyi bir gün önce jiletle tıraş edin; ağda ve cımbız kullanmayın.</span></li>
      <li>${ikon("yildiz")}<span>Kirpik uygulamalarına lenssiz ve göz makyajı olmadan gelmeniz işi kolaylaştırır.</span></li>
      <li>${ikon("yildiz")}<span>Tırnak ya da saç için beğendiğiniz bir model varsa görselini WhatsApp'tan gönderin.</span></li>
    </ul>
    <div class="il-kutu">
      <a href="tel:${c.telefon}" data-track="call">${ikon("tel")}<span><small>Aramayı tercih ederseniz</small><b>${c.telefonGorunen}</b></span></a>
    </div>
  </div>
</div></section>`,
  });

  const kir = [["/", "Ana sayfa"], ["/iletisim/", "İletişim"]];
  sayfa({
    yol: "/iletisim/", aktif: "/iletisim/",
    baslik: `İletişim ve Randevu ${c.telefonGorunen} | ${c.markaKisa}`,
    aciklama: `${c.marka} iletişim: ${c.telefonGorunen} numarasından arayın ya da WhatsApp'tan yazın. ${c.ildeki} salonumuzda randevu ve hizmet bilgisi.`,
    sema: [kirintiSema(kir)], tur: "ContactPage",
    govde: `
<section class="sayfa-bas"><div class="kap">${kirinti(kir)}<p class="ust-baslik acik">İletişim</p><h1>Bize ulaşın</h1><p class="giris">Randevu, fiyat ya da uygulamalarla ilgili her soru için arayın veya WhatsApp'tan yazın. Salonun ortakları: <b>${esc(sahipler)}</b>.</p></div></section>
<section class="bolum"><div class="kap iletisim-kartlar">
  <a class="kart il-kart" href="tel:${c.telefon}" data-track="call">${ikon("tel")}<span><small>Telefon</small><b>${c.telefonGorunen}</b></span></a>
  <a class="kart il-kart" href="${waLink()}" target="_blank" rel="noopener" data-track="whatsapp">${WA_SVG}<span><small>WhatsApp</small><b>Mesaj gönderin</b></span></a>
  <a class="kart il-kart" href="/randevu/">${ikon("takvim")}<span><small>Online</small><b>Randevu oluşturun</b></span></a>
  ${c.instagram ? `<a class="kart il-kart" href="https://instagram.com/${esc(c.instagram)}" target="_blank" rel="noopener">${ikon("insta")}<span><small>Instagram</small><b>@${esc(c.instagram)}</b></span></a>` : ""}
  <a class="kart il-kart" href="${esc(yolTarifi)}" target="_blank" rel="noopener">${ikon("yol")}<span><small>Yol tarifi</small><b>Haritada açın</b></span></a>
  <div class="kart il-kart duz">${ikon("saat")}<span><small>Çalışma düzeni</small><b>${esc(saatMetni)}</b></span></div>
</div></section>
${salonBolumu()}
${ctaBant()}`,
  });

  sayfa({
    yol: "/404.html", noindex: true,
    baslik: `Sayfa bulunamadı | ${c.marka}`,
    aciklama: `Aradığınız sayfa bulunamadı. Randevu için WhatsApp'tan yazın ya da arayın: ${c.telefonGorunen}`,
    govde: `<section class="sayfa-bas bos"><div class="kap dar"><p class="ust-baslik acik">404</p><h1>Bu sayfa <em>bulunamadı</em></h1><p class="giris">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>${ctaDugmeler()}<p><a class="metin-link acik" href="/">Ana sayfaya dönün${ikon("ok")}</a></p></div></section>`,
  });
}

// ---------------------------------------------------------------- derleme
// Logo işaretini ikon üretimi için dışa ver (tools/ikon.html bunu okur)
writeFileSync("public/favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#141011"/><circle cx="24" cy="24" r="21.2" fill="none" stroke="#c9a45c" stroke-width="1.1"/><path d="${LOGO_SP.d}" fill="none" stroke="#e2c68c" stroke-width="2.1" stroke-linecap="round" transform="rotate(-18 24 24)"/></svg>\n`);
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync("public", OUT, { recursive: true });

anaSayfa();
hizmetSayfalari();
rehberSayfalari();
digerSayfalar();

writeFileSync(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sayfalar.map((y) => `  <url><loc>${url(y)}</loc><lastmod>${BUGUN}</lastmod></url>`).join("\n")}
</urlset>
`);
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${url("/sitemap.xml")}\n`);
// Yapay zekâ arama araçları için özet (llmstxt.org biçimi)
writeFileSync(join(OUT, "llms.txt"), `# ${c.marka}

> ${c.ildeki} güzellik salonu. Ortaklar: ${sahipler}. Adres: ${tamAdres}. Telefon ve WhatsApp: ${c.telefonGorunen}. Randevu WhatsApp üzerinden alınır.

## Hizmetler
${HIZMETLER.map((h) => `- [${h.ad}](${url(hizmetYol(h))}): ${h.kisa}`).join("\n")}

## Güzellik rehberi
${REHBER.map((r) => `- [${r.h1}](${url(rehberYol(r))}): ${r.kisaCevap.split(/(?<=\.)\s/)[0]}`).join("\n")}

## İletişim
- [Randevu](${url("/randevu/")})
- [İletişim](${url("/iletisim/")})
`);
writeFileSync(join(OUT, "site.webmanifest"), JSON.stringify({
  name: c.marka, short_name: c.markaKisa, lang: "tr", start_url: "/", display: "standalone",
  background_color: "#141011", theme_color: "#141011",
  icons: [{ src: "/favicon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }],
}));
console.log(`${sayfalar.length} sayfa + 404 → ${OUT}/`);
