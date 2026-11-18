const revealItems = document.querySelectorAll('.reveal');
const toast = document.querySelector('.toast');
let toastTimer;

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

revealItems.forEach((item) => revealObserver.observe(item));

// Deskripsi showToast: Menampilkan pesan sementara pada notifikasi halaman.
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

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
