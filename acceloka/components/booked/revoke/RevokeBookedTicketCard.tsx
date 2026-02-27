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
  const [revokeAmount, setRevokeAmount] = useState(1);

  const handleRevoke = async () => {
    if (ticket.quantity <= 0) return;
    if (revokeAmount <= 0) return;
    if (revokeAmount > ticket.quantity) {
      setError("Cannot revoke more than remaining tickets.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result: RevokeBookedTicketResponse = await revokeTicket(
        bookedTicketId,
        ticket.ticketCode,
        revokeAmount,
      );

      onUpdate(ticket.ticketCode, result.remainingQuantity);
      setRevokeAmount(1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        rounded-2xl p-6
        bg-[#0b1220]
        border border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.7)]
        transition-all duration-300
        hover:border-white/20
        flex justify-between items-center
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

        <p className="mt-3 font-medium text-white">
          Remaining: <span className="text-blue-400">{ticket.quantity}</span>
        </p>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          max={ticket.quantity}
          value={revokeAmount}
          onChange={(e) => setRevokeAmount(Number(e.target.value))}
          className="
            w-20 px-3 py-2 rounded-xl
            bg-[#111827]
            border border-white/10
            text-white
            focus:outline-none
            focus:ring-2 focus:ring-red-500/50
            transition
          "
        />

        <button
          onClick={handleRevoke}
          disabled={loading || ticket.quantity === 0}
          className="
            px-4 py-2 rounded-xl
            bg-red-600
            hover:bg-red-500
            text-white
            disabled:opacity-40
            transition-all duration-200
            hover:scale-105
            active:scale-95
          "
        >
          {loading ? "Processing..." : `Revoke`}
        </button>
      </div>
    </div>
  );
}
