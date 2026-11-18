const templates = {
  html: {
    title: 'Membuat halaman HTML sederhana',
    level: 'Pemula',
    instruction:
      'Buat sebuah heading dan paragraf sapaan di dalam halaman. Gunakan struktur HTML yang semantik.',
    expected: 'Judul dan sapaan tampil di halaman.',
    extension: 'html',
    code: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <title>Halaman Pertamaku</title>\n</head>\n<body>\n  <main>\n    <h1>Halo, CENDEKIA!</h1>\n    <p>Aku sedang belajar membuat website.</p>\n  </main>\n</body>\n</html>',
  },
  css: {
    title: 'Mengubah warna dan ukuran teks',
    level: 'Pemula',
    instruction:
      'Buat judul berwarna biru dan berukuran 32px. Beri paragraf warna navy agar lebih nyaman dibaca.',
    expected: 'Judul biru besar dengan paragraf navy.',
    extension: 'css',
    code: 'body {\n  font-family: sans-serif;\n  padding: 32px;\n}\n\nh1 {\n  color: #2563EB;\n  font-size: 32px;\n}\n\np {\n  color: #142D4E;\n}',
  },
  javascript: {
    title: 'Membuat kalkulator sederhana',
    level: 'Menengah',
    instruction: 'Lengkapi fungsi tambah agar dua angka dijumlahkan. Lihat hasilnya di console.',
    expected: 'Console menampilkan: Hasil penjumlahan: 15',
    extension: 'js',
    code: 'function tambah(a, b) {\n  return a + b;\n}\n\nconst hasil = tambah(7, 8);\nconsole.log("Hasil penjumlahan:", hasil);',
  },
};

const challenges = [
  { id: 'html', title: 'Membuat halaman HTML sederhana', category: 'HTML', difficulty: 'Pemula' },
  { id: 'css', title: 'Mengubah warna dan ukuran teks', category: 'CSS', difficulty: 'Pemula' },
  {
    id: 'javascript',
    title: 'Membuat kalkulator sederhana',
    category: 'JavaScript',
    difficulty: 'Menengah',
  },
  {
    id: 'javascript',
    title: 'Membuat tombol interaktif',
    category: 'JavaScript',
    difficulty: 'Menengah',
    code: 'const tombol = document.querySelector("#tombol");\ntombol.addEventListener("click", () => {\n  tombol.textContent = "Berhasil diklik!";\n  console.log("Tombol aktif");\n});',
  },
  {
    id: 'html',
    title: 'Membuat halaman profil pribadi',
    category: 'HTML',
    difficulty: 'Pemula',
    code: '<!DOCTYPE html>\n<html lang="id">\n<body>\n  <main>\n    <h1>Profil Namaku</h1>\n    <p>Aku sedang belajar teknologi di CENDEKIA.</p>\n    <button id="tombol">Kenalan</button>\n  </main>\n</body>\n</html>',
  },
];

const editor = document.querySelector('#code-editor');
const lineNumbers = document.querySelector('#line-numbers');
const languageSelect = document.querySelector('#language-select');
const preview = document.querySelector('#live-preview');
const consoleOutput = document.querySelector('#console-output');
const consoleStatus = document.querySelector('#console-status');
const challengeList = document.querySelector('#challenge-list');
const toast = document.querySelector('.toast');
let activeChallenge = 0;
let toastTimer;

