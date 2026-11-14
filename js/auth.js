const authToast = document.querySelector('.toast');
let authToastTimer;

function showAuthToast(message) {
  if (!authToast) return;
  authToast.textContent = message;
  authToast.classList.add('is-visible');
  window.clearTimeout(authToastTimer);
  authToastTimer = window.setTimeout(() => authToast.classList.remove('is-visible'), 3200);
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

document.querySelectorAll('.password-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.target);
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? 'Sembunyikan' : 'Tampilkan';
    button.setAttribute('aria-label', isPassword ? 'Sembunyikan password' : 'Tampilkan password');
  });
});

document.querySelectorAll('.auth-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach((input) => {
      let message = '';
      if (!input.value.trim()) message = 'Bagian ini wajib diisi.';
      if (input.type === 'email' && input.value && !/^\S+@\S+\.\S+$/.test(input.value)) message = 'Masukkan email yang valid.';
      if (input.name === 'password' && input.value) message = input.value.length < 8 ? 'Password minimal 8 karakter.' : '';
      if (input.name === 'confirmPassword' && input.value !== form.elements.password.value) message = 'Password belum sama.';
      if (input.type === 'checkbox' && !input.checked) message = 'Persetujuan diperlukan untuk melanjutkan.';
      setError(input, message);
      if (message) valid = false;
    });
    if (!valid) return;
    if (form.dataset.mode === 'register') {
      const profile = { name: form.elements.fullName.value.trim(), username: form.elements.username.value.trim(), email: form.elements.email.value.trim(), joinedAt: new Date().toISOString(), bio:'', avatar:'' };
      localStorage.setItem('cendekiaProfile', JSON.stringify(profile));
      showAuthToast('Registrasi berhasil. Silakan masuk dengan akunmu.');
      window.setTimeout(() => { window.location.href = 'login.html'; }, 800);
      return;
    }
    const savedProfile = JSON.parse(localStorage.getItem('cendekiaProfile') || 'null');
    const identity = form.elements.identity.value.trim();
    const profile = savedProfile || {
      name: identity.includes('@') ? identity.split('@')[0] : identity,
      username: identity
    };
    localStorage.setItem('cendekiaProfile', JSON.stringify(profile));
    sessionStorage.setItem('cendekiaSession', 'active');
    showAuthToast('Simulasi masuk berhasil. Selamat datang di CENDEKIA.');
    window.setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
  });
});

document.querySelectorAll('.form-input').forEach((input) => {
  input.addEventListener('blur', () => {
    if (input.name === 'password' && input.value) validatePassword(input);
  });
});
