// Penjelasan variabel resetForm : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const resetForm = document.querySelector('#reset-form');
// Penjelasan variabel resetStatus : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const resetStatus = document.querySelector('#reset-status');
// Penjelasan variabel resetToast : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const resetToast = document.querySelector('.toast');
// Penjelasan variabel resetSessionAvailable : Variabel ini menyimpan keadaan yang memang dapat diperbarui selama skrip berjalan. Setiap perubahan nilainya dapat memengaruhi kondisi, tampilan, atau perhitungan pada langkah berikutnya, sehingga pembaruannya harus tetap sinkron dengan alur aplikasi.
let resetSessionAvailable = false;

// Penjelasan fungsi showResetToast : Menampilkan notifikasi hasil proses reset kata sandi. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function showResetToast(message, duration = 5000) {
  resetToast.textContent = message;
  resetToast.classList.add('is-visible');
  window.setTimeout(() => resetToast.classList.remove('is-visible'), duration);
}

// Penjelasan fungsi setResetError : Menampilkan pesan validasi pada input reset kata sandi. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function setResetError(input, message) {
  input.classList.toggle('is-invalid', Boolean(message));
  // Penjelasan variabel error : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const error = document.querySelector(`[data-error-for="${input.name}"]`);
  // Menjalankan langkah berikut hanya jika kondisi terpenuhi.
  if (error) error.textContent = message;
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

// Penjelasan fungsi initializePasswordReset : Memeriksa sesi reset dan memproses validasi serta pembaruan kata sandi. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
async function initializePasswordReset() {
  if (!window.cendekiaSupabase) {
    resetStatus.textContent =
      window.CENDEKIA_AUTH_ERROR || 'Supabase belum siap. Muat ulang halaman.';
    return;
  }

  const { data, error } = await window.cendekiaSupabase.auth.getSession();
  if (error) throw error;
  if (!data.session) {
    resetStatus.textContent =
      'Tautan reset tidak valid atau sudah kedaluwarsa. Minta tautan baru dari halaman masuk.';
    return;
  }

  resetSessionAvailable = true;
  resetStatus.textContent = 'Masukkan password baru untuk akunmu.';
  resetForm.classList.remove('hidden');
}

resetForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!resetSessionAvailable) return;

  // Penjelasan variabel password : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const password = resetForm.elements.password;
  // Penjelasan variabel confirmPassword : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const confirmPassword = resetForm.elements.confirmPassword;
  // Penjelasan variabel passwordError : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const passwordError = password.value.length < 8 ? 'Password minimal 8 karakter.' : '';
  // Penjelasan variabel confirmError : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const confirmError =
    password.value !== confirmPassword.value ? 'Konfirmasi password belum sama.' : '';
  setResetError(password, passwordError);
  setResetError(confirmPassword, confirmError);
  if (passwordError || confirmError) {
    (passwordError ? password : confirmPassword).focus();
    return;
  }

  // Penjelasan variabel submitButton : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const submitButton = resetForm.querySelector('[type="submit"]');
  submitButton.disabled = true;
  try {
    const { error } = await window.cendekiaSupabase.auth.updateUser({ password: password.value });
    if (error) throw error;
    showResetToast('Password berhasil diperbarui. Silakan masuk dengan password baru.');
    window.setTimeout(() => {
      // Mengubah navigasi, membuka tampilan, atau menggeser halaman.
      window.location.href = 'login.html?password=updated';
    }, 1000);
  } catch (error) {
    showResetToast(
      error.message || 'Password tidak dapat diperbarui. Minta tautan reset baru.',
      7000,
    );
  } finally {
    submitButton.disabled = false;
  }
});

initializePasswordReset().catch((error) => {
  resetStatus.textContent =
    error.message || 'Tautan reset tidak dapat diverifikasi. Minta tautan baru.';
});
