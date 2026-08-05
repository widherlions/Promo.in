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

let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

function simpanKeranjang() {
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

function tambahKeranjang(id) {
  const produk = semuaProduk.find(p => p.id === id);

  const ada = keranjang.find(p => p.id === id);

  if (ada) {
    ada.jumlah++;
  } else {
    keranjang.push({
      ...produk,
      jumlah: 1
    });
  }

  simpanKeranjang();
  updateKeranjang();
  alert("Produk ditambahkan ke keranjang.");
}

function updateKeranjang() {
  let total = 0;

  keranjang.forEach(item => {
    total += item.jumlah;
  });

  document.getElementById("jumlahKeranjang").textContent = total;
}

updateKeranjang();

function checkoutWA() {
  let pesan = "Halo Admin 👋%0A%0ASaya ingin memesan:%0A";

  let total = 0;

  keranjang.forEach(item => {
    pesan += `• ${item.nama} x${item.jumlah} = Rp${(item.hargaPromo * item.jumlah).toLocaleString("id-ID")}%0A`;
    total += item.hargaPromo * item.jumlah;
  });

  pesan += `%0A💰 Total: Rp${total.toLocaleString("id-ID")}`;

  window.open(`https://wa.me/62XXXXXXXXXX?text=${pesan}`);
}

localStorage.removeItem("keranjang");
