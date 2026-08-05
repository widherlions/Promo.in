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

  window.open(`https://wa.me/6285794859861?text=${pesan}`);
}

function kosongkanKeranjang() {
  keranjang = [];
  localStorage.removeItem("keranjang");
  updateKeranjang();
  alert("Keranjang berhasil dikosongkan.");
}

function bukaKeranjang() {
  let html = "";
  let total = 0;

  keranjang.forEach(item => {
    html += `
      <div class="item-keranjang">
        <b>${item.nama}</b><br>

        <button onclick="kurangJumlah(${item.id})">➖</button>

        <span>${item.jumlah}</span>

        <button onclick="tambahKeranjang(${item.id})">➕</button>

        <button onclick="hapusProduk(${item.id})">🗑️</button>

        <br>
        ${rupiah(item.hargaPromo * item.jumlah)}
        <hr>
      </div>
    `;

    total += item.hargaPromo * item.jumlah;
  });

  if (keranjang.length === 0) {
    html = "<p>Keranjang masih kosong.</p>";
  }

  document.getElementById("isiKeranjang").innerHTML = html;
  document.getElementById("totalHarga").textContent = rupiah(total);
  document.getElementById("modalKeranjang").style.display = "block";
}

function tutupKeranjang(){
  document.getElementById("modalKeranjang").style.display="none";
}

function kurangJumlah(id) {
  const produk = keranjang.find(p => p.id === id);

  if (produk.jumlah > 1) {
    produk.jumlah--;
  } else {
    keranjang = keranjang.filter(p => p.id !== id);
  }

  simpanKeranjang();
  updateKeranjang();
  bukaKeranjang();
}

function hapusProduk(id) {
  keranjang = keranjang.filter(p => p.id !== id);

  simpanKeranjang();
  updateKeranjang();
  bukaKeranjang();
    }
