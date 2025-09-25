import { type Item, getDetail } from "~/api";

export default async (id: string): Promise<Item> => {
  const response = await getDetail({ path: { id } });
  const data = useGet(response, "result");
  if (!data) throw new Error("Item not found");
  return data;
};
