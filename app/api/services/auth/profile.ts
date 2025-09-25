import { getAuthProfile } from "~/api";

export default async () => {
  const response = await getAuthProfile({});
  const data = useGet(response, "result");
  if (!data) throw new Error("Item not found");
  return data;
};
