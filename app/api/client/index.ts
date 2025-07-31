import { merge } from "lodash-es";
import type { CancelablePromise } from "~/api/client/lib";
import { Client } from "~/api/client/lib";
import { FetchHttpRequest } from "~/api/client/lib/core/FetchHttpRequest";
import type { ApiRequestOptions } from "~/api/client/lib/core/ApiRequestOptions";

const config = {
  BASE: `${window.location.origin}/rest`,
};

class HttpRequest extends FetchHttpRequest {
  public sessid: string = "N";
  public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
    return super.request(merge({ query: { sessid: this.sessid } }, options));
  }
}

const client = new Client(config, HttpRequest);
export default client;