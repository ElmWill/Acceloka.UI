"use client";

import { useState } from "react";
import { GetBookedTicketResponse } from "@/lib/types/BookedTicket";
import RevokeCategoryGroup from "./RevokeBookedTicketCategoryGroup";

interface Props {
  booking: GetBookedTicketResponse;
}

export default function RevokeTicketList({ booking }: Props) {
  const [bookingState, setBookingState] =
    useState<GetBookedTicketResponse>(booking);

  const handleTicketUpdate = (
    ticketCode: string,
    remainingQuantity: number,
  ) => {
    setBookingState((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) => ({
        ...cat,
        tickets: cat.tickets
          .map((ticket) =>
            ticket.ticketCode === ticketCode
              ? { ...ticket, quantity: remainingQuantity }
              : ticket,
          )
          .filter((t) => t.quantity > 0),
      })),
    }));
  };

  const hasTickets = bookingState.categories.some((c) => c.tickets.length > 0);

  if (!hasTickets) {
    return (
      <div className="text-center py-10 text-gray-500">
        All tickets revoked.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {bookingState.categories.map((category) => (
        <RevokeCategoryGroup
          key={category.categoryName}
          bookedTicketId={bookingState.bookedTicketId}
          category={category}
          onTicketUpdate={handleTicketUpdate}
        />
      ))}
    </div>
  );
}
