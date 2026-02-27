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
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="px-4 py-2 rounded-xl
                 border border-gray-300 dark:border-gray-700
                 bg-white dark:bg-gray-900
                 text-gray-700 dark:text-gray-200
                 hover:bg-gray-50 dark:hover:bg-gray-800
                 disabled:opacity-40 disabled:cursor-not-allowed
                 transition hover:scale-105"
      >
        Previous
      </button>

      <div
        className="px-4 py-2 rounded-xl
                    bg-white/70 dark:bg-gray-900/70
                    border border-gray-200 dark:border-gray-800
                    text-sm font-medium
                    text-gray-700 dark:text-gray-200
                    backdrop-blur-md"
      >
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="px-4 py-2 rounded-xl
                 border border-gray-300 dark:border-gray-700
                 bg-white dark:bg-gray-900
                 text-gray-700 dark:text-gray-200
                 hover:bg-gray-50 dark:hover:bg-gray-800
                 disabled:opacity-40 disabled:cursor-not-allowed
                 transition hover:scale-105"
      >
        Next
      </button>
    </div>
  );
}
