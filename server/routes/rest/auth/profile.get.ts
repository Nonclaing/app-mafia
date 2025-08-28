export default defineEventHandler(async () => {
  const user = { id: 1, role: "admin" };
  if (user) return user;
  throw createError({ statusCode: 404, statusMessage: "Элемент не найден" });
});
