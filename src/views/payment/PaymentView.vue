<template>
  <div class="min-h-96 rounded-lg px-5 pt-0 pb-0 md:pt-0 md:pb-0">
    <div
      class="flex justify-center md:gap-16 gap-8 items-center bg-blue-600 p-5 text-white text-xs md:text-base md:px-12 md:py-8 rounded-lg w-full md:shadow-xl card">
      <div class="flex flex-col justify-between min-h-[150px]">
        <div class="flex flex-col gap-2 mb-6">
          <img class="logo" src="/images/logo.svg" alt="logo">
          <span class="font-bold text">W A L L E T</span>
        </div>
        <div class="flex flex-col">
          <span class="mb-1">
            {{ $t('payment.check') }}
          </span>
          <span class="font-bold">A-000000001</span>
        </div>
      </div>
      <div class="flex flex-col justify-between min-h-[150px]">
        <div class="flex flex-col md:mt-4">
          <div class="flex items-center gap-3">
            <i class="pi pi-wallet" style="font-size: 1rem"></i>
            <span>
              {{ $t('payment.balance') }}
            </span>
          </div>
          <div class="flex items-center ml-8 gap-3">
            <span class="font-bold">00,00</span>
            <span class="text-xs text-gray-300">USDT</span>
          </div>
        </div>
        <div class="flex flex-col mt-4">
          <div class="flex items-center gap-3">
            <i class="pi pi-chart-bar" style="font-size: 1rem"></i>
            <span>
              {{ $t('payment.investment') }}
            </span>
          </div>
          <div class="flex items-center ml-8 gap-3">
            <span class="font-bold">00,00</span>
            <span class="text-xs text-gray-300">USDT</span>
          </div>
        </div>
        <div class="flex flex-col mt-4">
          <div class="flex items-center gap-3">
            <i class="pi pi-database" style="font-size: 1rem"></i>
            <span>
              {{ $t('payment.freeMoney') }}
            </span>
          </div>
          <div class="flex items-center ml-8 gap-3">
            <span class="font-bold">00,00</span>
            <span class="text-xs text-gray-300">USDT</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 px-5 pt-0 pb-0 md:px-12 md:pt-0 md:pb-0 font-semibold">
      <div class="flex justify-center items-center gap-4 md:gap-8">
        <div
          @click="goTo('/deposit')"
          class="button flex justify-center items-center gap-3 md:shadow-md py-2 md:py-3 px-5 bg-gray-200 cursor-pointer rounded-full text-blue-600">
          <i class="pi pi-download" style="font-size: 1rem"></i>
          <span>
            {{ $t('form.deposit') }}
          </span>
        </div>
        <div
          @click="goTo('/withdraw')"
          class="button flex justify-center items-center gap-3 md:shadow-md py-2 md:py-3 px-5 bg-gray-200 cursor-pointer rounded-full text-blue-600">
          <i class="pi pi-upload" style="font-size: 1rem"></i>
          <span>
            {{ $t('form.withdraw') }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex w-full items-center justify-between gap-3 mt-8">
      <span class="text-2xl font-bold leading-7">
        {{ $t('payment.title') }}
      </span>
    </div>
    <div class="mt-1 leading-5">
      {{ $t('payment.description') }}
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
    const goTo = (link) => {
      router.push(link);
    };

    return {
      goTo
    };
  }
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
