<template>
  <div class="rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content">
    <div class="flex w-full items-center justify-between gap-3">
      <span class="text-2xl font-bold">
        {{ $t('history.title') }}
      </span>
    </div>
    <div class="mt-2 leading-5">
      {{ $t('history.description') }}
    </div>

    <div class="mt-8 text-gray-500">
      <Filters />
    </div>

    <Events />
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, defineAsyncComponent } from 'vue';
import { useLocaleStore } from '@/stores/locale.js';
import { useThemeStore } from '@/stores/theme.js';
import { useI18n } from 'vue-i18n';
import { i18n } from '@/utils/i18n-validators.js';

export default defineComponent({
  setup() {
    const form = reactive({
      theme: null,
      language: null,
    });
    const localeStore = useLocaleStore();
    const themeStore = useThemeStore();
    const themes = reactive([
      {
        id: 1,
        nameRu: 'Светлая',
        nameEn: 'Light',
        value: 'light',
      },
      {
        id: 2,
        nameRu: 'Темная',
        nameEn: 'Dark',
        value: 'dark',
      },
    ]);
    const languages = reactive([
      {
        id: 1,
        nameRu: 'Русский',
        nameEn: 'Russian',
        value: 'ru',
      },
      {
        id: 2,
        nameRu: 'Английский',
        nameEn: 'English',
        value: 'en',
      },
    ]);
    const t = useI18n();

    // methods
    const changeLanguage = (e) => {
      localeStore.setLocale(e.value);
      t.locale.value = e.value;
      i18n.global.locale = e.value;
    };

    const changeTheme = (e) => {
      themeStore.setTheme(e.value);
    };

    // hooks
    onMounted(() => {
      form.theme = themeStore.theme;
      form.language = localeStore.locale;
    });

    return {
      localeStore,
      form,
      themes,
      languages,
      t,
      changeLanguage,
      changeTheme,
    };
  },
  components: {
    Events: defineAsyncComponent(() => import('./components/EventsComponent.vue')),
    Filters: defineAsyncComponent(() => import('./components/FiltersComponent.vue')),
  },
});
</script>

<style scoped lang="scss">
.pi {
  z-index: 100;
}

:deep(span[data-pc-section='input']) {
  padding-left: 0;
}
</style>
