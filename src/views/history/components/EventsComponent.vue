<template>
  <div class="mt-6">
    <span class="text-lg font-bold leading-7">
      {{ $t('history.events') }}
    </span>

    <div v-if="pending" class="mt-12 flex items-center justify-center">
      <ProgressSpinner />
    </div>

    <template v-else>
      <div class="mt-4 flex flex-col gap-4">
        <div
          v-for="item in operations"
          :key="item.id"
          class="relative flex gap-3 rounded-lg bg-gray-100 p-4 md:bg-gray-200 dark:bg-dark"
        >
          <i
            style="font-size: 1.2rem"
            class="mt-6 text-gray-500 dark:text-gray-300"
            :class="`pi ${item.icon}`"
          />
          <div class="flex w-full flex-col">
            <div class="id tracking-wider text-gray-400 dark:text-gray-300">
              {{ item.uuid }}
            </div>
            <div class="mt-2 font-bold">
              {{ item.title }}
            </div>
            <div class="mt-2 text-xs font-medium text-gray-500 dark:text-gray-300">
              {{ item.description }}
            </div>
            <div class="mt-3 flex items-center justify-between">
              <span class="text-xs text-gray-400 dark:text-gray-300">
                {{ dayjs(item.date).format('DD MMM HH:MM') }}
              </span>
              <span
                v-if="item.status === 'wait'"
                class="min-w-[5.6rem] rounded-full bg-gray-600 px-3 py-1 text-center text-xs font-medium text-white"
              >
                {{ $t('status.wait') }}
              </span>
              <span
                v-if="item.status === 'success'"
                class="min-w-[5.6rem] rounded-full bg-green-500 px-3 py-1 text-center text-xs font-medium text-white"
              >
                {{ $t('status.success') }}
              </span>
              <span
                v-if="item.status === 'cancel'"
                class="min-w-[5.6rem] rounded-full bg-red-500 px-3 py-1 text-center text-xs font-medium text-white"
              >
                {{ $t('status.cancel') }}
              </span>
            </div>
          </div>
          <i
            v-tooltip.focus.left="{
              value: 'Средства поступят на баланс в течение 1 часа',
              showDelay: 300,
              hideDelay: 300,
            }"
            style="font-size: 0.9rem"
            tabindex="1"
            class="pi pi-info-circle absolute right-5 top-4 max-h-2 min-h-2 min-w-2 max-w-2 cursor-pointer cursor-pointer text-blue-600"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent, inject, onMounted, ref } from 'vue';

export default defineComponent({
  setup() {
    // data
    const pending = ref(false);
    const operations = ref([]);
    const dayjs = inject('dayjs');

    // methods
    const getData = () => {
      if (pending.value) return;

      pending.value = true;

      setTimeout(() => {
        const operation = [
          {
            id: 1,
            uuid: '123456789000',
            icon: 'pi-download',
            title: 'Пополнение средств',
            description: 'Заявка на внесение 1 234 567,89 USDT принята в обработку.',
            date: '2024-05-04T23:40:47+0000',
            status: 'wait',
          },
          {
            id: 2,
            uuid: '123456789000',
            icon: 'pi-download',
            title: 'Пополнение средств',
            description: 'Заявка на внесение 1 234 567,89 USDT принята в обработку.',
            date: '2024-05-20T23:40:47+0000',
            status: 'success',
          },
          {
            id: 3,
            uuid: '123456789000',
            icon: 'pi-download',
            title: 'Пополнение средств',
            description: 'Заявка на внесение 1 234 567,89 USDT принята в обработку.',
            date: '2024-06-04T23:40:47+0000',
            status: 'cancel',
          },
          {
            id: 4,
            uuid: '123456789000',
            icon: 'pi-users',
            title: 'Начисление прибыли локапа',
            description:
              'На локап L-000000001 начислена прибыль за апрель в размере 1 234,56 USDT.',
            date: '2024-05-04T23:40:47+0000',
            status: 'success',
          },
          {
            id: 4,
            uuid: '123456789000',
            icon: 'pi-percentage',
            title: 'Начисление прибыли от партнеров',
            description: 'Начислена прибыль от партнеров за апрель в размере 234,56 USDT.',
            date: '2024-05-04T23:40:47+0000',
            status: 'success',
          },
          {
            id: 5,
            uuid: '123456789000',
            icon: 'pi-upload',
            title: 'Вывод средств',
            description: 'Заявка на вывод 234 567,89 USDT принята в обработку.',
            date: '2024-05-04T23:40:47+0000',
            status: 'wait',
          },
          {
            id: 6,
            uuid: '123456789000',
            icon: 'pi-download',
            title: 'Завершение локапа',
            description: '02 июня 2024 в 00:00 локап L-000000002 будет закрыт.',
            date: '2024-05-20T23:40:47+0000',
            status: 'success',
          },
          {
            id: 7,
            uuid: '123456789000',
            icon: 'pi-upload',
            title: 'Вывод средств',
            description: 'Заявка на вывод 234 567,89 USDT принята в обработку.',
            date: '2024-06-04T23:40:47+0000',
            status: 'wait',
          },
          {
            id: 8,
            uuid: '123456789000',
            icon: 'pi-upload',
            title: 'Вывод средств',
            description: 'Заявка на вывод 234 567,89 USDT принята в обработку.',
            date: '2024-05-04T23:40:47+0000',
            status: 'cancel',
          },
        ];

        operations.value = operation;
        pending.value = false;
      }, 1000);
    };

    // hooks
    onMounted(() => {
      getData();
    });

    return {
      dayjs,
      operations,
      pending,
    };
  },
});
</script>

<style lang="scss" scoped>
.id {
  font-size: 10px;
}
</style>
