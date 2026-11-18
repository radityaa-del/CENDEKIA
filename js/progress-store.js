// Penjelasan fungsi CendekiaProgress: Membuat layanan bersama untuk pencatatan dan perhitungan progres belajar. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
const CendekiaProgress = (() => {
  // Penjelasan fungsi read: Membaca dan mengurai data localStorage, atau memakai nilai cadangan jika gagal. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  const read = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  };

  // Penjelasan fungsi dayKey: Mengubah tanggal ke format kunci YYYY-MM-DD berdasarkan tanggal lokal. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  const dayKey = (date = new Date()) => {
    const local = new Date(date);
    return `${local.getFullYear()}-${String(local.getMonth() + 1).padStart(2, '0')}-${String(local.getDate()).padStart(2, '0')}`;
  };

  // Penjelasan fungsi readActivities: Membaca daftar aktivitas dan memastikan hasilnya berupa array. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function readActivities() {
    const activities = read('cendekiaActivityLog', []);
    return Array.isArray(activities) ? activities : [];
  }

  // Penjelasan fungsi recordActivity: Mencatat aktivitas belajar baru tanpa duplikasi aktivitas harian. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function recordActivity(type, title, meta = {}) {
    const activities = readActivities();

    const entry = { id: Date.now(), type, title, meta, date: dayKey() };

    if (
      !activities.some(
        (item) => item.type === type && item.title === title && item.date === entry.date,
      )
    ) {
      activities.unshift(entry);

      localStorage.setItem('cendekiaActivityLog', JSON.stringify(activities.slice(0, 120)));
    }
  }

  // Penjelasan fungsi snapshot: Menyusun ringkasan kelas, aktivitas, kuis, proyek, statistik, dan streak belajar. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function snapshot() {
    const progress = read('cendekiaProgress', {});

    const quizHistory = read('cendekiaQuizHistory', []);

    const projects = read('cendekiaPlaygroundProjects', []);
    const activities = readActivities();

    const courses =
      typeof learningCourses === 'undefined'
        ? []
        : learningCourses.map((course) => {
            const lessons = getLessonList(course);

            const completed = progress[course.id]?.completed || [];
            return {
              ...course,
              total: lessons.length,
              completed: completed.length,
              remaining: Math.max(0, lessons.length - completed.length),
              percent: lessons.length ? Math.round((completed.length / lessons.length) * 100) : 0,
            };
          });

    const activityDates = new Set(activities.map((item) => item.date));

    const quizAverage = quizHistory.length
      ? Math.round(quizHistory.reduce((sum, item) => sum + item.percent, 0) / quizHistory.length)
      : 0;

    const completedLessons = courses.reduce((sum, course) => sum + course.completed, 0);

    const totalLessons = courses.reduce((sum, course) => sum + course.total, 0);

    const streak = calculateStreak(activityDates);
    return {
      courses,
      quizHistory,
      projects,
      activities,
      activityDates,
      completedLessons,
      totalLessons,
      quizAverage,
      streak,
      stats: {
        followedCourses: courses.filter((course) => course.completed > 0).length,
        completedLessons,
        quizzes: quizHistory.length,
        quizAverage,
        projects: projects.length,
        overall: totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0,
      },
    };
  }

  // Penjelasan fungsi calculateStreak: Menghitung rangkaian hari belajar saat ini serta rangkaian terpanjang. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function calculateStreak(dateSet) {
    const today = new Date();

    let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    let current = 0;

    while (dateSet.has(dayKey(cursor))) {
      current += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    let longest = 0;

    let run = 0;

    const dates = [...dateSet].sort();
    dates.forEach((date, index) => {
      if (
        index &&
        Math.round(
          (new Date(`${date}T00:00:00`) - new Date(`${dates[index - 1]}T00:00:00`)) / 86400000,
        ) === 1
      )
        run += 1;
      else run = 1;
      longest = Math.max(longest, run);
    });
    return { current, longest };
  }
  return { dayKey, readActivities, recordActivity, snapshot };
})();
window.CendekiaProgress = CendekiaProgress;
