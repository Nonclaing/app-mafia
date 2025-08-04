
export default defineEventHandler(async () => {
  return Object.values(await getFromData("items", {}));
});