// Deskripsi inisialisasiSupabase: Memvalidasi konfigurasi lalu membuat klien Supabase untuk autentikasi.
(function () {
  const projectUrl = window.CENDEKIA_SUPABASE_URL?.trim();
  const publishableKey = window.CENDEKIA_SUPABASE_PUBLISHABLE_KEY?.trim();
  const configured =
    projectUrl &&
    publishableKey &&
    !projectUrl.includes('PASTE_') &&
    !publishableKey.includes('PASTE_');

  if (!configured) {
    window.CENDEKIA_AUTH_ERROR = 'Konfigurasi Supabase belum diisi di js/supabase-config.js.';
    return;
  }
  if (!window.supabase?.createClient) {
    window.CENDEKIA_AUTH_ERROR =
      'Supabase SDK gagal dimuat. Periksa koneksi internet lalu muat ulang halaman.';
    return;
  }

  try {
    const url = new URL(projectUrl);
    if (url.protocol !== 'https:' || !url.hostname.endsWith('.supabase.co')) {
      throw new Error('Gunakan Project URL HTTPS dari Supabase.');
    }

    window.cendekiaSupabase = window.supabase.createClient(url.href, publishableKey, {
      auth: {
        storage: window.sessionStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  } catch (error) {
    window.CENDEKIA_AUTH_ERROR = error.message || 'Project URL Supabase tidak valid.';
  }
})();
