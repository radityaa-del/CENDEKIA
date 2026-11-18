// Penjelasan variabel revealItems : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const revealItems = document.querySelectorAll('.reveal');
// Penjelasan variabel toast : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const toast = document.querySelector('.toast');
// Penjelasan variabel toastTimer : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
let toastTimer;

// Penjelasan variabel revealObserver : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      // Menjalankan langkah berikut hanya jika kondisi terpenuhi.
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

revealItems.forEach((item) => revealObserver.observe(item));

// Penjelasan fungsi showToast : Menampilkan pesan sementara pada notifikasi halaman. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

// Mengambil semua elemen yang cocok untuk diproses atau diberi event.
document.querySelectorAll('a[href="#daftar"]').forEach((link) => {
  link.addEventListener('click', () =>
    showToast('Pendaftaran gratis segera dibuka. Selamat datang di CENDEKIA!'),
  );
});

document.querySelectorAll('a[href="#masuk"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showToast('Fitur masuk sedang disiapkan untukmu.');
  });
});

document.querySelectorAll('.course-detail').forEach((link) => {
  link.addEventListener('click', () => showToast('Detail kelas akan segera tersedia.'));
});
