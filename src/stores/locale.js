import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref(
    localStorage.getItem('locale') || (/^ru\b/.test(navigator.language) ? 'ru' : 'en'),
  );

  const setLocale = (value) => {
    locale.value = value;
    localStorage.setItem('locale', value);
  };

  return { locale, setLocale };
});
