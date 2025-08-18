export default defineEventHandler(async () => {
  const items = await getFromData("items", []);
  if (items) return items;
  throw createError({ statusCode: 404, statusMessage: "Элемент не найден" });
});