// Deskripsi showToast: Menampilkan pesan sementara pada notifikasi halaman.
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
}
// Deskripsi currentTemplate: Mengambil template instruksi dan kode sesuai tantangan yang sedang aktif.
function currentTemplate() {
  const challenge = challenges[activeChallenge];
  return { ...templates[challenge.id], code: challenge.code || templates[challenge.id].code };
}
// Deskripsi updateLineNumbers: Menyelaraskan nomor baris editor dengan isi kode dan posisi gulir.
function updateLineNumbers() {
  const count = editor.value.split('\n').length;
  lineNumbers.textContent = Array.from({ length: count }, (_, index) => index + 1).join('\n');
  lineNumbers.scrollTop = editor.scrollTop;
}
// Deskripsi setConsole: Mengatur teks output, status sukses atau error, dan warna console.
function setConsole(message, isError = false) {
  consoleOutput.textContent = message || '// Tidak ada output console';
  consoleOutput.classList.toggle('is-error', isError);
  consoleStatus.textContent = isError ? 'Ada error' : 'Selesai dijalankan';
  consoleStatus.style.color = isError ? '#C64D4D' : 'var(--green)';
}
// Deskripsi baseDocument: Membentuk dokumen HTML dasar untuk isi pratinjau.
function baseDocument(body = '<h1>Halo dari CENDEKIA!</h1><p>Mulai berkreasi dengan kode.</p>') {
  return `<!doctype html><html lang="id"><head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif;padding:32px;color:#142D4E}button{background:#2563EB;border:0;border-radius:6px;color:white;padding:10px 14px}</style></head><body>${body}</body></html>`;
}
// Deskripsi buildPreview: Menyusun dokumen pratinjau sesuai bahasa dan kode yang dipilih.
function buildPreview(language, code) {
  const bridge = `<script>const send=(type,value)=>parent.postMessage({source:'cendekia-playground',type,value},'*');const oldLog=console.log;console.log=(...args)=>{oldLog(...args);send('log',args.map(String).join(' '))};window.onerror=(message,source,line,column,error)=>send('error',message+' (baris '+line+')');window.addEventListener('unhandledrejection',event=>send('error',event.reason?.message||String(event.reason)));<\/script>`;
  if (language === 'html') return code.replace('</head>', `${bridge}</head>`);
  if (language === 'css')
    return baseDocument(
      '<h1>Belajar CSS</h1><p>Warna dan ukuran teks bisa berubah dari editor.</p>',
    ).replace('</head>', `<style>${code}</style>${bridge}</head>`);
  return baseDocument(
    '<h1>JavaScript Playground</h1><p id="status">Buka console untuk melihat hasil.</p><button id="tombol">Klik aku</button>',
  )
    .replace('</head>', `${bridge}</head>`)
    .replace('</body>', `<script>${code}<\/script></body>`);
}
// Deskripsi runCode: Menyimpan waktu eksekusi, menjalankan pratinjau, dan memperbarui output.
function runCode() {
  const language = languageSelect.value;
  const progress = JSON.parse(localStorage.getItem('cendekiaPlaygroundProgress') || '{}');
  localStorage.setItem(
    'cendekiaPlaygroundProgress',
    JSON.stringify({
      ...progress,
      [activeChallenge]: { language, lastRunAt: new Date().toISOString() },
    }),
  );
  setConsole('// Menjalankan kode...', false);
  preview.srcdoc = buildPreview(language, editor.value);
  window.setTimeout(() => {
    if (consoleOutput.textContent === '// Menjalankan kode...')
      setConsole('// Tidak ada output console. Preview berhasil diperbarui.', false);
  }, 700);
}
// Deskripsi renderChallenges: Menampilkan daftar tantangan dan posisi tantangan aktif.
function renderChallenges() {
  challengeList.innerHTML = challenges
    .map(
      (challenge, index) =>
        `<button class="challenge-item ${index === activeChallenge ? 'is-active' : ''}" type="button" data-challenge-index="${index}"><strong>${index + 1}. ${challenge.title}</strong><span>${challenge.category} · <i class="${challenge.difficulty === 'Pemula' ? 'difficulty-green' : 'difficulty-orange'}">${challenge.difficulty}</i></span></button>`,
    )
    .join('');
  document.querySelector('#challenge-count').textContent =
    `${activeChallenge + 1} / ${challenges.length}`;
}
// Deskripsi loadChallenge: Memuat tantangan, kode awal, level, instruksi, dan hasil yang diharapkan.
function loadChallenge(index) {
  activeChallenge = index;
  const challenge = challenges[index];
  const template = currentTemplate();
  languageSelect.value = challenge.id;
  editor.value = template.code;
  document.querySelector('#challenge-level').textContent = template.level;
  document.querySelector('#challenge-title').textContent = template.title;
  document.querySelector('#challenge-instruction').textContent = template.instruction;
  document.querySelector('#expected-result-text').textContent = template.expected;
  renderChallenges();
  updateLineNumbers();
  setConsole('// Pilih Jalankan kode untuk melihat hasil.');
  runCode();
}
// Deskripsi saveProject: Menyimpan kode proyek ke localStorage dan mencatat aktivitas proyek.
function saveProject(name) {
  const projects = JSON.parse(localStorage.getItem('cendekiaPlaygroundProjects') || '[]');
  const project = {
    id: Date.now(),
    name,
    language: languageSelect.value,
    code: editor.value,
    savedAt: new Date().toLocaleDateString('id-ID'),
  };
  projects.unshift(project);
  localStorage.setItem('cendekiaPlaygroundProjects', JSON.stringify(projects.slice(0, 8)));
  window.CendekiaProgress?.recordActivity('project', name, { language: languageSelect.value });
  renderSavedProjects();
  showToast('Proyek berhasil disimpan di perangkat ini.');
}
// Deskripsi renderSavedProjects: Menampilkan jumlah dan daftar proyek yang tersimpan.
function renderSavedProjects() {
  const projects = JSON.parse(localStorage.getItem('cendekiaPlaygroundProjects') || '[]');
  document.querySelector('#saved-count').textContent = projects.length;
  const target = document.querySelector('#saved-project-list');
  target.innerHTML = projects.length
    ? projects
        .map(
          (project) =>
            `<div class="saved-project"><button type="button" data-project-id="${project.id}"><strong>${project.name}</strong><span>${project.language.toUpperCase()} · ${project.savedAt}</span></button><button class="project-delete" type="button" data-delete-id="${project.id}" aria-label="Hapus ${project.name}">×</button></div>`,
        )
        .join('')
    : '<p class="muted-small">Belum ada proyek tersimpan.</p>';
}
// Deskripsi downloadCode: Mengunduh kode editor dengan ekstensi file sesuai bahasa.
function downloadCode() {
  const template = currentTemplate();
  const blob = new Blob([editor.value], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `cendekia-${languageSelect.value}.${template.extension}`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('File kode berhasil diunduh.');
}

editor.addEventListener('input', updateLineNumbers);
editor.addEventListener('scroll', () => {
  lineNumbers.scrollTop = editor.scrollTop;
});
editor.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    const start = editor.selectionStart;
    editor.value = `${editor.value.slice(0, start)}  ${editor.value.slice(editor.selectionEnd)}`;
    editor.selectionStart = editor.selectionEnd = start + 2;
    updateLineNumbers();
  }
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    runCode();
  }
});
languageSelect.addEventListener('change', () => {
  const selected = languageSelect.value;
  const index = challenges.findIndex((challenge) => challenge.id === selected);
  activeChallenge = index >= 0 ? index : 0;
  loadChallenge(activeChallenge);
});
document.querySelector('#run-button').addEventListener('click', runCode);
document.querySelector('#reset-button').addEventListener('click', () => {
  editor.value = currentTemplate().code;
  updateLineNumbers();
  runCode();
  showToast('Kode dikembalikan ke template awal.');
});
document
  .querySelector('#clear-output')
  .addEventListener('click', () => setConsole('// Console dibersihkan.'));
