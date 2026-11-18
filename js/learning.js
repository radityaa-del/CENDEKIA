// Penjelasan fungsi initializeLearningRoom : Memeriksa login, memuat kelas dan progres, lalu menyiapkan ruang belajar. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
async function initializeLearningRoom() {
  // Penjelasan variabel user : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const user = await window.CendekiaAuth.requireUser();
  // Menjalankan langkah berikut hanya jika kondisi terpenuhi.
  if (!user) return;

  // Penjelasan variabel params : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const params = new URLSearchParams(window.location.search);
  // Penjelasan variabel course : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const course = getCourse(params.get('course'));
  // Penjelasan variabel lessons : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const lessons = getLessonList(course);
  // Penjelasan variabel progressStore : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const progressStore = JSON.parse(localStorage.getItem('cendekiaProgress') || '{}');
  // Penjelasan variabel savedState : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const savedState = progressStore[course.id] || {};
  // Penjelasan variabel savedIndex : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const savedIndex = lessons.findIndex((lesson) => lesson.id === savedState.last);
  // Penjelasan variabel currentIndex : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
  let currentIndex = savedIndex >= 0 ? savedIndex : 0;
  // Penjelasan variabel courseState : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const courseState = {
    ...savedState,
    completed: Array.isArray(savedState.completed) ? savedState.completed : [],
    last: lessons[currentIndex].id,
  };

  document.title = `${course.title} | Ruang Belajar CENDEKIA`;
  // Mengambil satu elemen pada dokumen berdasarkan selektor.
  document.querySelector('#learning-course-title').textContent = course.title;
  document.querySelector('#curriculum-course-title').textContent = course.title;

  // Penjelasan fungsi persist : Menyimpan materi terakhir dan daftar materi selesai ke localStorage. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function persist() {
    progressStore[course.id] = courseState;
    // Membaca atau menyimpan data secara lokal pada browser.
    localStorage.setItem('cendekiaProgress', JSON.stringify(progressStore));
  }

  // Penjelasan fungsi navigateToLesson : Memvalidasi indeks lalu berpindah dan merender materi yang dipilih. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function navigateToLesson(index) {
    if (index < 0 || index >= lessons.length) return;
    currentIndex = index;
    courseState.last = lessons[currentIndex].id;
    persist();
    render();
  }

  // Penjelasan fungsi renderCurriculum : Membuat daftar bab dan materi serta memasang navigasi klik materi. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function renderCurriculum() {
    document.querySelector('#curriculum-list').innerHTML = course.chapters
      .map(
        (chapter, chapterIndex) =>
          `<div class="curriculum-chapter"><h3><span>0${chapterIndex + 1}</span>${chapter.title}</h3>${chapter.lessons
            .map((lesson, lessonIndex) => {
              // Penjelasan variabel id : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
              const id = `${chapterIndex}-${lessonIndex}`;
              // Penjelasan variabel done : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
              const done = courseState.completed.includes(id);
              return `<button class="curriculum-lesson ${id === lessons[currentIndex].id ? 'is-current' : ''} ${done ? 'is-complete' : ''}" data-lesson-id="${id}" type="button"><span class="lesson-check">${done ? '✓' : '○'}</span><span>${lesson[0]}</span></button>`;
            })
            .join('')}</div>`,
      )
      .join('');
    // Mengambil semua elemen yang cocok untuk diproses atau diberi event.
    document.querySelectorAll('.curriculum-lesson').forEach((button) =>
      button.addEventListener('click', () => {
        navigateToLesson(lessons.findIndex((lesson) => lesson.id === button.dataset.lessonId));
      }),
    );
  }

  // Penjelasan fungsi render : Memperbarui konten materi, status selesai, navigasi, dan persentase progres. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
  function render() {
    // Penjelasan variabel lesson : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const lesson = lessons[currentIndex];
    const done = courseState.completed.includes(lesson.id);
    // Penjelasan variabel percent : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const percent = Math.round((courseState.completed.length / lessons.length) * 100);
    document.querySelector('#lesson-chapter').textContent =
      `Bab ${lesson.chapterIndex + 1} · ${lesson.chapterTitle}`;
    document.querySelector('#lesson-position').textContent =
      `Materi ${currentIndex + 1} dari ${lessons.length}`;
    document.querySelector('#lesson-title').textContent = lesson.title;
    document.querySelector('#lesson-explanation').textContent = lesson.explanation;
    document.querySelector('#lesson-code').textContent = lesson.code;
    document.querySelector('#lesson-summary').textContent =
      `Kamu telah mengenal konsep ${lesson.title.toLowerCase()}. Coba jalankan contoh kode dan ubah nilainya untuk melihat hasil yang berbeda.`;
    document.querySelector('#lesson-status').textContent = done ? '✓ Selesai' : 'Belum selesai';
    document.querySelector('#lesson-status').classList.toggle('is-complete', done);
    document.querySelector('#learning-progress-label').textContent = `${percent}% selesai`;
    document.querySelector('#learning-progress-bar').style.width = `${percent}%`;
    document.querySelector('#previous-lesson').disabled = currentIndex === 0;
    document.querySelector('#next-lesson').disabled = currentIndex === lessons.length - 1;
    document.querySelector('#complete-lesson').textContent = done
      ? '✓ Sudah selesai'
      : 'Tandai selesai ✓';
    document.querySelector('#complete-lesson').disabled = done;
    renderCurriculum();
  }

  document.querySelector('#complete-lesson').addEventListener('click', () => {
    if (!courseState.completed.includes(lessons[currentIndex].id))
      courseState.completed.push(lessons[currentIndex].id);
    courseState.last = lessons[currentIndex].id;
    persist();
    window.CendekiaProgress?.recordActivity('lesson', lessons[currentIndex].title, {
      course: course.title,
    });
    render();
    document.querySelector('.toast').textContent = 'Progres tersimpan.';
    document.querySelector('.toast').classList.add('is-visible');
    window.setTimeout(() => document.querySelector('.toast').classList.remove('is-visible'), 2200);
  });
  document
    .querySelector('#previous-lesson')
    .addEventListener('click', () => navigateToLesson(currentIndex - 1));
  document
    .querySelector('#next-lesson')
    .addEventListener('click', () => navigateToLesson(currentIndex + 1));
  document
    .querySelector('#curriculum-toggle')
    .addEventListener('click', () =>
      document.querySelector('#curriculum-sidebar').classList.toggle('is-open'),
    );
  persist();
  render();
}

initializeLearningRoom().catch((error) => {
  // Penjelasan variabel toast : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const toast = document.querySelector('.toast');
  toast.textContent = error.message || 'Tidak dapat membuka ruang belajar.';
  toast.classList.add('is-visible');
});
