function readProgress() {
  return JSON.parse(localStorage.getItem('cendekiaProgress') || '{}');
}

function saveProgress(progress) {
  localStorage.setItem('cendekiaProgress', JSON.stringify(progress));
}

function courseProgress(course) {
  const progress = readProgress()[course.id] || { completed: [] };
  const lessons = getLessonList(course);
  return { completed: progress.completed || [], percent: lessons.length ? Math.round((progress.completed || []).length / lessons.length * 100) : 0, last: progress.last || lessons[0].id };
}

const profile = JSON.parse(localStorage.getItem('cendekiaProfile') || '{"name":"Pelajar"}');
const displayName = profile.name || profile.username || 'Pelajar';
document.querySelector('#student-name').textContent = displayName.split(' ')[0];
document.querySelector('#profile-name').textContent = displayName;
document.querySelector('#profile-avatar').textContent = displayName.charAt(0).toUpperCase();
document.querySelector('#profile-card-name').textContent = displayName;

const progress = readProgress();
const followed = learningCourses.filter((course) => progress[course.id]);
const visibleCourses = followed.length ? followed : learningCourses.slice(0, 3);
const totalLessons = learningCourses.reduce((sum, course) => sum + getLessonList(course).length, 0);
const completedLessons = Object.values(progress).reduce((sum, item) => sum + (item.completed || []).length, 0);
document.querySelector('#class-count').textContent = followed.length || 3;
document.querySelector('#completed-count').textContent = completedLessons;
document.querySelector('#activity-count').textContent = completedLessons + followed.length;
document.querySelector('#overall-progress').textContent = `${Math.round(completedLessons / totalLessons * 100)}%`;

function courseCard(course) {
  const state = courseProgress(course);
  const lessons = getLessonList(course);
  return `<article class="learning-course-card"><img src="${course.image}" alt=""><div class="learning-course-body"><div class="course-card-heading"><div><p class="course-label">${course.category}</p><h3>${course.title}</h3></div><span class="course-percent">${state.percent}%</span></div><p>${course.description}</p><div class="progress-track"><span style="width:${state.percent}%"></span></div><div class="course-card-footer"><span>${state.completed.length} dari ${lessons.length} materi selesai</span><a class="text-link" href="learning.html?course=${course.id}">Lanjutkan <span>↗</span></a></div></div></article>`;
}
document.querySelector('#my-course-list').innerHTML = visibleCourses.map(courseCard).join('');
const continueCourse = followed.find((course) => courseProgress(course).percent < 100) || visibleCourses[0];
document.querySelector('#continue-button').href = `learning.html?course=${continueCourse.id}`;

document.querySelector('#recommendation-list').innerHTML = learningCourses.filter((course) => !followed.includes(course)).slice(0, 3).map((course) => `<a class="recommendation-item" href="learning.html?course=${course.id}"><span class="recommendation-icon ${course.color}">&lt;/&gt;</span><span><strong>${course.title}</strong><small>${course.level} · ${getLessonList(course).length} materi</small></span><b>↗</b></a>`).join('');
const activities = Object.entries(progress).flatMap(([courseId, item]) => (item.completed || []).slice(-2).map((lessonId) => ({ course: getCourse(courseId), lesson: getLessonList(getCourse(courseId)).find((lesson) => lesson.id === lessonId) }))).filter((item) => item.lesson).slice(-4).reverse();
document.querySelector('#activity-list').innerHTML = activities.length ? activities.map((item) => `<div class="activity-item"><span class="activity-dot"></span><div><strong>Menyelesaikan ${item.lesson.title}</strong><small>${item.course.title} · Baru saja</small></div></div>`).join('') : '<div class="empty-activity"><span>✦</span><p>Belum ada aktivitas. Mulai satu materi hari ini!</p></div>';

document.querySelector('#logout-button').addEventListener('click', () => {
  sessionStorage.removeItem('cendekiaSession');
  window.location.href = 'login.html';
});

document.querySelector('#student-menu').addEventListener('click', () => {
  document.querySelector('#student-sidebar').classList.toggle('is-open');
});
