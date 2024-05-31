import { createApp } from 'vue';
import dayjs from 'dayjs';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { storeToRefs } from 'pinia';
import { createI18n } from 'vue-i18n';
import 'dayjs/locale/ru';
import localePrimeVue from '@/utils/localePrimeVue';
import vClickOutside from 'click-outside-vue3';
import AnimatedCounter from 'vue-animated-counter';
import DropZone from 'dropzone-vue';
import { useLocaleStore } from '@/stores/locale.js';
import { createBottomSheet } from 'bottom-sheet-vue3';
import Preset from './preset';
import ru from './locales/ru.json';
import en from './locales/en.json';
import store from './stores';
import router from './router';
import App from './App.vue';

// global styles
import '@vuepic/vue-datepicker/dist/main.css';
import 'dropzone-vue/dist/dropzone-vue.common.css';
import 'bottom-sheet-vue3/style.css'; // eslint-disable-line
import './styles/index.scss';

// global components
import globalComponents from './components/globalComponents';

export const app = createApp(App);

dayjs.locale('ru');

globalComponents.forEach((c) => {
  app.component(c.name, c);
});
app.provide('dayjs', dayjs);
app.use(vClickOutside);
app.use(PrimeVue, {
  locale: localePrimeVue,
  unstyled: true,
  ripple: true,
  pt: Preset,
});
app.use(ToastService);
app.use(createBottomSheet());
app.use(store);

// locales
const localeStore = useLocaleStore();
const { locale } = storeToRefs(localeStore);

app.use(
  createI18n({
    locale: locale.value,
    messages: {
      en,
      ru,
    },
    legacy: false,
  }),
);
app.use(router);
app.use(DropZone);
app.component('AnimatedCounter', AnimatedCounter);
app.mount('#app');
