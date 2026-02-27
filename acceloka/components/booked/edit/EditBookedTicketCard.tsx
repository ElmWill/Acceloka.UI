"use client";

import { useState } from "react";
import {
  TicketDetailResponse,
  EditBookedTicketResponse,
} from "@/lib/types/BookedTicket";
import { editBookedTicket } from "@/lib/api/tickets";

interface Props {
  bookedTicketId: string;
  ticket: TicketDetailResponse;
  categoryName: string;
  onUpdate: (ticketCode: string, newQuantity: number) => void;
}

export default function EditBookedTicketCard({
  bookedTicketId,
  ticket,
  categoryName,
  onUpdate,
}: Props) {
  const [quantity, setQuantity] = useState(ticket.quantity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      const result: EditBookedTicketResponse =
        await editBookedTicket(
          bookedTicketId,
          ticket.ticketCode,
          quantity
        );

      onUpdate(ticket.ticketCode, result.newQuantity);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl p-5 bg-black shadow-sm space-y-4">
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
      </div>

      <div className="flex items-center gap-4">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-24 border rounded-lg px-3 py-2"
        />

        <button
          onClick={handleSave}
          disabled={loading || quantity === ticket.quantity}
          className="text-white border px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
