// Penjelasan fungsi CendekiaProgress : Membuat layanan bersama untuk pencatatan dan perhitungan progres belajar. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
// Penjelasan variabel CendekiaProgress : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const CendekiaProgress = (() => {
  // Penjelasan fungsi read : Membaca dan mengurai data localStorage, atau memakai nilai cadangan jika gagal. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  // Penjelasan variabel read : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const read = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  };
  // Penjelasan fungsi dayKey : Mengubah tanggal ke format kunci YYYY-MM-DD berdasarkan tanggal lokal. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  // Penjelasan variabel dayKey : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const dayKey = (date = new Date()) => {
    // Penjelasan variabel local : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const local = new Date(date);
    return `${local.getFullYear()}-${String(local.getMonth() + 1).padStart(2, '0')}-${String(local.getDate()).padStart(2, '0')}`;
  };
  // Penjelasan fungsi readActivities : Membaca daftar aktivitas dan memastikan hasilnya berupa array. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function readActivities() {
    // Penjelasan variabel activities : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const activities = read('cendekiaActivityLog', []);
    return Array.isArray(activities) ? activities : [];
  }
  // Penjelasan fungsi recordActivity : Mencatat aktivitas belajar baru tanpa duplikasi aktivitas harian. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function recordActivity(type, title, meta = {}) {
    const activities = readActivities();
    // Penjelasan variabel entry : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const entry = { id: Date.now(), type, title, meta, date: dayKey() };
    // Menjalankan langkah berikut hanya jika kondisi terpenuhi.
    if (
      !activities.some(
        (item) => item.type === type && item.title === title && item.date === entry.date,
      )
    ) {
      activities.unshift(entry);
      // Membaca atau menyimpan data secara lokal pada browser.
      localStorage.setItem('cendekiaActivityLog', JSON.stringify(activities.slice(0, 120)));
    }
  }
  // Penjelasan fungsi snapshot : Menyusun ringkasan kelas, aktivitas, kuis, proyek, statistik, dan streak belajar. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function snapshot() {
    // Penjelasan variabel progress : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const progress = read('cendekiaProgress', {});
    // Penjelasan variabel quizHistory : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const quizHistory = read('cendekiaQuizHistory', []);
    // Penjelasan variabel projects : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const projects = read('cendekiaPlaygroundProjects', []);
    const activities = readActivities();
    // Penjelasan variabel courses : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const courses =
      typeof learningCourses === 'undefined'
        ? []
        : learningCourses.map((course) => {
            // Penjelasan variabel lessons : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
            const lessons = getLessonList(course);
            // Penjelasan variabel completed : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
            const completed = progress[course.id]?.completed || [];
            return {
              ...course,
              total: lessons.length,
              completed: completed.length,
              remaining: Math.max(0, lessons.length - completed.length),
              percent: lessons.length ? Math.round((completed.length / lessons.length) * 100) : 0,
            };
          });
    // Penjelasan variabel activityDates : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const activityDates = new Set(activities.map((item) => item.date));
    // Penjelasan variabel quizAverage : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const quizAverage = quizHistory.length
      ? Math.round(quizHistory.reduce((sum, item) => sum + item.percent, 0) / quizHistory.length)
      : 0;
    // Penjelasan variabel completedLessons : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const completedLessons = courses.reduce((sum, course) => sum + course.completed, 0);
    // Penjelasan variabel totalLessons : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const totalLessons = courses.reduce((sum, course) => sum + course.total, 0);
    // Penjelasan variabel streak : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
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
  // Penjelasan fungsi calculateStreak : Menghitung rangkaian hari belajar saat ini serta rangkaian terpanjang. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function calculateStreak(dateSet) {
    // Penjelasan variabel today : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const today = new Date();
    // Penjelasan variabel cursor : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
    let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // Penjelasan variabel current : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
    let current = 0;
    // Mengulang pernyataan selama kondisi bernilai benar.
    while (dateSet.has(dayKey(cursor))) {
      current += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    // Penjelasan variabel longest : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
    let longest = 0;
    // Penjelasan variabel run : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
    let run = 0;
    // Penjelasan variabel dates : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
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
