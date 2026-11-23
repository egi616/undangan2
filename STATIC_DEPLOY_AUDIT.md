# Static Deploy Audit

Audit dilakukan setelah konversi Phase 4 pada working tree `source/`. Pemeriksaan file menghitung isi working tree dan tidak memindai metadata Git di `.git/`.

## Hasil pemeriksaan

| Pemeriksaan | Hasil | Temuan |
|---|---|---|
| File PHP | **Lulus** | Tidak ada file `.php` di working tree. Direktori/runtime Laravel, controller, model, route, migrasi, seeder, test PHP, dan `public/index.php` sudah dihapus setelah aset statis diverifikasi. |
| Query/database | **Lulus** | Tidak ditemukan pemakaian PDO, Eloquent, SQL, MySQL/MariaDB, schema migration, atau koneksi database pada HTML, JavaScript, CSS, dan JSON. |
| Dependensi Laravel | **Lulus** | Tidak ada Composer, Artisan, Blade, `laravel-vite-plugin`, middleware, session, CSRF, atau konfigurasi Laravel pada runtime static. `package.json` hanya memuat tooling build CSS/QR opsional; tidak dibutuhkan saat hosting. |
| Route internal | **Lulus** | Semua link fragment HTML memiliki target section. Root dilayani oleh `index.html`; personalisasi tamu memakai `?to=NamaTamu`. Endpoint `POST /reservasi` dan health check Laravel sudah tidak dipakai. |
| Aset lokal | **Lulus** | Pemeriksaan otomatis menemukan nol path aset lokal yang hilang. 22 gambar sumber tersedia di `assets/images/`, ditambah favicon SVG; gambar yang dirujuk berhasil dimuat pada browser lokal. CSS final dan QR bundle tersedia. |
| JSON | **Lulus** | Enam file JSON berhasil diparse; seluruh path gambar/logo yang dirujuk tersedia. |
| JavaScript | **Lulus** | `node --check` berhasil untuk modul JS dan bundle QR; browser tidak melaporkan error console/page saat memuat halaman. |
| Tampilan responsif | **Lulus pada ukuran yang diuji** | Tidak ditemukan horizontal overflow pada lebar 320, 375, 425, 768, dan 1024 px. Markup berasal dari komponen Blade sumber dan mempertahankan layout/class utama. |
| Nama tamu | **Lulus** | `?to=Egi` tampil. Uji nilai `<em>Tamu</em>` menampilkan karakter sebagai teks, bukan elemen HTML. |
| RSVP modal | **Lulus sebagian** | Modal dapat dibuka/ditutup. Submission diarahkan ke URL Google Form dari pemilik, bukan disimpan oleh situs. |
| QR code | **Lulus** | QR dibuat di browser oleh bundle lokal dan menghasilkan canvas 180×180. |
| Countdown | **Lulus** | Menggunakan waktu akad (`2027-09-18 07:00 WIB`); tanggal tersebut mendatang pada saat audit diperbarui. |
| Maps | **Lulus sebagai tautan eksternal** | Dua tautan Maps dipertahankan. Tidak memakai API key atau endpoint backend. |
| Buku tamu | **Terbatas** | `data/guestbook.json` kosong dan read-only. Tidak ada dump database sumber, sehingga data reservasi lama tidak dapat dimigrasikan atau ditampilkan. Submission Google Form tidak otomatis muncul pada daftar ucapan. |

## Temuan yang memerlukan perhatian

1. **Akses Google Form masih memerlukan konfirmasi.** Link pada website sudah diganti ke URL responder yang diberikan (`usp=header`). Screenshot yang dibagikan menunjukkan dialog login dari Google Forms; parameter URL tidak mengubah pengaturan izin formulir. Pemilik form perlu mengizinkan responden tanpa login, lalu menguji di jendela privat. Situs hanya membuka form eksternal dan tidak menyimpan submission.
2. **Tanggal cover berbeda dari tanggal acara.** Cover menampilkan 10 September 2027, sementara kartu acara dan countdown memakai 18 September 2027 pukul 07.00 WIB. Countdown kini menghitung menuju tanggal acara tersebut.
3. **Ejaan nama pada cover berbeda dari profil.** Source menulis “Estars & Eather” pada cover, sedangkan profil calon pengantin menulis “Ether Ily”. Teks source dipertahankan; pemilik undangan dapat memperbaikinya melalui `data/couple.json`.
4. **Nomor rekening perlu verifikasi pemilik.** Nilai yang ditampilkan dipakai juga oleh tombol salin agar keduanya konsisten. Nomor rekening aktual dan pemiliknya belum diverifikasi secara independen.
5. **Fitur yang tidak ada pada repository sumber tidak dapat dipastikan setara.** Tidak tersedia konten story/timeline, berkas video, atau audio. `data/story.json` masih kosong; tidak ada galeri video atau musik latar yang diaktifkan. Fitur-fitur tersebut memerlukan konten/aset yang disediakan pemilik, bukan dibuat dengan data rekaan.
6. **Dependensi eksternal tampilan:** font Great Vibes diambil dari Google Fonts; peta dan RSVP membuka layanan eksternal. Layout tetap memiliki fallback font, tetapi hasil tipografi persis memerlukan koneksi.
7. **Favicon lama kosong.** Favicon 0-byte dari source tidak digunakan; static site memakai `assets/images/favicon.svg`.

## Bukti validasi

- Server HTTP lokal memuat halaman dan seluruh JSON tanpa error runtime.
- 14 gambar yang dirujuk oleh elemen `<img>` berhasil dimuat; pemeriksaan path juga memvalidasi aset latar CSS dan aset pada JSON.
- Link fragment internal tidak menunjuk ke ID yang hilang.
- Uji browser mengonfirmasi sapaan tamu, state countdown, QR, tombol/modal, serta tidak adanya overflow pada lima breakpoint yang diminta.
- Tailwind CSS dan bundle QR dibangun sebelum dependensi build sementara dibersihkan. Runtime deployment tidak memerlukan Node.js, npm, PHP, atau database.

## Kesimpulan deployment

**Static hosting siap secara teknis untuk konten yang tersedia**: dapat disajikan dari root GitHub Pages tanpa backend atau database. **RSVP production belum dapat dinyatakan terverifikasi** sampai akses publik Google Form diuji. Guestbook saat ini demo baca-saja, dan data acara/rekening yang tidak konsisten perlu dikonfirmasi sebelum website dipromosikan sebagai undangan aktif.
