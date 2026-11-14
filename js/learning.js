async function initializeLearningRoom() {
const user = await window.CendekiaAuth.requireUser();
if (!user) return;

const params = new URLSearchParams(window.location.search);
const course = getCourse(params.get('course'));
const lessons = getLessonList(course);
let currentIndex = Math.max(0, lessons.findIndex((lesson) => lesson.id === (JSON.parse(localStorage.getItem('cendekiaProgress') || '{}')[course.id] || {}).last));
const progressStore = JSON.parse(localStorage.getItem('cendekiaProgress') || '{}');
const courseState = progressStore[course.id] || { completed: [], last: lessons[0].id };

document.title = `${course.title} | Ruang Belajar CENDEKIA`;
document.querySelector('#learning-course-title').textContent = course.title;
document.querySelector('#curriculum-course-title').textContent = course.title;

function persist() {
  progressStore[course.id] = courseState;
  localStorage.setItem('cendekiaProgress', JSON.stringify(progressStore));
}

function renderCurriculum() {
  document.querySelector('#curriculum-list').innerHTML = course.chapters.map((chapter, chapterIndex) => `<div class="curriculum-chapter"><h3><span>0${chapterIndex + 1}</span>${chapter.title}</h3>${chapter.lessons.map((lesson, lessonIndex) => { const id = `${chapterIndex}-${lessonIndex}`; const done = courseState.completed.includes(id); return `<button class="curriculum-lesson ${id === lessons[currentIndex].id ? 'is-current' : ''} ${done ? 'is-complete' : ''}" data-lesson-id="${id}" type="button"><span class="lesson-check">${done ? '✓' : '○'}</span><span>${lesson[0]}</span></button>`; }).join('')}</div>`).join('');
  document.querySelectorAll('.curriculum-lesson').forEach((button) => button.addEventListener('click', () => { currentIndex = lessons.findIndex((lesson) => lesson.id === button.dataset.lessonId); render(); }));
}

function render() {
  const lesson = lessons[currentIndex];
  const done = courseState.completed.includes(lesson.id);
  const percent = Math.round(courseState.completed.length / lessons.length * 100);
  document.querySelector('#lesson-chapter').textContent = `Bab ${lesson.chapterIndex + 1} · ${lesson.chapterTitle}`;
  document.querySelector('#lesson-position').textContent = `Materi ${currentIndex + 1} dari ${lessons.length}`;
  document.querySelector('#lesson-title').textContent = lesson.title;
  document.querySelector('#lesson-explanation').textContent = lesson.explanation;
  document.querySelector('#lesson-code').textContent = lesson.code;
  document.querySelector('#lesson-summary').textContent = `Kamu telah mengenal konsep ${lesson.title.toLowerCase()}. Coba jalankan contoh kode dan ubah nilainya untuk melihat hasil yang berbeda.`;
  document.querySelector('#lesson-status').textContent = done ? '✓ Selesai' : 'Belum selesai';
  document.querySelector('#lesson-status').classList.toggle('is-complete', done);
  document.querySelector('#learning-progress-label').textContent = `${percent}% selesai`;
  document.querySelector('#learning-progress-bar').style.width = `${percent}%`;
  document.querySelector('#previous-lesson').disabled = currentIndex === 0;
  document.querySelector('#next-lesson').disabled = currentIndex === lessons.length - 1;
  document.querySelector('#complete-lesson').textContent = done ? '✓ Sudah selesai' : 'Tandai selesai ✓';
  document.querySelector('#complete-lesson').disabled = done;
  renderCurriculum();
}

document.querySelector('#complete-lesson').addEventListener('click', () => { if (!courseState.completed.includes(lessons[currentIndex].id)) courseState.completed.push(lessons[currentIndex].id); courseState.last = lessons[currentIndex].id; persist(); window.CendekiaProgress?.recordActivity('lesson', lessons[currentIndex].title, { course: course.title }); render(); document.querySelector('.toast').textContent = 'Progres tersimpan.'; document.querySelector('.toast').classList.add('is-visible'); window.setTimeout(() => document.querySelector('.toast').classList.remove('is-visible'), 2200); });
document.querySelector('#previous-lesson').addEventListener('click', () => { currentIndex -= 1; render(); });
document.querySelector('#next-lesson').addEventListener('click', () => { currentIndex += 1; render(); });
document.querySelector('#curriculum-toggle').addEventListener('click', () => document.querySelector('#curriculum-sidebar').classList.toggle('is-open'));
render();
}

initializeLearningRoom().catch((error) => {
  const toast = document.querySelector('.toast');
  toast.textContent = error.message || 'Tidak dapat membuka ruang belajar.';
  toast.classList.add('is-visible');
});
