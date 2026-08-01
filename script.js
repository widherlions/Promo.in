let semuaProduk=[];

fetch("products.json")
.then(res=>res.json())
.then(data=>{
semuaProduk=data;
tampilkan(data);
});

function tampilkan(data){
let html="";

data.forEach(item=>{
  console.log(item);
html += `
<div class="card">
  <img src="${item.gambar}" alt="${item.nama}">
<h3>${item.nama}</h3>

<div class="harga">
  <span class="harga-asli">${item.hargaAsli}</span>
  <span class="harga-promo">${item.hargaPromo}</span>
</div>

  <div class="aksi">
    <button onclick="tambahKeranjang(${item.id})">
      🛒 Tambah ke Keranjang
    </button>

    <a href="https://wa.me/${item.wa}?text=${encodeURIComponent(
`Halo Admin 👋

Saya ingin membeli:

📦 Produk: ${item.nama}
💰 Harga Promo: ${item.hargaPromo}

Mohon informasi ketersediaannya.
Terima kasih.`
)}" target="_blank">
      Beli via WhatsApp
    </a>
  </div>
</div>
`;
});

document.getElementById("products").innerHTML=html;
}

document.getElementById("search").addEventListener("input",function(){
let cari=this.value.toLowerCase();

let hasil=semuaProduk.filter(item=>
item.nama.toLowerCase().includes(cari)
);

tampilkan(hasil);
});

let keranjang = [];

function tambahKeranjang(id){
  const produk = semuaProduk.find(item => item.id === id);

  keranjang.push(produk);

  alert(`${produk.nama} berhasil ditambahkan ke keranjang.`);
}
