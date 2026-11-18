const menuToggle = document.querySelector('.menu-toggle');
const navPanel = document.querySelector('.nav-panel');
const navLinks = document.querySelectorAll('.nav-link, .nav-actions a');

// Deskripsi setMenuState: Membuka atau menutup menu navigasi dan memperbarui atribut aksesibilitasnya.
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

window.addEventListener('resize', () => {
  if (window.innerWidth > 640) setMenuState(false);
});

const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.nav-link').forEach((link) => link.classList.remove('is-active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      activeLink?.classList.add('is-active');
    });
  },
  { rootMargin: '-35% 0px -55% 0px' },
);

sections.forEach((section) => sectionObserver.observe(section));
