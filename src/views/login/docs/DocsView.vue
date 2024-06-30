<template>
  <div class="rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content">
    <button @click="goTo" class="flex items-center gap-3 text-gray-400" type="button">
      <i class="pi pi-arrow-left" />
      <span>
        {{ $t('form.back') }}
      </span>
    </button>
    <div class="mt-8 flex w-full items-center justify-between gap-3">
      <span class="text-2xl font-bold">
        {{ $t('docs.title') }}
      </span>
    </div>
    <div class="mt-2 leading-5">
      {{ $t('docs.description') }}
    </div>
    <div class="mt-5 flex gap-3">
      <i class="pi pi-calendar" />
      <span>
        {{ $t('docs.date') }}
      </span>
    </div>

    <div class="mt-8 text-xs">
      <p class="leading-5">
        {{ $t('docs.rules') }}
      </p>
      <p class="mt-6 leading-5">
        {{ $t('docs.termins') }}
      </p>
      <p class="mt-6 leading-5">
        {{ $t('docs.webService') }}
      </p>
      <p class="mt-6 leading-5">
        {{ $t('docs.mobApp') }}
      </p>
      <p class="mt-6 leading-5">
        {{ $t('docs.lk') }}
      </p>
      <p class="mt-6 leading-5">
        {{ $t('docs.account') }}
      </p>
      <p class="mt-6 leading-5">
        {{ $t('docs.user') }}
      </p>
      <p class="mt-6 leading-5">
        {{ $t('docs.investor') }}
      </p>
      <p class="mt-6 leading-5">
        {{ $t('docs.money') }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    // data
    const router = useRouter();

    // methods
    const goTo = () => {
      router.push('/registration');
    };

    return {
      goTo,
    };
  },
});
</script>
