// TODO: реализация метода
export default defineEventHandler(async () => {
  const result = await getFromData("__ENTRY__");
  if (result) return result;
  throw createError({ statusCode: 404, statusMessage: "Запись не найдена" });
});
