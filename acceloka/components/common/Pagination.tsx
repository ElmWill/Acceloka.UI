"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function goToPage(page: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`/tickets?${params.toString()}`);
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
            >
                Previous
            </button>

            <span style={{ margin: "0 10px" }}>
                Page {currentPage} of {totalPages}
            </span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}