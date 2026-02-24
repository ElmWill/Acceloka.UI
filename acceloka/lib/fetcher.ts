export async function fetcher<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    return res.json();
}