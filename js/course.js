const courseData = {
  'web-pertama': { category:'Web Development', title:'Bangun Website Pertamamu', description:'Mulai perjalananmu membuat website dari nol. Kamu akan mengenal struktur HTML, membuat tampilan dengan CSS, lalu menambahkan interaksi menggunakan JavaScript.', image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80', level:'Pemula', duration:'4 jam', lessons:'8 materi', prerequisites:'Tidak ada', objectives:['Memahami struktur dasar dokumen HTML','Membuat tampilan website yang rapi dengan CSS','Menambahkan interaksi sederhana dengan JavaScript'], chapters:[['01','Kenalan dengan dunia web','3 materi'],['02','Menyusun halaman dengan HTML','4 materi'],['03','Membuat tampilan dengan CSS','5 materi'],['04','Interaksi pertama dengan JavaScript','4 materi']] },
  'logika-programming': { category:'Programming', title:'Logika Pemrograman', description:'Belajar menyusun cara berpikir komputasional melalui algoritma, variabel, kondisi, dan perulangan yang dekat dengan kehidupan sehari-hari.', image:'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1000&q=80', level:'Menengah', duration:'6 jam', lessons:'12 materi', prerequisites:'Informatika Dasar', objectives:['Memecah masalah menjadi langkah yang logis','Mengenal pola algoritma dan struktur kontrol','Membuat solusi yang efisien dan mudah dipahami'], chapters:[['01','Cara komputer memecahkan masalah','3 materi'],['02','Variabel dan tipe data','4 materi'],['03','Kondisi dan keputusan','3 materi'],['04','Perulangan dan pola','5 materi']] }
};

const fallback = courseData['web-pertama'];
const params = new URLSearchParams(window.location.search);
const course = courseData[params.get('id')] || fallback;

document.title = `${course.title} | CENDEKIA`;
document.querySelector('[data-course-category]').textContent = course.category;
document.querySelector('[data-course-title]').textContent = course.title;
document.querySelector('[data-course-description]').textContent = course.description;
document.querySelector('[data-course-image]').src = course.image;
document.querySelector('[data-course-image]').alt = `Ilustrasi ${course.title}`;
document.querySelectorAll('[data-course-level]').forEach((element) => { element.textContent = course.level; });
document.querySelectorAll('[data-course-duration]').forEach((element) => { element.textContent = course.duration; });
document.querySelectorAll('[data-course-lessons]').forEach((element) => { element.textContent = course.lessons; });
document.querySelectorAll('[data-course-prerequisites]').forEach((element) => { element.textContent = course.prerequisites; });
document.querySelector('#objectives').innerHTML = course.objectives.map((objective) => `<li>${objective}</li>`).join('');
document.querySelector('#curriculum').innerHTML = course.chapters.map((chapter) => `<div class="curriculum-item"><span class="chapter-number">${chapter[0]}</span><h3>${chapter[1]}</h3><span>${chapter[2]}</span></div>`).join('');

document.querySelector('#start-learning')?.addEventListener('click', () => {
  const courseId = params.get('id') || 'html-css';
  window.location.href = `learning.html?course=${courseId}`;
});
