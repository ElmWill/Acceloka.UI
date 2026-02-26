"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AvailableTicket } from "@/lib/types/Ticket";

export default function TicketTable({ tickets }: { tickets: AvailableTicket[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function sort(column: string) {
        const params = new URLSearchParams();
        const currentOrder = params.get("orderState") || "asc" ? "desc" : "asc";

        params.set("orderedBy", column);
        params.set("orderState", currentOrder);

        router.replace(`/tickets?${params.toString()}`);
    }

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
            <table className="w-full bg-white/80 dark:bg-gray-900/70 backdrop-blur-md">
                <thead className="bg-gray-100/80 dark:bg-gray-800/80">
                    <tr className="text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                        <th className="p-4">Code</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Event Date</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Quota</th>
                    </tr>
                </thead>

                <tbody className="text-sm text-gray-700 dark:text-gray-300">
                    {tickets.map((t) => (
                        <tr
                            key={t.ticketCode}
                            className="border-t border-gray-200 dark:border-gray-800
                       hover:bg-gray-50 dark:hover:bg-gray-800/60
                       transition"
                        >
                            <td className="p-4 font-medium">{t.ticketCode}</td>
                            <td className="p-4">{t.ticketName}</td>
                            <td className="p-4">{t.categoryName}</td>
                            <td className="p-4">{t.eventDate}</td>
                            <td className="p-4 font-medium">
                                Rp {t.price.toLocaleString()}
                            </td>
                            <td className="p-4">{t.quota}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}