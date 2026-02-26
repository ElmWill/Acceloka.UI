"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const [bookingId, setBookingId] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (!bookingId.trim()) return;

        router.push(`/booked/${bookingId.trim()}`);
        setBookingId("");
    };

    return (
        <nav className="w-full bg-black shadow-md border-b border-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    href="/"
                    className="text-xl font-bold text-blue-600"
                >
                    ACCELOKA
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        href="/tickets"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Book Ticket
                    </Link>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <input
                            type="text"
                            placeholder="Paste Booking ID"
                            value={bookingId}
                            onChange={(e) =>
                                setBookingId(e.target.value)
                            }
                            className="px-3 py-2 outline-none w-56"
                        />

                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black transition"
                        >
                            View
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
}
