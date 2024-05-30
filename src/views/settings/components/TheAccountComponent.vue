<template>
  <div class="mt-8">
    <div class="flex flex-col">
      <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
        {{ $t('form.labelEmail') }}
      </label>
      <IconField iconPosition="left">
        <InputIcon class="pi pi-envelope" />
        <InputText v-model.trim="user.email" disabled type="text" size="large" />
      </IconField>
    </div>

    <div class="mt-6 flex flex-col">
      <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
        {{ $t('form.referralPromocode') }}
      </label>
      <IconField iconPosition="left">
        <InputIcon class="pi pi-verified" />
        <InputText v-model.trim="user.promo" disabled type="text" size="large" />
      </IconField>
    </div>
    <div class="mt-1 text-right">
      <div
        @click="copy(user.promo)"
        class="cursor-pointer text-xs font-medium text-blue-600 dark:text-blue-500"
        to="/reset"
      >
        {{ $t('form.copy') }}
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
        to="/reset"
      >
        {{ $t('form.copy') }}
      </div>
    </div>

    <div class="relative mt-6 flex flex-col">
      <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
        {{ $t('form.labelPassword') }}
      </label>
      <IconField iconPosition="left">
        <InputIcon class="pi pi-lock" />
        <InputText :value="123456" disabled type="password" size="large" />
      </IconField>
    </div>
    <div class="mt-1 text-right">
      <div
        @click="show = true"
        class="cursor-pointer text-xs font-medium text-blue-600 dark:text-blue-500"
        to="/reset"
      >
        {{ $t('form.change') }}
      </div>
    </div>
  </div>

  <Sheet v-model:visible="show">
    <div class="p-5 pt-4 md:p-8">
      <div @click="show = false" class="flex cursor-pointer justify-end">
        <i style="font-size: 1rem" class="pi pi-times text-gray-500 dark:text-gray-300" />
      </div>

      <div class="mt-2">
        <span class="text-2xl font-bold">
          {{ $t('form.changePassword') }}
        </span>
      </div>

      <div class="mt-1 leading-4">
        {{ $t('form.changePasswordDescription') }}
      </div>

      <div class="relative mt-6 flex flex-col">
        <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('form.currentPassword') }}
        </label>
        <IconField iconPosition="left">
          <InputIcon class="pi pi-lock" />
          <InputText
            v-model.trim="form.password"
            @focus="v.$reset()"
            :invalid="!!validate({ prop: 'password' })"
            :type="typePassword ? 'password' : 'text'"
            size="large"
          />
        </IconField>
        <button class="toggle p-2" type="button" @click="typePassword = !typePassword">
          <i v-if="typePassword" class="pi pi-eye" style="font-size: 1.1rem" />
          <i v-else class="pi pi-eye-slash" style="font-size: 1.1rem" />
        </button>
        <div v-if="!!validate({ prop: 'password' })" class="invalid mt-1 text-red-400">
          {{ validate({ prop: 'password' }) }}
        </div>
      </div>

      <div class="relative mt-6 flex flex-col">
        <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('newPassword.title') }}
        </label>
        <IconField iconPosition="left">
          <InputIcon class="pi pi-lock" />
          <InputText
            v-model.trim="form.currentPassword"
            @focus="v.$reset()"
            :invalid="!!validate({ prop: 'currentPassword' })"
            :type="typeCurrentPassword ? 'password' : 'text'"
            size="large"
          />
        </IconField>
        <button
          class="toggle p-2"
          type="button"
          @click="typeCurrentPassword = !typeCurrentPassword"
        >
          <i v-if="typeCurrentPassword" class="pi pi-eye" style="font-size: 1.1rem" />
          <i v-else class="pi pi-eye-slash" style="font-size: 1.1rem" />
        </button>
        <div v-if="!!validate({ prop: 'currentPassword' })" class="invalid mt-1 text-red-400">
          {{ validate({ prop: 'currentPassword' }) }}
        </div>
      </div>

      <Button
        @click="onSubmit"
        :class="{ '-loading': form.pending }"
        class="justify-content-center mt-6 flex w-full bg-blue-600 p-4 text-center text-white"
        :loading="form.pending"
        :label="form.pending ? '' : $t('form.save')"
        rounded
      />

      <div
        @click="show = false"
        class="mt-6 cursor-pointer text-center font-semibold text-blue-600 dark:text-blue-500"
      >
        {{ $t('form.cancel') }}
      </div>
    </div>
  </Sheet>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue';
import { useMeStore } from '@/stores/me.js';
import { toastSuccess } from '@/utils/toast.js';
import { useI18n } from 'vue-i18n';
import { Sheet } from 'bottom-sheet-vue3';
import { minLength, required, sameAs } from '@/utils/i18n-validators.js';
import { useVuelidate } from '@vuelidate/core';

export default defineComponent({
  setup() {
    const form = reactive({
      password: null,
      currentPassword: null,
      pending: null,
    });
    const typePassword = ref(true);
    const typeCurrentPassword = ref(true);
    const show = ref(false);
    const meStore = useMeStore();
    const { user } = meStore;
    const { t } = useI18n();

    // computed
    const rules = computed(() => ({
      password: {
        required,
        minLength: minLength(6),
      },
      currentPassword: {
        required,
        minLength: minLength(6),
        sameAs: sameAs(form.password),
      },
    }));

    const v = useVuelidate(rules, form);

    // methods
    const onSubmit = async () => {
      v.value.$touch();

      if (form.pending) return;

      if (await v.value.$validate()) {
        form.pending = true;

        try {
          // const payload = {
          //   password: form.password,
          //   currentPassword: form.currentPassword,
          // };

          setTimeout(() => {
            toastSuccess({
              title: t('successForm.success'),
              body: t('successForm.changePassword'),
            });

            form.pending = false;

            show.value = false;
          }, 1500);

          // if (data?.access_token) {
          //   setToken(data.access_token);
          //
          //   await getProfile();
          //
          //   await router.push('/');
          // } else {
          //   const error = {
          //     title: 'Ошибка',
          //     body: 'Произошла ошибка, свяжитесь с администратором',
          //   };
          //
          //   toastError(error);
          // }
        } catch (e) {
          console.log(e);
        } finally {
          // form.pending = false;
        }
      }
    };

    const validate = ({ prop }) => {
      const error = v.value.$errors.find((el) => el.$property === prop);

      return error && error.$message;
    };

    const copy = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        toastSuccess({
          title: t('successForm.success'),
          body: t('successForm.copy'),
        });
      });
    };

    return {
      form,
      user,
      typePassword,
      typeCurrentPassword,
      copy,
      validate,
      onSubmit,
      v,
      show,
    };
  },

  components: {
    Sheet,
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

.toggle {
  position: absolute;
  top: 24px;
  right: 10px;
  z-index: 10;
}
</style>
