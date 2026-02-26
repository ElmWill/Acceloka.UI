"use client";

import { useState } from "react";
import {
  TicketDetailResponse,
  RevokeBookedTicketResponse,
} from "@/lib/types/BookedTicket";
import { revokeTicket } from "@/lib/api/tickets";

interface Props {
  bookedTicketId: string;
  ticket: TicketDetailResponse;
  categoryName: string;
  onUpdate: (ticketCode: string, remainingQuantity: number) => void;
}

export default function RevokeBookedTicketCard({
  bookedTicketId,
  ticket,
  categoryName,
  onUpdate,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRevokeOne = async () => {
    if (ticket.quantity <= 0) return;

    try {
      setLoading(true);
      setError(null);

      const result: RevokeBookedTicketResponse =
        await revokeTicket(
          bookedTicketId,
          ticket.ticketCode,
          1
        );

      onUpdate(ticket.ticketCode, result.remainingQuantity);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl p-5 bg-black shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">
          {ticket.ticketName}
        </h3>
        <p className="text-sm text-gray-500">
          {categoryName}
        </p>
        <p className="text-sm text-gray-500">
          Event Date: {new Date(ticket.eventDate).toLocaleDateString()}
        </p>

        <p className="mt-2 font-medium">
          Remaining:{" "}
          <span className="text-blue-600">
            {ticket.quantity}
          </span>
        </p>

        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>
        )}
      </div>

      <button
        onClick={handleRevokeOne}
        disabled={loading || ticket.quantity === 0}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
      >
        {loading ? "Processing..." : "Revoke 1"}
      </button>
    </div>
  );
}
