<template>
  <div class="rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content">
    <div class="flex w-full items-center justify-between gap-3">
      <span class="text-2xl font-bold">
        {{ $t('settings.title') }}
      </span>
      <router-link class="font-semibold text-blue-600 dark:text-blue-500" to="/auth">
        {{ $t('settings.auth') }}
      </router-link>
    </div>
    <div class="mt-2 leading-5">
      {{ $t('settings.description') }}
    </div>

    <div class="mt-8">
      <div
        class="w-fit cursor-pointer border-b-[2px] border-blue-600 pb-2 font-semibold text-blue-600 dark:border-blue-500 dark:text-blue-500"
      >
        {{ $t('settings.interface') }}
      </div>
    </div>

    <form autocomplete="off" class="mt-6">
      <div class="flex flex-col">
        <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('form.labelLanguage') }}
        </label>
        <IconField iconPosition="left">
          <InputIcon class="pi pi-language" />
          <Dropdown
            v-model="form.language"
            @change="changeLanguage"
            :options="languages"
            :optionLabel="localeStore.locale === 'ru' ? 'nameRu' : 'nameEn'"
            optionValue="value"
            class="w-full"
          />
        </IconField>
      </div>

      <div class="mt-6 flex flex-col">
        <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('form.labelTheme') }}
        </label>
        <IconField iconPosition="left">
          <InputIcon class="pi pi-palette" />
          <Dropdown
            v-model="form.theme"
            @change="changeTheme"
            :options="themes"
            :optionLabel="localeStore.locale === 'ru' ? 'nameRu' : 'nameEn'"
            optionValue="value"
            class="w-full"
          />
        </IconField>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue';
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
