const profileKey = 'cendekiaProfile';

const preferenceKey = 'cendekiaPreferences';

const defaultProfile = {
  name: 'Pelajar',
  username: 'pelajar',
  email: '',
  bio: 'Belum ada deskripsi.',
  joinedAt: new Date().toISOString(),
  avatar: '',
};

// Penjelasan fungsi readJson: Membaca JSON dari localStorage dan mengembalikan nilai cadangan jika data tidak valid. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
const readJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};

// Penjelasan fungsi getPreferences: Mengambil preferensi tampilan pengguna dari data profil yang tersimpan. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
const getPreferences = () => ({
  theme: 'light',
  fontSize: 'normal',
  reminder: true,
  achievement: true,
  updates: true,
  ...readJson(preferenceKey, {}),
});

let profile = { ...defaultProfile };
const preferences = getPreferences();

const toast = document.querySelector('.toast');

let toastTimer;

let avatarUrl = '';

// Penjelasan fungsi notify: Menampilkan pesan notifikasi kepada pengguna. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function notify(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3500);
}

// Penjelasan fungsi savePreferences: Menyimpan preferensi tampilan dan akun ke localStorage. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function savePreferences() {
  localStorage.setItem(preferenceKey, JSON.stringify(preferences));
}

// Penjelasan fungsi applyPreferences: Menerapkan tema dan ukuran teks pada elemen halaman. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function applyPreferences() {
  document.body.classList.toggle('theme-dark', preferences.theme === 'dark');
  document.body.classList.toggle('text-large', preferences.fontSize === 'large');
}

// Penjelasan fungsi avatarElement: Menampilkan foto profil atau inisial pengguna pada elemen avatar. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function avatarElement(element) {
  if (!element) return;
  element.textContent = profile.name.charAt(0).toUpperCase();
  element.style.backgroundImage = avatarUrl ? `url("${avatarUrl}")` : '';
}

// Penjelasan fungsi formatJoined: Memformat tanggal pengguna bergabung ke format lokal Indonesia. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function formatJoined() {
  const date = new Date(profile.joinedAt);
  if (Number.isNaN(date.getTime())) return 'Tanggal tidak tersedia';
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Penjelasan fungsi showProfile: Mengisi tampilan profil dengan data pengguna, progres, dan pencapaian. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function showProfile() {
  const progress = readJson('cendekiaProgress', {});

  const courses = typeof learningCourses === 'undefined' ? [] : learningCourses;

  const completedLessons = courses.reduce((sum, course) => {
    const completed = progress[course.id]?.completed;
    return sum + (Array.isArray(completed) ? completed.length : 0);
  }, 0);

  const history = readJson('cendekiaQuizHistory', []);

  document.querySelector('#profile-name')?.replaceChildren(document.createTextNode(profile.name));
  document
    .querySelector('#profile-username')
    ?.replaceChildren(document.createTextNode(`@${profile.username}`));
  document
    .querySelector('#profile-bio')
    ?.replaceChildren(document.createTextNode(profile.bio || 'Belum ada deskripsi.'));
  document
    .querySelector('#profile-joined')
    ?.replaceChildren(document.createTextNode(`Bergabung ${formatJoined()}`));
  avatarElement(document.querySelector('#profile-avatar'));
  document
    .querySelector('#settings-email')
    ?.replaceChildren(document.createTextNode(profile.email || 'Belum diisi'));
  document
    .querySelector('#settings-username')
    ?.replaceChildren(document.createTextNode(`@${profile.username}`));
  document
    .querySelector('#settings-joined')
    ?.replaceChildren(document.createTextNode(formatJoined()));
  document
    .querySelector('#profile-courses')
    ?.replaceChildren(document.createTextNode(String(Object.keys(progress).length)));
  document
    .querySelector('#profile-lessons')
    ?.replaceChildren(document.createTextNode(String(completedLessons)));
  document
    .querySelector('#profile-quizzes')
    ?.replaceChildren(document.createTextNode(String(Array.isArray(history) ? history.length : 0)));

  const achievements = readJson('cendekiaAchievements', []);

  const target = document.querySelector('#profile-achievements');
  if (target) {
    target.innerHTML =
      Array.isArray(achievements) && achievements.length
        ? achievements
            .slice(0, 3)
            .map((item) => `<div class="mini-achievement"><span>✦</span>${item.name}</div>`)
            .join('')
        : '<p class="settings-note">Belum ada pencapaian terbuka. Mulai belajar untuk mendapatkannya.</p>';
  }
}

