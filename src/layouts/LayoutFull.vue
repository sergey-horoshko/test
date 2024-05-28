<template>
  <TheHeaderAuth />

  <router-view v-slot="{ Component }">
    <main class="mt-6 flex items-center justify-center pb-8">
      <div class="content">
        <component :is="Component" />
      </div>
    </main>
  </router-view>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    TheHeaderAuth: defineAsyncComponent(() => import('@/components/login/TheHeaderAuth.vue')),
  },
};
</script>
