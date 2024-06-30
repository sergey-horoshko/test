<template>
  <div class="rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content">
    <div class="flex items-center justify-between gap-4 md:gap-8">
      <div class="flex flex-col">
        <div class="flex items-center gap-3">
          <i class="pi pi-database" style="font-size: 1rem"></i>
          <span>
            {{ $t('payment.freeMoney') }}
          </span>
        </div>
        <div class="ml-8 flex items-center gap-3">
          <span class="font-bold">00,00</span>
          <span class="text-xs text-gray-500">USDT</span>
        </div>
      </div>

      <div
        @click="goTo('/deposit')"
        class="button flex cursor-pointer items-center justify-center gap-3 rounded-full bg-gray-200 px-5 py-2 text-blue-600 md:py-3 md:shadow-md"
      >
        <i class="pi pi-download" style="font-size: 1rem"></i>
        <span>
          {{ $t('form.deposit') }}
        </span>
      </div>
    </div>

    <div class="mb-6">
      <Button
        @click="show = true"
        :label="$t('form.openLockup')"
        class="justify-content-center mt-6 flex w-full bg-blue-600 p-4 text-center text-white"
        severity="success"
        rounded
      />
    </div>

    <div class="flex w-full items-center justify-between gap-3">
      <span class="text-2xl font-bold">
        {{ $t('investments.title') }}
      </span>
    </div>
    <div class="mt-2 leading-5">
      {{ $t('investments.description') }}
    </div>
  </div>

  <Sheet
    v-model:visible="show"
    :noClickOutside="true"
    class="bg-white md:bg-surface-100 dark:bg-dark dark:text-white"
    :class="{ dark: themeStore.theme === 'dark' }"
  >
    <div v-if="!showFinal" class="p-5 pt-4 md:p-8">
      <div @click="show = false" class="flex cursor-pointer justify-end">
        <i style="font-size: 1rem" class="pi pi-times text-gray-500 dark:text-gray-300" />
      </div>

      <div class="mt-2">
        <span class="text-2xl font-bold">
          {{ $t('investments.newLockup') }}
        </span>
      </div>

      <div class="mt-3 leading-5">
        {{ $t('investments.openDescription') }}
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
              class="w-full"
            />
          </IconField>
        </div>

        <div
          v-if="form.typeLockup === 1"
          class="mt-6 rounded-lg bg-green-100 p-2 text-xs leading-5 dark:bg-green-700"
        >
          {{ $t('investments.halalDescription') }}
        </div>

        <div class="mt-6">
          <div class="flex flex-col">
            <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
              {{ $t('payment.freeMoney') }} (USDT)
            </label>
            <IconField iconPosition="left">
              <InputIcon class="pi pi-database" />
              <InputText :value="formatNumber(user.invested)" disabled type="text" size="large" />
            </IconField>
          </div>
        </div>

        <div class="mt-6">
          <div class="flex flex-col">
            <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
              {{ $t('form.sumLockup') }}
            </label>
            <IconField iconPosition="left">
              <InputIcon class="pi pi-dollar" />
              <InputText
                v-model="form.pay"
                :invalid="!!validate({ prop: 'pay' })"
                type="text"
                size="large"
              />
            </IconField>
          </div>
          <div v-if="!!validate({ prop: 'pay' })" class="invalid mt-1 text-red-400">
            {{ validate({ prop: 'pay' }) }}
          </div>
        </div>

        <div class="mt-6 rounded-lg bg-green-100 p-2 text-xs leading-5 dark:bg-green-700">
          {{ $t('investments.addHalal') }}
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
                class="w-full"
              />
            </IconField>
          </div>
        </div>

        <div class="mt-6">
          <div
            v-if="form.typeLockup === 1"
            class="mt-6 rounded-lg bg-green-100 p-2 text-xs leading-5 dark:bg-green-700"
          >
            {{ $t('investments.halalMark') }}
            <span class="ml-1 font-medium text-blue-600 dark:text-blue-700">
              {{ $t('partners.descriptionEnd') }}
            </span>
          </div>

          <div
            v-if="form.typeLockup === 2"
            class="mt-6 rounded-lg bg-green-100 p-2 text-xs leading-5 dark:bg-green-700"
          >
            {{ $t('investments.standardMark') }}
            <span class="ml-1 font-medium text-blue-600 dark:text-blue-700">
              {{ $t('partners.descriptionEnd') }}
            </span>
          </div>
        </div>

        <div class="mt-6 rounded-lg bg-green-100 p-2 text-xs leading-5 dark:bg-green-700">
          {{ $t('investments.opportunity') }}
        </div>

        <div class="mt-6 flex flex-col">
          <Button
            @click="onSubmit"
            :label="$t('form.openLockup')"
            class="justify-content-center flex w-full bg-blue-600 p-4 text-center text-white"
            severity="success"
            rounded
          />

          <Button
            @click="show = false"
            :label="$t('form.cancel')"
            class="justify-content-center mt-4 flex w-full bg-blue-600 p-4 text-center"
            severity="secondary"
            rounded
          />
        </div>
      </div>
    </div>

    <ConfirmComponent v-else />
  </Sheet>
