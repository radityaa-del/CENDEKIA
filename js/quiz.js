// Penjelasan variabel quizLibrary : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const quizLibrary = document.querySelector('#quiz-library');
// Penjelasan variabel quizPlayer : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const quizPlayer = document.querySelector('#quiz-player');
// Penjelasan variabel quizResult : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const quizResult = document.querySelector('#quiz-result');
// Penjelasan variabel quizCardGrid : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const quizCardGrid = document.querySelector('#quiz-card-grid');
// Penjelasan variabel categoryFilters : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const categoryFilters = document.querySelector('#category-filters');
// Penjelasan variabel toast : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const toast = document.querySelector('.toast');
// Penjelasan variabel selectedCategory : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
let selectedCategory = 'all';
// Penjelasan variabel activeQuiz : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
let activeQuiz = null;
// Penjelasan variabel activeIndex : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
let activeIndex = 0;
// Penjelasan variabel answers : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
let answers = {};
// Penjelasan variabel startedAt : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
let startedAt = null;
// Penjelasan variabel submitted : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
let submitted = false;
// Penjelasan variabel toastTimer : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
let toastTimer;

// Penjelasan variabel typeLabels : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const typeLabels = {
  mcq: 'Pilihan ganda',
  truefalse: 'Benar atau salah',
  short: 'Jawaban singkat',
  code: 'Lengkapi kode',
  output: 'Analisis output',
};
// Penjelasan fungsi difficultyClass : Membentuk nama kelas CSS dari tingkat kesulitan soal. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
// Penjelasan variabel difficultyClass : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const difficultyClass = (difficulty) => `difficulty-${difficulty.toLowerCase()}`;
// Penjelasan fungsi showToast : Menampilkan pesan sementara pada notifikasi halaman. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
}
// Penjelasan fungsi getHistory : Membaca riwayat kuis dari localStorage. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function getHistory() {
  return JSON.parse(localStorage.getItem('cendekiaQuizHistory') || '[]');
}
// Penjelasan fungsi saveHistory : Menyimpan riwayat hasil kuis ke localStorage. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function saveHistory(history) {
  // Membaca atau menyimpan data secara lokal pada browser.
  localStorage.setItem('cendekiaQuizHistory', JSON.stringify(history));
}
// Penjelasan fungsi quizForCategory : Memilih soal yang termasuk dalam kategori kuis tertentu. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function quizForCategory(category) {
  return quizBank.filter((question) => question.category === category);
}
// Penjelasan fungsi categoryInfo : Mencari label dan informasi kategori berdasarkan ID. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function categoryInfo(id) {
  return quizCategories.find((category) => category.id === id);
}
// Penjelasan fungsi renderFilters : Membuat tombol untuk semua kategori kuis. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderFilters() {
  categoryFilters.innerHTML = `<button class="category-filter is-active" type="button" data-category="all">Semua</button>${quizCategories.map((category) => `<button class="category-filter" type="button" data-category="${category.id}">${category.label}</button>`).join('')}`;
}
// Penjelasan fungsi renderLibrary : Merender kartu kuis sesuai filter dan memperbarui ringkasan riwayat. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderLibrary() {
  // Penjelasan variabel visibleCategories : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const visibleCategories =
    selectedCategory === 'all'
      ? quizCategories
      : quizCategories.filter((category) => category.id === selectedCategory);
  // Penjelasan variabel history : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const history = getHistory();
  quizCardGrid.innerHTML = visibleCategories
    .map((category) => {
      // Penjelasan variabel info : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
      const info = history.find((item) => item.category === category.id);
      return `<article class="quiz-card"><div class="quiz-card-top"><span class="quiz-card-icon">${category.icon}</span><span class="quiz-status">${info ? `Terakhir: ${info.score}` : 'Belum dikerjakan'}</span></div><h2>${category.label}</h2><p>${category.description}</p><div class="quiz-meta"><span>${quizForCategory(category.id).length} soal</span><span>${quizForCategory(category.id).some((item) => item.difficulty === 'Sulit') ? '15-20 menit' : '10-15 menit'}</span><span class="difficulty difficulty-${info?.difficulty?.toLowerCase() || 'mudah'}">${info ? `${info.percent}%` : 'Mudah'}</span></div><button class="button button-primary start-quiz" type="button" data-category="${category.id}">${info ? 'Ulangi latihan' : 'Mulai latihan'} <span>↗</span></button></article>`;
    })
    .join('');
  // Mengambil satu elemen pada dokumen berdasarkan selektor.
  document.querySelector('#history-count').textContent = history.length;
  renderHistory();
}
// Penjelasan fungsi renderHistory : Menampilkan beberapa hasil kuis terakhir atau pesan riwayat kosong. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderHistory() {
  // Penjelasan variabel historyList : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const historyList = document.querySelector('#history-list');
  const history = getHistory();
  historyList.innerHTML = history.length
    ? history
        .slice(0, 8)
        .map(
          (item) =>
            `<div class="history-row"><div><strong>${item.title}</strong><small>${item.correct} benar dari ${item.total} soal</small></div><strong class="history-score">${item.score}</strong><span class="history-percent">${item.percent}%</span><span class="history-date">${item.date}</span></div>`,
        )
        .join('')
    : '<p class="empty-history">Belum ada latihan yang diselesaikan.</p>';
}
// Penjelasan fungsi openQuiz : Menginisialisasi percobaan baru dan membuka tampilan soal kategori terpilih. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function openQuiz(category) {
  activeQuiz = quizForCategory(category);
  activeIndex = 0;
  answers = {};
  submitted = false;
  startedAt = Date.now();
  document.querySelector('#player-category').textContent = categoryInfo(category).label;
  document.querySelector('#player-title').textContent = `${categoryInfo(category).label} · Latihan`;
  quizLibrary.classList.add('is-hidden');
  quizResult.classList.add('is-hidden');
  quizPlayer.classList.remove('is-hidden');
  renderQuestionMap();
  renderQuestion();
}
// Penjelasan fungsi renderQuestionMap : Menampilkan tombol navigasi soal dan jumlah jawaban yang telah diisi. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderQuestionMap() {
  document.querySelector('#question-map').innerHTML = activeQuiz
    .map(
      (question, index) =>
        `<button type="button" class="${index === activeIndex ? 'is-current' : ''} ${answers[question.id] !== undefined ? 'is-answered' : ''}" data-question-index="${index}" aria-label="Buka soal ${index + 1}">${index + 1}</button>`,
    )
    .join('');
  document.querySelector('#answered-count').textContent =
    `${Object.keys(answers).length}/${activeQuiz.length}`;
}
// Penjelasan fungsi renderQuestion : Menampilkan soal aktif, pilihan input, progres, dan tombol navigasi. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderQuestion() {
  // Penjelasan variabel question : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const question = activeQuiz[activeIndex];
  document.querySelector('#question-counter').textContent =
    `${activeIndex + 1} / ${activeQuiz.length}`;
  document.querySelector('#quiz-progress-line').style.width =
    `${((activeIndex + 1) / activeQuiz.length) * 100}%`;
  document.querySelector('#question-type').textContent = typeLabels[question.type];
  document.querySelector('#question-difficulty').textContent = question.difficulty;
  document.querySelector('#question-difficulty').className =
    `difficulty-pill ${difficultyClass(question.difficulty)}`;
  document.querySelector('#question-text').textContent = question.question;
  document.querySelector('#question-instruction').textContent = question.instruction;
  document.querySelector('#answer-area').innerHTML = answerMarkup(question);
  document.querySelector('#previous-question').disabled = activeIndex === 0;
  document
    .querySelector('#next-question')
    .classList.toggle('is-hidden', activeIndex === activeQuiz.length - 1);
  document
    .querySelector('#submit-quiz')
    .classList.toggle('is-hidden', activeIndex !== activeQuiz.length - 1);
}
// Penjelasan fungsi answerMarkup : Menghasilkan jenis input jawaban yang sesuai dengan tipe soal. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function answerMarkup(question) {
  // Menjalankan langkah berikut hanya jika kondisi terpenuhi.
  if (['mcq', 'truefalse', 'output'].includes(question.type))
    return question.options
      .map(
        (option, index) =>
          `<label class="answer-option"><input type="radio" name="answer" value="${index}" ${answers[question.id] === index ? 'checked' : ''}> <span>${option}</span></label>`,
      )
      .join('');
  if (question.type === 'code')
    return `<textarea class="code-field" id="written-answer" spellcheck="false" placeholder="Tulis potongan kode di sini...">${answers[question.id] || ''}</textarea>`;
  return `<input class="answer-field" id="written-answer" type="text" value="${answers[question.id] || ''}" placeholder="Tulis jawabanmu...">`;
}
// Penjelasan fungsi captureAnswer : Mengambil jawaban soal aktif, menyimpan draft, dan memperbarui peta soal. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function captureAnswer() {
  const question = activeQuiz[activeIndex];
  // Penjelasan variabel selected : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const selected = document.querySelector('input[name="answer"]:checked');
  // Penjelasan variabel written : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const written = document.querySelector('#written-answer');
  if (selected) answers[question.id] = Number(selected.value);
  // Menguji kondisi alternatif setelah kondisi sebelumnya tidak terpenuhi.
  else if (written) answers[question.id] = written.value;
  localStorage.setItem(
    'cendekiaQuizDraft',
    JSON.stringify({ category: question.category, answers }),
  );
  renderQuestionMap();
}
// Penjelasan fungsi normalize : Menormalkan teks jawaban dengan mengabaikan kapital, tanda baca, dan spasi berlebih. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[“”"'`.;,:!?()[\]{}]/g, '')
    .replace(/\s+/g, ' ');
}
// Penjelasan fungsi isCorrect : Membandingkan jawaban pilihan atau teks dengan kunci jawaban yang diterima. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function isCorrect(question, value) {
  if (value === undefined || value === '') return false;
  if (typeof question.answer === 'number') return Number(value) === question.answer;
  return question.answer.some(
    (accepted) => normalize(value).replace(/\s/g, '') === normalize(accepted).replace(/\s/g, ''),
  );
}
// Penjelasan fungsi escapeHtml : Mengubah karakter khusus HTML menjadi entitas teks yang aman. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function escapeHtml(value) {
  return String(value ?? '').replace(
    /[&<>'"]/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character],
  );
}
// Penjelasan fungsi submitQuiz : Memvalidasi konfirmasi, menghitung nilai, menyimpan hasil, dan membuka pembahasan. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function submitQuiz() {
  if (submitted) return;
  captureAnswer();
  // Penjelasan variabel unanswered : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const unanswered = activeQuiz.filter(
    (question) => answers[question.id] === undefined || answers[question.id] === '',
  ).length;
  if (
    unanswered &&
    !window.confirm(`Masih ada ${unanswered} soal yang belum dijawab. Tetap kumpulkan?`)
  )
    return;
  if (
    !window.confirm('Kumpulkan jawaban sekarang? Nilai akan dihitung dan percobaan ini disimpan.')
  )
    return;
  submitted = true;
  // Penjelasan variabel correct : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const correct = activeQuiz.filter((question) => isCorrect(question, answers[question.id])).length;
  // Penjelasan variabel seconds : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const seconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
  // Penjelasan variabel result : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const result = {
    id: Date.now(),
    category: activeQuiz[0].category,
    title: categoryInfo(activeQuiz[0].category).label,
    total: activeQuiz.length,
    correct,
    wrong: activeQuiz.length - correct,
    percent: Math.round((correct / activeQuiz.length) * 100),
    score: `${correct * 10}/100`,
    seconds,
    difficulty: activeQuiz.reduce(
      (highest, question) => (question.difficulty === 'Sulit' ? 'Sulit' : highest),
      'Mudah',
    ),
    date: new Date().toLocaleDateString('id-ID'),
    answers: { ...answers },
  };
  const history = getHistory().filter((item) => item.category !== result.category);
  history.unshift(result);
  saveHistory(history);
  window.CendekiaProgress?.recordActivity('quiz', `${result.title} selesai`, {
    score: result.score,
  });
  localStorage.removeItem('cendekiaQuizDraft');
  renderResult(result);
}
// Penjelasan fungsi renderResult : Menampilkan nilai, durasi, rekomendasi, serta ulasan tiap jawaban. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function renderResult(result) {
  quizPlayer.classList.add('is-hidden');
  quizResult.classList.remove('is-hidden');
  document.querySelector('#result-score').textContent = result.score;
  document.querySelector('#result-correct').textContent = result.correct;
  document.querySelector('#result-wrong').textContent = result.wrong;
  document.querySelector('#result-percent').textContent = `${result.percent}%`;
  document.querySelector('#result-time').textContent =
    `${Math.floor(result.seconds / 60)}m ${result.seconds % 60}s`;
  document.querySelector('#result-progress-label').textContent =
    `${result.correct} dari ${result.total} soal benar`;
  document.querySelector('#result-progress-bar').style.width = `${result.percent}%`;
  document.querySelector('#result-message').textContent =
    result.percent >= 80
      ? 'Keren, pemahamanmu sudah kuat. Siap mencoba tantangan berikutnya?'
      : 'Tidak apa-apa. Gunakan pembahasan untuk menemukan bagian yang perlu dikuatkan.';
  // Penjelasan variabel wrongQuestion : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const wrongQuestion = activeQuiz.find(
    (question) => !isCorrect(question, result.answers[question.id]),
  );
  document.querySelector('#recommendation-title').textContent = wrongQuestion
    ? wrongQuestion.recommendation
    : 'Pertahankan ritme belajarmu.';
  document.querySelector('#recommendation-text').textContent = wrongQuestion
    ? 'Mulai dari konsep yang direkomendasikan, lalu coba latihan ini lagi.'
    : 'Semua jawaban benar. Jelajahi kategori lain untuk memperluas kemampuanmu.';
  document.querySelector('#review-list').innerHTML = activeQuiz
    .map((question, index) => {
      const correct = isCorrect(question, result.answers[question.id]);
      // Penjelasan variabel given : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
      const given =
        typeof result.answers[question.id] === 'number' && question.options
          ? question.options[result.answers[question.id]]
          : result.answers[question.id] || 'Belum dijawab';
      // Penjelasan variabel answer : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
      const answer =
        typeof question.answer === 'number' && question.options
          ? question.options[question.answer]
          : question.answer[0];
      return `<article class="review-card ${correct ? '' : 'is-wrong'}"><span class="review-status">${correct ? '✓ Benar' : '× Perlu diulang'} · Soal ${index + 1}</span><h3>${escapeHtml(question.question.split('\n')[0])}</h3><p><strong>Jawabanmu:</strong> ${escapeHtml(given)}</p><p><strong>Jawaban benar:</strong> ${escapeHtml(answer)}</p><p>${escapeHtml(question.explanation)}</p></article>`;
    })
    .join('');
}
// Penjelasan fungsi returnToLibrary : Menutup tampilan hasil/kuis dan kembali ke daftar latihan. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function returnToLibrary() {
  quizResult.classList.add('is-hidden');
  quizPlayer.classList.add('is-hidden');
  quizLibrary.classList.remove('is-hidden');
  renderLibrary();
  // Mengubah navigasi, membuka tampilan, atau menggeser halaman.
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

