import { defineRule, configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import ru from "@vee-validate/i18n/dist/locale/ru.json";
import { all } from "@vee-validate/rules";
import * as custom from "~/plugins/vee-validate/rules";

export default defineNuxtPlugin(() => {
  useForEach(toPairs(all), ([name, rule]) => defineRule(name, rule));
  useForEach(toPairs(custom), ([name, rule]) => defineRule(name, rule));

  // Настраиваем vee-validate
  configure({
    generateMessage: localize({
      ru: {
        messages: {
          ...ru.messages,
          sum_max: "{field} + другие поля не должны превышать {0}",
          sum_min: "Сумма полей {field} должна быть не меньше {0}",
        },
      },
    }),
    validateOnInput: true, // Валидация при вводе
  });

  // Устанавливаем язык по умолчанию
  localize("ru");
});
