import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">

      <section className="max-w-6xl mx-auto px-6 py-24 text-center">

        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          Fast & Secure
          <span className="block text-blue-600">
            Ticket Booking System
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Book event tickets instantly, manage reservations,
          and retrieve your bookings anytime using your secure booking ID.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Link
            href="/tickets"
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition"
          >
            Book Tickets
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">

        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h3 className="text-xl font-semibold text-blue-600 mb-3">
            Instant Booking
          </h3>
          <p className="text-black">
            Securely book tickets in seconds with real-time quota validation.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h3 className="text-xl font-semibold text-blue-600 mb-3">
            Secure Booking ID
          </h3>
          <p className="text-black">
            Each reservation generates a unique GUID you can copy and reuse.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h3 className="text-xl font-semibold text-blue-600 mb-3">
            Easy Management
          </h3>
          <p className="text-black">
            Retrieve and manage bookings instantly using your ID.
          </p>
        </div>

      </section>

      <section className="bg-blue-600 py-20 text-center text-white">

        <h2 className="text-3xl font-bold">
          Ready to book your tickets?
        </h2>

        <p className="mt-4 text-blue-100">
          Start your reservation in just a few clicks.
        </p>

        <Link
          href="/tickets"
          className="inline-block mt-8 px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl shadow-lg hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

    </div>
  );
}
