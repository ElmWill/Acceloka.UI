"use client";

import {
  CategoryGroupResponse,
} from "@/lib/types/BookedTicket";
import RevokeBookedTicketCard from "./RevokeBookedTicketCard";

interface Props {
  bookedTicketId: string;
  category: CategoryGroupResponse;
  onTicketUpdate: (
    ticketCode: string,
    remainingQuantity: number
  ) => void;
}

export default function RevokeCategoryGroup({
  bookedTicketId,
  category,
  onTicketUpdate,
}: Props) {
  if (category.tickets.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        {category.categoryName}
      </h2>

      {category.tickets.map((ticket) => (
        <RevokeBookedTicketCard
          key={ticket.ticketCode}
          bookedTicketId={bookedTicketId}
          ticket={ticket}
          categoryName={category.categoryName}
          onUpdate={onTicketUpdate}
        />
      ))}
    </div>
  );
}
