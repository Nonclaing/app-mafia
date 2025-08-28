import { type Item, getList, useApiClient } from "~/api";

export default async (): Promise<Item[]> => {
  const client = useApiClient();
  const { data } = await getList({ client });
  if (!data) throw new Error("Item not found");
  return data;
};
