<template>
  <div class="p-5 pt-4 md:p-8">
    <div class="flex cursor-pointer justify-end">
      <i style="font-size: 1rem" class="pi pi-times text-gray-500 dark:text-gray-300" />
    </div>

    <div class="mt-2">
      <span class="text-2xl font-bold">
        {{ $t('form.confirm') }}
      </span>
    </div>

    <div class="mt-3 leading-5">
      {{ $t('investments.createNewLockup') }}
    </div>

    <div class="mt-8">
      <div class="flex flex-col">
        <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('investments.typeLockup') }}
        </label>
        <IconField iconPosition="left">
          <InputIcon class="pi pi-chart-bar" />
          <Dropdown
            v-model="form.typeLockup"
            :options="typesLockup"
            :optionLabel="localeStore.locale === 'ru' ? 'nameRu' : 'nameEn'"
            optionValue="id"
            disabled
            class="w-full"
          />
        </IconField>
      </div>

      <div class="mt-6">
        <div class="flex flex-col">
          <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
            {{ $t('form.sumLockup') }}
          </label>
          <IconField iconPosition="left">
            <InputIcon class="pi pi-dollar" />
            <InputText v-model="form.pay" disabled type="text" size="large" />
          </IconField>
        </div>
      </div>

      <div class="mt-6">
        <div class="flex flex-col">
          <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
            {{ $t('form.investmentPeriod') }}
          </label>
          <IconField iconPosition="left">
            <InputIcon class="pi pi-calendar" />
            <Dropdown
              v-model="form.typePeriod"
              :options="typesPeriod"
              :optionLabel="localeStore.locale === 'ru' ? 'nameRu' : 'nameEn'"
              optionValue="id"
              disabled
              class="w-full"
            />
          </IconField>
        </div>
      </div>

      <div class="mt-6">
        <div class="flex flex-col">
          <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
            {{ $t('form.payInterest') }}
          </label>
          <IconField iconPosition="left">
            <InputIcon class="pi pi-percentage" />
            <Dropdown
              v-model="form.typePayment"
              :options="typesPayments"
              :optionLabel="localeStore.locale === 'ru' ? 'nameRu' : 'nameEn'"
              optionValue="id"
              disabled
              class="w-full"
            />
          </IconField>
        </div>
      </div>

      <div class="mt-4 flex flex-col">
        <Button
          @click="onSubmit"
          :class="{ '-loading': form.pending }"
          class="justify-content-center mt-6 flex w-full bg-blue-600 p-4 text-center text-white"
          :loading="form.pending"
          :label="form.pending ? '' : $t('form.confirmAnother')"
          rounded
          type="submit"
        />

        <Button
          @click="showFinal = false"
          :label="$t('form.cancel')"
          class="justify-content-center mt-4 flex w-full bg-blue-600 p-4 text-center"
          severity="secondary"
          rounded
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue';
import { useLocaleStore } from '@/stores/locale.js';

export default defineComponent({
  setup() {
    // data
    const form = inject('form');
    const show = inject('show');
    const showFinal = inject('showFinal');
    const typesLockup = inject('typesLockup');
    const typesPeriod = inject('typesPeriod');
    const typesPayments = inject('typesPayments');
    const localeStore = useLocaleStore();

    // methods
    const onSubmit = () => {
      if (form.pending) return;

      form.pending = true;

      try {
        // const payload = {
        //   email: form.email.toLowerCase(),
        //   password: form.password,
        // };

        // const data = await AuthRequest(payload);

        show.value = false;
        showFinal.value = false;
      } catch (e) {
        console.log(e);
      } finally {
        form.pending = false;
      }
    };

    return {
      form,
      show,
      showFinal,
      typesLockup,
      typesPeriod,
      typesPayments,
      localeStore,
      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.pi {
  z-index: 100;
}

:deep(span[data-pc-section='input']) {
  padding-left: 0;
}
</style>
