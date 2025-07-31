import client from "~/api/client";

export default () => {
  return client.default.getList();
};