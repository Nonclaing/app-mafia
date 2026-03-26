// app/types/app-update.ts
export type UpdateStrategy = "NONE" | "NATIVE" | "PATCH";
export type UpdateStatus
  = | "IDLE"
    | "CHECKING"
    | "AVAILABLE"
    | "DOWNLOADING"
    | "DOWNLOADED"
    | "UP_TO_DATE"
    | "ERROR";

export interface GithubAsset {
  name: string;
  browser_download_url: string;
}

export interface GithubRelease {
  tag_name: string;
  body: string;
  assets: GithubAsset[];
}

export interface AppUpdaterRuntime {
  getAppVersion(): Promise<string>;
  notifyAppReady(): Promise<void>;
  downloadBundle(url: string, version: string): Promise<unknown>;
  setCurrentBundle(bundle: unknown): Promise<void>;
  addDownloadListener(
    listener: (payload: { percent: number }) => void,
  ): Promise<{ remove: () => Promise<void> } | void>;
  addDownloadFailedListener(
    listener: () => void,
  ): Promise<{ remove: () => Promise<void> } | void>;
}
