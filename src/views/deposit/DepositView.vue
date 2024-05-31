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
        {{ $t('deposit.title') }}
      </span>
    </div>
    <div class="mt-1 leading-5">
      {{ $t('deposit.description') }}
    </div>

    <div class="mt-8">
      <div class="flex flex-col">
        <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('form.network') }}
        </label>
        <IconField iconPosition="left">
          <InputIcon class="pi pi-wallet" />
          <InputText v-model.trim="form.wallet" disabled type="text" size="large" />
        </IconField>
      </div>
      <div class="mt-1 text-right">
        <div
          @click="copy(form.wallet)"
          class="cursor-pointer text-xs font-medium text-blue-600 dark:text-blue-500"
        >
          {{ $t('form.copy') }}
        </div>
      </div>

      <div class="flex flex-col mt-6">
        <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('form.network') }}
        </label>
        <IconField iconPosition="left">
          <InputIcon class="pi pi-sitemap" />
          <Dropdown
            v-model="form.network"
            :options="user.wallets"
            optionLabel="network"
            optionValue="network"
            class="w-full"
          />
        </IconField>
      </div>

      <div class="flex flex-col mt-6">
        <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('form.transferAmount') }}
        </label>
        <IconField iconPosition="left">
          <InputIcon class="pi pi-dollar" />
          <InputText
            v-maska
            v-model.trim.number="form.amount"
            type="text"
            :data-maska="'##########'"
            size="large"
          />
        </IconField>
      </div>

      <Button
        @click="onSubmit"
        :class="{ '-loading': form.pending }"
        class="justify-content-center mt-6 flex w-full bg-blue-600 p-4 text-center text-white"
        :loading="form.pending"
        :disabled="!form.amount"
        :label="form.pending ? '' : $t('form.confirmTransfer')"
        rounded
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMeStore } from '@/stores/me.js';
import { vMaska } from 'maska';
import { toastSuccess } from '@/utils/toast.js';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    // data
    const form = reactive({
      wallet: '74GFo329ddfb28f',
      network: null,
      amount: null,
      pending: null,
    });
    const meStore = useMeStore();
    const { user } = meStore;
    const router = useRouter();
    const { t } = useI18n();

    // methods
    const goTo = () => {
      router.push('/payment');
    };

    const onSubmit = () => {
      if (form.pending) return;

      form.pending = true;

      setTimeout(() => {
        toastSuccess({
          title: t('successForm.success'),
          body: t('successForm.transfer'),
        });

        form.pending = false;

        router.push('/payment');
      }, 1500);
    };

    const copy = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        toastSuccess({
          title: t('successForm.success'),
          body: t('successForm.copy'),
        });
      });
    };

    // hooks
    onMounted(() => {
      form.network = user.wallets[0].network;
    });

    return {
      form,
      goTo,
      onSubmit,
      copy,
      user,
    };
  },

  directives: {
    maska: vMaska,
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
