import { create } from "zustand";
import { persist } from "zustand/middleware";

const Store = create(
  persist(
    () => ({
      code: "",
      title: "default",
      theme: "hyper",
      darkMode: true,
      showBackground: true,
      language: "plaintext",
      autoDetectLanguage: false,
      fontSize: 18,
      fontStyle: "jetBrainsMono",
      padding: 64,
      image: null,
    }),
    {
      name: "user-preferences",
    }
  )
);

export default Store;
