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
html+=`
<div class="card">
<img src="${item.gambar}">
<h3>${item.nama}</h3>
<p>${item.harga}</p>
<a href="https://wa.me/${item.wa}?text=${encodeURIComponent('Halo, saya ingin membeli ' + item.nama)}" target="_blank">Beli via WhatsApp</a>
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
