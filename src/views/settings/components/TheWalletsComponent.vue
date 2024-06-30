<template>
  <div class="mt-8">
    <div class="mt-6 flex flex-col">
      <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
        {{ $t('form.trc20') }}
      </label>
      <IconField iconPosition="left">
        <InputIcon class="pi pi-wallet" />
        <InputText
          v-model.trim="form.wallets[0].address"
          :disabled="!edit"
          type="text"
          size="large"
        />
      </IconField>
    </div>
    <div class="mt-1 text-right">
      <div
        v-if="!edit"
        @click="show = true"
        class="cursor-pointer text-xs font-medium text-blue-600 dark:text-blue-500"
        to="/reset"
      >
        {{ $t('form.change') }}
      </div>
    </div>

    <div class="mt-6 flex flex-col">
      <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
        {{ $t('form.bep20') }}
      </label>
      <IconField iconPosition="left">
        <InputIcon class="pi pi-wallet" />
        <InputText
          v-model.trim="form.wallets[1].address"
          :disabled="!edit"
          type="text"
          size="large"
        />
      </IconField>
    </div>
    <div v-if="!edit" class="mt-1 text-right">
      <div
        @click="show = true"
        class="cursor-pointer text-xs font-medium text-blue-600 dark:text-blue-500"
        to="/reset"
      >
        {{ $t('form.change') }}
      </div>
    </div>

    <div class="relative mt-6 flex flex-col">
      <label class="mb-1 text-xs font-medium text-gray-500 dark:text-gray-300">
        {{ $t('form.erc20') }}
      </label>
      <IconField iconPosition="left">
        <InputIcon class="pi pi-wallet" />
        <InputText
          v-model.trim="form.wallets[2].address"
          :disabled="!edit"
          type="text"
          size="large"
        />
      </IconField>
    </div>
    <div class="mt-1 text-right">
      <div
        v-if="!edit"
        @click="show = true"
        class="cursor-pointer text-xs font-medium text-blue-600 dark:text-blue-500"
        to="/reset"
      >
        {{ $t('form.change') }}
      </div>
    </div>

    <template v-if="edit">
      <Button
        @click="onChange"
        :disabled="isValid"
        :class="{ '-loading': form.pending }"
        class="justify-content-center mt-6 flex w-full bg-blue-600 p-4 text-center text-white"
        :loading="form.pending"
        :label="form.pending ? '' : $t('form.save')"
        rounded
      />

      <button
        v-if="showCancel"
        @click="changeVisibility"
        class="mx-auto mt-6 block cursor-pointer font-semibold text-blue-600 dark:text-blue-500"
      >
        {{ $t('form.cancel') }}
      </button>
    </template>
  </div>

  <Sheet
    v-model:visible="show"
    class="bg-white md:bg-surface-100 dark:bg-dark dark:text-white"
    :class="{ dark: themeStore.theme === 'dark' }"
  >
    <div class="p-5 pt-4 md:p-8">
      <div @click="show = false" class="flex cursor-pointer justify-end">
        <i style="font-size: 1rem" class="pi pi-times text-gray-500 dark:text-gray-300" />
      </div>

      <div class="mt-2">
        <span class="text-2xl font-bold">
          {{ $t('form.changeWallet') }}
        </span>
      </div>

      <div class="mt-1 leading-5">
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

      <Button
        @click="onSubmit"
        :class="{ '-loading': form.pendingModal }"
        class="justify-content-center mt-6 flex w-full bg-blue-600 p-4 text-center text-white"
        :loading="form.pendingModal"
        :label="form.pendingModal ? '' : $t('form.save')"
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
import { computed, defineComponent, reactive, ref, onMounted } from 'vue';
import { useMeStore } from '@/stores/me.js';
import { toastSuccess } from '@/utils/toast.js';
import { useI18n } from 'vue-i18n';
import { Sheet } from 'bottom-sheet-vue3';
import { minLength, required } from '@/utils/i18n-validators.js';
import { useVuelidate } from '@vuelidate/core';
import { changeWallets } from '@/api/wallet.js';
import { useThemeStore } from '@/stores/theme.js';

export default defineComponent({
  setup() {
    const form = reactive({
      password: null,
      wallets: [
        {
          network: 'TRC20',
          address: null,
        },
        {
          network: 'BEP20',
          address: null,
        },
        {
          network: 'ERC20',
          address: null,
        },
      ],
      pending: null,
      pendingModal: null,
    });
    const edit = ref(true);
    const showCancel = ref(false);
    const typePassword = ref(true);
    const show = ref(false);
    const meStore = useMeStore();
    const themeStore = useThemeStore();
    const { user } = meStore;
    const { t } = useI18n();

    // computed
    const isValid = computed(
      () =>
        /* Проверка на пустые кошельки */
        !form.wallets.some((item) => item.address && item.address?.length > 15),
    );

    const rules = computed(() => ({
      password: {
        required,
        minLength: minLength(6),
      },
    }));

    const v = useVuelidate(rules, form);

    // methods
    // TODO ДОБАВИТЬ ЗАПРОС НА ПАРОЛЬ
    const onSubmit = async () => {
      v.value.$touch();

      if (form.pendingModal) return;

      if (await v.value.$validate()) {
        form.pendingModal = true;

        try {
          // const payload = {
          //   password: form.password,
          //   currentPassword: form.currentPassword,
          // };

          setTimeout(() => {
            form.pendingModal = false;
            show.value = false;
            edit.value = true;
            showCancel.value = true;
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
          // form.pendingModal = false;
        }
      }
    };

    const onChange = async () => {
      if (form.pending) return;

      form.pending = true;

      const payload = {
        wallets: form.wallets,
      };

      try {
        const { wallets } = await changeWallets(payload);

        user.wallets.forEach((item) => {
          wallets.forEach((wallet) => {
            if (item.network === wallet.network) {
              item.address = wallet.address;
            }
          });
        });

        user.wallets = wallets;

        edit.value = false;

        toastSuccess({
          title: t('successForm.success'),
          body: t('successForm.changePassword'),
        });
      } catch (e) {
        console.log(e);
      } finally {
        form.pending = false;
      }
    };

    const changeVisibility = () => {
      edit.value = false;
      showCancel.value = false;
    };

    const validate = ({ prop }) => {
      const error = v.value.$errors.find((el) => el.$property === prop);

      return error && error.$message;
    };

    const isEmpty = () => {
      edit.value = !user.wallets.some((item) => !!item.address);
    };

    // hooks
    onMounted(() => {
      form.wallets.forEach((item) => {
        user.wallets.forEach((wallet) => {
          if (item.network === wallet.network) {
            item.address = wallet.address;
          }
        });
      });

      isEmpty();
    });

    return {
      form,
      user,
      typePassword,
      themeStore,
      v,
      show,
      edit,
      isValid,
      showCancel,
      validate,
      onSubmit,
      onChange,
      changeVisibility,
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
