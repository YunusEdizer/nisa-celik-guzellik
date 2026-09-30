// Site içeriği. Doğrulanmamış bilgi yazılmaz: fiyat, kesin süre, marka, sertifika, "en iyi" iddiası yok.
// Kaynak: işletme sahibinin el yazısı hizmet listesi (27.09.2026).
import { readFileSync } from "node:fs";

const c = JSON.parse(readFileSync(new URL("../site.config.json", import.meta.url), "utf8"));
const IL = c.il, ILDE = c.ilde, M = c.markaKisa;

export const KATEGORILER = [
  { id: "kas-kirpik", ad: "Kaş & Kirpik", no: "01", ozet: "Yüzünüzün ölçülerine göre tasarlanan kaşlar, kalkık ve dolgun görünen kirpikler." },
  { id: "cilt", ad: "Cilt & Yüz", no: "02", ozet: "Cildinizin ihtiyacına göre planlanan bakım ve yüz uygulamaları." },
  { id: "vucut", ad: "Lazer & Vücut", no: "03", ozet: "Lazer epilasyon, lenf drenaj, vakum ve EMS uygulamaları." },
  { id: "tirnak", ad: "Tırnak", no: "04", ozet: "Bakımlı eller: manikür, kalıcı oje ve tırnak tasarımı." },
  { id: "sac", ad: "Saç", no: "05", ozet: "Rengi yenilemek ya da tamamen değiştirmek için saç boyama." },
];

