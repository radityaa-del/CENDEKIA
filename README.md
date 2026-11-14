# CENDEKIA

CENDEKIA adalah platform belajar Informatika gratis dengan tagline **Belajar. Berpikir. Menciptakan.**

## Teknologi dan halaman

Website statis menggunakan HTML5, CSS3, Vanilla JavaScript, SVG, iframe sandbox, dan LocalStorage untuk data prototipe. Halaman yang tersedia: landing, login, registrasi, katalog, detail kelas, dashboard, ruang belajar, Coding Playground, kuis, progres, profil, pengaturan, About, dan reset password.

## Menyiapkan Supabase Auth

1. Di Supabase, aktifkan **Authentication → Sign In / Providers → Email**.
2. Pada **Authentication → URL Configuration**, isi **Site URL** dengan URL situs terbit, misalnya `https://USERNAME.github.io/NAMA-REPO/`.
3. Tambahkan URL dashboard dan reset password ke **Redirect URLs**:
   - `https://USERNAME.github.io/NAMA-REPO/dashboard.html`
   - `https://USERNAME.github.io/NAMA-REPO/reset-password.html`
4. Untuk pengujian lokal, tambahkan alamat Live Server, misalnya `http://127.0.0.1:5500/**`.
5. Di **Project Settings → API Keys**, salin Project URL dan **publishable key** (atau key lama bernama `anon`). Jangan pernah memakai `service_role` atau secret key pada frontend.
6. Isi dua nilai publik tersebut di `js/supabase-config.js`, lalu commit dan push ke GitHub:

   ```js
   window.CENDEKIA_SUPABASE_URL = 'https://your-project.supabase.co';
   window.CENDEKIA_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_your-key';
   ```

Pengguna dapat mendaftar dan masuk dengan email/password. Jika konfirmasi email aktif, pengguna harus membuka tautan konfirmasi. Fitur **Lupa password?** mengirim tautan pemulihan melalui email; URL `reset-password.html` harus diizinkan pada Redirect URLs seperti di atas.

## Menjalankan lokal

Buka folder ini di VS Code dan jalankan `index.html` dengan ekstensi Live Server. Jangan membuka halaman sebagai `file://`, karena Supabase Auth memerlukan origin HTTP. Tidak ada proses build atau dependency npm.

## Penyimpanan prototipe dan batasan

Sesi Supabase disimpan di `sessionStorage`. Progres belajar, riwayat kuis, proyek Playground, preferensi, dan sebagian data profil masih disimpan di LocalStorage browser sehingga belum tersinkron antarperangkat. Password tidak disimpan oleh aplikasi.

Sebelum menyimpan data pengguna di database Supabase, aktifkan Row Level Security (RLS) dan pastikan kebijakan membatasi setiap pengguna ke datanya sendiri. Jangan memasukkan informasi sensitif ke LocalStorage atau repository publik.
