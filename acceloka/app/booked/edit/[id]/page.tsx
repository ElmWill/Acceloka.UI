import { getBookedTicket } from "@/lib/api/tickets";
import EditTicketList from "@/components/booked/edit/EditBookedTicketList";
import { GetBookedTicketResponse } from "@/lib/types/BookedTicket";
import Link from "next/link";

export default async function EditBookedTicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let booking: GetBookedTicketResponse;

  try {
    booking = await getBookedTicket(id);
  } catch (err: any) {
    console.error("Edit page load error:", err);

    return (
      <div className="max-w-5xl mx-auto py-10 text-center text-red-600">
        {err?.message || "Failed to load booking."}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 px-10 py-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold">Edit Booked Tickets</h1>
          <p className="text-gray-500 text-sm mt-1">
            Booking ID: {booking.bookedTicketId}
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/booked/${booking.bookedTicketId}`}
            className="px-4 py-2 border rounded-lg hover:bg-blue-600 transition"
          >
            View Booking
          </Link>

          <Link
            href={`/booked/revoke/${booking.bookedTicketId}`}
            className="px-4 py-2 border rounded-lg hover:bg-red-600 transition"
          >
            Revoke Tickets
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <EditTicketList booking={booking} />
      </div>
    </div>
  );
}
