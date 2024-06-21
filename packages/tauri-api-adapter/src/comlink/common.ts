import * as Comlink from "@huakunshen/comlink";

export function getApi<API>(win: Window): Comlink.Remote<API> {
  return Comlink.wrap<API>(Comlink.windowEndpoint(win));
}
