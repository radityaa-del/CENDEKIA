// Deskripsi initializeDashboard: Memuat sesi pengguna, progres kelas, statistik, dan aktivitas dashboard.
async function initializeDashboard() {
  let user;
  try {
    user = await window.CendekiaAuth.requireUser();
  } catch (error) {
    const toast = document.querySelector('.toast');
    toast.textContent = error.message || 'Tidak dapat memeriksa sesi akun.';
    toast.classList.add('is-visible');
    return;
  }
  if (!user) return;

  // Deskripsi readProgress: Membaca data progres kelas dari localStorage.
  function readProgress() {
    return JSON.parse(localStorage.getItem('cendekiaProgress') || '{}');
  }

  // Deskripsi courseProgress: Menghitung materi selesai, materi tersisa, materi terakhir, dan persen progres kelas.
  function courseProgress(course) {
    const lessons = getLessonList(course);
    const saved = readProgress()[course.id] || {};
    const lessonIds = new Set(lessons.map((lesson) => lesson.id));
    const completed = Array.isArray(saved.completed)
      ? [...new Set(saved.completed.filter((lessonId) => lessonIds.has(lessonId)))]
      : [];
    const last = lessons.some((lesson) => lesson.id === saved.last) ? saved.last : lessons[0].id;
    return {
      completed,
      percent: lessons.length ? Math.round((completed.length / lessons.length) * 100) : 0,
      last,
    };
  }

  const metadata = user.user_metadata || {};
  const displayName = metadata.display_name || metadata.username || user.email || 'Pelajar';
  document.querySelector('#dashboard-date').textContent = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  document.querySelector('#student-name').textContent = displayName.split(' ')[0];
  document.querySelector('#profile-name').textContent = displayName;
  document.querySelector('#profile-avatar').textContent = displayName.charAt(0).toUpperCase();
  document.querySelector('#profile-card-name').textContent = displayName;

  const progress = readProgress();
  const followed = learningCourses.filter((course) => progress[course.id]);
  const visibleCourses = followed;
  const totalLessons = learningCourses.reduce(
    (sum, course) => sum + getLessonList(course).length,
    0,
  );
  const completedLessons = learningCourses.reduce(
    (sum, course) => sum + courseProgress(course).completed.length,
    0,
  );
  const activities = window.CendekiaProgress.readActivities();
  document.querySelector('#class-count').textContent = followed.length;
  document.querySelector('#completed-count').textContent = completedLessons;
  document.querySelector('#activity-count').textContent = activities.length;
  document.querySelector('#overall-progress').textContent =
    `${Math.round((completedLessons / totalLessons) * 100)}%`;

  // Deskripsi courseCard: Membentuk HTML kartu kelas beserta ringkasan materi dan tautannya.
  function courseCard(course) {
    const state = courseProgress(course);
    const lessons = getLessonList(course);
    return `<article class="learning-course-card"><img src="${course.image}" alt=""><div class="learning-course-body"><div class="course-card-heading"><div><p class="course-label">${course.category}</p><h3>${course.title}</h3></div><span class="course-percent">${state.percent}%</span></div><p>${course.description}</p><div class="progress-track"><span style="width:${state.percent}%"></span></div><div class="course-card-footer"><span>${state.completed.length} dari ${lessons.length} materi selesai</span><a class="text-link" href="learning.html?course=${course.id}">Lanjutkan <span>↗</span></a></div></div></article>`;
  }
  document.querySelector('#my-course-list').innerHTML = visibleCourses.length
    ? visibleCourses.map(courseCard).join('')
    : '<div class="empty-activity"><span>✦</span><p>Belum ada kelas yang dimulai. <a class="text-link" href="catalog.html">Jelajahi kelas ↗</a></p></div>';
  const continueCourse =
    followed.find((course) => courseProgress(course).percent < 100) || visibleCourses[0];
  const continueButton = document.querySelector('#continue-button');
  if (continueCourse) {
    continueButton.href = `learning.html?course=${continueCourse.id}`;
    continueButton.innerHTML = 'Lanjutkan pembelajaran <span>↗</span>';
  } else {
    continueButton.href = 'catalog.html';
    continueButton.innerHTML = 'Jelajahi kelas <span>↗</span>';
  }

  document.querySelector('#recommendation-list').innerHTML = learningCourses
    .filter((course) => !followed.includes(course))
    .slice(0, 3)
    .map(
      (course) =>
        `<a class="recommendation-item" href="learning.html?course=${course.id}"><span class="recommendation-icon ${course.color}">&lt;/&gt;</span><span><strong>${course.title}</strong><small>${course.level} · ${getLessonList(course).length} materi</small></span><b>↗</b></a>`,
    )
    .join('');
  const activityLabels = {
    lesson: 'Menyelesaikan materi',
    quiz: 'Aktivitas kuis',
    project: 'Menyimpan proyek',
  };
  document.querySelector('#activity-list').innerHTML = activities.length
    ? activities
        .slice(0, 4)
        .map((activity) => {
          const date = new Date(`${activity.date}T00:00:00`).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
          });
          const title = String(activity.title).replace(
            /[&<>"']/g,
            (character) =>
              ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
              })[character],
          );
          return `<div class="activity-item"><span class="activity-dot"></span><div><strong>${activityLabels[activity.type] || 'Aktivitas belajar'}: ${title}</strong><small>${activity.meta?.course || date} · ${date}</small></div></div>`;
        })
        .join('')
    : '<div class="empty-activity"><span>✦</span><p>Belum ada aktivitas. Mulai satu materi hari ini!</p></div>';

  document.querySelector('#logout-button').addEventListener('click', () => {
    window.CendekiaAuth.signOut().catch((error) => {
      const toast = document.querySelector('.toast');
      toast.textContent = error.message || 'Tidak dapat keluar dari akun.';
      toast.classList.add('is-visible');
    });
  });

  document.querySelector('#student-menu').addEventListener('click', () => {
    document.querySelector('#student-sidebar').classList.toggle('is-open');
  });
}

initializeDashboard();
