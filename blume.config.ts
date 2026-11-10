import { defineConfig } from "blume";

export default defineConfig({
  title: "ML Open Base",
  description: "Documentation powered by Blume.",
  i18n: {
    defaultLocale: "ru",
      locales: [
        { code: "ru", label: "Russian" },
        { code: "en", label: "English" },
      ],
  }
});
