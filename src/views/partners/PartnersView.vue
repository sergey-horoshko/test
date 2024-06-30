<template>
  <div class="min-h-96 rounded-lg px-5 pb-0 pt-0 md:pb-0 md:pt-0">
    <div
      class="card flex w-full items-center justify-center gap-8 rounded-lg bg-green-600 p-5 text-xs text-white md:gap-16 md:px-12 md:py-8 md:text-base md:shadow-xl"
    >
      <div class="flex min-h-[150px] flex-col justify-between">
        <div class="mb-6 flex flex-col gap-2">
          <img class="logo" src="/images/logo.svg" alt="logo" />
          <span class="text font-bold">P A R T N E R</span>
        </div>
        <div class="flex flex-col">
          <span class="mb-1"> Partner ID </span>
          <span class="font-medium">
            {{ user.promo }}
          </span>
        </div>
      </div>
      <div class="flex min-h-[150px] flex-col justify-between">
        <div class="flex flex-col md:mt-4">
          <div class="flex items-center gap-3">
            <i class="pi pi-dollar" style="font-size: 1rem"></i>
            <span>
              {{ $t('partners.allPaid') }}
            </span>
          </div>
          <div class="ml-8 flex items-center gap-3">
            <span class="font-bold">00,00</span>
            <span class="text-xs text-gray-300">USDT</span>
          </div>
        </div>
        <div class="mt-4 flex flex-col">
          <div class="flex items-center gap-3">
            <i class="pi pi-calendar" style="font-size: 1rem"></i>
            <span>
              {{ $t('partners.lastMonth') }}
            </span>
          </div>
          <div class="ml-8 flex items-center gap-3">
            <span class="font-bold">00,00</span>
            <span class="text-xs text-gray-300">USDT</span>
          </div>
        </div>
        <div class="mt-4 flex flex-col">
          <div class="flex items-center gap-3">
            <i class="pi pi-users" style="font-size: 1rem"></i>
            <span>
              {{ $t('partners.invitePartners') }}
            </span>
          </div>
          <div class="ml-8 flex items-center gap-3">
            <span class="font-bold">0</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-col">
      <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
        {{ $t('form.referralLink') }}
      </label>
      <IconField iconPosition="left">
        <InputIcon class="pi pi-verified" />
        <InputText
          :value="`https://cab.opes.team/?ref=${user.promo}`"
          disabled
          type="text"
          size="large"
        />
      </IconField>
    </div>
    <div class="mt-1 text-right">
      <div
        @click="copy(`https://cab.opes.team/?ref=${user.promo}`)"
        class="cursor-pointer text-xs font-medium text-blue-600 dark:text-blue-500"
      >
        {{ $t('form.copy') }}
      </div>
    </div>

    <div class="mt-8 flex w-full items-center justify-between gap-3">
      <span class="text-2xl font-bold leading-7">
        {{ $t('partners.title') }}
      </span>
    </div>
    <div class="mt-3 leading-5">
      {{ $t('partners.description') }}
    </div>
    <div class="mt-3 leading-5">
      <span>
        {{ $t('partners.descriptionMore') }}
      </span>
      <span class="ml-1 font-medium text-blue-600 dark:text-blue-500">
        {{ $t('partners.descriptionEnd') }}
      </span>
    </div>

    <Table />
  </div>
</template>
<script>
import { defineAsyncComponent, defineComponent } from 'vue';
import { toastSuccess } from '@/utils/toast.js';
import { useI18n } from 'vue-i18n';
import { useMeStore } from '@/stores/me.js';

export default defineComponent({
  setup() {
    // data
    const { t } = useI18n();
    const meStore = useMeStore();
    const { user } = meStore;

    // methods
    const copy = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        toastSuccess({
          title: t('successForm.success'),
          body: t('successForm.copy'),
        });
      });
    };

    return {
      user,
      copy,
    };
  },

  components: {
    Table: defineAsyncComponent(() => import('./components/TableComponent.vue')),
  },
});
</script>

<style scoped lang="scss">
.text {
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
