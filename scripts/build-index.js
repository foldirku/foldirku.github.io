const fs = require("fs");
const https = require("https");
const { JSDOM } = require("jsdom");

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let html = "";
      res.on("data", chunk => html += chunk);
      res.on("end", () => resolve(html));
    }).on("error", reject);
  });
}

(async () => {
  const sitemap = await fetchHTML("https://foldir.xyz/sitemap.xml");
  const dom = new JSDOM(sitemap, { contentType: "text/xml" });
  const urls = [...dom.window.document.querySelectorAll("url > loc")].map(el => el.textContent);

  const items = await Promise.all(urls.map(async url => {
    try {
      const html = await fetchHTML(url);
      const doc = new JSDOM(html).window.document;

      const title = doc.querySelector("title")?.textContent || url;
      const desc = doc.querySelector('meta[name="description"]')?.content || "Tidak ada deskripsi.";
      const image = doc.querySelector('meta[property="og:image"]')?.content || "https://via.placeholder.com/600x338?text=HTML";

      return `
        <li class="post-item" style="display:none;">
          <div class="thumb-wrapper" style="background-image: url('${image}');"></div>
          <div class="info">
            <h3><a href="${url}" target="_blank">${title}</a></h3>
            <p>${desc}</p>
          </div>
        </li>`;
    } catch {
      return `
        <li class="post-item" style="display:none;">
          <div class="thumb-wrapper" style="background-image: url('https://via.placeholder.com/600x338?text=HTML');"></div>
          <div class="info">
            <h3><a href="${url}" target="_blank">${url}</a></h3>
            <p>Tidak dapat mengambil deskripsi.</p>
          </div>
        </li>`;
    }
  }));

  // Sisipkan hasil ke index.html
  let indexHTML = fs.readFileSync("index.html", "utf8");
  indexHTML = indexHTML.replace(
    /<ul id="sitemap-list"[\s\S]*?<\/ul>/,
    `<ul id="sitemap-list" data-count="0">\n${items.join("\n")}\n</ul>`
  );
  fs.writeFileSync("index.html", indexHTML);
})();
