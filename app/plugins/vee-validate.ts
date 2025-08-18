import { defineRule, configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import ru from "@vee-validate/i18n/dist/locale/ru.json";
import { all } from "@vee-validate/rules";

export default defineNuxtPlugin(() => {
  Object.entries(all).forEach(([name, rule]) => defineRule(name, rule));

  // Настраиваем vee-validate
  configure({
    generateMessage: localize({ ru }),
    validateOnInput: true, // Валидация при вводе
  });

  // Устанавливаем язык по умолчанию
  localize("ru");
});
