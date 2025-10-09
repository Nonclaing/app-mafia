import { getAuthProfile } from "~/api";

export default async () => {
  const response = await getAuthProfile();
  const data = useGet(response, "data");
  if (!data) return { role: "guest" };
  return data;
};
