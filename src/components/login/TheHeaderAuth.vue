<template>
  <div class="flex w-full items-center justify-center bg-white shadow-lg dark:bg-dark-content">
    <div class="content flex items-center justify-between p-5">
      <router-link to="/">
        <img v-if="themeStore.theme === 'dark'" src="/images/logo-dark.svg" alt="Logo" />
        <img v-else src="/images/logo-light.svg" alt="Logo" />
      </router-link>
      <button @click="goTo">
        <i style="font-size: 1.4rem" class="pi pi-cog text-gray-500 dark:text-gray-300"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/theme.js';

export default defineComponent({
  setup() {
    // data
    const themeStore = useThemeStore();
    const router = useRouter();

    // methods
    const goTo = () => {
      router.push('/settings');
    };

    return {
      themeStore,
      goTo,
    };
  },
});
</script>
