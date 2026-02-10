type FetchJsonOptions = {
  headers?: HeadersInit;
  revalidateSeconds?: number;
};

function getRevalidate(revalidateSeconds?: number) {
  if (!revalidateSeconds) return undefined;
  return { revalidate: revalidateSeconds };
}

export async function fetchJson<T>(
  url: string,
  options: FetchJsonOptions = {},
): Promise<{ data: T; response: Response } | null> {
  try {
    const response = await fetch(url, {
      headers: options.headers,
      next: getRevalidate(options.revalidateSeconds),
    });

    if (!response.ok) return null;
    const data = (await response.json()) as T;
    return { data, response };
  } catch {
    return null;
  }
}
