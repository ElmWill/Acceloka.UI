"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [bookingId, setBookingId] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!bookingId.trim()) return;
    window.open(`/booked/${bookingId.trim()}`);
    setBookingId("");
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full
                    bg-white/80 dark:bg-gray-950/80
                    backdrop-blur-md
                    border-b border-gray-200 dark:border-gray-800
                    shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight
                     text-gray-900 dark:text-white
                     hover:opacity-80 transition"
        >
          ACCELOKA
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/tickets"
            className="px-4 py-1 rounded-xl
                       bg-blue-600 hover:bg-blue-700
                       text-white font-medium
                       transition shadow-md hover:shadow-lg hover:scale-105"
          >
            Book Ticket
          </Link>

          <div
            className="flex items-center
                          bg-white dark:bg-gray-900
                          border border-gray-300 dark:border-gray-700
                          rounded-xl overflow-hidden
                          focus-within:ring-2 focus-within:ring-blue-500
                          transition"
          >
            <input
              type="text"
              placeholder="Paste Booking ID"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="px-3 py-2 w-56
                         bg-transparent
                         text-sm
                         text-gray-800 dark:text-gray-100
                         placeholder:text-gray-400 dark:placeholder:text-gray-500
                         outline-none"
            />

            <button
              onClick={handleSearch}
              className="px-4 py-2 text-sm font-medium
                         bg-gray-100 dark:bg-gray-800
                         hover:bg-gray-200 dark:hover:bg-gray-700
                         text-gray-800 dark:text-gray-200
                         transition hover:scale-105"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
