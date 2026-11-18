// Fungsi inisialisasi mandiri ini langsung dijalankan saat berkas theme.js dimuat.
(() => {
  // Ambil preferensi pengguna sekali, lalu gunakan nilainya untuk mengatur tampilan halaman.
  const preferences = (() => {
    try {
      // Baca preferensi dari localStorage; gunakan objek kosong jika belum pernah disimpan.
      return JSON.parse(localStorage.getItem('cendekiaPreferences') || '{}');
    } catch {
      // Jika data tidak dapat dibaca atau bukan JSON yang valid, lanjutkan dengan nilai bawaan.
      return {};
    }
  })();

  // Aktifkan atau nonaktifkan mode gelap sesuai nilai theme pada preferensi tersimpan.
  document.body.classList.toggle('theme-dark', preferences.theme === 'dark');

  // Gunakan teks berukuran besar hanya jika preferensi fontSize bernilai large.
  document.body.classList.toggle('text-large', preferences.fontSize === 'large');
})();
