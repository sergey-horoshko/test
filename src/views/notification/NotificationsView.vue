<template>
  <div class="min-h-96 rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content">
    <div class="flex w-full items-center justify-between gap-3">
      <span class="text-2xl font-bold">
        {{ $t('notification.title') }}
      </span>
      <div @click="readAll" class="cursor-pointer font-semibold text-blue-600 dark:text-blue-500">
        {{ $t('notification.readAll') }}
      </div>
    </div>
    <div class="mt-2 leading-5">
      {{ $t('notification.description') }}
    </div>

    <div v-if="pending" class="mt-12 flex items-center justify-center">
      <ProgressSpinner />
    </div>

    <template v-else>
      <div class="mt-8 flex flex-col gap-4">
        <router-link
          v-for="item in notifications"
          :key="item.id"
          :to="`/notification/${item.id}`"
          class="relative flex gap-3 rounded-lg bg-gray-100 p-4 pl-2 dark:bg-dark"
        >
          <i
            style="font-size: 1.2rem"
            class="text-gray-500 dark:text-gray-300"
            :class="`pi ${item.icon}`"
          />
          <div class="flex w-full flex-col">
            <div class="font-bold">
              {{ item.title }}
            </div>
            <div class="mt-2 text-xs font-medium text-gray-500 dark:text-gray-300">
              {{ item.description }}
            </div>
            <div class="mt-2 flex items-center justify-between">
              <span class="text-xs text-gray-400 dark:text-gray-300">
                {{ dayjs(item.date).format('DD.MM') }}
              </span>
              <span class="text-xs font-medium text-blue-600 dark:text-blue-500">
                {{ $t('form.more') }}
              </span>
            </div>
          </div>
          <div
            v-if="!item.read"
            class="absolute right-4 top-4 max-h-2 min-h-2 min-w-2 max-w-2 rounded-full bg-red-500"
          />
        </router-link>
      </div>

      <div v-if="pendingMore" class="mt-12 flex items-center justify-center">
        <ProgressSpinner style="width: 50px; height: 50px" />
      </div>
    </template>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, inject, onUnmounted } from 'vue';

export default defineComponent({
  setup() {
    // data
    const pending = ref(false);
    const pendingMore = ref(false);
    const notifications = ref([]);
    const dayjs = inject('dayjs');

    // methods
    const getData = () => {
      if (pending.value) return;

      pending.value = true;

      setTimeout(() => {
        const noty = [
          {
            id: 1,
            icon: 'pi-star',
            title: 'Празднуем 2 года компании OPES',
            description:
              '20 ноября 2024 мы отмечаем 2 года компании OPES. Заполните заявку и получите персональное приглашение.',
            date: '2024-05-04T23:40:47+0000',
            read: false,
          },
          {
            id: 2,
            icon: 'pi-calendar',
            title: 'Завершение локапа',
            description: '02 июня 2024 в 00:00 локап L-000000002 будет закрыт.',
            date: '2024-05-20T23:40:47+0000',
            read: false,
          },
          {
            id: 3,
            icon: 'pi-bolt',
            title: 'Срочно смените пароль',
            description: 'Настоятельно рекомендуем заменить текущий пароль.',
            date: '2024-06-04T23:40:47+0000',
            read: true,
          },
          {
            id: 4,
            icon: 'pi-exclamation-circle',
            title: 'Добавлена темная тема',
            description: 'Изменить тему оформления можно в Настройках.',
            date: '2024-05-04T23:40:47+0000',
            read: true,
          },
          {
            id: 5,
            icon: 'pi-star',
            title: 'Празднуем 2 года компании OPES',
            description:
              '20 ноября 2024 мы отмечаем 2 года компании OPES. Заполните заявку и получите персональное приглашение.',
            date: '2024-05-04T23:40:47+0000',
            read: false,
          },
          {
            id: 6,
            icon: 'pi-calendar',
            title: 'Завершение локапа',
            description: '02 июня 2024 в 00:00 локап L-000000002 будет закрыт.',
            date: '2024-05-20T23:40:47+0000',
            read: false,
          },
          {
            id: 7,
            icon: 'pi-bolt',
            title: 'Срочно смените пароль',
            description: 'Настоятельно рекомендуем заменить текущий пароль.',
            date: '2024-06-04T23:40:47+0000',
            read: false,
          },
          {
            id: 8,
            icon: 'pi-exclamation-circle',
            title: 'Добавлена темная тема',
            description: 'Изменить тему оформления можно в Настройках.',
            date: '2024-05-04T23:40:47+0000',
            read: false,
          },
        ];

        notifications.value = noty;
        pending.value = false;
      }, 1000);
    };

    const getMore = () => {
      pendingMore.value = true;

      setTimeout(() => {
        const noty = [
          {
            id: 1,
            icon: 'pi-star',
            title: 'Празднуем 2 года компании OPES',
            description:
              '20 ноября 2024 мы отмечаем 2 года компании OPES. Заполните заявку и получите персональное приглашение.',
            date: '2024-05-04T23:40:47+0000',
            read: false,
          },
          {
            id: 2,
            icon: 'pi-calendar',
            title: 'Завершение локапа',
            description: '02 июня 2024 в 00:00 локап L-000000002 будет закрыт.',
            date: '2024-05-20T23:40:47+0000',
            read: false,
          },
          {
            id: 3,
            icon: 'pi-bolt',
            title: 'Срочно смените пароль',
            description: 'Настоятельно рекомендуем заменить текущий пароль.',
            date: '2024-06-04T23:40:47+0000',
            read: false,
          },
          {
            id: 4,
            icon: 'pi-exclamation-circle',
            title: 'Добавлена темная тема',
            description: 'Изменить тему оформления можно в Настройках.',
            date: '2024-05-04T23:40:47+0000',
            read: false,
          },
          {
            id: 5,
            icon: 'pi-star',
            title: 'Празднуем 2 года компании OPES',
            description:
              '20 ноября 2024 мы отмечаем 2 года компании OPES. Заполните заявку и получите персональное приглашение.',
            date: '2024-05-04T23:40:47+0000',
            read: false,
          },
          {
            id: 6,
            icon: 'pi-calendar',
            title: 'Завершение локапа',
            description: '02 июня 2024 в 00:00 локап L-000000002 будет закрыт.',
            date: '2024-05-20T23:40:47+0000',
            read: false,
          },
          {
            id: 7,
            icon: 'pi-bolt',
            title: 'Срочно смените пароль',
            description: 'Настоятельно рекомендуем заменить текущий пароль.',
            date: '2024-06-04T23:40:47+0000',
            read: false,
          },
          {
            id: 8,
            icon: 'pi-exclamation-circle',
            title: 'Добавлена темная тема',
            description: 'Изменить тему оформления можно в Настройках.',
            date: '2024-05-04T23:40:47+0000',
            read: false,
          },
        ];

        notifications.value = [...noty];
        pendingMore.value = false;
      }, 3000);
    };

    const readAll = () => {};

    const handleScroll = () => {
      const element = document.body;

      if (pendingMore.value) return;

      if (element.getBoundingClientRect().bottom - window.innerHeight < 40) {
        getMore();
      }
    };

    onMounted(() => {
      getData();

      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      readAll,
      getMore,
      dayjs,
      notifications,
      pending,
      pendingMore,
    };
  },
});
</script>
