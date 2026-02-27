"use client";

import { CategoryGroupResponse } from "@/lib/types/BookedTicket";
import EditBookedTicketCard from "./EditBookedTicketCard";

interface Props {
  bookedTicketId: string;
  category: CategoryGroupResponse;
  onTicketUpdate: (ticketCode: string, newQuantity: number) => void;
}

export default function EditBookedTicketCategoryGroup({
  bookedTicketId,
  category,
  onTicketUpdate,
}: Props) {
  if (category.tickets.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{category.categoryName}</h2>

      {category.tickets.map((ticket) => (
        <EditBookedTicketCard
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
