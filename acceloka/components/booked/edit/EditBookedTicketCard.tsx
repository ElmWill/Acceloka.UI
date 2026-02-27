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

      const result: EditBookedTicketResponse = await editBookedTicket(
        bookedTicketId,
        ticket.ticketCode,
        quantity,
      );

      onUpdate(ticket.ticketCode, result.newQuantity);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      rounded-2xl p-6 space-y-5
      bg-[#0b1220]
      border border-white/10
      shadow-[0_10px_40px_rgba(0,0,0,0.7)]
      transition-all duration-300
      hover:border-white/20
    "
    >
      <div>
        <h3 className="font-semibold text-xl text-white tracking-tight">
          {ticket.ticketName}
        </h3>

        <p className="text-sm text-white/40 mt-1">{categoryName}</p>

        <p className="text-sm text-white/50">
          {new Date(ticket.eventDate).toLocaleString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="
          w-24 px-3 py-2 rounded-xl
          bg-[#111827]
          border border-white/10
          text-white
          focus:outline-none
          focus:ring-2 focus:ring-blue-500/50
          transition
        "
        />

        <button
          onClick={handleSave}
          disabled={loading || quantity === ticket.quantity}
          className="
          px-4 py-2 rounded-xl
          bg-blue-600
          hover:bg-blue-500
          text-white
          disabled:opacity-40
          transition-all duration-200
          hover:scale-105
          active:scale-95
        "
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="h-px bg-white/10 mt-2" />
    </div>
  );
}
