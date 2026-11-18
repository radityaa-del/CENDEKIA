// Penjelasan fungsi initializeDashboard : Memuat sesi pengguna, progres kelas, statistik, dan aktivitas dashboard. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
async function initializeDashboard() {
  // Penjelasan variabel user : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
  let user;
  try {
    user = await window.CendekiaAuth.requireUser();
  } catch (error) {
    // Penjelasan variabel toast : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const toast = document.querySelector('.toast');
    toast.textContent = error.message || 'Tidak dapat memeriksa sesi akun.';
    toast.classList.add('is-visible');
    return;
  }
  // Menjalankan langkah berikut hanya jika kondisi terpenuhi.
  if (!user) return;

  // Penjelasan fungsi readProgress : Membaca data progres kelas dari localStorage. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function readProgress() {
    return JSON.parse(localStorage.getItem('cendekiaProgress') || '{}');
  }

  // Penjelasan fungsi courseProgress : Menghitung materi selesai, materi tersisa, materi terakhir, dan persen progres kelas. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function courseProgress(course) {
    // Penjelasan variabel lessons : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const lessons = getLessonList(course);
    // Penjelasan variabel saved : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const saved = readProgress()[course.id] || {};
    // Penjelasan variabel lessonIds : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const lessonIds = new Set(lessons.map((lesson) => lesson.id));
    // Penjelasan variabel completed : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const completed = Array.isArray(saved.completed)
      ? [...new Set(saved.completed.filter((lessonId) => lessonIds.has(lessonId)))]
      : [];
    // Penjelasan variabel last : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const last = lessons.some((lesson) => lesson.id === saved.last) ? saved.last : lessons[0].id;
    return {
      completed,
      percent: lessons.length ? Math.round((completed.length / lessons.length) * 100) : 0,
      last,
    };
  }

  // Penjelasan variabel metadata : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const metadata = user.user_metadata || {};
  // Penjelasan variabel displayName : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const displayName = metadata.display_name || metadata.username || user.email || 'Pelajar';
  // Mengambil satu elemen pada dokumen berdasarkan selektor.
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

  // Penjelasan variabel progress : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const progress = readProgress();
  // Penjelasan variabel followed : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const followed = learningCourses.filter((course) => progress[course.id]);
  // Penjelasan variabel visibleCourses : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const visibleCourses = followed;
  // Penjelasan variabel totalLessons : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const totalLessons = learningCourses.reduce(
    (sum, course) => sum + getLessonList(course).length,
    0,
  );
  // Penjelasan variabel completedLessons : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const completedLessons = learningCourses.reduce(
    (sum, course) => sum + courseProgress(course).completed.length,
    0,
  );
  // Penjelasan variabel activities : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const activities = window.CendekiaProgress.readActivities();
  document.querySelector('#class-count').textContent = followed.length;
  document.querySelector('#completed-count').textContent = completedLessons;
  document.querySelector('#activity-count').textContent = activities.length;
  document.querySelector('#overall-progress').textContent =
    `${Math.round((completedLessons / totalLessons) * 100)}%`;

  // Penjelasan fungsi courseCard : Membentuk HTML kartu kelas beserta ringkasan materi dan tautannya. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function courseCard(course) {
    // Penjelasan variabel state : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const state = courseProgress(course);
    const lessons = getLessonList(course);
    return `<article class="learning-course-card"><img src="${course.image}" alt=""><div class="learning-course-body"><div class="course-card-heading"><div><p class="course-label">${course.category}</p><h3>${course.title}</h3></div><span class="course-percent">${state.percent}%</span></div><p>${course.description}</p><div class="progress-track"><span style="width:${state.percent}%"></span></div><div class="course-card-footer"><span>${state.completed.length} dari ${lessons.length} materi selesai</span><a class="text-link" href="learning.html?course=${course.id}">Lanjutkan <span>↗</span></a></div></div></article>`;
  }
  document.querySelector('#my-course-list').innerHTML = visibleCourses.length
    ? visibleCourses.map(courseCard).join('')
    : '<div class="empty-activity"><span>✦</span><p>Belum ada kelas yang dimulai. <a class="text-link" href="catalog.html">Jelajahi kelas ↗</a></p></div>';
  // Penjelasan variabel continueCourse : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const continueCourse =
    followed.find((course) => courseProgress(course).percent < 100) || visibleCourses[0];
  // Penjelasan variabel continueButton : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
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
  // Penjelasan variabel activityLabels : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const activityLabels = {
    lesson: 'Menyelesaikan materi',
    quiz: 'Aktivitas kuis',
    project: 'Menyimpan proyek',
  };
  document.querySelector('#activity-list').innerHTML = activities.length
    ? activities
        .slice(0, 4)
        .map((activity) => {
          // Penjelasan variabel date : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
          const date = new Date(`${activity.date}T00:00:00`).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
          });
          // Penjelasan variabel title : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
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
