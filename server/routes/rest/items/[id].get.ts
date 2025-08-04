export default defineEventHandler(async (event) => {
  const id = event.context.params?.id || "";
  const item = await getFromData(`items.${id}`, null);
  if (item) return item;
  throw createError({ statusCode: 404, statusMessage: "Элемент не найден" });
});