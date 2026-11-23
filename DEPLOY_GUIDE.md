# GitHub Pages Deployment Guide

Website ini sudah berupa static site dengan `index.html` di root repository. Deployment tidak menjalankan PHP/Laravel, tidak membuat API, dan tidak membutuhkan database, Node.js, atau langkah build pada GitHub Pages.

## 1. Periksa file sebelum publish

Pastikan root repository berisi sekurangnya:

```text
index.html
assets/
data/
robots.txt
.nojekyll
```

Jangan hanya mengunggah folder `assets/` atau folder `data/`; GitHub Pages harus melihat `index.html` pada root publishing source.

## 2. Push ke GitHub

Commit dan push isi repository static ini ke branch yang ingin dipublikasikan. Jangan sertakan `node_modules/`. File `package.json` dan lockfile hanya diperlukan bila ingin membangun ulang aset secara lokal; keduanya tidak dijalankan oleh hosting.

## 3. Aktifkan GitHub Pages

1. Buka repository di GitHub.
2. Pilih **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch yang berisi website dan folder **/(root)**.
5. Simpan. Tunggu status deployment berhasil pada bagian Pages atau tab Actions.
6. Buka URL yang ditampilkan GitHub. Untuk repository project ini biasanya berbentuk `https://egi616.github.io/undangan_digital/`.

Tidak perlu memasang PHP, Composer, MySQL, database, Laravel, GitHub Actions workflow khusus, atau server build. `.nojekyll` meminta GitHub Pages menyajikan berkas statis tanpa pemrosesan Jekyll.

## 4. Uji URL publik

Sesudah deployment:

- Buka halaman utama dan `?to=NamaTamu`, misalnya `https://egi616.github.io/undangan_digital/?to=Egi`.
- Periksa gambar, CSS, font fallback, QR, tombol/modal RSVP, tombol salin, dan kedua link Google Maps.
- Pastikan path lokal menggunakan `assets/...` dan `data/...` relatif; jangan menggantinya dengan path `/assets/...` yang dapat mengarah ke root domain, bukan root repository.
- Buka URL RSVP menggunakan jendela privat atau browser tanpa login. Link saat ini memakai responder URL yang diberikan. Screenshot menunjukkan bahwa Google Forms meminta login; parameter URL tidak dapat mengubah izin formulir. Jika login masih diperlukan, pemilik form harus mengubah akses responden di pengaturan Google Forms agar tamu dapat menjawab tanpa login.
- Kirim submission uji hanya setelah memastikan form memang milik pemilik undangan. Submission dikelola Google Forms; website tidak menyimpan atau mengirim data RSVP sendiri.
- Guestbook mengambil `data/guestbook.json` yang saat ini kosong dan read-only. Submission Google Form tidak otomatis tampil di halaman ucapan.

## 5. Mengubah konten

Edit JSON yang sesuai:

- `data/couple.json` untuk nama, foto, dan profil.
- `data/event.json` untuk tanggal, acara, lokasi, Maps, dan RSVP.
- `data/gallery.json` untuk foto.
- `data/gifts.json` untuk rekening/e-wallet.
- `data/guestbook.json` hanya untuk entri demo yang memang boleh dipublikasikan.
- `data/story.json` untuk story bila konten tersedia.

Sebelum publish, verifikasi tanggal, ejaan nama, rekening, dan pemilik rekening. Tahun cover dan acara sudah dimajukan ke 2027. Cover menampilkan 10 September 2027, sedangkan kartu acara dan countdown memakai waktu akad 18 September 2027 pukul 07.00 WIB. Nilai rekening pada JSON mengikuti angka yang ditampilkan di kartu, tetapi kebenaran rekening tetap harus dicek oleh pemiliknya.

## 6. Build aset lokal (opsional)

File output `assets/css/style.css` dan `assets/js/qr-code.bundle.js` sudah disertakan. Build hanya dibutuhkan bila mengubah stylesheet input atau source generator QR:

```powershell
npm install
npm run build:css
npm run build:qr
```

Setelah build, commit hasil output bersama perubahan. Pengunjung dan GitHub Pages tetap hanya memerlukan HTML, CSS, JavaScript, JSON, serta aset statis yang sudah dibangun.

## Batasan

- Google Forms dan Google Maps tetap layanan eksternal.
- File JSON pada GitHub Pages bersifat read-only untuk browser.
- Story, musik, dan video belum memiliki konten/aset pada source awal; file media harus disediakan sebelum fitur-fitur tersebut dapat dipublikasikan.
