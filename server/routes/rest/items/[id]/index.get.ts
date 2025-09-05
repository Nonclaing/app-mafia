export default defineEventHandler(async (event) => {
  const id = event.context.params?.id || "";
  const result = await getFromData(`Item.${id}`);
  if (result) return result;
  throw createError({ statusCode: 404, statusMessage: "Запись не найдена" });
});
