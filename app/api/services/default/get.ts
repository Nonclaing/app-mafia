import type { Item } from "~~/.api/types.gen";
import { getDetail } from "~~/.api/sdk.gen";
import client from "~/api";

export default async (id: string): Promise<Item> => {
  const { data } = await getDetail({ client, path: { id } });
  if (!data) throw new Error("Item not found");
  return data;
};