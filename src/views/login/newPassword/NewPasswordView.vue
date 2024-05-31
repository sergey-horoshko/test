<template>
  <div class="rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content">
    <div class="flex w-full items-center justify-between gap-3">
      <span class="text-2xl font-bold">
        {{ $t('newPassword.title') }}
      </span>
      <router-link class="font-semibold text-blue-600 dark:text-blue-500" to="/auth">
        {{ $t('newPassword.auth') }}
      </router-link>
    </div>
    <div class="mt-1">
      {{ $t('newPassword.description') }}
    </div>

    <form @submit.prevent="onSubmit" class="mt-8">
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

      <div class="relative mt-6 flex flex-col">
        <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('form.labelPassword') }}
        </label>
        <IconField iconPosition="left">
          <InputIcon class="pi pi-lock" />
          <InputText
            v-model.trim="form.password"
            @focus="v.$reset()"
            :invalid="!!validate({ prop: 'password' })"
            type="text"
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

      <Button
        :class="{ '-loading': form.pending }"
        class="justify-content-center mt-6 flex w-full bg-blue-600 p-4 text-center text-white"
        :loading="form.pending"
        :label="form.pending ? '' : $t('form.save')"
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
import { required, email, minLength } from '@/utils/i18n-validators.js';
import { changePassword } from '@/api/reset.js';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const typePassword = ref(true);
    const form = reactive({
      email: '',
      password: '',
    });
    const { t } = useI18n();
    const router = useRouter();

    // computed
    const rules = computed(() => ({
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
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
            password: form.password,
            password_confirmation: form.password,
            token: router.currentRoute.value.params.token,
          };

          const data = await changePassword(payload);

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

<style lang="scss">
.toggle {
  position: absolute;
  top: 24px;
  right: 10px;
  z-index: 10;
}
</style>