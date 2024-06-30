<template>
  <div class="min-h-96 rounded-lg px-5 pb-0 pt-0 md:pb-0 md:pt-0">
    <div
      class="card flex w-full items-center justify-center gap-8 rounded-lg bg-blue-600 p-5 text-xs text-white md:gap-16 md:px-12 md:py-8 md:text-base md:shadow-xl"
    >
      <div class="flex min-h-[150px] flex-col justify-between">
        <div class="mb-6 flex flex-col gap-2">
          <img class="logo" src="/images/logo.svg" alt="logo" />
          <span class="text font-bold">W A L L E T</span>
        </div>
        <div class="flex flex-col">
          <span class="mb-1">
            {{ $t('payment.check') }}
          </span>
          <span class="font-bold">A-000000001</span>
        </div>
      </div>
      <div class="flex min-h-[150px] flex-col justify-between">
        <div class="flex flex-col md:mt-4">
          <div class="flex items-center gap-3">
            <i class="pi pi-wallet" style="font-size: 1rem"></i>
            <span>
              {{ $t('payment.balance') }}
            </span>
          </div>
          <div class="ml-8 flex items-center gap-3">
            <span class="font-bold">00,00</span>
            <span class="text-xs text-gray-300">USDT</span>
          </div>
        </div>
        <div class="mt-4 flex flex-col">
          <div class="flex items-center gap-3">
            <i class="pi pi-chart-bar" style="font-size: 1rem"></i>
            <span>
              {{ $t('payment.investment') }}
            </span>
          </div>
          <div class="ml-8 flex items-center gap-3">
            <span class="font-bold">00,00</span>
            <span class="text-xs text-gray-300">USDT</span>
          </div>
        </div>
        <div class="mt-4 flex flex-col">
          <div class="flex items-center gap-3">
            <i class="pi pi-database" style="font-size: 1rem"></i>
            <span>
              {{ $t('payment.freeMoney') }}
            </span>
          </div>
          <div class="ml-8 flex items-center gap-3">
            <span class="font-bold">00,00</span>
            <span class="text-xs text-gray-300">USDT</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 px-5 pb-0 pt-0 font-semibold md:px-12 md:pb-0 md:pt-0">
      <div class="flex items-center justify-center gap-4 md:gap-8">
        <div
          @click="goTo('/deposit')"
          class="button flex cursor-pointer items-center justify-center gap-3 rounded-full bg-gray-200 px-5 py-2 text-blue-600 md:py-3 md:shadow-md"
        >
          <i class="pi pi-download" style="font-size: 1rem"></i>
          <span>
            {{ $t('form.deposit') }}
          </span>
        </div>
        <div
          @click="goTo('/withdraw')"
          class="button flex cursor-pointer items-center justify-center gap-3 rounded-full bg-gray-200 px-5 py-2 text-blue-600 md:py-3 md:shadow-md"
        >
          <i class="pi pi-upload" style="font-size: 1rem"></i>
          <span>
            {{ $t('form.withdraw') }}
          </span>
        </div>
      </div>
    </div>

    <!--    <div class="flex w-full items-center justify-between gap-3 mt-8">-->
    <!--      <span class="text-2xl font-bold leading-7">-->
    <!--        {{ $t('payment.title') }}-->
    <!--      </span>-->
    <!--    </div>-->
    <!--    <div class="mt-3 leading-5">-->
    <!--      {{ $t('payment.description') }}-->
    <!--    </div>-->

    <Operations />
  </div>
</template>
<script>
import { defineAsyncComponent, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    // data
    const router = useRouter();

    // methods
    const goTo = (link) => {
      router.push(link);
    };

    return {
      goTo,
    };
  },

  components: {
    Operations: defineAsyncComponent(() => import('./components/OperationsComponent.vue')),
  },
});
</script>

<style scoped lang="scss">
.text {
  margin-left: 7px;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
}

.card {
  min-height: 260px;
}

.logo {
  max-width: 100px;
}

.button {
  width: 100%;
  min-width: 145px;
  max-width: 145px;
}

@media (width <= 768px) {
  .logo {
    max-width: 80px;
  }

  .card {
    min-height: 210px;
  }
}
</style>
