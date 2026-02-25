process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function fetcher<T>(
    url: string,
    options?: RequestInit
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
        if (contentType?.includes("application/problem+json")) {
            throw new Error(data?.title || "Request failed");
        }

        throw new Error(
            data?.message || `HTTP error! status: ${res.status}`
        );
    }

    return data as T;
}
