let semuaProduk=[];
function rupiah(angka){
  return "Rp" + angka.toLocaleString("id-ID");
}
fetch("products.json")
.then(res=>res.json())
.then(data=>{
semuaProduk=data;
tampilkan(data);
});

function tampilkan(data){
let html="";

data.forEach(item=>{
  let diskon = Math.round(
  ((item.hargaAsli - item.hargaPromo) / item.hargaAsli) * 100
);
  console.log(item);
html += `
<div class="card">
<div class="badge-diskon">-${diskon}%</div>

<img src="${item.gambar}" alt="${item.nama}">
  <img src="${item.gambar}" alt="${item.nama}">
<h3>${item.nama}</h3>

<div class="harga">
  <span class="harga-asli">${rupiah(item.hargaAsli)}</span>
  <span class="harga-promo">${rupiah(item.hargaPromo)}</span>
</div>

  <div class="aksi">
    <button onclick="tambahKeranjang(${item.id})">
      🛒 Tambah ke Keranjang
    </button>

    <a href="https://wa.me/${item.wa}?text=${encodeURIComponent(
`Halo Admin 👋

Saya ingin membeli:

📦 Produk: ${item.nama}
💰 Harga Promo: ${rupiah(item.hargaPromo)}

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
