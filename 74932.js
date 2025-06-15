    const products = [{
      title: "Titik pasrah",
      desc: "Titik pasrah seseorang adalah pas mereka bilang, ya udh mau gimana lagi",
      link: "https://foldir.xyz/titikpasrah"
    },
      {
        title: "Untuk apa kata maaf",
        desc: "Lalu, untuk apa kata maaf jika kamu mengulang kesalahan yang sama lagi",
        link: "https://foldir.xyz/untukapakatamaaf"
      },
    {
        title: "Dengan satu orang",
        desc: "Sudah bukan zamannya lagi ganti ganti pasangan, dewasa lah dengan satu orang",
        link: "https://foldir.xyz/dengansatuorang"
      },
    ];

    const itemsPerPage = 6;
    let currentPage = 1;

    function displayProducts() {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const visibleProducts = products.slice(start, end);

      const container = document.getElementById("productContainer");
      container.innerHTML = '';

      visibleProducts.forEach(product => {
        container.innerHTML += `
        <div class="product">
        <div class="product-info">
        <h3>${product.title}</h3>
        <p>${product.desc}</p>
        </div>
        <a href="${product.link}" target="_blank">Bagikan</a>
        </div>
        `;
      });

      document.getElementById("prevBtn").disabled = currentPage === 1;
      document.getElementById("nextBtn").disabled = end >= products.length;
    }

    document.getElementById("prevBtn").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayProducts();
      }
    });

    document.getElementById("nextBtn").addEventListener("click",
      () => {
        if (currentPage * itemsPerPage < products.length) {
          currentPage++;
          displayProducts();
        }
      });

    displayProducts();