document.querySelector('#download-button').addEventListener('click', downloadCode);
document.querySelector('#save-button').addEventListener('click', () => {
  document.querySelector('#project-name').value = `${currentTemplate().title} - CENDEKIA`;
  document.querySelector('#save-dialog').showModal();
});
document.querySelector('#save-form').addEventListener('submit', (event) => {
  if (event.submitter?.id !== 'confirm-save') return;
  event.preventDefault();
  saveProject(document.querySelector('#project-name').value.trim() || 'Proyek tanpa nama');
  document.querySelector('#save-dialog').close();
});
challengeList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-challenge-index]');
  if (button) loadChallenge(Number(button.dataset.challengeIndex));
});
document.querySelector('#saved-project-list').addEventListener('click', (event) => {
  const projectId = event.target.closest('[data-project-id]')?.dataset.projectId;
  const deleteId = event.target.closest('[data-delete-id]')?.dataset.deleteId;
  const projects = JSON.parse(localStorage.getItem('cendekiaPlaygroundProjects') || '[]');
  if (projectId) {
    const project = projects.find((item) => String(item.id) === projectId);
    if (project) {
      languageSelect.value = project.language;
      editor.value = project.code;
      updateLineNumbers();
      runCode();
      showToast(`Proyek "${project.name}" dibuka.`);
    }
  }
  if (deleteId) {
    localStorage.setItem(
      'cendekiaPlaygroundProjects',
      JSON.stringify(projects.filter((item) => String(item.id) !== deleteId)),
    );
    renderSavedProjects();
    showToast('Proyek dihapus.');
  }
});
document.querySelector('#fullscreen-button').addEventListener('click', async () => {
  if (!document.fullscreenElement)
    await document.querySelector('#playground-workspace').requestFullscreen();
  else await document.exitFullscreen();
});
window.addEventListener('message', (event) => {
  if (event.source !== preview.contentWindow || event.data?.source !== 'cendekia-playground')
    return;
  if (event.data.type === 'error') setConsole(event.data.value, true);
  if (event.data.type === 'log')
    setConsole(
      `${consoleOutput.textContent === '// Menjalankan kode...' ? '' : `${consoleOutput.textContent}\n`}${event.data.value}`.trim(),
      false,
    );
});

renderSavedProjects();
loadChallenge(0);
