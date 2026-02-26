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
        <table className="w-full bg-black rounded shadow">
            <thead className="bg-black-100 text-black-600 font-bold">
                <tr>
                    <th className="p-3">Code</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Event Date</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Quota</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map((t) => (
                    <tr key={t.ticketCode} className="border-t">
                        <td className="p-3">{t.ticketCode}</td>
                        <td className="p-3">{t.ticketName}</td>
                        <td className="p-3">{t.categoryName}</td>
                        <td className="p-3">{t.eventDate}</td>
                        <td className="p-3">Rp {t.price.toLocaleString()}</td>
                        <td className="p-3">{t.quota}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}