renderFilters();
renderLibrary();
categoryFilters.addEventListener('click', (event) => {
  // Penjelasan variabel button : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const button = event.target.closest('[data-category]');
  if (!button) return;
  selectedCategory = button.dataset.category;
  document
    .querySelectorAll('.category-filter')
    .forEach((item) => item.classList.toggle('is-active', item === button));
  renderLibrary();
});
quizCardGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.start-quiz');
  if (button) openQuiz(button.dataset.category);
});
document.querySelector('#answer-area').addEventListener('change', captureAnswer);
document.querySelector('#answer-area').addEventListener('input', captureAnswer);
document.querySelector('#question-map').addEventListener('click', (event) => {
  const button = event.target.closest('[data-question-index]');
  if (button) {
    captureAnswer();
    activeIndex = Number(button.dataset.questionIndex);
    renderQuestion();
  }
});
document.querySelector('#previous-question').addEventListener('click', () => {
  captureAnswer();
  activeIndex = Math.max(0, activeIndex - 1);
  renderQuestion();
});
document.querySelector('#next-question').addEventListener('click', () => {
  captureAnswer();
  activeIndex = Math.min(activeQuiz.length - 1, activeIndex + 1);
  renderQuestion();
});
document.querySelector('#submit-quiz').addEventListener('click', submitQuiz);
document.querySelector('#exit-quiz').addEventListener('click', () => {
  if (
    !submitted &&
    Object.keys(answers).length &&
    !window.confirm('Keluar dari kuis? Jawaban sementara akan tetap tersimpan.')
  )
    return;
  returnToLibrary();
});
document
  .querySelector('#retry-quiz')
  .addEventListener('click', () => openQuiz(activeQuiz[0].category));
document.querySelector('#back-to-library').addEventListener('click', returnToLibrary);
