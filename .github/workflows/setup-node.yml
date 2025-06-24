- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: 18

- name: Install dependencies
  run: npm install jsdom

- name: Generate index.html with embedded sitemap content
  run: node scripts/build-index.js

- name: Commit updated index.html
  run: |
    git add index.html
    git commit -m "Embed sitemap content into index.html" || echo "No changes"
    git push
