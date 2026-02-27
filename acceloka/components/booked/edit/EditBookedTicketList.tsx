"use client";

import { useState } from "react";
import { GetBookedTicketResponse } from "@/lib/types/BookedTicket";
import EditBookedTicketCategoryGroup from "./EditBookedTicketCategoryGroup";

interface Props {
  booking: GetBookedTicketResponse;
}

export default function EditTicketList({ booking }: Props) {
  const [bookingState, setBookingState] =
    useState<GetBookedTicketResponse>(booking);

  const handleTicketUpdate = (ticketCode: string, newQuantity: number) => {
    setBookingState((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) => ({
        ...cat,
        tickets: cat.tickets.map((ticket) =>
          ticket.ticketCode === ticketCode
            ? { ...ticket, quantity: newQuantity }
            : ticket,
        ),
      })),
    }));
  };

  return (
    <div className="space-y-8">
      {bookingState.categories.map((category) => (
        <EditBookedTicketCategoryGroup
          key={category.categoryName}
          bookedTicketId={bookingState.bookedTicketId}
          category={category}
          onTicketUpdate={handleTicketUpdate}
        />
      ))}
    </div>
  );
}
