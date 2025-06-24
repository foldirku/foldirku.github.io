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
        <li>
          <div class="thumb-wrapper" style="background-image: url('${image}');"></div>
          <div class="info">
            <h3><a href="${url}" target="_blank">${title}</a></h3>
            <p>${desc}</p>
          </div>
        </li>`;
    } catch {
      return `
        <li>
          <div class="thumb-wrapper" style="background-image: url('https://via.placeholder.com/600x338?text=HTML');"></div>
          <div class="info">
            <h3><a href="${url}" target="_blank">${url}</a></h3>
            <p>Tidak dapat mengambil deskripsi.</p>
          </div>
        </li>`;
    }
  }));

  const itemsPerPage = 6;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const template = fs.readFileSync("index.html", "utf8"); // berisi tampilan dasar

  for (let i = 0; i < totalPages; i++) {
    const start = i * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = items.slice(start, end).join("\n");

    const pageNum = i + 1;
    const filename = pageNum === 1 ? "index.html" : `page${pageNum}.html`;

    let content = template.replace("{{CONTENT}}", pageItems);

    // Tambahkan navigasi halaman
    let nav = '<div class="pagination" style="text-align:center; margin-top:2rem;">';
    for (let j = 1; j <= totalPages; j++) {
      const link = j === 1 ? "index.html" : `page${j}.html`;
      nav += `<a href="${link}" style="margin:0 5px; ${j === pageNum ? 'font-weight:bold;' : ''}">${j}</a>`;
    }
    nav += '</div>';

    content = content.replace("{{PAGINATION}}", nav);

    fs.writeFileSync(filename, content);
  }
})();
