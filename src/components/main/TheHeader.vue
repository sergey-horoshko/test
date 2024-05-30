<template>
  <div class="flex w-full items-center justify-center bg-white shadow-lg dark:bg-dark-content">
    <div class="content flex items-center justify-between p-5">
      <router-link to="/">
        <img v-if="themeStore.theme === 'dark'" src="/images/logo-dark.svg" alt="Logo" />
        <img v-else src="/images/logo-light.svg" alt="Logo" />
      </router-link>

      <div class="flex items-center justify-between gap-5">
        <router-link to="/payment">
          <i style="font-size: 1rem" class="pi pi-wallet text-gray-500 dark:text-gray-300" />
        </router-link>

        <router-link to="/notification">
          <i style="font-size: 1rem" class="pi pi-bell text-gray-500 dark:text-gray-300" />
        </router-link>

        <router-link to="/profile/settings">
          <i style="font-size: 1rem" class="pi pi-cog text-gray-500 dark:text-gray-300" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { useThemeStore } from '@/stores/theme.js';

export default defineComponent({
  setup() {
    // data
    const themeStore = useThemeStore();

    return {
      themeStore,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.router-link-exact-active) {
  i {
    color: rgb(var(--blue-400));
  }
}
</style>
