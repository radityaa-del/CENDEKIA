// Mengambil tombol pembuka menu, panel tautan, dan tautan di dalam navigasi.
// Referensi ini dipakai kembali oleh event handler di bawah.
const menuToggle = document.querySelector('.menu-toggle');

const navPanel = document.querySelector('.nav-panel');

const navLinks = document.querySelectorAll('.nav-link, .nav-actions a');

// Mengatur tampilan menu sekaligus status aksesibilitas tombol agar pembaca layar
// mengetahui apakah panel sedang terbuka atau tertutup.
function setMenuState(isOpen) {
  menuToggle.classList.toggle('is-open', isOpen);
  navPanel.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
}

// Saat tombol menu ditekan, balikkan keadaan panel yang sekarang.
menuToggle?.addEventListener('click', () => {
  setMenuState(!navPanel.classList.contains('is-open'));
});

// Setelah pengguna memilih tautan, tutup panel agar navigasi ponsel tidak tetap terbuka.
navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

// Jika ukuran layar berubah menjadi desktop, tutup menu ponsel agar kelas tampilan
// menu terbuka tidak terbawa saat layout kembali ke navigasi desktop.
window.addEventListener('resize', () => {
  if (window.innerWidth > 640) setMenuState(false);
});

// Mengambil section ber-ID di dalam konten utama. Bagian ini dipantau untuk
// menyesuaikan tautan navigasi aktif dengan bagian yang sedang terlihat.
const sections = document.querySelectorAll('main section[id]');

// IntersectionObserver mendeteksi section yang berada di area baca utama tanpa
// memeriksa posisi gulir secara manual pada setiap pergerakan.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // Hapus penanda aktif sebelumnya, lalu aktifkan tautan yang menuju section ini.
      document.querySelectorAll('.nav-link').forEach((link) => link.classList.remove('is-active'));

      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      activeLink?.classList.add('is-active');
    });
  },
  { rootMargin: '-35% 0px -55% 0px' },
);

sections.forEach((section) => sectionObserver.observe(section));
