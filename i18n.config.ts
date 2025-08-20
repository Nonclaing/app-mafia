export default {
  legacy: false,
  locale: "ru",
  pluralRules: {
    ru: (choice: number, choicesLength: number) => {
      if (choice === 0) return 0;
      const teen = choice > 10 && choice < 20;
      const endsWithOne = choice % 10 === 1;
      if (choicesLength < 4) return (!teen && endsWithOne) ? 1 : 2;
      if (!teen && endsWithOne) return 1;
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) return 2;
      return (choicesLength < 4) ? 2 : 3;
    },
  },
  numberFormats: {
    ru: {
      currency: {
        style: "currency", currency: "RUB",
      },
      int: {
        style: "decimal", maximumFractionDigits: 0, minimumFractionDigits: 0, useGrouping: true,
      },
      decimal: {
        style: "decimal", maximumFractionDigits: 2, minimumFractionDigits: 2, useGrouping: true,
      },
    },
  },
  datetimeFormats: {
    ru: {
      short: { year: "numeric", month: "numeric", day: "numeric" },
      long: { year: "numeric", month: "long", day: "numeric", weekday: "long" },
    },
  },
};
