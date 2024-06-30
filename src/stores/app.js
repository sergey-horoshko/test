import { acceptHMRUpdate, defineStore } from 'pinia';

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    width: null,
  }),
  actions: {
    setWidth(width) {
      this.width = width;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}

export default useAppStore;
