import client from "~/api/client";

export default (id: string) => {
  return client.default.getDetail(id);
};