// Penjelasan fungsi setupProfile: Menyiapkan event formulir untuk mengubah data profil dan foto pengguna. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function setupProfile(user) {
  showProfile();
  document.querySelector('#edit-profile')?.addEventListener('click', () => {
    document.querySelector('#name-input').value = profile.name;
    document.querySelector('#username-input').value = profile.username;
    document.querySelector('#bio-input').value = profile.bio || '';
    document.querySelector('#profile-dialog').showModal();
  });
  document.querySelector('#avatar-input')?.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (
      !['image/png', 'image/jpeg', 'image/webp'].includes(file.type) ||
      file.size > 2 * 1024 * 1024
    ) {
      notify('Pilih PNG, JPG, atau WebP dengan ukuran maksimal 2 MB.');
      event.target.value = '';
      return;
    }
    if (avatarUrl) URL.revokeObjectURL(avatarUrl);
    avatarUrl = URL.createObjectURL(file);
    avatarElement(document.querySelector('#profile-avatar'));
  });
  document.querySelector('#profile-form')?.addEventListener('submit', async (event) => {
    if (event.submitter?.id !== 'save-profile') return;
    event.preventDefault();

    const name = document.querySelector('#name-input').value.trim();

    const username = document.querySelector('#username-input').value.trim();

    const bio = document.querySelector('#bio-input').value.trim();
    document.querySelector('[data-error="name"]').textContent =
      name.length < 2 ? 'Nama minimal 2 karakter.' : '';
    document.querySelector('[data-error="username"]').textContent = /^[A-Za-z0-9_]{3,20}$/.test(
      username,
    )
      ? ''
      : 'Username 3-20 karakter, hanya huruf, angka, underscore.';
    document.querySelector('[data-error="bio"]').textContent =
      bio.length > 140 ? 'Deskripsi maksimal 140 karakter.' : '';
    if (name.length < 2 || !/^[A-Za-z0-9_]{3,20}$/.test(username) || bio.length > 140) return;

    const submitButton = document.querySelector('#save-profile');
    submitButton.disabled = true;
    try {
      const { data, error } = await window.cendekiaSupabase.auth.updateUser({
        data: { display_name: name, username, bio },
      });
      if (error) throw error;
      user = data.user;
      profile = {
        ...profile,
        name: user.user_metadata.display_name || name,
        username: user.user_metadata.username || username,
        bio: user.user_metadata.bio || bio,
        email: user.email || '',
      };
      localStorage.removeItem(profileKey);
      document.querySelector('#profile-dialog').close();
      showProfile();
      notify('Profil berhasil diperbarui.');
    } catch (error) {
      notify(error.message || 'Tidak dapat menyimpan perubahan profil.');
    } finally {
      submitButton.disabled = false;
    }
  });
}

// Penjelasan fungsi setupSettings: Menyiapkan kontrol pengaturan tampilan dan pembaruan kata sandi. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function setupSettings() {
  document.querySelectorAll('[data-theme]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.theme === preferences.theme);
    button.addEventListener('click', () => {
      preferences.theme = button.dataset.theme;
      savePreferences();
      applyPreferences();
      document
        .querySelectorAll('[data-theme]')
        .forEach((item) => item.classList.toggle('is-active', item === button));
      notify('Tema tampilan disimpan.');
    });
  });

  const fontSize = document.querySelector('#font-size-setting');
  if (fontSize) {
    fontSize.value = preferences.fontSize;
    fontSize.addEventListener('change', () => {
      preferences.fontSize = fontSize.value;
      savePreferences();
      applyPreferences();
    });
  }
  document.querySelectorAll('[data-preference]').forEach((input) => {
    input.checked = Boolean(preferences[input.dataset.preference]);
    input.addEventListener('change', () => {
      preferences[input.dataset.preference] = input.checked;
      savePreferences();
      notify('Preferensi disimpan.');
    });
  });
  document.querySelector('#password-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const password = document.querySelector('#new-password').value;

    const confirmPassword = document.querySelector('#confirm-password').value;
    document.querySelector('[data-error="password"]').textContent =
      password.length < 8 ? 'Password minimal 8 karakter.' : '';
    document.querySelector('[data-error="confirm"]').textContent =
      password !== confirmPassword ? 'Konfirmasi password belum sama.' : '';
    if (password.length < 8 || password !== confirmPassword) return;

    const submitButton = event.currentTarget.querySelector('[type="submit"]');
    submitButton.disabled = true;
    try {
      const { error } = await window.cendekiaSupabase.auth.updateUser({ password });
      if (error) throw error;
      event.currentTarget.reset();
      notify('Password berhasil diperbarui.');
    } catch (error) {
      notify(error.message || 'Tidak dapat memperbarui password.');
    } finally {
      submitButton.disabled = false;
    }
  });
  document.querySelector('#delete-account')?.addEventListener('click', () => {
    if (
      !confirm(
        'Hapus progres dan preferensi yang tersimpan di perangkat ini? Akun Supabase tidak akan dihapus.',
      )
    )
      return;
    [
      'cendekiaProfile',
      'cendekiaPreferences',
      'cendekiaProgress',
      'cendekiaQuizHistory',
      'cendekiaPlaygroundProjects',
      'cendekiaPlaygroundProgress',
      'cendekiaActivityLog',
      'cendekiaAchievements',
    ].forEach((key) => localStorage.removeItem(key));

    window.location.href = 'dashboard.html';
  });
}

// Penjelasan fungsi initializeAccount: Memeriksa sesi pengguna lalu menginisialisasi halaman akun. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
async function initializeAccount() {
  applyPreferences();
  try {
    const user = await window.CendekiaAuth.requireUser();
    if (!user) return;

    const metadata = user.user_metadata || {};

    const storedProfile = readJson(profileKey, {});
    if (storedProfile.email) {
      delete storedProfile.email;
      localStorage.setItem(profileKey, JSON.stringify(storedProfile));
    }
    profile = {
      ...defaultProfile,
      ...storedProfile,
      name: metadata.display_name || metadata.username || storedProfile.name || defaultProfile.name,
      username: metadata.username || storedProfile.username || defaultProfile.username,
      email: user.email || '',
      bio: metadata.bio || storedProfile.bio || defaultProfile.bio,
      joinedAt: user.created_at || storedProfile.joinedAt || defaultProfile.joinedAt,
      avatar: '',
    };
    setupProfile(user);
    setupSettings();
  } catch (error) {
    notify(error.message || 'Tidak dapat memuat informasi akun.');
  }
}

initializeAccount();
