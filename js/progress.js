// Penjelasan variabel snapshot : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const snapshot = CendekiaProgress.snapshot();
// Penjelasan fungsi formatDate : Mengubah tanggal aktivitas menjadi format tanggal singkat bahasa Indonesia. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
// Penjelasan variabel formatDate : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
// Penjelasan variabel activityIcon : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const activityIcon = { lesson: '▣', quiz: '✦', project: '</>' };
// Penjelasan fungsi text : Mengatur teks sebuah elemen HTML berdasarkan ID-nya. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function text(id, value) {
  // Mengambil satu elemen pada dokumen berdasarkan selektor.
  document.querySelector(`#${id}`).textContent = value;
}
// Penjelasan fungsi renderStats : Mengisi elemen statistik dengan ringkasan progres belajar. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderStats() {
  // Penjelasan variabel stats : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const stats = snapshot.stats;
  text('stat-courses', stats.followedCourses);
  text('stat-lessons', stats.completedLessons);
  text('stat-quizzes', stats.quizzes);
  text('stat-average', `${stats.quizAverage}%`);
  text('stat-projects', stats.projects);
  text('stat-overall', `${stats.overall}%`);
  text('current-streak', `${snapshot.streak.current} hari`);
  text('longest-streak', `Terpanjang: ${snapshot.streak.longest} hari`);
}
// Penjelasan fungsi svgText : Membuat markup teks SVG dengan posisi, perataan, dan isi tertentu. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function svgText(x, y, value, anchor = 'middle') {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="#6D7B8C" font-size="11" font-family="Inter, sans-serif">${value}</text>`;
}
// Penjelasan fungsi renderActivityChart : Menggambar grafik jumlah aktivitas untuk tujuh hari terakhir. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderActivityChart() {
  // Penjelasan variabel svg : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const svg = document.querySelector('#activity-chart');
  // Penjelasan variabel days : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const days = [];
  // Mengulang pernyataan selama kondisi perulangan terpenuhi.
  for (let index = 6; index >= 0; index -= 1) {
    // Penjelasan variabel date : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - index);
    // Penjelasan variabel key : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const key = CendekiaProgress.dayKey(date);
    days.push({
      key,
      label: date.toLocaleDateString('id-ID', { weekday: 'short' }),
      count: snapshot.activities.filter((item) => item.date === key).length,
    });
  }
  // Penjelasan variabel max : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const max = Math.max(1, ...days.map((day) => day.count));
  // Penjelasan variabel bars : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const bars = days
    .map((day, index) => {
      // Penjelasan variabel x : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
      const x = 35 + index * 95;
      // Penjelasan variabel height : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
      const height = (day.count / max) * 145;
      return `<rect x="${x}" y="${175 - height}" width="46" height="${height || 3}" rx="5" fill="${day.count ? '#2563EB' : '#DCE5F0'}"/><text x="${x + 23}" y="198" text-anchor="middle" fill="#6D7B8C" font-size="10">${day.label}</text><text x="${x + 23}" y="${165 - height}" text-anchor="middle" fill="#142D4E" font-size="10">${day.count || ''}</text>`;
    })
    .join('');
  svg.innerHTML = `<line x1="20" y1="175" x2="700" y2="175" stroke="#E4EAF1"/>${bars}`;
  text('activity-total', `${snapshot.activities.length} aktivitas`);
}
// Penjelasan fungsi renderScoreChart : Menggambar grafik nilai dari riwayat kuis. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderScoreChart() {
  const svg = document.querySelector('#score-chart');
  // Penjelasan variabel values : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const values = snapshot.quizHistory.slice(0, 7).reverse();
  // Menjalankan langkah berikut hanya jika kondisi terpenuhi.
  if (!values.length) {
    svg.innerHTML = svgText(280, 115, 'Belum ada nilai kuis');
    return;
  }
  // Penjelasan variabel points : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const points = values
    .map((item, index) => `${45 + index * 75},${190 - item.percent * 1.45}`)
    .join(' ');
  svg.innerHTML = `<line x1="25" y1="190" x2="535" y2="190" stroke="#E4EAF1"/><polyline points="${points}" fill="none" stroke="#16A37A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${values.map((item, index) => `<circle cx="${45 + index * 75}" cy="${190 - item.percent * 1.45}" r="5" fill="#16A37A"/>${svgText(45 + index * 75, 215, `${item.percent}%`)}`).join('')}`;
}
// Penjelasan fungsi renderCourses : Merender daftar kelas atau ringkasan progres setiap kelas pada halaman. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderCourses() {
  document.querySelector('#course-progress-list').innerHTML = snapshot.courses.length
    ? snapshot.courses
        .map(
          (course) =>
            `<div class="course-progress-item"><div class="course-row"><strong>${course.title}</strong><span>${course.percent}%</span></div><div class="progress-track"><span style="width:${course.percent}%"></span></div><div class="course-progress-meta"><span>${course.completed} materi selesai</span><span>${course.remaining} tersisa</span></div></div>`,
        )
        .join('')
    : '<p class="activity-empty">Belum ada data kelas.</p>';
}
// Penjelasan fungsi renderCalendar : Membuat kalender bulan ini dan menandai tanggal aktivitas serta hari ini. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderCalendar() {
  // Penjelasan variabel now : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const now = new Date();
  // Penjelasan variabel year : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const year = now.getFullYear();
  // Penjelasan variabel month : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const month = now.getMonth();
  text('calendar-month', now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }));
  // Penjelasan variabel first : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const first = new Date(year, month, 1).getDay();
  // Penjelasan variabel total : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const total = new Date(year, month + 1, 0).getDate();
  // Penjelasan variabel cells : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const cells = [];
  for (let i = 0; i < first; i += 1)
    cells.push('<button class="is-empty" aria-hidden="true"></button>');
  for (let day = 1; day <= total; day += 1) {
    const date = CendekiaProgress.dayKey(new Date(year, month, day));
    // Penjelasan variabel today : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const today = date === CendekiaProgress.dayKey();
    cells.push(
      `<button class="${snapshot.activityDates.has(date) ? 'is-active ' : ''}${date === today ? 'is-today' : ''}" type="button" title="${snapshot.activityDates.has(date) ? 'Ada aktivitas' : 'Tidak ada aktivitas'}">${day}</button>`,
    );
  }
  document.querySelector('#calendar-grid').innerHTML = cells.join('');
}
// Penjelasan fungsi renderActivities : Menampilkan riwayat aktivitas terbaru sesuai filter yang dipilih. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderActivities(filter = 'all') {
  // Penjelasan variabel list : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const list = snapshot.activities
    .filter((item) => filter === 'all' || item.type === filter)
    .slice(0, 12);
  document.querySelector('#activity-history').innerHTML = list.length
    ? list
        .map(
          (item) =>
            `<div class="activity-history-item"><span class="activity-history-icon">${activityIcon[item.type] || '•'}</span><div><strong>${item.title}</strong><small>${formatDate(item.date)}${item.meta?.score ? ` · Nilai ${item.meta.score}` : ''}</small></div></div>`,
        )
        .join('')
    : '<p class="activity-empty">Belum ada aktivitas pada filter ini.</p>';
}
// Penjelasan fungsi renderAchievements : Menentukan status badge dan menampilkan pencapaian belajar. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderAchievements() {
  // Penjelasan variabel achievements : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const achievements = [
    {
      name: 'First Step',
      description: 'Menyelesaikan materi pertama',
      icon: '↗',
      open: snapshot.completedLessons >= 1,
    },
    {
      name: 'Consistent Learner',
      description: 'Aktif belajar selama 3 hari',
      icon: '✦',
      open: snapshot.streak.longest >= 3,
    },
    {
      name: 'Quiz Master',
      description: 'Mendapat nilai minimal 80%',
      icon: '★',
      open: snapshot.quizHistory.some((item) => item.percent >= 80),
    },
    {
      name: 'Code Explorer',
      description: 'Menyimpan proyek Coding Playground',
      icon: '</>',
      open: snapshot.projects.length >= 1,
    },
    {
      name: 'Knowledge Seeker',
      description: 'Menyelesaikan 3 kelas',
      icon: '⌘',
      open: snapshot.courses.filter((course) => course.percent === 100).length >= 3,
    },
  ];
  // Penjelasan variabel opened : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const opened = achievements.filter((item) => item.open).length;
  text('achievement-count', `${opened}/${achievements.length}`);
  document.querySelector('#achievement-list').innerHTML = achievements
    .map(
      (item) =>
        `<div class="achievement-item ${item.open ? '' : 'is-locked'}"><span class="achievement-icon">${item.icon}</span><div><strong>${item.name}</strong><small>${item.description}</small></div><span class="achievement-date">${item.open ? 'Terbuka' : 'Terkunci'}</span></div>`,
    )
    .join('');
}
renderStats();
renderActivityChart();
renderScoreChart();
renderCourses();
renderCalendar();
renderActivities();
renderAchievements();
document
  .querySelector('#activity-filter')
  .addEventListener('change', (event) => renderActivities(event.target.value));
