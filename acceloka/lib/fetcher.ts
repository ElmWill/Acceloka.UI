export async function fetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const contentType = res.headers.get("content-type");

  let data: any = null;

  if (contentType?.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    const error = new Error(
      data?.title || data?.message || `HTTP error! status: ${res.status}`,
    ) as Error & { status?: number; data?: any };

    error.status = res.status;
    error.data = data;

    throw error;
  }

  return data as T;
}
