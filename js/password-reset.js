const resetForm = document.querySelector('#reset-form');

const resetStatus = document.querySelector('#reset-status');

const resetToast = document.querySelector('.toast');

let resetSessionAvailable = false;

// Penjelasan fungsi showResetToast: Menampilkan notifikasi hasil proses reset kata sandi. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function showResetToast(message, duration = 5000) {
  resetToast.textContent = message;
  resetToast.classList.add('is-visible');
  window.setTimeout(() => resetToast.classList.remove('is-visible'), duration);
}

// Penjelasan fungsi setResetError: Menampilkan pesan validasi pada input reset kata sandi. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function setResetError(input, message) {
  input.classList.toggle('is-invalid', Boolean(message));

  const error = document.querySelector(`[data-error-for="${input.name}"]`);

  if (error) error.textContent = message;
}

document.querySelectorAll('.password-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.target);

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? 'Sembunyikan' : 'Tampilkan';
    button.setAttribute('aria-label', isPassword ? 'Sembunyikan password' : 'Tampilkan password');
  });
});

// Penjelasan fungsi initializePasswordReset: Memeriksa sesi reset dan memproses validasi serta pembaruan kata sandi. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
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

  const password = resetForm.elements.password;

  const confirmPassword = resetForm.elements.confirmPassword;

  const passwordError = password.value.length < 8 ? 'Password minimal 8 karakter.' : '';

  const confirmError =
    password.value !== confirmPassword.value ? 'Konfirmasi password belum sama.' : '';
  setResetError(password, passwordError);
  setResetError(confirmPassword, confirmError);
  if (passwordError || confirmError) {
    (passwordError ? password : confirmPassword).focus();
    return;
  }

  const submitButton = resetForm.querySelector('[type="submit"]');
  submitButton.disabled = true;
  try {
    const { error } = await window.cendekiaSupabase.auth.updateUser({ password: password.value });
    if (error) throw error;
    showResetToast('Password berhasil diperbarui. Silakan masuk dengan password baru.');
    window.setTimeout(() => {
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
