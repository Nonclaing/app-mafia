import type { Item } from "~~/.api/types.gen";
import { getList } from "~~/.api/sdk.gen";
import client from "~/api";


export default async (): Promise<Item[]> => {
  const { data } = await getList({ client });
  if (!data) throw new Error("Item not found");
  return data;
};