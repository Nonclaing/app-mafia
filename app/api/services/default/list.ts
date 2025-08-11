import client, { type Item, getList } from "~/api";


export default async (): Promise<Item[]> => {
  const { data } = await getList({ client });
  if (!data) throw new Error("Item not found");
  return data;
};