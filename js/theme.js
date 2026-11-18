(() => {
  const preferences = (() => {
    try {
      return JSON.parse(localStorage.getItem('cendekiaPreferences') || '{}');
    } catch {
      return {};
    }
  })();

  document.body.classList.toggle('theme-dark', preferences.theme === 'dark');

  document.body.classList.toggle('text-large', preferences.fontSize === 'large');
})();
