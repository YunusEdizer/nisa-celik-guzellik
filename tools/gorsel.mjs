// OG görseli ve ikonlar için HTML şablonları üretir (dist/index.html'deki spiral çizimini kullanır).
// Kullanım: node build.mjs && node tools/gorsel.mjs && sh tools/gorsel.sh
import { readFileSync, writeFileSync } from "node:fs";
const c = JSON.parse(readFileSync("site.config.json", "utf8"));
const h = readFileSync("dist/index.html", "utf8");
const spiral = h.match(/<path class="k-spiral" d="([^"]+)"/)[1];
const kareler = h.match(/<g class="k-kare"[^>]*>(.*?)<\/g>/)[1];
const logo = readFileSync("public/favicon.svg", "utf8");
const font = `@font-face{font-family:C;src:url(../public/font/cormorant-latin.woff2)}@font-face{font-family:C;src:url(../public/font/cormorant-latin-ext.woff2);unicode-range:U+0100-02BA}
@font-face{font-family:C;font-style:italic;src:url(../public/font/cormorant-italic-latin.woff2)}@font-face{font-family:C;font-style:italic;src:url(../public/font/cormorant-italic-latin-ext.woff2);unicode-range:U+0100-02BA}
@font-face{font-family:M;src:url(../public/font/manrope-latin.woff2);font-weight:300 800}@font-face{font-family:M;src:url(../public/font/manrope-latin-ext.woff2);font-weight:300 800;unicode-range:U+0100-02BA}`;

writeFileSync("tools/og.html", `<!doctype html><html><head><meta charset="utf-8"><style>${font}
html,body{margin:0}body{width:1200px;height:630px;position:relative;overflow:hidden;font-family:M,sans-serif;background:radial-gradient(700px 500px at 82% 55%,rgba(183,110,121,.35),transparent 65%),radial-gradient(500px 300px at 0 100%,rgba(201,164,92,.12),transparent 70%),#141011;color:#d6c9c8}
.l{position:absolute;left:72px;top:60px;display:flex;align-items:center;gap:16px}.l svg{width:60px;height:60px}.l b{display:block;font-family:C;font-weight:500;color:#fff;font-size:36px;line-height:1;letter-spacing:.03em}.l small{display:block;color:#e2c68c;font-size:13px;letter-spacing:.26em;font-weight:700;margin-top:6px}
h1{position:absolute;left:72px;top:170px;margin:0;font-family:C;font-weight:500;color:#fff;font-size:84px;line-height:1;letter-spacing:-.01em}h1 em{color:#e2c68c}
.s{position:absolute;left:74px;top:452px;font-size:22px;letter-spacing:.04em;color:#cdbfbf}
.t{position:absolute;left:72px;bottom:62px;display:flex;align-items:center;gap:14px;font-size:26px;font-weight:700;color:#fff}.t i{display:inline-block;padding:10px 22px;border-radius:999px;background:linear-gradient(135deg,#ecd49f,#c9a45c 55%,#b08a45);color:#1a1210;font-style:normal;font-size:20px}
.k{position:absolute;right:80px;top:56px;width:340px;height:520px;border-radius:999px 999px 24px 24px;overflow:hidden;border:1px solid rgba(226,198,140,.4);background:linear-gradient(180deg,#2a1d20,#161112);box-shadow:inset 0 0 0 9px rgba(20,16,17,.6),inset 0 0 0 10px rgba(226,198,140,.18)}
.k svg{width:100%;height:100%}.k span{position:absolute;left:0;right:0;bottom:30px;text-align:center;font-family:C;font-style:italic;font-size:28px;color:#e2c68c}
</style></head><body>
<div class="l">${logo}<span><b>${c.markaKisa}</b><small>&amp; ${c.markaAlt.toLocaleUpperCase("tr")}</small></span></div>
<h1>Güzelliğinize<br><em>altın oran</em><br>dokunuşu</h1>
<div class="s">Kaş · Kirpik · Cilt bakımı · Lazer · Tırnak · Saç</div>
<div class="t"><i>${c.il}</i>Randevu: ${c.telefonGorunen}</div>
<div class="k"><svg viewBox="0 0 440 600" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="p" cx="62%" cy="58%" r="60%"><stop offset="0" stop-color="#b76e79" stop-opacity=".55"/><stop offset=".55" stop-color="#5b2a33" stop-opacity=".35"/><stop offset="1" stop-color="#141011" stop-opacity="0"/></radialGradient><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1dcaa"/><stop offset=".5" stop-color="#c9a45c"/><stop offset="1" stop-color="#8e6a2e"/></linearGradient></defs><rect width="440" height="600" fill="url(#p)"/><g fill="none" stroke="#c9a45c" stroke-opacity=".28">${kareler}</g><path d="${spiral}" fill="none" stroke="url(#a)" stroke-width="2.4" stroke-linecap="round"/></svg><span>1 : 1,618</span></div>
</body></html>`);

writeFileSync("tools/ikon.html", `<!doctype html><html><head><style>html,body{margin:0;background:transparent}body{width:100vw;height:100vh;display:grid;place-items:center}img{width:100vw;height:100vh}</style></head><body><img src="../public/favicon.svg"></body></html>`);
// Kare ikon (apple-touch / manifest): tam dolu zemin, kenar boşluklu
writeFileSync("tools/ikon-kare.html", `<!doctype html><html><head><style>html,body{margin:0}body{width:100vw;height:100vh;display:grid;place-items:center;background:#141011}img{width:80vw;height:80vh}</style></head><body><img src="../public/favicon.svg"></body></html>`);
console.log("tools/og.html, tools/ikon.html, tools/ikon-kare.html yazıldı");
