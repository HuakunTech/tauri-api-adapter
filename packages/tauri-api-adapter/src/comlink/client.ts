import { getApi } from "./common";
import type { IApi } from "./types";

export const isInIframe = window !== window.parent;
const iframeSideApi = getApi<IApi>(window.parent);
export const clientApi = iframeSideApi;