</template>

<script>
import { computed, defineAsyncComponent, defineComponent, reactive, ref, provide } from 'vue';
import { useThemeStore } from '@/stores/theme.js';
import { Sheet } from 'bottom-sheet-vue3';
import { useLocaleStore } from '@/stores/locale.js';
import { useMeStore } from '@/stores/me.js';
import { formatNumber } from '@/utils/format.js';
import { useVuelidate } from '@vuelidate/core';
import { required, minValue, numeric } from '@/utils/i18n-validators.js';

export default defineComponent({
  setup() {
    // data
    const form = reactive({
      typeLockup: 1,
      typePeriod: 1,
      typePayment: 1,
      pay: null,
      pending: null,
    });
    const show = ref(false);
    const showFinal = ref(false);
    const typesLockup = reactive([
      {
        id: 1,
        nameRu: 'Халяль',
        nameEn: 'Halal',
      },
      {
        id: 2,
        nameRu: '60/40',
        nameEn: '60/40',
      },
    ]);
    const typesPeriod = reactive([
      {
        id: 1,
        nameRu: '3 месяца',
        nameEn: '3 months',
      },
      {
        id: 2,
        nameRu: '6 месяцев',
        nameEn: '6 months',
      },
      {
        id: 3,
        nameRu: '9 месяцев',
        nameEn: '9 months',
      },
      {
        id: 4,
        nameRu: '12 месяцев',
        nameEn: '12 months',
      },
    ]);
    const typesPayments = reactive([
      {
        id: 1,
        nameRu: 'В конце срока',
        nameEn: 'At the end of the term\n',
      },
      {
        id: 2,
        nameRu: 'Каждый месяц',
        nameEn: 'Every month',
      },
    ]);
    const localeStore = useLocaleStore();
    const themeStore = useThemeStore();
    const meStore = useMeStore();
    const { user } = meStore;
    provide('form', form);
    provide('show', show);
    provide('showFinal', showFinal);
    provide('typesLockup', typesLockup);
    provide('typesPeriod', typesPeriod);
    provide('typesPayments', typesPayments);

    // computed
    const rules = computed(() => ({
      pay: {
        required,
        numeric,
        minValue: minValue(5000),
      },
    }));

    const v = useVuelidate(rules, form);

    // methods
    const validate = ({ prop }) => {
      const error = v.value.$errors.find((el) => el.$property === prop);

      return error && error.$message;
    };

    const onSubmit = async () => {
      v.value.$touch();

      if (await v.value.$validate()) {
        showFinal.value = true;
      }
    };

    return {
      form,
      show,
      typesLockup,
      localeStore,
      themeStore,
      user,
      formatNumber,
      typesPeriod,
      typesPayments,
      showFinal,
      validate,
      onSubmit,
    };
  },

  components: {
    Sheet,
    ConfirmComponent: defineAsyncComponent(() => import('./components/ConfirmComponent.vue')),
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
