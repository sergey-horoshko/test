<template>
  <TheHeader />

  <router-view v-slot="{ Component }">
    <main class="mt-6 flex items-center justify-center pb-8">
      <div class="content">
        <component :is="Component" />
      </div>
    </main>
  </router-view>

  <TheMenu />
</template>

<script lang="ts">
import { defineComponent, onMounted, defineAsyncComponent } from 'vue';
import { useMeStore } from '@/stores/me';

export default defineComponent({
  setup() {
    const { getProfile, logOut, user } = useMeStore();

    onMounted(async () => {
      try {
        if (user) {
          await getProfile();
        } else {
          await logOut(true);
        }
      } catch (e) {
        await logOut(true);
      }
    });
  },

  components: {
    TheHeader: defineAsyncComponent(() => import('@/components/main/TheHeader.vue')),
    TheMenu: defineAsyncComponent(() => import('@/components/main/TheMenu.vue')),
  },
});
</script>

<style lang="scss" scoped>
main {
  padding-bottom: 110px;
}
</style>
