# Black Rose & Altın Maşa — Kars güzellik salonu sitesi

Canlı: https://nisa-celik-guzellik.vercel.app (Vercel, scope `yunus-emre-s-projects3`, proje `nisa-celik-guzellik`)

Ortaklar: Nisa Çelik ve Rabia Bektaş · Cumhuriyet Mah. İsmet İnönü Cad. No:43C Kat:4 Daire:22, Kars · 0530 970 23 74.
Kaynak: işletmenin el yazısı hizmet listesi (27.09.2026) ve WhatsApp mesajları (28.09.2026).

## Yapı
- `site.config.json`: marka, ortaklar, telefon/WhatsApp, adres, Instagram, çalışma saati, Google yorum linki, `dudakDolgusu` aç/kapa, Search Console / GA4
- `src/icerik.mjs`: 12 hizmet (5 kategori), genel SSS, süreç adımları. **Fiyat, kesin süre, marka, sertifika yazılmaz.**
- `src/rehber.mjs`: 6 rehber yazısı (karşılaştırma tabloları; sayısal iddialar yalnızca DSÖ kaynaklı)
- `build.mjs`: statik üretici → `dist/` (altın spiral, altın oran kaş şeması, kat çizimi, logo SVG'leri, `llms.txt`)
- `src/style.css`, `src/main.js`: sayfaya gömülür (randevu oluşturucu → WhatsApp, menü, görünme animasyonları)

## Komutlar
```
node build.mjs && node tools/kontrol.mjs        # derle + SEO kontrolü
node tools/serve.mjs                             # http://localhost:4176
node tools/gorsel.mjs && sh tools/gorsel.sh      # og.png + favicon/ikonlar (headless Edge + Pillow)
npx vercel deploy --prod --scope yunus-emre-s-projects3
```

## Sayfalar
`/`, `/hizmetler/`, `/hizmetler/<12 hizmet>/`, `/rehber/`, `/rehber/<6 yazı>/`, `/randevu/` (`?hizmet=<slug>` ile ön seçim), `/iletisim/`, `404`

## Bekleyenler
- Google İşletme Profili (Haritalar'da kaydı yok, 27.09.2026). Açılınca `googleHaritaLinki` ve `googleYorumLinki` doldurulacak
- Çalışma saatleri, Instagram, salon ve uygulama fotoğrafları (galeri fotoğraf gelince eklenecek)
- Dudak dolgusu: hekim tarafından yapılması gereken tıbbi işlem; sayfa bilgilendirme dilinde. Gerekirse `dudakDolgusu: false`
- Alan adı, Search Console, GA4
