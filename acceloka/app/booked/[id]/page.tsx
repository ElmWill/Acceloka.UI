"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBookedTicket } from "@/lib/api/tickets";
import { GetBookedTicketResponse } from "@/lib/types/BookedTicket";
import BookedTicketView from "@/components/booked/BookedTicketView";

export default function BookedTicketPage() {
    const params = useParams();
    const id = params?.id as string;

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
        <div className="max-w-4xl mx-auto p-8">
            <BookedTicketView data={data} />
        </div>
    );
}
