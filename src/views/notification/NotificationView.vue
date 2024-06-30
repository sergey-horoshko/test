<template>
  <div class="rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content">
    <button @click="goTo" class="flex items-center gap-3 text-gray-400" type="button">
      <i class="pi pi-arrow-left" />
      <span>
        {{ $t('form.back') }}
      </span>
    </button>

    <div v-if="pending" class="mt-12 flex items-center justify-center">
      <ProgressSpinner />
    </div>

    <template v-else>
      <div class="mt-8 flex w-full items-center justify-between gap-3">
        <span class="text-2xl font-bold">
          {{ data.title }}
        </span>
      </div>
      <div class="mt-3 leading-4">
        {{ data.description }}
      </div>
      <div class="mt-5 flex gap-3">
        <i class="pi pi-calendar" />
        <span>
          {{ $t('notification.date') }}
        </span>
        <span>
          {{ dayjs(data.date).format('DD MMM') }}
        </span>
      </div>
      <div class="mt-8 text-xs">
        {{ data.text }}
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent, inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    // data
    const data = ref(null);
    const pending = ref(true);
    const router = useRouter();
    const dayjs = inject('dayjs');

    const getData = () => {
      pending.value = true;

      setTimeout(() => {
        const obj = {
          title: 'Празднуем 2 года компании Opes',
          description:
            '20 ноября 2024 мы отмечаем 2 года компании OPES. Заполните заявку и получите персональное приглашение.',
          text:
            'Московский  праздник в Доме Пашкова стал завершающим в череде торжеств, посвященных юбилею журнала Forbes по всему миру. \n' +
            '\n' +
            'Организатором гала-вечера стала ACMG Media Group, издатель Forbes в России. Современный драйв  и классическая элегантность — два эпитета, наиболее точно описывающие атмосферу вечера. С приветственными речами выступили  ACMG Александр Федотов и Стив Форбс, главный редактор Forbes Америка.',
          date: '2024-05-04T23:40:47+0000',
          link: 'www.google.com',
        };

        data.value = obj;
        pending.value = false;
      }, 2000);
    };

    // methods
    const goTo = () => {
      router.push('/notification');
    };

    onMounted(() => {
      getData();
    });

    return {
      data,
      pending,
      dayjs,
      goTo,
    };
  },
});
</script>
