<template>
  <div
    class="z-9999 fixed bottom-0 flex w-full justify-center border-t-[1px] border-gray-200 bg-white dark:border-gray-600 dark:bg-dark-content"
  >
    <div class="content flex items-center justify-between gap-1 px-0 md:px-5">
      <router-link
        class="link flex flex-col items-center gap-2 py-3 duration-200 hover:bg-gray-100 md:gap-3 dark:hover:bg-gray-600"
        v-for="item in menu"
        :key="item.id"
        :to="item.route"
      >
        <i
          style="font-size: 1rem"
          class="text-gray-500 dark:text-gray-300"
          :class="`pi ${item.icon}`"
        />
        <span class="text-xs">
          {{ $t(`menu.${item.text}`) }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const menu = [
      {
        id: 1,
        text: 'home',
        icon: 'pi-home',
        route: '/',
      },
      {
        id: 2,
        text: 'change',
        icon: 'pi-arrow-right-arrow-left',
        route: '/change',
      },
      {
        id: 3,
        text: 'investments',
        icon: 'pi-chart-bar',
        route: '/investments',
      },
      {
        id: 4,
        text: 'partners',
        icon: 'pi-users',
        route: '/partners',
      },
      {
        id: 5,
        text: 'history',
        icon: 'pi-history',
        route: '/history',
      },
    ];

    return {
      menu,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.router-link-exact-active) {
  i,
  span {
    color: #1a66ff;
  }
}

.link {
  min-width: 84px;
}

@media screen and (width <= 480px) {
  .link {
    min-width: 70px;

    & span {
      font-size: 11px;
    }
  }
}
</style>
