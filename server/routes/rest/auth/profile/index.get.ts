export default defineEventHandler(async () => {
  const result = await getFromData("Profile.1");
  if (result) return result;
  throw createError({ statusCode: 404, statusMessage: "Запись не найдена" });
});
