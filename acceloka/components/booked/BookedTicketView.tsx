"use client";

import { useRouter } from "next/navigation";
import { GetBookedTicketResponse } from "@/lib/types/BookedTicket";

interface Props {
    data: GetBookedTicketResponse;
}

export default function BookedTicketView({ data }: Props) {
    const router = useRouter();
    return (
        <div className="space-y-8">
            <div className="border-b pb-4 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Booking Summary
                    </h1>
                    <p className="text-gray-600 text-sm mt-1">
                        Booking ID: {data.bookedTicketId}
                    </p>
                    <p className="mt-2 font-medium">
                        Total Tickets: {data.totalQuantity}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() =>
                            router.push(`/booked/edit/${data.bookedTicketId}`)
                        }
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Edit Ticket
                    </button>

                    <button
                        onClick={() =>
                            router.push(`/booked/revoke/${data.bookedTicketId}`)
                        }
                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Revoke Ticket
                    </button>
                </div>
            </div>

            {data.categories.map((category) => (
                <div
                    key={category.categoryName}
                    className="border rounded-xl p-6 shadow-sm"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">
                            {category.categoryName}
                        </h2>
                        <span className="text-sm text-gray-500">
                            {category.totalQuantityPerCategory} tickets
                        </span>
                    </div>

                    <div className="space-y-4">
                        {category.tickets.map((ticket) => (
                            <div
                                key={ticket.ticketCode}
                                className="flex justify-between border-b pb-2"
                            >
                                <div>
                                    <p className="font-medium">
                                        {ticket.ticketName}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {ticket.eventDate}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">
                                        Qty: {ticket.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
