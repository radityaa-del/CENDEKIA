const params = new URLSearchParams(window.location.search);
const requestedCourseId = params.get('id') || 'web-pertama';
const course = getCourse(requestedCourseId);
const lessons = getLessonList(course);
const totalDuration = Math.max(1, Math.ceil(lessons.length / 2));

document.title = `${course.title} | CENDEKIA`;
document.querySelector('[data-course-category]').textContent = course.category;
document.querySelector('[data-course-title]').textContent = course.title;
document.querySelector('[data-course-description]').textContent = course.description;
document.querySelector('[data-course-image]').src = course.image;
document.querySelector('[data-course-image]').alt = `Ilustrasi ${course.title}`;
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
    const chapterLessons = chapter.lessons.length;
    return `<div class="curriculum-item"><span class="chapter-number">${String(index + 1).padStart(2, '0')}</span><h3>${chapter.title}</h3><span>${chapterLessons} materi</span></div>`;
  })
  .join('');

document.querySelector('#start-learning').addEventListener('click', () => {
  window.location.href = `learning.html?course=${encodeURIComponent(course.id)}`;
});
