// Penjelasan variabel menuToggle : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const menuToggle = document.querySelector('.menu-toggle');
// Penjelasan variabel navPanel : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const navPanel = document.querySelector('.nav-panel');
// Penjelasan variabel navLinks : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const navLinks = document.querySelectorAll('.nav-link, .nav-actions a');

// Penjelasan fungsi setMenuState : Membuka atau menutup menu navigasi dan memperbarui atribut aksesibilitasnya. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function setMenuState(isOpen) {
  menuToggle.classList.toggle('is-open', isOpen);
  navPanel.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
}

menuToggle?.addEventListener('click', () => {
  setMenuState(!navPanel.classList.contains('is-open'));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

// Memasang penanganan event pada objek window.
window.addEventListener('resize', () => {
  // Menjalankan langkah berikut hanya jika kondisi terpenuhi.
  if (window.innerWidth > 640) setMenuState(false);
});

// Penjelasan variabel sections : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const sections = document.querySelectorAll('main section[id]');
// Penjelasan variabel sectionObserver : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      // Mengambil semua elemen yang cocok untuk diproses atau diberi event.
      document.querySelectorAll('.nav-link').forEach((link) => link.classList.remove('is-active'));
      // Penjelasan variabel activeLink : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      activeLink?.classList.add('is-active');
    });
  },
  { rootMargin: '-35% 0px -55% 0px' },
);

sections.forEach((section) => sectionObserver.observe(section));
