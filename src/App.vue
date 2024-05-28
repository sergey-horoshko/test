<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>

  <Toast />
</template>

<script>
import { onMounted, defineComponent, onDeactivated } from 'vue';
import { useThemeStore } from '@/stores/theme.js';

export default defineComponent({
  setup() {
    // methods
    const handleLoad = () => {
      const spinner = document.getElementById('spinner');

      spinner?.classList.add('-hide');
    };

    const handleWindowResize = () => {
      // appStore.setWidth(window.innerWidth);
    };

    // hooks
    onMounted(() => {
      handleWindowResize();
      useThemeStore();

      window.addEventListener('load', handleLoad);
      window.addEventListener('resize', handleWindowResize);
    });

    onDeactivated(() => {
      window.removeEventListener('resize', handleWindowResize);
    });
  },
});
</script>
