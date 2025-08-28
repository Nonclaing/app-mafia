import { useApiClient, type Item, getDetail } from "~/api";

export default async (id: string): Promise<Item> => {
  const client = useApiClient();
  const { data } = await getDetail({ client, path: { id } });
  if (!data) throw new Error("Item not found");
  return data;
};
