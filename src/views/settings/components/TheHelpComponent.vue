<template>
  <div class="mt-8 flex flex-col gap-4">
    <div
      @click="goTo('telegram')"
      class="relative flex cursor-pointer gap-3 rounded-lg bg-gray-100 p-4 pr-12 dark:bg-dark"
    >
      <div class="flex w-full flex-col">
        <div class="font-bold">
          {{ $t('settings.helpTab.titleTelegram') }}
        </div>
        <div class="mt-2 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('settings.helpTab.descriptionTelegram') }}
        </div>
        <div class="mt-2 flex items-center justify-end">
          <span class="text-xs font-medium text-blue-600 dark:text-blue-500">
            {{ $t('form.more') }}
          </span>
        </div>
      </div>
      <div class="absolute right-4 top-4 max-h-5 min-h-5 min-w-5 max-w-5 rounded-full">
        <i style="font-size: 1.2rem" class="pi pi-send text-blue-600 dark:text-blue-500" />
      </div>
    </div>

    <div
      @click="goTo('link')"
      class="relative flex cursor-pointer gap-3 rounded-lg bg-gray-100 p-4 pr-12 dark:bg-dark"
    >
      <div class="flex w-full flex-col">
        <div class="font-bold">
          {{ $t('settings.helpTab.titleDoc') }}
        </div>
        <div class="mt-2 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('settings.helpTab.descriptionDoc') }}
        </div>
        <div class="mt-2 flex items-center justify-end">
          <span class="text-xs font-medium text-blue-600 dark:text-blue-500">
            {{ $t('form.more') }}
          </span>
        </div>
      </div>
      <div class="absolute right-4 top-4 max-h-5 min-h-5 min-w-5 max-w-5 rounded-full">
        <i style="font-size: 1.2rem" class="pi pi-book text-blue-600 dark:text-blue-500" />
      </div>
    </div>

    <div
      @click="goTo('link')"
      class="relative flex cursor-pointer gap-3 rounded-lg bg-gray-100 p-4 pr-12 dark:bg-dark"
    >
      <div class="flex w-full flex-col">
        <div class="font-bold">
          {{ $t('settings.helpTab.titleOffer') }}
        </div>
        <div class="mt-2 text-xs font-medium text-gray-500 dark:text-gray-300">
          {{ $t('settings.helpTab.descriptionOffer') }}
        </div>
        <div class="mt-2 flex items-center justify-end">
          <span class="text-xs font-medium text-blue-600 dark:text-blue-500">
            {{ $t('form.more') }}
          </span>
        </div>
      </div>
      <div class="absolute right-4 top-4 max-h-5 min-h-5 min-w-5 max-w-5 rounded-full">
        <i style="font-size: 1.2rem" class="pi pi-file-pdf text-blue-600 dark:text-blue-500" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    // methods
    const goTo = (type) => {
      if (type === 'telegram') {
        // TODO ДОБАВИТЬ TELEGRAM
        window.open('https://web.telegram.org/a/', '_blank');
      } else if (type === 'link') {
        window.open('https://pdfobject.com/pdf/sample.pdf', '_blank');
      }
    };

    return {
      goTo,
    };
  },
});
</script>
