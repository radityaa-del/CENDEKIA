# CENDEKIA

<<<<<<< HEAD
Static HTML, CSS, and vanilla JavaScript learning site. User registration and login use Supabase Auth.

## Configure Supabase

1. In Supabase, enable **Authentication → Sign In / Providers → Email**.
2. In **Authentication → URL Configuration**, set the Site URL to the deployed site URL, and add both the deployed URL and local development URL to Redirect URLs. The deployed redirect must allow `.../dashboard.html`.
3. In **Project Settings → API Keys**, copy the Project URL and the **publishable** key (or legacy `anon` key). Never use a `service_role` or secret key in this frontend.
4. Put those two public values in `js/supabase-config.js`:

   ```js
   window.CENDEKIA_SUPABASE_URL = 'https://your-project.supabase.co';
   window.CENDEKIA_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_your-key';
   ```

5. Commit and push the config file to GitHub. Publishable/anon keys are intended for browser use; protect database data with Row Level Security before adding database features.

## Run locally

Open the folder in VS Code and use the Live Server extension, or serve the folder with any local static HTTP server. Do not open the HTML files as `file://`; Supabase Auth needs an HTTP origin. Add the local origin shown by the server (for example `http://127.0.0.1:5500/**`) to Supabase Redirect URLs.

Users can register with email and password. If email confirmation is enabled in Supabase, they must confirm the email before signing in. The SDK keeps the active login session in `sessionStorage`, not `localStorage`.

Learning progress and the other prototype activity data are still stored locally in the browser. They are not yet synced to Supabase or shared between devices.
=======
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
>>>>>>> 3bef923bed5154a8b689b882043feb12f79d7430
