const courses = [
  { id:'web-pertama', category:'Web Development', label:'WEB DEVELOPMENT', title:'Bangun Website Pertamamu', description:'Kenali HTML, CSS, dan JavaScript lewat proyek yang bisa langsung kamu lihat.', level:'Pemula', levelClass:'level-green', lessons:'8 materi', rating:'4.9', image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
  { id:'logika-programming', category:'Programming', label:'PROGRAMMING', title:'Logika Pemrograman', description:'Ubah ide menjadi algoritma sederhana dan pecahkan masalah secara terstruktur.', level:'Menengah', levelClass:'level-orange', lessons:'12 materi', rating:'4.8', image:'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80' },
  { id:'berpikir-komputer', category:'Computer Science', label:'COMPUTER SCIENCE', title:'Berpikir seperti Komputer', description:'Temukan cara kerja data, sistem, dan teknologi yang membentuk dunia digital.', level:'Menengah', levelClass:'level-blue', lessons:'10 materi', rating:'4.9', image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
  { id:'database-dasar', category:'Database', label:'DATABASE', title:'Data yang Terorganisir', description:'Pelajari cara menyimpan, mengelola, dan membaca data dengan cara yang cerdas.', level:'Pemula', levelClass:'level-green', lessons:'9 materi', rating:'4.8', image:'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80' },
  { id:'informatika-dasar', category:'Informatika Dasar', label:'INFORMATIKA DASAR', title:'Mengenal Dunia Digital', description:'Langkah awal memahami komputer, internet, dan cara teknologi bekerja.', level:'Pemula', levelClass:'level-green', lessons:'7 materi', rating:'4.9', image:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
  { id:'javascript-interaktif', category:'Web Development', label:'WEB DEVELOPMENT', title:'JavaScript Interaktif', description:'Buat halaman web yang merespons aksi pengguna dengan JavaScript vanilla.', level:'Menengah', levelClass:'level-orange', lessons:'14 materi', rating:'5.0', image:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' }
];

const grid = document.querySelector('#catalog-grid');
const searchInput = document.querySelector('#course-search');
const categoryFilter = document.querySelector('#category-filter');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');

function courseCard(course) {
  const details = getCourse(course.id);
  const lessonCount = getLessonList(details).length;
  const levelClass = details.level === 'Pemula' ? 'level-green' : 'level-orange';
  return `<article class="catalog-card reveal is-visible"><div class="course-image"><img src="${details.image}" alt="Ilustrasi ${details.title}"><span class="course-badge">GRATIS</span><span class="course-level ${levelClass}">${details.level}</span></div><div class="course-body"><p class="course-label">${details.category.toUpperCase()}</p><h3>${details.title}</h3><p>${details.description}</p><div class="course-meta"><span>◷ ${lessonCount} materi</span><span>♧ ${course.rating}</span><a class="course-detail" href="course.html?id=${course.id}">Lihat detail <span>↗</span></a></div></div></article>`;
}

function renderCourses() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const filtered = courses.filter((course) => {
    const details = getCourse(course.id);
    const searchableText = `${course.title} ${course.description} ${course.category} ${details.title} ${details.description} ${details.category}`.toLowerCase();
    const matchesText = searchableText.includes(query);
    return matchesText && (!category || details.category === category);
  });
  grid.innerHTML = filtered.map(courseCard).join('');
  resultCount.textContent = `${filtered.length} kelas ditemukan`;
  emptyState.classList.toggle('hidden', filtered.length > 0);
}

searchInput?.addEventListener('input', renderCourses);
categoryFilter?.addEventListener('change', renderCourses);
renderCourses();
