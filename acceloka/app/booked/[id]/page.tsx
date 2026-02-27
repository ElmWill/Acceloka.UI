"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { getBookedTicket } from "@/lib/api/tickets";
import { GetBookedTicketResponse } from "@/lib/types/BookedTicket";
import BookedTicketView from "@/components/booked/BookedTicketView";

export default function BookedTicketPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [data, setData] = useState<GetBookedTicketResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const result = await getBookedTicket(id);
        setData(result);
      } catch (err: any) {
        if (err.status === 404) {
          router.replace("/not-found");
          return;
        }

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="p-8 text-center">
        <p>Loading booking details...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        <p>{error}</p>
      </div>
    );

  if (!data)
    return (
      <div className="p-8 text-center">
        <p>No booking found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 px-10 py-10 max-w-5xl mx-auto">
      <BookedTicketView data={data} />
    </div>
  );
}
