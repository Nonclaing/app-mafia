import { type Profile, getAuthProfile } from "~/api";

export default async (): Promise<Profile> => {
  const client = useApiClient();
  const { data } = await getAuthProfile({ client });
  if (!data) throw new Error("Item not found");
  return data;
};
