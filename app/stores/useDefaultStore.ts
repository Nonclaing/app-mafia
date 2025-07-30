import { defineStore } from "pinia";

export const useDefaultStore = defineStore("default", {
  state: () => ({
    data: {
      name: "Имя",
    },
  }),
  getters: {
    values: (state) => state.data || {},
  },
  actions: {
    submit(values: Record<string, unknown>) {
      alert(JSON.stringify(values));
    },
    setValues(values: Record<string, unknown>) {
      this.data = { ...this.data, ...values };
    },
  },
});
