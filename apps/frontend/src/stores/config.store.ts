import { ResponseLoading } from '@/types/app.type.ts';
import { defineStore } from 'pinia';
export const useConfigStore = defineStore('config', {
  state: () => ({
    responseLoading: { id: undefined, enabled: false } as ResponseLoading,
    playerName: '',
  }),
  actions: {
    startLoading(id?: string) {
      this.responseLoading = { id, enabled: true };
    },
    stopLoading(id?: string) {
      if (!id || this.responseLoading.id === id) {
        this.responseLoading = { id, enabled: false };
      }
    },
  },
  persist: [
    {
      storage: localStorage,
      pick: ['playerName'],
    },
  ],
});