const HAM = [
  // ---------------------------------------------------------------- KAŞ & KİRPİK
  {
    slug: "altin-oran-kas-alimi", kat: "kas-kirpik", ikon: "kas", imza: true,
    ad: "Altın Oran Kaş Alımı",
    kisa: "Başlangıç, kemer ve bitiş noktası yüzünüzün ölçüleriyle belirlenir.",
    baslik: `Altın Oran Kaş Alımı ${IL} | ${M}`,
    aciklama: `${ILDE} altın oran kaş alımı: kaşın başlangıç, kemer ve bitiş noktası yüzünüzün kendi ölçüleriyle belirlenir. Kaşınız size özel çizilir. Randevu alın.`,
    h1: "Altın oran kaş alımı",
    giris: "Kaşınızı ezbere değil, yüzünüzün kendi ölçülerine göre şekillendiriyoruz. Başlangıç, kemer ve bitiş noktası altın oran çizgileriyle işaretlenir; taslağı onayladıktan sonra kaş alınır.",
    bolumler: [
      ["Altın oran kaş nedir?", [
        "Altın oran, yaklaşık 1,618 olan ve yüz estetiğinde sık başvurulan bir orandır. Kaş tasarımında bu oran; kaşın nerede başlayacağını, en yüksek noktasının (kemer) nerede olacağını ve nerede biteceğini bulmak için kullanılır.",
        "Ölçü herkeste farklı çıkar; çünkü çizgiler sizin burun kanadınızdan, göz bebeğinizden ve göz köşelerinizden geçer. Bu yüzden altın oran kaş, herkese aynı kalıbı uygulamak değil, yüzünüze ait bir kaş çizmektir.",
      ]],
      ["Üç çizgi, üç nokta", { liste: [
        "<b>Başlangıç:</b> Burun kanadından gözün iç köşesine uzanan çizginin kaşa değdiği yer.",
        "<b>Kemer:</b> Burun kanadından göz bebeğinin dış kenarına uzanan çizgi; kaşın en yüksek noktası.",
        "<b>Bitiş:</b> Burun kanadından gözün dış köşesine uzanan çizginin kaşla kesiştiği yer.",
      ] }],
      ["Uygulama nasıl ilerler?", { sirali: [
        "Kaş yapınızı, kıl yoğunluğunu ve nasıl bir kaş istediğinizi konuşuruz.",
        "Yüzünüz üzerinde üç nokta ölçülür ve kaş taslağı çizilir.",
        "Taslağı aynada birlikte değerlendirir, kalınlık ve kemer için son kararı siz verirsiniz.",
        "Taslak dışında kalan kıllar alınır, kaş düzenlenir.",
      ] }],
      ["Sonrasında", [
        "Hafif kızarıklık olabilir, genellikle kısa sürede geçer. İlk gün kaş bölgesine yoğun makyaj, sauna ve buhar uygulamamanızı öneririz.",
      ]],
    ],
    sss: [
      ["Kalın kaş istiyorum, altın oran buna uyar mı?", "Evet. Altın oran kaşın nerede başlayıp biteceğini ve kemerin yerini gösterir; kalınlık tamamen tercihinize göre ayarlanır."],
      ["Ne sıklıkla düzeltme yaptırmalıyım?", "Kılların uzama hızına bağlıdır. Çoğu kişide birkaç haftada bir yapılan düzeltme, çizilen formu korumaya yeter."],
      ["Seyrek kaşlarda da uygulanır mı?", "Evet. Ölçüm sonrası boşluklar ve kaşın uzatılması gereken yerler görülür; taslağı buna göre birlikte planlarız."],
    ],
  },
  {
    slug: "kas-lifting", kat: "kas-kirpik", ikon: "kasLift",
    ad: "Kaş Lifting",
    kisa: "Kaş kılları yukarı doğru, düzenli ve dolgun görünecek şekilde sabitlenir.",
    baslik: `Kaş Lifting (Kaş Laminasyonu) ${IL} | ${M}`,
    aciklama: `${ILDE} kaş lifting: kaş kılları yukarı doğru taranıp sabitlenir; kaşlar daha dolgun, düzenli ve bakımlı görünür. Uygulama ve bakım bilgisi, randevu.`,
    h1: "Kaş lifting",
    giris: "Kaş lifting (kaş laminasyonu), kaş kıllarını yukarı ve istenen yöne doğru sabitleyen bir uygulamadır. Kaşlar daha dolgun, düzenli ve taranmış görünür; her sabah jel ile uğraşmanıza gerek kalmaz.",
    bolumler: [
      ["Kimlere uygun?", { liste: [
        "Kılları aşağı ya da farklı yönlere doğru uzayan kaşlar",
        "Seyrek görünen ama kıl sayısı yeterli olan kaşlar",
        "Sabah kaş jeli ve şekillendirmeyle vakit kaybetmek istemeyenler",
      ] }],
      ["Uygulama nasıl ilerler?", { sirali: [
        "Kaş temizlenir, istenen form belirlenir.",
        "Kıllar yumuşatıcı solüsyonla istenen yöne taranır.",
        "Sabitleyici uygulanır, ardından kaşlar besleyici bakımla tamamlanır.",
        "İsterseniz aynı seansta kaş alımı ile form netleştirilir.",
      ] }],
      ["Sonrasında", [
        "İlk 24 saat kaşlarınızı ıslatmamanızı, buhar, sauna ve yoğun makyajdan uzak durmanızı öneririz. Etkisi kıl yapısına göre değişmekle birlikte genellikle birkaç hafta sürer.",
      ]],
    ],
    sss: [
      ["Kaş lifting kaşa zarar verir mi?", "Doğru süre ve ürünle uygulandığında kıllara kalıcı bir zarar vermesi beklenmez. Uygulama sonrası kaş serumu ya da besleyici yağ kılların bakımına yardımcı olur."],
      ["Aynı gün kaş alımı yapılabilir mi?", "Evet, genellikle lifting ile birlikte kaş alımı da yapılır; böylece kaşın formu tamamlanır."],
      ["Hassas cildim var, yaptırabilir miyim?", "Kaş bölgesinde tahriş, yara ya da bilinen bir alerjiniz varsa randevu öncesi mutlaka belirtin; gerekirse önce küçük bir alanda deneme yapılır."],
    ],
  },
  {
    slug: "kirpik-lifting", kat: "kas-kirpik", ikon: "kirpikLift",
    ad: "Kirpik Lifting",
    kisa: "Kendi kirpiklerinize ekleme yapmadan kıvrım ve kalkıklık kazandırır.",
    baslik: `Kirpik Lifting ${IL} | ${M}`,
    aciklama: `${ILDE} kirpik lifting: kendi kirpiklerinize ekleme yapmadan kıvrım ve kalkıklık kazandırılır; gözler daha açık görünür. Uygulama, bakım ve randevu.`,
    h1: "Kirpik lifting",
    giris: "Kirpik lifting, kendi kirpiklerinizi kökten itibaren yukarı doğru kıvıran bir uygulamadır. Ekleme yapılmaz; kirpikler daha uzun ve kalkık, gözler daha açık görünür.",
    bolumler: [
      ["Kimlere uygun?", { liste: [
        "Düz ya da aşağı doğru uzayan kirpikler",
        "Her gün kirpik kıvırıcı ve rimel kullanmaktan yorulanlar",
        "İpek kirpik yerine daha doğal bir sonuç isteyenler",
      ] }],
      ["Uygulama nasıl ilerler?", { sirali: [
        "Göz çevresi temizlenir, alt kirpikler korunur.",
        "Göz kapağınıza uygun boyda silikon kalıp seçilir, kirpikler kalıba yatırılır.",
        "Kıvrım veren ve sabitleyen solüsyonlar sırayla uygulanır.",
        "İsterseniz kirpikler boyanır ve besleyici bakımla bitirilir.",
      ] }],
      ["Sonrasında", [
        "İlk 24 saat kirpiklerinizi ıslatmamanızı, buhar ve sauna ile rimelden uzak durmanızı öneririz. Kirpikler doğal döngüsüyle yenilendikçe etki azalır; genellikle birkaç hafta sürer.",
      ]],
    ],
    sss: [
      ["Kirpik lifting mi, ipek kirpik mi?", "Kirpik lifting kendi kirpiklerinizle doğal bir sonuç verir, bakım gerektirmez. İpek kirpik ise ekleme olduğu için daha yoğun ve uzun görünür ama düzenli bakım ister."],
      ["Lens kullanıyorum, sorun olur mu?", "Uygulama sırasında gözler kapalı kalacağı için lensinizi randevudan önce çıkarmanız yeterli."],
      ["Rimel kullanabilir miyim?", "İlk 24 saatten sonra kullanabilirsiniz. Birçok kişi kirpikler zaten kalkık göründüğü için rimele ihtiyaç duymaz."],
    ],
  },
  {
    slug: "ipek-kirpik", kat: "kas-kirpik", ikon: "kirpik",
    ad: "İpek Kirpik",
    kisa: "Doğal kirpiklerinize tek tek eklenen kirpiklerle daha yoğun bakışlar.",
    baslik: `İpek Kirpik ${IL} | ${M}`,
    aciklama: `${ILDE} ipek kirpik: doğal kirpiklerinize tek tek eklenen kirpiklerle daha uzun ve yoğun bakışlar. Doğal ya da hacimli görünüm, bakım ve randevu.`,
    h1: "İpek kirpik",
    giris: "İpek kirpik, her bir doğal kirpiğinize ince ve hafif sentetik kirpiklerin tek tek yapıştırılmasıdır. Rimelsiz, sabah uyandığınız andan itibaren uzun ve yoğun görünen kirpikler sağlar.",
    bolumler: [
      ["Hangi görünümü istersiniz?", { liste: [
        "<b>Doğal:</b> Kendi kirpiklerinize yakın uzunluk ve yoğunluk; günlük kullanım için.",
        "<b>Belirgin:</b> Daha uzun ve kıvrık; makyajlı görünüm.",
        "<b>Hacimli:</b> Daha yoğun ve dolgun; özel günler ya da daha iddialı bir bakış için.",
      ] }],
      ["Uygulama nasıl ilerler?", { sirali: [
        "Göz şeklinize ve kendi kirpiklerinizin gücüne göre uzunluk ve kıvrım seçilir.",
        "Alt kirpikler korunur, üst kirpikler temizlenir.",
        "Kirpikler tek tek, doğal kirpiğe değecek ama göz kapağına değmeyecek şekilde eklenir.",
      ] }],
      ["Bakım", { liste: [
        "İlk 24 saat kirpikleri ıslatmayın; buhar ve saunadan uzak durun.",
        "Yağ içeren makyaj temizleyicileri yapıştırıcıyı zayıflatabilir; yağsız ürün kullanın.",
        "Kirpikleri ovmayın, çekmeyin; sabahları temiz bir fırçayla tarayın.",
        "Doğal kirpik döngüsü nedeniyle eksilen kirpikler için birkaç haftada bir bakım (dolum) randevusu önerilir.",
      ] }],
    ],
    sss: [
      ["İpek kirpik kendi kirpiklerime zarar verir mi?", "Doğru uzunluk ve ağırlık seçildiğinde ve kirpikler tek tek uygulandığında doğal kirpiklere zarar vermesi beklenmez. Kendiniz koparmamanız ve düzenli bakım önemlidir."],
      ["Ne kadar dayanır?", "Kirpikler doğal döngüsüyle döküldükçe eklenenler de dökülür. Bu yüzden birkaç haftada bir yapılan bakımla yoğunluk korunur."],
      ["Çıkarmak istersem ne yapmalıyım?", "Kendiniz çekmeyin; özel bir çözücüyle salonda güvenle çıkarılır."],
    ],
  },

  // ---------------------------------------------------------------- CİLT & YÜZ
  {
    slug: "cilt-bakimi", kat: "cilt", ikon: "cilt",
    ad: "Cilt Bakımı",
    kisa: "Cildinizin tipine ve ihtiyacına göre planlanan derinlemesine bakım.",
    baslik: `Cilt Bakımı ${IL} | ${M}`,
    aciklama: `${ILDE} cilt bakımı: cilt tipinize göre temizlik, peeling, maske ve nem bakımı. Kuruluk, yağlanma ve mat görünüm için size özel bakım. Randevu alın.`,
    h1: "Cilt bakımı",
    giris: "Her cildin ihtiyacı farklıdır. Bakıma cildinizi tanıyarak başlıyor; temizlik, arındırma, maske ve nem adımlarını cilt tipinize göre seçiyoruz.",
    bolumler: [
      ["Bakım adımları", { sirali: [
        "<b>Cilt analizi:</b> Cilt tipiniz, hassasiyetiniz ve kullandığınız ürünler konuşulur.",
        "<b>Temizlik:</b> Makyaj ve kir kalıntıları temizlenir.",
        "<b>Peeling:</b> Ölü hücreler cildinize uygun yöntemle arındırılır.",
        "<b>Arındırma:</b> Gerekirse siyah nokta ve tıkanan gözenekler temizlenir.",
        "<b>Maske ve masaj:</b> Cildin ihtiyacına göre seçilen maske ve rahatlatıcı yüz masajı.",
        "<b>Nem ve koruma:</b> Nemlendirici ve gündüzse güneş koruyucu ile bitirilir.",
      ] }],
      ["Kimler için?", { liste: [
        "Yağlanma, siyah nokta ve gözenek görünümünden şikâyet edenler",
        "Kuruluk, gerginlik ve mat görünüm yaşayanlar",
        "Özel bir gün öncesi cildini hazırlamak isteyenler",
        "Düzenli bakımla cildini korumak isteyen herkes",
      ] }],
      ["Önemli not", [
        "Cilt bakımı bir güzellik uygulamasıdır, tıbbi tedavinin yerini tutmaz. Aktif akne tedavisi görüyorsanız, reçeteli ürün kullanıyorsanız ya da cildinizde tanısı konmamış bir değişiklik varsa önce dermatoloğunuza danışın ve randevuda bunu mutlaka belirtin.",
      ]],
    ],
    sss: [
      ["Cilt bakımı ne sıklıkla yapılmalı?", "Cildin yenilenme döngüsü nedeniyle çoğu kişi için ayda bir bakım uygun bir ritimdir. Cildinizin durumuna göre farklı bir plan önerebiliriz."],
      ["Bakımdan sonra makyaj yapabilir miyim?", "Gözenekler açık olduğu için bakımdan sonraki ilk gün makyaj yapmamanızı öneririz."],
      ["Yüzüm kızarır mı?", "Arındırma yapılan bölgelerde hafif kızarıklık olabilir; genellikle aynı gün içinde geçer."],
    ],
  },
  {
    slug: "dudak-dolgusu", kat: "cilt", ikon: "dudak", tibbi: true,
    ad: "Dudak Dolgusu",
    kisa: "Dudaklara hacim ve belirginlik kazandıran enjeksiyon uygulaması.",
    baslik: `Dudak Dolgusu ${IL} | ${M}`,
    aciklama: `${ILDE} dudak dolgusu: dudaklara hacim ve belirginlik kazandıran enjeksiyon uygulaması. Bilmeniz gerekenler, uygulama sonrası ve randevu bilgisi.`,
    h1: "Dudak dolgusu",
    giris: "Dudak dolgusu, dudaklara hacim, belirginlik ve simetri kazandırmak için yapılan bir enjeksiyon uygulamasıdır. Doğal bir sonuç için hacim, dudak ve yüz oranlarına göre planlanır.",
    bolumler: [
      ["Bilmeniz gerekenler", [
        "Dudak dolgusunda genellikle vücutta doğal olarak bulunan hiyalüronik asit içerikli ürünler kullanılır. Etkisi zamanla vücut tarafından emilerek azalır; kalıcılığı kişiye ve ürüne göre değişir.",
        "Dolgu, Türkiye'de <b>hekim tarafından uygulanması gereken tıbbi bir işlemdir</b>. Uygulamanın kim tarafından, hangi ürünle yapılacağını randevu öncesinde mutlaka sorun ve ürünün orijinal ambalajını görmek isteyin.",
      ]],
      ["Kimler yaptırmamalı?", { liste: [
        "Hamile ya da emziren kişiler",
        "Dudak bölgesinde aktif uçuk, enfeksiyon ya da yara olanlar",
        "Kan sulandırıcı ilaç kullananlar (hekimine danışmadan)",
        "Daha önce dolgu ürünlerine alerjik reaksiyon yaşamış olanlar",
      ] }],
      ["Sonrasında", [
        "İlk günlerde şişlik, hassasiyet ve küçük morluklar olabilir. İlk gün sıcak içecek, sauna ve yoğun spordan kaçınılması önerilir. Geçmeyen ağrı, renk değişikliği ya da artan şişlikte vakit kaybetmeden hekime başvurun.",
      ]],
    ],
    sss: [
      ["Dudak dolgusu kalıcı mı?", "Hiyalüronik asit dolgular kalıcı değildir; zamanla emilir. Ne kadar süreceği kullanılan ürüne ve kişiye göre değişir."],
      ["Doğal görünür mü?", "Hacim miktarı ve uygulama tekniği doğal görünümü belirler. Görüşmede ne kadar değişiklik istediğinizi açıkça konuşmanız önemlidir."],
      ["Uygulama acıtır mı?", "Uygulama öncesi genellikle uyuşturucu krem kullanılır; çoğu kişi hafif bir batma hissi tarif eder."],
    ],
  },

  // ---------------------------------------------------------------- LAZER & VÜCUT
  {
    slug: "lazer-epilasyon", kat: "vucut", ikon: "lazer",
    ad: "Lazer Epilasyon",
    kisa: "İstenmeyen tüylerden, seanslar ilerledikçe kalıcıya yakın kurtulun.",
    baslik: `Lazer Epilasyon ${IL} | ${M}`,
    aciklama: `${ILDE} lazer epilasyon: seanslar ilerledikçe istenmeyen tüylerde belirgin azalma. Seans aralığı, öncesi ve sonrası dikkat edilecekler, randevu.`,
    h1: "Lazer epilasyon",
    giris: "Lazer epilasyon, ışık enerjisiyle tüy köklerini hedefleyerek istenmeyen tüylerin yeniden çıkmasını azaltan bir uygulamadır. Tüyler farklı büyüme evrelerinde olduğu için sonuç, aralıklı seanslarla elde edilir.",
    bolumler: [
      ["Nasıl çalışır?", [
        "Lazer ışığı tüydeki renk pigmentine (melanin) emilir ve tüy kökünü ısıtır. Yalnızca aktif büyüme evresindeki tüyler etkilendiği için birkaç hafta arayla tekrarlanan seanslar gerekir.",
        "Koyu renkli ve kalın tüylerde etki daha belirgindir. Sarı, kızıl, beyaz ya da çok ince tüylerde lazerin etkisi sınırlı olabilir; bunu ilk görüşmede birlikte değerlendiririz.",
      ]],
      ["Seans öncesi", { liste: [
        "Uygulama bölgesini seanstan bir gün önce jiletle tıraş edin.",
        "Seanslar arasında ağda, cımbız ve epilatör kullanmayın; tüy kökü yerinde kalmalı.",
        "Seans öncesinde yoğun güneşlenmeyin, bronzlaştırıcı ürün kullanmayın.",
        "Kullandığınız ilaçları (özellikle güneşe hassasiyet yapanları) mutlaka belirtin.",
      ] }],
      ["Seans sonrası", { liste: [
        "Hafif kızarıklık ve sıcaklık hissi kısa sürede geçer.",
        "İlk gün sıcak duş, sauna, hamam ve yoğun spordan kaçının.",
        "Uygulama bölgesini güneşten koruyun, yüksek faktörlü güneş kremi kullanın.",
      ] }],
    ],
    sss: [
      ["Kaç seans gerekir?", "Tüy yoğunluğuna, rengine, bölgeye ve hormonal yapıya göre değişir. İlk görüşmede size uygun bir seans planı konuşulur."],
      ["Acıtır mı?", "Çoğu kişi lastik şaklaması gibi kısa bir batma hissi tarif eder. Hassas bölgelerde his daha belirgin olabilir."],
      ["Yazın yaptırılabilir mi?", "Bölgeyi güneşten koruyabiliyorsanız yaptırılabilir. Yoğun güneşlendiğiniz dönemlerde seansları ertelemek daha doğrudur."],
    ],
  },
  {
    slug: "lenf-drenaj", kat: "vucut", ikon: "drenaj",
    ad: "Lenf Drenaj",
    kisa: "Hafif ve ritmik masajla ödem ve şişkinlik hissine destek.",
    baslik: `Lenf Drenaj Masajı ${IL} | ${M}`,
    aciklama: `${ILDE} lenf drenaj masajı: hafif, ritmik hareketlerle ödem ve şişkinlik hissine destek, rahatlama. Kimler için uygun, kimler yaptırmamalı, randevu.`,
    h1: "Lenf drenaj",
    giris: "Lenf drenaj, cilt yüzeyine yakın ilerleyen lenf akışını desteklemek için yapılan hafif, ritmik ve yavaş bir masaj tekniğidir. Özellikle ödem ve şişkinlik hissi yaşayanlar tarafından tercih edilir.",
    bolumler: [
      ["Kimler tercih ediyor?", { liste: [
        "Bacaklarda ağırlık ve şişkinlik hissi yaşayanlar",
        "Uzun süre ayakta kalan ya da oturarak çalışanlar",
        "Yüzde sabah şişkinliği yaşayanlar",
        "Rahatlamak ve dinlenmek isteyenler",
      ] }],
      ["Uygulama", [
        "Klasik masajdan farklı olarak baskı hafiftir; hareketler lenf akış yönünde, yavaş ve ritmik yapılır. Seans boyunca rahat bir pozisyonda uzanırsınız. Seans sonrası bol su içmeniz önerilir.",
      ]],
      ["Kimler yaptırmamalı?", [
        "Kalp yetmezliği, akut enfeksiyon ya da ateş, derin ven trombozu (pıhtı) şüphesi, aktif kanser tedavisi ve böbrek yetmezliği gibi durumlarda lenf drenaj yapılmaz ya da mutlaka hekim onayı gerekir. Hamileyseniz önce doktorunuza danışın. Sağlık durumunuzu randevuda mutlaka belirtin.",
      ]],
    ],
    sss: [
      ["Lenf drenaj zayıflatır mı?", "Hayır, lenf drenaj bir zayıflama yöntemi değildir; yağ yakmaz. Ödem ve şişkinlik hissini azaltmaya ve rahatlamaya yardımcı olabilir."],
      ["Kaç seans yapılmalı?", "İhtiyaca göre değişir. Düzenli ve aralıklı seanslar genellikle tek seanstan daha belirgin bir rahatlama sağlar."],
      ["Klasik masajdan farkı ne?", "Baskı çok daha hafiftir ve amaç kasları gevşetmekten çok lenf akışını desteklemektir."],
    ],
  },
  {
    slug: "vakum-ems", kat: "vucut", ikon: "ems",
    ad: "Vakum ve EMS",
    kisa: "Cihaz destekli masaj ve kas uyarımıyla sıkılaşma ve bölgesel bakım.",
    baslik: `Vakum ve EMS Uygulamaları ${IL} | ${M}`,
    aciklama: `${ILDE} vakum ve EMS: cihaz destekli vakum masajı ve elektriksel kas uyarımı ile bölgesel bakım. Nasıl çalışır, kimler için uygun değil, randevu.`,
    h1: "Vakum ve EMS uygulamaları",
    giris: "Vakum ve EMS, bölgesel vücut bakımında kullanılan iki cihaz destekli uygulamadır. Beslenme ve hareketle birlikte, sıkılaşma ve daha pürüzsüz bir görünüm hedefinize destek olur.",
    bolumler: [
      ["Vakum uygulaması", [
        "Vakum başlığı cildi hafifçe emerek yukarı kaldırır ve bölge üzerinde masaj hareketleriyle gezdirilir. Kan dolaşımını hareketlendirmeye ve portakal kabuğu görünümünü yumuşatmaya yardımcı olması amaçlanır.",
      ]],
      ["EMS uygulaması", [
        "EMS (elektriksel kas stimülasyonu), cilde yerleştirilen pedler aracılığıyla kaslara düşük yoğunlukta elektrik uyarıları göndererek kasılma sağlar. Kas tonusunu ve sıkılık hissini desteklemek için kullanılır.",
      ]],
      ["Gerçekçi beklenti", [
        "Vakum ve EMS tek başına kilo verdirmez ve yağ yakmaz. En iyi sonuç; düzenli seanslar, dengeli beslenme ve hareketle birlikte alınır. İlk görüşmede hedefinizi ve size uygun planı konuşuruz.",
      ]],
      ["Kimler yaptırmamalı?", { liste: [
        "Kalp pili ya da vücutta elektronik implantı olanlar (EMS)",
        "Hamileler",
        "Epilepsi, kalp rahatsızlığı ya da ciddi dolaşım bozukluğu olanlar",
        "Uygulama bölgesinde yara, enfeksiyon, varis ya da metal implant bulunanlar",
      ] }],
    ],
    sss: [
      ["Vakum ve EMS aynı seansta yapılabilir mi?", "Evet, bölgeye ve hedefinize göre iki uygulama aynı seansta birleştirilebilir."],
      ["Ağrı olur mu?", "Vakumda çekilme, EMS'de kasılma hissi olur; yoğunluk size göre ayarlanır, ağrı vermemelidir."],
      ["Ne zaman sonuç görürüm?", "Kişiden kişiye değişir. Tek seansla değil, düzenli seanslar ve yaşam tarzıyla birlikte değerlendirilmelidir."],
    ],
  },

  // ---------------------------------------------------------------- TIRNAK
  {
    slug: "tirnak-tasarimi", kat: "tirnak", ikon: "tirnak",
    ad: "Tırnak Tasarımı",
    kisa: "Protez tırnak, kalıcı oje ve size özel tırnak tasarımları.",
    baslik: `Tırnak Tasarımı ve Protez Tırnak ${IL} | ${M}`,
    aciklama: `${ILDE} tırnak tasarımı: protez tırnak, kalıcı oje ve size özel desenler. Uzun süre bakımlı görünen tırnaklar için bakım önerileri ve randevu.`,
    h1: "Tırnak tasarımı",
    giris: "Kısa ve sade ya da uzun ve iddialı; tırnaklarınızı elinize, tarzınıza ve günlük hayatınıza uygun şekilde tasarlıyoruz.",
    bolumler: [
      ["Uygulamalar", { liste: [
        "<b>Protez tırnak:</b> Kendi tırnağınızın üzerine uzunluk ve şekil kazandıran uygulama.",
        "<b>Kalıcı oje:</b> Uzun süre parlak kalan, çabuk kırılmayan oje.",
        "<b>Tırnak süsleme:</b> Fransız, ombre, desen ve taş gibi size özel tasarımlar.",
      ] }],
      ["Bakım önerileri", { liste: [
        "Bulaşık ve temizlik yaparken eldiven kullanın.",
        "Tırnaklarınızı açacak, kazıyacak gibi kullanmayın.",
        "Tırnak etlerinizi her gün tırnak yağıyla nemlendirin.",
        "Kalkan ya da kırılan tırnağı kendiniz çıkarmayın; salonda düzeltilsin.",
      ] }],
    ],
    sss: [
      ["Protez tırnak kendi tırnağıma zarar verir mi?", "Doğru uygulanıp doğru çıkarıldığında kalıcı bir zarar beklenmez. Zararın en sık nedeni tırnağın evde koparılarak çıkarılmasıdır."],
      ["Ne sıklıkla bakım gerekir?", "Tırnak uzadıkça dip kısımda boşluk oluşur; genellikle birkaç haftada bir bakım randevusu önerilir."],
      ["Tasarım fikrimi getirebilir miyim?", "Elbette. Beğendiğiniz görseli randevu mesajınıza eklemeniz yeterli."],
    ],
  },
  {
    slug: "manikur", kat: "tirnak", ikon: "manikur",
    ad: "Manikür",
    kisa: "Tırnak şekillendirme, kütikül bakımı ve bakımlı eller.",
    baslik: `Manikür ${IL} | ${M}`,
    aciklama: `${ILDE} manikür: tırnak şekillendirme, kütikül (tırnak eti) bakımı, el bakımı ve oje. Bakımlı eller için düzenli manikür randevusu oluşturun.`,
    h1: "Manikür",
    giris: "Manikür, tırnaklarınızın ve ellerinizin bakımıdır: tırnaklar şekillendirilir, tırnak etleri düzenlenir, eller nemlendirilir ve isterseniz ojeyle tamamlanır.",
    bolumler: [
      ["Manikür adımları", { sirali: [
        "Tırnaklar kısaltılır ve istediğiniz forma (kare, oval, badem) getirilir.",
        "Tırnak etleri yumuşatılır ve düzenlenir.",
        "Tırnak yüzeyi temizlenir, eller nemlendirilir.",
        "İsterseniz klasik ya da kalıcı ojeyle tamamlanır.",
      ] }],
      ["Neden düzenli manikür?", [
        "Düzenli bakım, tırnak etlerinin kurumasını ve çatlamasını azaltır, tırnakların daha sağlıklı uzamasına yardımcı olur. Özellikle kuru ve soğuk havalarda eller daha çabuk yıpranır.",
      ]],
    ],
    sss: [
      ["Manikürle birlikte kalıcı oje yapılır mı?", "Evet, manikürün ardından kalıcı oje sürülebilir; oje tırnağa daha iyi tutunur."],
      ["Tırnak etlerim çok kuru, ne yapmalıyım?", "Manikür sonrası her gün tırnak yağı ve el kremi kullanmak farkı hızla gösterir."],
      ["Ne sıklıkla yaptırmalıyım?", "Tırnaklarınızın uzama hızına göre değişir; çoğu kişi birkaç haftada bir yaptırır."],
    ],
  },

  // ---------------------------------------------------------------- SAÇ
  {
    slug: "sac-boyama", kat: "sac", ikon: "sac",
    ad: "Saç Boyama",
    kisa: "Dip boya, renk yenileme ya da tamamen yeni bir renk.",
    baslik: `Saç Boyama ${IL} | ${M}`,
    aciklama: `${ILDE} saç boyama: dip boya, renk yenileme ve renk değişimi. Tenize uygun renk seçimi, boya öncesi alerji testi ve boyalı saç bakımı. Randevu alın.`,
    h1: "Saç boyama",
    giris: "Beyazları kapatmak, rengi canlandırmak ya da tamamen yeni bir renge geçmek: saç boyamaya ten renginize ve saçınızın mevcut durumuna bakarak başlıyoruz.",
    bolumler: [
      ["Uygulamalar", { liste: [
        "<b>Dip boya:</b> Uzayan diplerin mevcut renge eşitlenmesi.",
        "<b>Tüm saç boyama:</b> Rengin yenilenmesi ya da değiştirilmesi.",
        "<b>Renk canlandırma:</b> Solan rengin tazelenmesi.",
      ] }],
      ["Boya öncesi", { liste: [
        "Saç boyasına daha önce alerjik reaksiyon yaşadıysanız mutlaka belirtin.",
        "İlk kez boya yaptıracaksanız ya da marka değişiyorsa, boyadan önce küçük bir bölgede alerji testi yapılması önerilir.",
        "Kına ya da evde uygulanan boyalar sonucu etkiler; son işlemlerinizi randevuda anlatın.",
      ] }],
      ["Boyalı saç bakımı", [
        "Rengin daha uzun süre canlı kalması için boyalı saçlara uygun, sülfatsız şampuan kullanın; saçınızı çok sıcak suyla yıkamayın ve ısıyla şekillendirmeden önce ısı koruyucu kullanın.",
      ]],
    ],
    sss: [
      ["Koyu saçtan açık renge geçilebilir mi?", "Geçilebilir ancak saçın yıpranmaması için çoğu zaman birden fazla seans gerekir. Saçınızın durumuna bakarak birlikte planlarız."],
      ["Hamilelikte saç boyatılır mı?", "Bu konuda karar vermeden önce doktorunuza danışmanızı öneririz."],
      ["Boya ne kadar sürede solar?", "Renge, saçın yapısına ve bakım alışkanlıklarına göre değişir. Doğru şampuan ve bakım rengin ömrünü uzatır."],
    ],
  },
];

