// Güzellik rehberi yazıları. Arama niyetine göre: "X mi Y mi", "kaç seans", "nasıl ölçülür", "bakımı".
// Doğrulanmamış bilgi yazılmaz; sayısal iddialar yalnızca kaynaklı (DSÖ) olanlar.
import { readFileSync } from "node:fs";

const c = JSON.parse(readFileSync(new URL("../site.config.json", import.meta.url), "utf8"));
const IL = c.il, M = c.markaKisa;

export const REHBER = [
  {
    slug: "kirpik-lifting-mi-ipek-kirpik-mi", ikon: "kirpik", tarih: "2026-09-28",
    hizmetler: ["kirpik-lifting", "ipek-kirpik"],
    h1: "Kirpik lifting mi, ipek kirpik mi?",
    baslik: `Kirpik Lifting mi İpek Kirpik mi? Farkları | ${M}`,
    aciklama: "Kirpik lifting ile ipek kirpik arasındaki farklar: görünüm, bakım, rimel kullanımı ve kimlere uygun oldukları. Karar vermeden önce karşılaştırın.",
    kisaCevap: "Doğal ve bakım gerektirmeyen bir sonuç istiyorsanız kirpik lifting; daha uzun, yoğun ve makyajlı bir bakış istiyorsanız ipek kirpik. Lifting kendi kirpiklerinizi kıvırır, ipek kirpik ise her kirpiğe ek kirpik yapıştırır.",
    bolumler: [
      ["Temel fark", [
        "<b>Kirpik lifting</b>, kendi kirpiklerinizi kökten yukarı doğru kıvıran bir uygulamadır; hiçbir şey eklenmez. Kirpikleriniz ne kadar uzunsa o kadar uzun görünür, sadece kalkık ve açık dururlar.",
        "<b>İpek kirpik</b> ise doğal kirpiklerinizin her birine ince sentetik kirpikler tek tek yapıştırılarak yapılır. Uzunluk ve yoğunluk sizin kirpiklerinizle sınırlı değildir; doğal, belirgin ya da hacimli görünüm seçilebilir.",
      ]],
      ["Yan yana karşılaştırma", { tablo: {
        baslik: ["", "Kirpik lifting", "İpek kirpik"],
        satirlar: [
          ["Ne yapılır?", "Kendi kirpikleriniz kıvrılır", "Kirpiklere ek kirpik yapıştırılır"],
          ["Görünüm", "Doğal, açık bakış", "Daha uzun ve yoğun, makyajlı"],
          ["Bakım randevusu", "Gerekmez; etki doğal olarak azalır", "Birkaç haftada bir dolum önerilir"],
          ["Rimel", "İlk 24 saatten sonra kullanılabilir", "Genellikle gerekmez, önerilmez"],
          ["Günlük dikkat", "Çok az", "Yağlı ürün, ovma ve çekmeden kaçınma"],
        ],
      } }],
      ["Hangisi size uygun?", { liste: [
        "<b>Kirpikleriniz yeterince uzun ama düz ya da aşağı bakıyorsa:</b> kirpik lifting.",
        "<b>Kirpikleriniz kısa ya da seyrekse ve daha dolgun görünmek istiyorsanız:</b> ipek kirpik.",
        "<b>Spor, havuz ve yoğun tempoyla uğraşmak istemiyorsanız:</b> kirpik lifting daha az bakım ister.",
        "<b>Düğün, nişan gibi özel bir gün yaklaşıyorsa:</b> ipek kirpik fotoğraflarda daha belirgin durur.",
      ] }],
      ["İkisi birlikte yapılır mı?", [
        "Aynı anda yapılmaz; ipek kirpik takılı kirpiklere lifting uygulanmaz. Ancak ikisini dönem dönem değiştirmek mümkündür. Hangisinin kirpik yapınıza daha uygun olduğunu randevuda birlikte değerlendiririz.",
      ]],
    ],
  },
  {
    slug: "altin-oran-kas-nasil-olculur", ikon: "kas", tarih: "2026-09-28", sema: true,
    hizmetler: ["altin-oran-kas-alimi", "kas-lifting"],
    h1: "Altın oran kaş nasıl ölçülür?",
    baslik: `Altın Oran Kaş Nasıl Ölçülür? Adım Adım | ${M}`,
    aciklama: "Altın oran kaş ölçüsü: başlangıç, kemer ve bitiş noktasını bir kalemle evde nasıl bulursunuz? En sık yapılan kaş şekillendirme hataları ve çözümleri.",
    kisaCevap: "Burun kanadınızdan başlayan üç çizgi kaşınızı belirler: gözün iç köşesinden geçen çizgi başlangıcı, göz bebeğinin dış kenarından geçen çizgi kemeri, gözün dış köşesinden geçen çizgi bitişi gösterir. Bir kalemle evde de kabaca kontrol edebilirsiniz.",
    bolumler: [
      ["Evde kalemle kontrol", { sirali: [
        "Aynanın karşısına geçin, düz ileri bakın. İnce, düz bir kalem ya da fırça sapı alın.",
        "<b>Başlangıç:</b> Kalemi burun kanadınıza dayayıp gözünüzün iç köşesinden geçecek şekilde dik tutun. Kalemin kaşa değdiği nokta, kaşın başlaması gereken yerdir.",
        "<b>Kemer:</b> Kalemin alt ucu burun kanadında kalsın; üst ucunu göz bebeğinizin dış kenarından geçecek şekilde çevirin. Kaşa değdiği yer kaşın en yüksek noktasıdır.",
        "<b>Bitiş:</b> Kalemi gözünüzün dış köşesinden geçecek şekilde çevirin. Kaşa değdiği yer kaşın bitmesi gereken noktadır.",
        "Üç noktayı göz kalemiyle hafifçe işaretleyin ve iki kaşı karşılaştırın.",
      ] }],
      ["En sık yapılan hatalar", { liste: [
        "<b>Başlangıcı fazla almak:</b> Kaşlar birbirinden çok uzaklaşır, yüz daha geniş ve şaşkın görünür.",
        "<b>Kemeri fazla içeride kurmak:</b> Yüz sert ve kızgın bir ifade kazanır.",
        "<b>Kuyruğu fazla kısaltmak ya da aşağı indirmek:</b> Göz yorgun ve düşük görünür.",
        "<b>İki kaşı tek tek almak:</b> Simetri kaybolur; her adımda iki kaşa birlikte bakmak gerekir.",
      ] }],
      ["Ölçü her şey değil", [
        "Altın oran kaşın <b>nerede</b> başlayıp biteceğini söyler; ne kadar kalın, ne kadar kavisli olacağını yüz şekliniz ve zevkiniz belirler. Bu yüzden salonda önce taslak çizilir, aynada birlikte bakılır ve onayınızdan sonra kaş alınır.",
      ]],
    ],
  },
  {
    slug: "lazer-epilasyon-kac-seans", ikon: "lazer", tarih: "2026-09-28",
    hizmetler: ["lazer-epilasyon"],
    h1: "Lazer epilasyon kaç seans sürer, ne zaman başlanmalı?",
    baslik: `Lazer Epilasyon Kaç Seans Sürer? Başlama Zamanı | ${M}`,
    aciklama: "Lazer epilasyon neden birden fazla seans ister, seans sayısını neler belirler, seanslar arası ne kadar olmalı ve başlamak için en uygun mevsim hangisi?",
    kisaCevap: "Tek seans yetmez; çünkü lazer yalnızca o anda aktif büyüme evresindeki tüylere etki eder. Seans sayısı tüy rengi ve kalınlığı, bölge ve hormonal yapıya göre değişir. Güneşe en az çıkılan aylar başlamak için en rahat dönemdir.",
    bolumler: [
      ["Neden birden fazla seans?", [
        "Vücuttaki tüyler aynı anda büyümez; her biri farklı bir evrededir. Lazer ışığı tüy köküne, tüyün aktif büyüdüğü evrede en iyi etki eder. Diğer evredeki tüyler bir sonraki seansı bekler. Bu yüzden lazer, birkaç hafta arayla tekrarlanan seanslarla uygulanır.",
      ]],
      ["Seans sayısını neler belirler?", { liste: [
        "<b>Tüy rengi:</b> Koyu tüylerde etki daha belirgindir; sarı, kızıl ve beyaz tüylerde sınırlıdır.",
        "<b>Tüy kalınlığı:</b> Kalın tüyler genellikle daha hızlı yanıt verir.",
        "<b>Bölge:</b> Yüz, koltuk altı ve bacaklarda tüy döngüsü farklıdır; seans aralıkları da buna göre değişir.",
        "<b>Hormonal yapı:</b> Hormonal nedenli tüylenmede ek seanslar gerekebilir; bu durumda hekiminize de danışın.",
      ] }],
      ["Başlamak için en uygun zaman", [
        "Lazer öncesi ve sonrası bölgenin güneşten korunması gerekir; bronz ciltte uygulama riskli olabilir. Bu yüzden güneşe en az maruz kaldığınız aylarda başlamak en rahatıdır.",
        `${IL} gibi uzun kış geçiren şehirlerde bu dönem uzundur; ancak karlı günlerde güneş ışığının kardan yansıdığını unutmayın. Dünya Sağlık Örgütü'ne göre taze kar, güneşin UV ışınlarının %80'ine kadarını yansıtabilir. Yüz ve eller gibi açıkta kalan bölgelerde güneş koruyucuyu kışın da bırakmayın.`,
      ]],
      ["Seans günü kontrol listesi", { liste: [
        "Bölgeyi bir gün önce jiletle tıraş edin.",
        "Seanslar arasında ağda, cımbız ve epilatör kullanmayın.",
        "Bölgeye krem, deodorant ya da parfüm sürmeden gelin.",
        "Yeni başladığınız ilaçları, özellikle güneşe hassasiyet yapanları belirtin.",
      ] }],
    ],
  },
  {
    slug: "soguk-havada-cilt-bakimi", ikon: "cilt", tarih: "2026-09-28",
    hizmetler: ["cilt-bakimi", "manikur"],
    h1: `${IL}'ın soğuk ve kuru havasında cilt bakımı`,
    baslik: `Soğuk ve Kuru Havada Cilt Bakımı: ${IL} Rehberi | ${M}`,
    aciklama: `${IL} gibi soğuk, rüzgârlı ve yüksek rakımlı şehirlerde cilt neden kurur, kış güneşi neden önemlidir? Kışın yüz, dudak ve el bakımı için pratik öneriler.`,
    kisaCevap: "Soğuk hava, rüzgâr ve kalorifer cildin nemini hızla alır; yüksek rakım ve kar ise kış güneşini güçlendirir. Kışın temizleyiciyi yumuşatın, nemlendiriciyi zenginleştirin, dudak ve elleri ihmal etmeyin, güneş koruyucuyu kışın da kullanın.",
    bolumler: [
      [`${IL} kışı cildi neden zorlar?`, { liste: [
        "<b>Soğuk ve kuru hava:</b> Soğuk havanın taşıdığı nem azdır; cilt yüzeyinden su kaybı artar, gerginlik ve pullanma başlar.",
        "<b>Rüzgâr:</b> Açıkta kalan yüz ve ellerde kızarıklık ve çatlamayı hızlandırır.",
        "<b>Kalorifer ve soba:</b> İç mekân havasını daha da kurutur.",
        `<b>Yüksek rakım:</b> ${IL} deniz seviyesinden oldukça yüksektir. Dünya Sağlık Örgütü'ne göre her 1000 metrede UV seviyesi yaklaşık %10 artar.`,
        "<b>Kar:</b> Taze kar güneşin UV ışınlarının %80'ine kadarını yansıtabilir (Dünya Sağlık Örgütü). Kışın da güneş yanığı ve leke riski vardır.",
      ] }],
      ["Kış için yüz bakım rutini", { sirali: [
        "<b>Yumuşak temizlik:</b> Köpüren, cildi gıcırdatan temizleyiciler yerine nazik, kurutmayan bir temizleyici seçin; yüzünüzü sıcak değil ılık suyla yıkayın.",
        "<b>Nemlendirici:</b> Yazın hafif jel kullanıyorsanız kışın daha zengin bir kreme geçin; yıkadıktan hemen sonra, cilt hafif nemliyken sürün.",
        "<b>Güneş koruyucu:</b> Dışarı çıkmadan önce yüz, boyun ve kulaklara sürün; karlı günlerde atlamayın.",
        "<b>Peelingi azaltın:</b> Kuru ve hassas ciltte peeling sıklığını düşürün.",
        "<b>Evde nem:</b> Kalorifer mevsiminde odada su kabı ya da nemlendirici cihaz kuruluğu azaltabilir.",
      ] }],
      ["Dudaklar ve eller", { liste: [
        "Dudakları yalamayın; tükürük kurudukça dudağı daha çok kurutur. Dışarı çıkarken koruyucu dudak kremi sürün.",
        "Elleri her yıkamadan sonra kremleyin; tırnak etlerine tırnak yağı sürün.",
        "Soğukta eldiven takın; bulaşık ve temizlikte lastik eldiven kullanın.",
      ] }],
      ["Ne zaman salona, ne zaman hekime?", [
        "Kış kuruluğu için profesyonel cilt bakımı cildin nem dengesini toparlamanıza yardımcı olabilir. Ancak geçmeyen kaşıntı, çatlayıp kanayan bölgeler, yayılan kızarıklık ya da egzama belirtilerinde önce dermatoloğa başvurun.",
      ]],
    ],
  },
  {
    slug: "protez-tirnak-mi-kalici-oje-mi", ikon: "tirnak", tarih: "2026-09-28",
    hizmetler: ["tirnak-tasarimi", "manikur"],
    h1: "Protez tırnak mı, kalıcı oje mi?",
    baslik: `Protez Tırnak mı Kalıcı Oje mi? Farkları | ${M}`,
    aciklama: "Protez tırnak ile kalıcı oje arasındaki farklar: uzunluk, dayanıklılık, bakım ve tırnak sağlığı. Hangisinin size uygun olduğunu karşılaştırarak seçin.",
    kisaCevap: "Kendi tırnaklarınız yeterince uzun ve sağlamsa kalıcı oje çoğu zaman yeterlidir. Uzunluk, farklı bir şekil ya da kırılan tırnakları eşitlemek istiyorsanız protez tırnak daha uygundur.",
    bolumler: [
      ["Yan yana karşılaştırma", { tablo: {
        baslik: ["", "Kalıcı oje", "Protez tırnak"],
        satirlar: [
          ["Ne yapılır?", "Kendi tırnağınıza uzun süre dayanan oje", "Tırnağa uzunluk ve şekil kazandırılır"],
          ["Uzunluk", "Kendi tırnağınız kadar", "İstediğiniz uzunlukta"],
          ["Şekil", "Kendi tırnak şeklinizle sınırlı", "Kare, oval, badem ve daha fazlası"],
          ["Görünüm", "Doğal", "Doğaldan iddialıya"],
          ["Bakım", "Tırnak uzadıkça yenilenir", "Birkaç haftada bir dolum"],
        ],
      } }],
      ["Tırnak sağlığı için", { liste: [
        "Kalıcı oje ya da protez tırnağı evde koparıp sökmeyin; tırnak yüzeyi zarar görür.",
        "Uygulamalar arasında tırnak etlerini yağla besleyin.",
        "Tırnakta renk değişikliği, ağrı ya da şişlik fark ederseniz uygulamaya ara verin ve hekime danışın.",
      ] }],
    ],
  },
  {
    slug: "ipek-kirpik-bakimi", ikon: "kirpik", tarih: "2026-09-28",
    hizmetler: ["ipek-kirpik"],
    h1: "İpek kirpik bakımı: ilk 24 saat ve sonrası",
    baslik: `İpek Kirpik Bakımı: Nasıl Temizlenir? | ${M}`,
    aciklama: "İpek kirpik nasıl temizlenir, ilk 24 saat nelere dikkat edilmeli, hangi ürünler kirpiklerin ömrünü kısaltır? Uzun süre dolgun kirpikler için bakım önerileri.",
    kisaCevap: "İlk 24 saat kirpikleri ıslatmayın. Sonrasında yağsız bir temizleyiciyle nazikçe temizleyin, her sabah temiz bir fırçayla tarayın, ovmayın ve çekmeyin. Doğal kirpik döngüsü nedeniyle birkaç haftada bir dolum yaptırın.",
    bolumler: [
      ["İlk 24 saat", { liste: [
        "Kirpikleri ıslatmayın; yüzünüzü dikkatlice, göz bölgesine su değdirmeden yıkayın.",
        "Buhar, sauna, hamam ve sıcak duştan uzak durun.",
        "Göz makyajı yapmayın.",
      ] }],
      ["Günlük temizlik", { sirali: [
        "Ellerinizi yıkayın.",
        "Yağ içermeyen, göz çevresine uygun bir temizleyiciyi kirpiklere nazikçe uygulayın.",
        "Kirpikleri kökten uca doğru, ovmadan temizleyin; ılık suyla durulayın.",
        "Havluyla bastırarak kurulayın, ardından temiz bir kirpik fırçasıyla tarayın.",
      ] }],
      ["Kirpik ömrünü kısaltan alışkanlıklar", { liste: [
        "Yağ bazlı makyaj temizleyicileri ve kremleri göz çevresinde kullanmak",
        "Yüzüstü, yastığa bastırarak uyumak",
        "Kirpik kıvırıcı kullanmak",
        "Kirpiklerle oynamak, dökülmeye başlayanları çekmek",
      ] }],
      ["Dolum zamanı", [
        "Her doğal kirpik kendi döngüsüyle dökülür ve eklenen kirpik de onunla birlikte düşer. Aradaki boşluklar belirginleşmeden yapılan bakım (dolum) randevusu, kirpiklerin dolgun görünmesini sağlar. Kaşıntı, kızarıklık ya da şişlik olursa beklemeden salona haber verin; geçmezse hekime başvurun.",
      ]],
    ],
  },
];
