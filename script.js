const container = document.getElementById("produk");

products.forEach(item => {

container.innerHTML += `
<div class="card">
<img src="${item.gambar}">
<h3>${item.nama}</h3>
<p>${item.harga}</p>

<a href="https://wa.me/${item.wa}?text=Saya ingin membeli ${encodeURIComponent(item.nama)}">
Pesan via WhatsApp
</a>

</div>
`;

});