export const HIZMETLER = HAM.filter((h) => c.dudakDolgusu || h.slug !== "dudak-dolgusu");

export const SSS_GENEL = [
  ["Nasıl randevu alabilirim?", "Randevu sayfasında istediğiniz hizmetleri, günü ve saat aralığını seçin; mesajınız WhatsApp'ta hazır olarak açılır. Göndermeniz yeterli, size uygun saati onaylarız."],
  ["Aynı gün birden fazla işlem yaptırabilir miyim?", "Evet. Randevu oluştururken birden fazla hizmet seçebilirsiniz; süreyi buna göre planlarız. Örneğin kaş alımı ile kirpik lifting sık birlikte yapılır."],
  ["Fiyatları nereden öğrenebilirim?", "Fiyat; işleme, bölgeye ve seçtiğiniz uygulamaya göre değişir. WhatsApp'tan yazdığınızda güncel fiyatı hemen iletiriz."],
  ["Randevumu değiştirebilir ya da iptal edebilir miyim?", "Evet, randevu aldığınız WhatsApp konuşmasından yazmanız yeterli. Zamanı başka birine verebilmemiz için değişikliği mümkün olduğunca erken bildirmenizi rica ederiz."],
  ["Hassas cildim ya da alerjim var, ne yapmalıyım?", "Randevu mesajınızda ve uygulama öncesinde mutlaka belirtin. Gerekirse işlemden önce küçük bir alanda deneme yapılır ya da size uygun başka bir uygulama önerilir."],
];

// Ana sayfadaki "süreç" adımları
export const SUREC = [
  ["Randevunuzu oluşturun", "Hizmetleri, günü ve saat aralığını seçin; WhatsApp mesajınız hazır."],
  ["Birlikte planlayalım", "Beklentinizi, cilt ve yüz yapınızı konuşur, size uygun uygulamayı seçeriz."],
  ["Uygulama", "Size ayrılan zamanda, acele etmeden ve her adımı anlatarak uygularız."],
  ["Sonrası", "Evde neye dikkat edeceğinizi ve bir sonraki bakımın zamanını söyleriz."],
];
