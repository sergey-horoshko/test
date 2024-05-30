<template>
  <div class="rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content">
    <div class="flex w-full items-center justify-between gap-3">
      <span class="text-2xl font-bold">
        {{ $t('settings.title') }}
      </span>
    </div>
    <div class="mt-1">
      {{ $t('settings.description') }}
    </div>

    <div class="mt-8 flex items-center gap-4 text-gray-500">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        @click="currentComponent = tab.component"
        :class="{
          'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500':
            currentComponent === tab.component,
          'border-transparent': currentComponent !== tab.component,
        }"
        class="w-fit cursor-pointer border-b-[2px] pb-2 font-semibold duration-200"
      >
        {{ $t(tab.text) }}
      </div>
    </div>

    <component :is="currentComponent" />
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref, reactive, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const currentComponent = ref('TheWalletsComponent');
    const tabs = reactive([
      {
        id: 1,
        text: 'settings.account',
        component: 'TheAccountComponent',
      },
      {
        id: 2,
        text: 'settings.wallet',
        component: 'TheWalletsComponent',
      },
      {
        id: 3,
        text: 'settings.interface',
        component: 'TheInterfaceComponent',
      },
      {
        id: 4,
        text: 'settings.help',
        component: 'TheHelpComponent',
      },
    ]);

    // hooks
    onMounted(() => {});

    return {
      tabs,
      currentComponent,
    };
  },

  components: {
    TheAccountComponent: defineAsyncComponent(() => import('./components/TheAccountComponent.vue')),
    TheWalletsComponent: defineAsyncComponent(() => import('./components/TheWalletsComponent.vue')),
    TheInterfaceComponent: defineAsyncComponent(
      () => import('./components/TheInterfaceComponent.vue'),
    ),
    TheHelpComponent: defineAsyncComponent(() => import('./components/TheHelpComponent.vue')),
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
