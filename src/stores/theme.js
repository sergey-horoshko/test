import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(window.localStorage.getItem('theme') || 'light');

  const setTheme = (newTheme) => {
    window.localStorage.setItem('theme', newTheme);
    theme.value = newTheme;

    if (newTheme === 'dark') {
      document.querySelector('#app').classList.add('dark');
    } else {
      document.querySelector('#app').classList.remove('dark');
    }
  };

  if (window.localStorage.getItem('theme') === null) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  if (theme.value === 'dark') {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  return { theme, setTheme };
});
