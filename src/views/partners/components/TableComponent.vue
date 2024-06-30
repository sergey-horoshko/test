<template>
  <div class="mt-5">
    <div
      class="flex items-center justify-between gap-3 rounded-lg bg-gray-200 px-3 py-4 text-xs font-bold dark:bg-gray-700"
    >
      <span>
        {{ $t('partners.mainCol') }}
      </span>
      <span>
        {{ $t('partners.reward') }}
      </span>
    </div>

    <template v-if="information.length">
      <div v-for="info in information" :key="info.id" class="mt-5">
        <div class="flex items-center gap-3 border-b-[1px] border-gray-300 pb-2">
          <i class="pi pi-calendar text-gray-600" style="font-size: 1rem"></i>
          <span class="text-xs font-bold capitalize text-blue-600 dark:text-blue-500">
            {{ dayjs(info.date).format('MMMM YYYY') }}
          </span>
        </div>

        <div
          v-for="(operation, index) in info.operations"
          :key="index"
          class="flex items-center justify-between gap-3 px-1 py-3 text-xs"
        >
          <span class="font-medium text-gray-600">
            {{ operation.name }}
          </span>
          <div
            :class="{ 'text-gray-400': operation.status === '' }"
            class="flex items-center gap-1"
          >
            <span class="font-bold" :class="{ 'text-green-500': operation.status === 'add' }">
              {{ operation.value }}
            </span>
            <span class="font-medium"> USDT </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, inject } from 'vue';

export default defineComponent({
  setup() {
    // data
    const pending = ref(false);
    const information = ref([]);
    const dayjs = inject('dayjs');

    // methods
    const getData = () => {
      if (pending.value) return;

      pending.value = true;

      setTimeout(() => {
        const noty = [
          {
            id: 1,
            date: '2024-05-01T00:00:00+0000',
            operations: [
              {
                name: 'A-000000425',
                value: '+100,05',
                status: 'add',
              },
              {
                name: 'A-000000511',
                value: '00,00',
                status: '',
              },
            ],
          },
          {
            id: 2,
            date: '2024-04-01T00:00:00+0000',
            operations: [
              {
                name: 'A-000000425',
                value: '+1 032,05',
                status: 'add',
              },
              {
                name: 'A-000000511',
                value: '+567,89',
                status: 'add',
              },
            ],
          },
          {
            id: 3,
            date: '2024-02-01T00:00:00+0000',
            operations: [
              {
                name: 'A-000000425',
                value: '00,00',
                status: '',
              },
            ],
          },
        ];

        information.value = noty;
        pending.value = false;
      }, 1000);
    };

    onMounted(() => {
      getData();
    });

    return {
      dayjs,
      information,
      pending,
    };
  },
});
</script>
