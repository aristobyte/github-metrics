type NpmFetchOptions = {
  revalidateSeconds?: number;
};

import type { NpmStats } from "./types";
import { fetchJson } from "./http";

export async function getNpmStats(
  pkgName: string,
  options: NpmFetchOptions,
): Promise<NpmStats | null> {
  try {
    const encoded = encodeURIComponent(pkgName);
    const registryUrl = `https://registry.npmjs.org/${encoded}`;
    const registryResult = await fetchJson<{
      name?: string;
      "dist-tags"?: { latest?: string };
    }>(registryUrl, { revalidateSeconds: options.revalidateSeconds });

    if (!registryResult) return null;
    const registryData = registryResult.data;

    const downloadUrl = `https://api.npmjs.org/downloads/point/last-month/${encoded}`;
    const downloadResult = await fetchJson<{ downloads?: number }>(
      downloadUrl,
      { revalidateSeconds: options.revalidateSeconds },
    );
    if (!downloadResult) return null;
    const downloadData = downloadResult.data;

    return {
      name: registryData.name ?? pkgName,
      latestVersion: registryData["dist-tags"]?.latest ?? "-",
      monthlyDownloads: downloadData.downloads ?? 0,
    };
  } catch {
    return null;
  }
}
