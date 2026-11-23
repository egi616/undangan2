# Undangan Digital

Website undangan statis berbasis HTML, Tailwind CSS, Vanilla JavaScript, dan JSON. Website dapat di-host dari root repository di GitHub Pages; tidak memerlukan PHP, Laravel, atau database untuk ditampilkan.

## Menjalankan lokal

JSON dimuat lewat `fetch`, jadi buka `index.html` melalui HTTP lokal, bukan `file://`. Dari folder repository jalankan:

```powershell
python -m http.server 8000
```

Kemudian buka `http://localhost:8000`.

## Mengubah data

- `data/couple.json`: nama dan profil pasangan.
- `data/event.json`: tanggal, acara, lokasi, Google Maps, dan URL RSVP.
- `data/gallery.json`: daftar gambar galeri.
- `data/gifts.json`: informasi amplop digital.
- `data/guestbook.json`: seed buku tamu baca-saja; browser tidak dapat menulis kembali ke file ini.
- `data/story.json`: disiapkan untuk konten story bila tersedia.
- `assets/images/`: foto dan aset visual.

Nama tamu dapat dibagikan dengan parameter URL, misalnya `?to=NamaTamu`. Gunakan aset dan informasi rekening hanya setelah diverifikasi.

## RSVP dan buku tamu

RSVP membuka Google Form yang ditentukan di `data/event.json`. Pastikan form menerima jawaban dari tamu publik dan telah diuji dari browser tanpa login. Form eksternal menyimpan jawaban; website statis ini sendiri tidak menulis ke database atau JSON. Daftar ucapan di website saat ini menggunakan JSON lokal yang hanya bisa dibaca. Agar submission tampil di daftar ucapan, dibutuhkan integrasi data eksternal tambahan.

Link RSVP sudah diarahkan ke URL responder yang diberikan. Screenshot menunjukkan Google Forms meminta login; hal ini diatur oleh izin form dan tidak dapat diatasi hanya dengan mengganti parameter URL. Pastikan pemilik form mengizinkan responden tanpa login dan uji kembali dari browser privat sebelum mengumumkan undangan.

## Build aset (opsional)

Build tidak diperlukan untuk deployment jika file CSS dan QR bundle yang sudah ada dipertahankan. Setelah memasang Node.js, `npm install` dan `npm run build:css` membuat CSS Tailwind; `npm run build:qr` membangun ulang bundle QR client-side.

## Deployment GitHub Pages

Ikuti [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) untuk langkah pengaturan Pages dan checklist pengujian.

Gunakan path relatif seperti `assets/...` dan `data/...` agar halaman tetap berfungsi pada URL project GitHub Pages.
