// Penjelasan variabel params : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const params = new URLSearchParams(window.location.search);
// Penjelasan variabel requestedCourseId : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const requestedCourseId = params.get('id') || 'web-pertama';
// Penjelasan variabel course : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const course = getCourse(requestedCourseId);
// Penjelasan variabel lessons : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const lessons = getLessonList(course);
// Penjelasan variabel totalDuration : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const totalDuration = Math.max(1, Math.ceil(lessons.length / 2));

document.title = `${course.title} | CENDEKIA`;
// Mengambil satu elemen pada dokumen berdasarkan selektor.
document.querySelector('[data-course-category]').textContent = course.category;
document.querySelector('[data-course-title]').textContent = course.title;
document.querySelector('[data-course-description]').textContent = course.description;
document.querySelector('[data-course-image]').src = course.image;
document.querySelector('[data-course-image]').alt = `Ilustrasi ${course.title}`;
// Mengambil semua elemen yang cocok untuk diproses atau diberi event.
document.querySelectorAll('[data-course-level]').forEach((element) => {
  element.textContent = course.level;
});
document.querySelectorAll('[data-course-duration]').forEach((element) => {
  element.textContent = `±${totalDuration} jam`;
});
document.querySelectorAll('[data-course-lessons]').forEach((element) => {
  element.textContent = `${lessons.length} materi`;
});
document.querySelectorAll('[data-course-prerequisites]').forEach((element) => {
  element.textContent = 'Tidak ada';
});

document.querySelector('#objectives').innerHTML = course.chapters
  .map((chapter) => `<li>${chapter.title}</li>`)
  .join('');
document.querySelector('#curriculum').innerHTML = course.chapters
  .map((chapter, index) => {
    // Penjelasan variabel chapterLessons : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const chapterLessons = chapter.lessons.length;
    return `<div class="curriculum-item"><span class="chapter-number">${String(index + 1).padStart(2, '0')}</span><h3>${chapter.title}</h3><span>${chapterLessons} materi</span></div>`;
  })
  .join('');

document.querySelector('#start-learning').addEventListener('click', () => {
  // Mengubah navigasi, membuka tampilan, atau menggeser halaman.
  window.location.href = `learning.html?course=${encodeURIComponent(course.id)}`;
});
