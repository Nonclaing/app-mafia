import type { FieldValidationMetaInfo } from "@vee-validate/i18n";

// sum_max:field1|field3,100
export default (value: string, params: [string, string] | [string], ctx: FieldValidationMetaInfo) => {
  const numericValue = Number(value ?? 0);
  if (params.length === 1) {
    const min = Number(params[0]);
    return numericValue >= min;
  }
  const [fields, minRaw] = params;
  const fieldNames = fields.split("|");
  const min = Number(minRaw);
  const otherValues = fieldNames.map((name) => Number(ctx.form[name] ?? 0));
  const total = numericValue + otherValues.reduce((a, b) => a + b, 0);
  return total >= min;
};
