window.CendekiaAuth = {
  // Deskripsi requireUser: Mengambil sesi Supabase dan mengarahkan pengguna yang belum login ke halaman masuk.
  async requireUser() {
    if (!window.cendekiaSupabase) {
      throw new Error(window.CENDEKIA_AUTH_ERROR || 'Supabase belum siap.');
    }

    const { data, error } = await window.cendekiaSupabase.auth.getSession();
    if (error) throw error;
    if (!data.session) {
      window.location.replace('login.html');
      return null;
    }
    return data.session.user;
  },

  // Deskripsi signOut: Mengakhiri sesi Supabase dan mengarahkan pengguna ke halaman masuk.
  async signOut() {
    if (!window.cendekiaSupabase) {
      throw new Error(window.CENDEKIA_AUTH_ERROR || 'Supabase belum siap.');
    }

    const { error } = await window.cendekiaSupabase.auth.signOut();
    if (error) throw error;
    window.location.href = 'login.html';
  },
};

if (document.body.dataset.authRequired === 'true') {
  window.CendekiaAuth.requireUser().catch((error) => {
    const toast = document.querySelector('.toast');
    if (toast) {
      toast.textContent = error.message || 'Tidak dapat memeriksa sesi akun.';
      toast.classList.add('is-visible');
    }
  });
}

document.querySelectorAll('#logout-button').forEach((button) => {
  button.addEventListener(
    'click',
    (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (
        document.body.classList.contains('account-page') &&
        !window.confirm('Keluar dari akun CENDEKIA?')
      )
        return;
      window.CendekiaAuth.signOut().catch((error) => {
        const toast = document.querySelector('.toast');
        if (toast) {
          toast.textContent = error.message || 'Tidak dapat keluar dari akun.';
          toast.classList.add('is-visible');
        }
      });
    },
    true,
  );
});
