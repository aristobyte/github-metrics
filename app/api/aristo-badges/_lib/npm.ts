type NpmFetchOptions = {
  revalidateSeconds?: number;
};

type NpmStats = {
  name: string;
  latestVersion: string;
  monthlyDownloads: number;
};

function getRevalidate(revalidateSeconds?: number) {
  if (!revalidateSeconds) return undefined;
  return { revalidate: revalidateSeconds };
}

export async function getNpmStats(
  pkgName: string,
  options: NpmFetchOptions
): Promise<NpmStats | null> {
  const encoded = encodeURIComponent(pkgName);
  const registryUrl = `https://registry.npmjs.org/${encoded}`;
  const registryResponse = await fetch(registryUrl, {
    next: getRevalidate(options.revalidateSeconds),
  });

  if (!registryResponse.ok) return null;
  const registryData = (await registryResponse.json()) as {
    name?: string;
    "dist-tags"?: { latest?: string };
  };

  const downloadUrl = `https://api.npmjs.org/downloads/point/last-month/${encoded}`;
  const downloadResponse = await fetch(downloadUrl, {
    next: getRevalidate(options.revalidateSeconds),
  });
  if (!downloadResponse.ok) return null;
  const downloadData = (await downloadResponse.json()) as { downloads?: number };

  return {
    name: registryData.name ?? pkgName,
    latestVersion: registryData["dist-tags"]?.latest ?? "-",
    monthlyDownloads: downloadData.downloads ?? 0,
  };
}
