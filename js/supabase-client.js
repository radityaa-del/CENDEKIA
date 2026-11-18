// Penjelasan fungsi inisialisasiSupabase : Memvalidasi konfigurasi lalu membuat klien Supabase untuk autentikasi. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
(function () {
  // Penjelasan variabel projectUrl : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const projectUrl = window.CENDEKIA_SUPABASE_URL?.trim();
  // Penjelasan variabel publishableKey : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const publishableKey = window.CENDEKIA_SUPABASE_PUBLISHABLE_KEY?.trim();
  // Penjelasan variabel configured : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const configured =
    projectUrl &&
    publishableKey &&
    !projectUrl.includes('PASTE_') &&
    !publishableKey.includes('PASTE_');

  // Menjalankan langkah berikut hanya jika kondisi terpenuhi.
  if (!configured) {
    window.CENDEKIA_AUTH_ERROR = 'Konfigurasi Supabase belum diisi di js/supabase-config.js.';
    return;
  }
  if (!window.supabase?.createClient) {
    window.CENDEKIA_AUTH_ERROR =
      'Supabase SDK gagal dimuat. Periksa koneksi internet lalu muat ulang halaman.';
    return;
  }

  try {
    // Penjelasan variabel url : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const url = new URL(projectUrl);
    if (url.protocol !== 'https:' || !url.hostname.endsWith('.supabase.co')) {
      // Mengirim kesalahan agar ditangani oleh pemanggil atau blok catch.
      throw new Error('Gunakan Project URL HTTPS dari Supabase.');
    }

    window.cendekiaSupabase = window.supabase.createClient(url.href, publishableKey, {
      auth: {
        storage: window.sessionStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  } catch (error) {
    window.CENDEKIA_AUTH_ERROR = error.message || 'Project URL Supabase tidak valid.';
  }
})();
