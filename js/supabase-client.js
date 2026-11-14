(function () {
  const projectUrl = window.CENDEKIA_SUPABASE_URL;
  const publishableKey = window.CENDEKIA_SUPABASE_PUBLISHABLE_KEY;
  const configured = projectUrl && publishableKey &&
    !projectUrl.includes('PASTE_') && !publishableKey.includes('PASTE_');

  if (!configured) {
    window.CENDEKIA_AUTH_ERROR = 'Konfigurasi Supabase belum diisi di js/supabase-config.js.';
    return;
  }
  if (!window.supabase?.createClient) {
    window.CENDEKIA_AUTH_ERROR = 'Supabase SDK gagal dimuat. Periksa koneksi internet lalu muat ulang halaman.';
    return;
  }

  window.cendekiaSupabase = window.supabase.createClient(projectUrl, publishableKey, {
    auth: {
      storage: window.sessionStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
})();
