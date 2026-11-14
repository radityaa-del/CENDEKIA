const authToast = document.querySelector('.toast');
let authToastTimer;

function showAuthToast(message, duration = 3200) {
  if (!authToast) return;
  authToast.textContent = message;
  authToast.classList.add('is-visible');
  window.clearTimeout(authToastTimer);
  authToastTimer = window.setTimeout(() => authToast.classList.remove('is-visible'), duration);
}

function setError(input, message) {
  const error = document.querySelector(`[data-error-for="${input.name}"]`);
  input.classList.toggle('is-invalid', Boolean(message));
  if (error) error.textContent = message;
}

function validatePassword(input) {
  const message = input.value.length < 8 ? 'Password minimal 8 karakter.' : '';
  setError(input, message);
  return !message;
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach((input) => {
    let message = '';
    if (input.type !== 'checkbox' && !input.value.trim()) message = 'Bagian ini wajib diisi.';
    if (input.type === 'email' && input.value && !/^\S+@\S+\.\S+$/.test(input.value)) message = 'Masukkan email yang valid.';
    if (input.name === 'password' && input.value && input.value.length < 8) message = 'Password minimal 8 karakter.';
    if (input.name === 'confirmPassword' && input.value !== form.elements.password.value) message = 'Password belum sama.';
    if (input.type === 'checkbox' && !input.checked) message = 'Persetujuan diperlukan untuk melanjutkan.';
    setError(input, message);
    if (input.type === 'checkbox' && message) {
      showAuthToast(message);
      input.focus();
    }
    if (message) valid = false;
  });
  if (!valid && !form.querySelector('[required].is-invalid[type="checkbox"]')) showAuthToast('Periksa bagian yang ditandai, lalu coba lagi.');
  if (!valid) form.querySelector('.is-invalid')?.focus();
  return valid;
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

document.querySelector('#forgot-password')?.addEventListener('click', async (event) => {
  const emailInput = document.querySelector('#identity');
  const email = emailInput.value.trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    setError(emailInput, email ? 'Masukkan email yang valid.' : 'Isi email akunmu terlebih dahulu.');
    emailInput.focus();
    return;
  }
  setError(emailInput, '');
  if (!window.cendekiaSupabase) {
    showAuthToast(window.CENDEKIA_AUTH_ERROR || 'Supabase belum siap. Muat ulang halaman atau periksa konfigurasi.', 7000);
    return;
  }

  const button = event.currentTarget;
  button.disabled = true;
  try {
    const redirectTo = new URL('reset-password.html', window.location.href).href;
    const { error } = await window.cendekiaSupabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
    showAuthToast('Jika email terdaftar, tautan reset password akan dikirim. Periksa inbox dan folder spam.', 7000);
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
      showAuthToast(window.CENDEKIA_AUTH_ERROR || 'Supabase belum siap. Muat ulang halaman atau periksa konfigurasi.');
      return;
    }

    const submitButton = form.querySelector('[type="submit"]');
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
              username: form.elements.username.value.trim()
            },
            emailRedirectTo: new URL('dashboard.html', window.location.href).href
          }
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
          password: form.elements.password.value
        });
        if (error) throw error;
      }

      showAuthToast(form.dataset.mode === 'register' ? 'Akun berhasil dibuat. Membuka dashboard...' : 'Berhasil masuk. Selamat datang di CENDEKIA.');
      window.setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
    } catch (error) {
      const message = error.message || error.toString() || 'Autentikasi gagal. Coba lagi.';
      showAuthToast(message.toLowerCase().includes('invalid login credentials')
        ? 'Email atau password salah. Periksa kembali data loginmu.'
        : message, 7000);
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
