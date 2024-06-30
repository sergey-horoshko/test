<template>
  <div
    class="flex w-full items-center gap-3 rounded-lg bg-gray-100 p-4 md:bg-gray-200 dark:bg-dark dark:text-gray-300"
  >
    <i class="pi pi-filter" style="font-size: 1rem"></i>
    <span class="font-semibold text-black dark:text-white">
      {{ $t('history.categoryEvents') }}
    </span>
  </div>

  <div class="mt-4 flex flex-wrap gap-3">
    <div
      v-for="item in variants"
      :key="item.id"
      class="flex cursor-pointer items-center gap-2 rounded-full border-[1px] p-3 text-xs"
      @click="pick(item.id)"
      :class="{
        'border-green-100 bg-green-100 text-green-600': item.pick === true,
        'border-gray-300 bg-transparent text-gray-400 dark:text-gray-200': item.pick === false,
      }"
    >
      <i v-if="item.pick" class="pi pi-check" style="font-size: 0.8rem"></i>
      <span class="font-semibold">
        {{ localeStore.locale === 'ru' ? item.textRu : item.textEn }}
      </span>
    </div>
  </div>

  <div class="mt-6 flex flex-col">
    <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
      {{ $t('form.sort') }}
    </label>
    <IconField iconPosition="left">
      <InputIcon class="pi pi-sort-alt" />
      <Dropdown
        v-model="sort"
        :options="sortValues"
        :optionLabel="localeStore.locale === 'ru' ? 'nameRu' : 'nameEn'"
        optionValue="value"
        class="w-full"
      />
    </IconField>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { useLocaleStore } from '@/stores/locale.js';

export default defineComponent({
  setup() {
    // data
    const localeStore = useLocaleStore();
    const variants = reactive([
      {
        id: 1,
        textRu: 'Все',
        textEn: 'All',
        value: 'all',
        pick: true,
      },
      {
        id: 2,
        textRu: 'Прибыль',
        textEn: 'Profit',
        value: '',
        pick: false,
      },
      {
        id: 3,
        textRu: 'Пополнение',
        textEn: 'Replenishment',
        value: '',
        pick: false,
      },
      {
        id: 4,
        textRu: 'Вывод',
        textEn: 'Conclusion',
        value: '',
        pick: false,
      },
      {
        id: 5,
        textRu: 'Обмен',
        textEn: 'Exchange',
        value: '',
        pick: false,
      },
      {
        id: 6,
        textRu: 'Партнерка',
        textEn: 'Affiliate',
        value: '',
        pick: false,
      },
      {
        id: 7,
        textRu: 'Системные',
        textEn: 'System',
        value: '',
        pick: false,
      },
    ]);
    const sortValues = reactive([
      {
        id: 1,
        nameRu: 'Новые события сверху',
        nameEn: 'New events from above',
        value: 'new',
      },
      {
        id: 2,
        nameRu: 'Новые события снизу',
        nameEn: 'New events below',
        value: 'old',
      },
    ]);
    const sort = ref('new');

    // methods
    const pick = (id) => {
      if (id === 1) {
        variants.map((item) => {
          if (item.id !== 1) {
            item.pick = false;
          }
        });

        variants[0].pick = true;

        return;
      }

      variants[0].pick = false;

      variants.map((item) => {
        if (item.id === id) {
          item.pick = !item.pick;
        }
      });
    };

    return {
      variants,
      localeStore,
      sort,
      sortValues,
      pick,
    };
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
