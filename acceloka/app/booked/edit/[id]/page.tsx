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
        <div className="max-w-5xl mx-auto py-10 space-y-8 px-10">
            <div className="flex justify-between items-center border-b pb-4">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Edit Booked Tickets
                    </h1>
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

            <EditTicketList booking={booking} />
        </div>
    );
}
