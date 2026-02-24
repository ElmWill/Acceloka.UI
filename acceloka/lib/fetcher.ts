process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
        if (!res.ok) {
            if (res.status === 404) {
                return {
                    tickets: [],
                    totalTickets: 0,
                    currentPage: 1,
                    totalPages: 1,
                } as T;
            }
            if (res.status === 400) {
                return {
                    tickets: [],
                    totalTickets: 0,
                    currentPage: 1,
                    totalPages: 1,
                } as T;
            }
            const contentType = res.headers.get('content-type');

            if (contentType?.includes('application/problem+json')) {
                const problem = await res.json();
                throw new Error(problem.title || 'An error occurred');
            }

            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get('content-type');

        if (contentType?.includes('application/problem+json')) {
            const problem = await res.json();
            throw new Error(problem.title || 'An error occurred');
        }
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}