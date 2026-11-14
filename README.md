# CENDEKIA

CENDEKIA adalah platform belajar Informatika gratis dengan tagline **Belajar. Berpikir. Menciptakan.**

## Teknologi

HTML5, CSS3, Vanilla JavaScript, SVG, iframe sandbox, dan LocalStorage untuk prototipe.

## Halaman

Landing, login, registrasi, katalog, detail kelas, dashboard, ruang belajar, Coding Playground, kuis, progres, profil, pengaturan, dan About.

## Menjalankan

Buka `cendekia/index.html` langsung di browser. Untuk pengalaman terbaik gunakan server statis lokal, misalnya Live Server di VS Code. Tidak ada proses build atau dependency npm.

## Penyimpanan prototipe

Data non-sensitif disimpan di LocalStorage: profil, preferensi, progres materi, riwayat kuis, proyek playground, dan activity log. Password tidak pernah disimpan. Playground berjalan dalam iframe `sandbox="allow-scripts"` tanpa akses same-origin.

## Batasan produksi

Autentikasi, perubahan password, verifikasi email, penghapusan akun, database, sinkronisasi lintas perangkat, dan otorisasi harus dipindahkan ke backend aman dengan HTTPS, hashing password, session/token yang aman, validasi server, rate limiting, dan audit akses.

## Audit akhir

memeriksa rute utama, validasi form, sandbox playground, data LocalStorage, XSS pada pembahasan kuis, tema, responsivitas, dan tautan dashboard. Temuan yang diperbaiki: halaman About belum tersedia, navigasi placeholder dashboard, tema belum global, dan output review kuis belum di-escape.
