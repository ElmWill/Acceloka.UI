"use client";

import { useState } from "react";
import {
    BookTicketItem,
    BookTicketResponse,
    AvailableTicket,
} from "@/lib/types/Ticket";
import { bookTicket, getAvailableTickets } from "@/lib/api/tickets";
import CopyableId from "../common/CopyableId";

export default function BookTicketForm() {
    const [tickets, setTickets] = useState<BookTicketItem[]>([
        { ticketCode: "", quantity: 1 },
    ]);

    const [quotas, setQuotas] = useState<Record<number, number | null>>({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<BookTicketResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const updateField = async (
        index: number,
        field: keyof BookTicketItem,
        value: string | number
    ) => {
        const updated = [...tickets];
        updated[index][field] = value as never;
        setTickets(updated);

        if (field === "ticketCode" && typeof value === "string") {
            if (value.trim() === "") {
                setQuotas((prev) => ({ ...prev, [index]: null }));
                return;
            }

            try {
                const data = await getAvailableTickets(
                    `TicketCode=${value}&page=1`
                );

                const ticket = data.tickets[0];

                setQuotas((prev) => ({
                    ...prev,
                    [index]: ticket ? ticket.quota : 0,
                }));
            } catch {
                setQuotas((prev) => ({ ...prev, [index]: 0 }));
            }
        }
    };

    const addRow = () => {
        setTickets([...tickets, { ticketCode: "", quantity: 1 }]);
    };

    const removeRow = (index: number) => {
        setTickets(tickets.filter((_, i) => i !== index));
        setQuotas((prev) => {
            const copy = { ...prev };
            delete copy[index];
            return copy;
        });
    };

    const isValid =
        tickets.length > 0 &&
        tickets.every((t, i) => {
            const quota = quotas[i];
            return (
                t.ticketCode.trim() !== "" &&
                t.quantity > 0 &&
                (quota === null || quota === undefined || t.quantity <= quota)
            );
        });

    const submitBooking = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await bookTicket({ tickets });
            console.log("BOOK RESPONSE:", data);
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-3xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-xl rounded-2xl p-8">

            <div className="space-y-4">
                {tickets.map((ticket, index) => {
                    const quota = quotas[index];

                    return (
                        <div
                            key={index}
                            className="grid grid-cols-12 gap-4 items-center"
                        >
                            <div className="col-span-5">
                                <input
                                    type="text"
                                    placeholder="Ticket Code"
                                    value={ticket.ticketCode}
                                    onChange={(e) =>
                                        updateField(index, "ticketCode", e.target.value)
                                    }
                                    className="w-full border border-gray-300 dark:border-gray-700
                           rounded-xl p-2.5
                           bg-white dark:bg-gray-900
                           text-gray-800 dark:text-gray-100
                           placeholder:text-gray-400 dark:placeholder:text-gray-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           transition"
                                />

                                {/* quota indicator (optional — uncomment if needed)
              {quota !== undefined && quota !== null && (
                <p
                  className={`text-sm mt-1 ${
                    quota > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500"
                  }`}
                >
                  {quota > 0
                    ? `Quota Available: ${quota}`
                    : "Ticket not found / No quota"}
                </p>
              )}
              */}
                            </div>

                            <div className="col-span-3">
                                <input
                                    type="number"
                                    min={1}
                                    value={ticket.quantity}
                                    onChange={(e) =>
                                        updateField(index, "quantity", Number(e.target.value))
                                    }
                                    className="w-full border border-gray-300 dark:border-gray-700
                           rounded-xl p-2.5
                           bg-white dark:bg-gray-900
                           text-gray-800 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           transition"
                                />
                            </div>

                            <div className="col-span-2">
                                <button
                                    onClick={() => removeRow(index)}
                                    disabled={tickets.length === 1}
                                    className="text-red-500 hover:text-red-600
                           disabled:opacity-40 disabled:cursor-not-allowed
                           font-medium transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={addRow}
                    className="text-blue-600 dark:text-blue-400
                   hover:underline font-medium transition"
                >
                    + Add Ticket
                </button>

                <button
                    onClick={submitBooking}
                    disabled={!isValid || loading}
                    className="bg-blue-600 hover:bg-blue-700
                   text-white font-medium
                   px-6 py-2.5 rounded-xl
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition shadow-md hover:shadow-lg"
                >
                    {loading ? "Processing..." : "Book Tickets"}
                </button>
            </div>

            {error && (
                <div className="mt-6 bg-red-50 dark:bg-red-900/30
                      border border-red-300 dark:border-red-800
                      text-red-600 dark:text-red-300
                      p-3 rounded-xl">
                    {error}
                </div>
            )}

            {result && (
                <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6 space-y-6">

                    <CopyableId
                        value={result.bookedTicketId}
                        label="Booking ID"
                    />

                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Booking Summary
                    </h3>

                    {result.items.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between text-sm text-gray-700 dark:text-gray-300"
                        >
                            <span>
                                {item.ticketName} ({item.quantity})
                            </span>
                            <span>
                                Rp{" "}
                                {new Intl.NumberFormat("id-ID").format(
                                    item.price * item.quantity
                                )}
                            </span>
                        </div>
                    ))}

                    <div className="mt-6 text-lg font-bold flex justify-between text-gray-900 dark:text-gray-100">
                        <span>Total</span>
                        <span>
                            Rp{" "}
                            {new Intl.NumberFormat("id-ID").format(
                                result.totalPrice
                            )}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
