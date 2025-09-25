import { type Item, getList } from "~/api";

export default async (): Promise<Item[]> => {
  const response = await getList({});
  const data = useGet(response, "result");
  if (!data) throw new Error("Item not found");
  return data;
};
