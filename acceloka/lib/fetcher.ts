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
        const contentType = res.headers.get('content-type');

        if (contentType?.includes('application/problem+json')) {
            const problem = await res.json();
            throw new Error(problem.title || 'An error occurred');
        }
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}