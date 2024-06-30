<template>
  <div class="rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content">
    <div class="flex w-full items-center justify-between gap-3">
      <span class="text-2xl font-bold">
        {{ $t('reset.title') }}
      </span>
      <router-link class="font-semibold text-blue-600 dark:text-blue-500" to="/auth">
        {{ $t('reset.auth') }}
      </router-link>
    </div>
    <div class="mt-2 leading-5">
      {{ $t('reset.description') }}
    </div>

    <form @submit.prevent="onSubmit" autocomplete="off" class="mt-8">
      <div class="flex flex-col">
        <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('form.labelEmail') }}
        </label>
        <IconField iconPosition="left">
          <InputIcon class="pi pi-envelope" />
          <InputText
            v-model.trim="form.email"
            @focus="v.$reset()"
            :invalid="!!validate({ prop: 'email' })"
            type="text"
            size="large"
          />
        </IconField>
        <div v-if="!!validate({ prop: 'email' })" class="invalid mt-1 text-red-400">
          {{ validate({ prop: 'email' }) }}
        </div>
      </div>

      <Button
        :class="{ '-loading': form.pending }"
        class="justify-content-center mt-6 flex w-full bg-blue-600 p-4 text-center text-white"
        :loading="form.pending"
        :label="form.pending ? '' : $t('form.buttonReset')"
        rounded
        type="submit"
      />
    </form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { toastError, toastSuccess } from '@/utils/toast';
import { required, email } from '@/utils/i18n-validators.js';
import { resetPassword } from '@/api/reset.js';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const typePassword = ref(true);
    const form = reactive({
      email: '',
    });
    const { t } = useI18n();

    // computed
    const rules = computed(() => ({
      email: {
        required,
        email,
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

      if (form.pending) return;

      if (await v.value.$validate()) {
        form.pending = true;

        try {
          const payload = {
            email: form.email.toLowerCase(),
          };

          const data = await resetPassword(payload);

          if (data?.message) {
            toastSuccess({
              title: t('successForm.success'),
              body: t('successForm.resetPassword'),
            });
          }
        } catch (e) {
          toastError({
            title: t('errorForm.error'),
            body: t('errorForm.resetPassword'),
          });
        } finally {
          form.pending = false;
        }
      }
    };

    return {
      typePassword,
      form,
      v,
      validate,
      onSubmit,
    };
  },
});
</script>
