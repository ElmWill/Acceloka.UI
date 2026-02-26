"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">

            <section className="relative overflow-hidden">

                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/30 dark:bg-blue-600/20 blur-3xl rounded-full animate-pulse" />
                </div>

                <div className="max-w-6xl mx-auto px-6 py-32 text-center">

                    <h1
                        className={`text-5xl md:text-6xl font-extrabold tracking-tight transition-all duration-1000
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                        text-gray-900 dark:text-white`}
                    >
                        Fast & Secure
                        <span className="block text-blue-600 dark:text-blue-400">
                            Ticket Booking System
                        </span>
                    </h1>

                    <p
                        className={`mt-6 text-lg max-w-2xl mx-auto transition-all duration-1000 delay-200
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                        text-gray-600 dark:text-gray-300`}
                    >
                        Book event tickets instantly, manage reservations,
                        and retrieve bookings anytime using your secure booking ID.
                    </p>

                    <div
                        className={`mt-10 flex justify-center gap-6 transition-all duration-1000 delay-400
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    >
                        <Link
                            href="/tickets"
                            className="px-8 py-4 bg-white dark:bg-gray-800 border dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-2xl shadow-sm hover:scale-105 transition"
                        >
                            Find Booking
                        </Link>
                    </div>

                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">

                {[
                    {
                        title: "Instant Booking",
                        desc: "Securely book tickets in seconds with real-time quota validation.",
                    },
                    {
                        title: "Secure Booking ID",
                        desc: "Each reservation generates a unique GUID you can copy and reuse.",
                    },
                    {
                        title: "Easy Management",
                        desc: "Retrieve and manage bookings instantly using your ID.",
                    },
                ].map((feature, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-900 border dark:border-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </section>

            <section className="py-24 text-center bg-blue-600 dark:bg-blue-700 text-white">

                <h2 className="text-3xl font-bold">
                    Ready to book your tickets?
                </h2>

                <p className="mt-4 text-blue-100">
                    Start your reservation in just a few clicks.
                </p>

                <Link
                    href="/tickets"
                    className="inline-block mt-8 px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl shadow-lg hover:scale-105 transition"
                >
                    Get Started
                </Link>
            </section>

        </div>
    );
}
