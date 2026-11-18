// Penjelasan variabel authToast : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const authToast = document.querySelector('.toast');
// Penjelasan variabel authToastTimer : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
let authToastTimer;

// Penjelasan fungsi showAuthToast : Menampilkan pesan status autentikasi selama durasi yang ditentukan. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function showAuthToast(message, duration = 3200) {
  // Menjalankan langkah berikut hanya jika kondisi terpenuhi.
  if (!authToast) return;
  authToast.textContent = message;
  authToast.classList.add('is-visible');
  window.clearTimeout(authToastTimer);
  authToastTimer = window.setTimeout(() => authToast.classList.remove('is-visible'), duration);
}

// Penjelasan fungsi setError : Menampilkan atau menghapus pesan validasi untuk input tertentu. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function setError(input, message) {
  // Penjelasan variabel error : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const error = document.querySelector(`[data-error-for="${input.name}"]`);
  input.classList.toggle('is-invalid', Boolean(message));
  if (error) error.textContent = message;
}

// Penjelasan fungsi validatePassword : Memeriksa apakah kata sandi memenuhi panjang minimum. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function validatePassword(input) {
  // Penjelasan variabel message : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const message = input.value.length < 8 ? 'Password minimal 8 karakter.' : '';
  setError(input, message);
  return !message;
}

// Penjelasan fungsi validateForm : Memvalidasi input pada formulir dan menampilkan pesan kesalahan. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function validateForm(form) {
  // Penjelasan variabel valid : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
  let valid = true;
  form.querySelectorAll('[required]').forEach((input) => {
    // Penjelasan variabel message : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
    let message = '';
    if (input.type !== 'checkbox' && !input.value.trim()) message = 'Bagian ini wajib diisi.';
    if (input.type === 'email' && input.value && !/^\S+@\S+\.\S+$/.test(input.value))
      message = 'Masukkan email yang valid.';
    if (input.name === 'password' && input.value && input.value.length < 8)
      message = 'Password minimal 8 karakter.';
    if (input.name === 'confirmPassword' && input.value !== form.elements.password.value)
      message = 'Password belum sama.';
    if (input.type === 'checkbox' && !input.checked)
      message = 'Persetujuan diperlukan untuk melanjutkan.';
    setError(input, message);
    if (input.type === 'checkbox' && message) {
      showAuthToast(message);
      input.focus();
    }
    if (message) valid = false;
  });
  if (!valid && !form.querySelector('[required].is-invalid[type="checkbox"]'))
    showAuthToast('Periksa bagian yang ditandai, lalu coba lagi.');
  if (!valid) form.querySelector('.is-invalid')?.focus();
  return valid;
}

// Mengambil semua elemen yang cocok untuk diproses atau diberi event.
document.querySelectorAll('.password-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    // Penjelasan variabel input : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const input = document.getElementById(button.dataset.target);
    // Penjelasan variabel isPassword : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? 'Sembunyikan' : 'Tampilkan';
    button.setAttribute('aria-label', isPassword ? 'Sembunyikan password' : 'Tampilkan password');
  });
});

// Mengambil satu elemen pada dokumen berdasarkan selektor.
document.querySelector('#forgot-password')?.addEventListener('click', async (event) => {
  // Penjelasan variabel emailInput : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const emailInput = document.querySelector('#identity');
  // Penjelasan variabel email : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const email = emailInput.value.trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    setError(
      emailInput,
      email ? 'Masukkan email yang valid.' : 'Isi email akunmu terlebih dahulu.',
    );
    emailInput.focus();
    return;
  }
  setError(emailInput, '');
  if (!window.cendekiaSupabase) {
    showAuthToast(
      window.CENDEKIA_AUTH_ERROR ||
        'Supabase belum siap. Muat ulang halaman atau periksa konfigurasi.',
      7000,
    );
    return;
  }

  // Penjelasan variabel button : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const button = event.currentTarget;
  button.disabled = true;
  try {
    // Penjelasan variabel redirectTo : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const redirectTo = new URL('reset-password.html', window.location.href).href;
    const { error } = await window.cendekiaSupabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) throw error;
    showAuthToast(
      'Jika email terdaftar, tautan reset password akan dikirim. Periksa inbox dan folder spam.',
      7000,
    );
  } catch (error) {
    showAuthToast(error.message || 'Tidak dapat mengirim tautan reset. Coba lagi.', 7000);
  } finally {
    button.disabled = false;
  }
});

if (new URLSearchParams(window.location.search).get('password') === 'updated') {
  showAuthToast('Password berhasil diperbarui. Silakan masuk dengan password baru.', 7000);
}

document.querySelectorAll('.auth-form').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validateForm(form)) return;
    if (!window.cendekiaSupabase) {
      showAuthToast(
        window.CENDEKIA_AUTH_ERROR ||
          'Supabase belum siap. Muat ulang halaman atau periksa konfigurasi.',
      );
      return;
    }

    // Penjelasan variabel submitButton : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const submitButton = form.querySelector('[type="submit"]');
    // Penjelasan variabel originalButtonText : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Memproses...';

    try {
      if (form.dataset.mode === 'register') {
        const { data, error } = await window.cendekiaSupabase.auth.signUp({
          email: form.elements.email.value.trim(),
          password: form.elements.password.value,
          options: {
            data: {
              display_name: form.elements.fullName.value.trim(),
              username: form.elements.username.value.trim(),
            },
            emailRedirectTo: new URL('dashboard.html', window.location.href).href,
          },
        });
        if (error) throw error;

        if (!data.session) {
          showAuthToast('Pendaftaran berhasil. Periksa email untuk konfirmasi, lalu masuk.', 7000);
          form.reset();
          return;
        }
      } else {
        const { error } = await window.cendekiaSupabase.auth.signInWithPassword({
          email: form.elements.identity.value.trim(),
          password: form.elements.password.value,
        });
        if (error) throw error;
      }

      showAuthToast(
        form.dataset.mode === 'register'
          ? 'Akun berhasil dibuat. Membuka dashboard...'
          : 'Berhasil masuk. Selamat datang di CENDEKIA.',
      );
      window.setTimeout(() => {
        // Mengubah navigasi, membuka tampilan, atau menggeser halaman.
        window.location.href = 'dashboard.html';
      }, 800);
    } catch (error) {
      const message = error.message || error.toString() || 'Autentikasi gagal. Coba lagi.';
      showAuthToast(
        message.toLowerCase().includes('invalid login credentials')
          ? 'Email atau password salah. Periksa kembali data loginmu.'
          : message,
        7000,
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
});

document.querySelectorAll('.form-input').forEach((input) => {
  input.addEventListener('blur', () => {
    if (input.name === 'password' && input.value) validatePassword(input);
  });
});
