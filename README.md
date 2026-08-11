# DigiHive Landing

Landing page pemasaran untuk **DigiHive** — sistem inventory management untuk petshop &amp; klinik, sebuah produk oleh [Ritiros Studio](https://www.ritirosstudio.site/).

Situs statis (HTML/CSS/JS murni, tanpa build step), disusun dari data proposal kemitraan DigiHive. Sistem desain (font, warna, komponen) mengikuti gaya situs utama Ritiros Studio.

Repo ini terpisah dari:
- `digihive-demo` — demo aplikasi DigiHive itu sendiri (bukan landing page ini)
- `ritiros-studio` — situs utama studio

## Struktur
- `index.html` — halaman utama
- `css/styles.css` — token desain & komponen umum (dipakai bareng situs utama Ritiros Studio)
- `css/digihive.css` — komponen khusus halaman ini (dashboard mockup, flow stepper, tabel harga, dll.)
- `js/main.js` — interaksi (theme toggle, reveal on scroll, accordion, dll.)
- `assets/` — favicon &amp; ikon DigiHive

## Deploy
Static site, tanpa build command. Bisa langsung di-deploy ke Vercel/Netlify/GitHub Pages dari root direktori ini.
