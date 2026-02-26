"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TicketFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [categoryName, setCategoryName] = useState("");
    const [ticketCode, setTicketCode] = useState("");
    const [ticketName, setTicketName] = useState("");
    const [price, setPrice] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    const [orderBy, setOrderBy] = useState("");
    const [orderState, setOrderState] = useState("asc");



    function applyFilter() {
        const params = new URLSearchParams();

        if (categoryName) params.set("CategoryName", categoryName);
        if (ticketCode) params.set("TicketCode", ticketCode);
        if (ticketName) params.set("TicketName", ticketName);
        if (price) params.set("Price", price);
        if (minDate) {
            params.set("MinEventDate", `${minDate}T00:00:00`);
        }

        if (maxDate) {
            params.set("MaxEventDate", `${maxDate}T23:59:59`);
        }

        if (orderBy) params.set("OrderBy", orderBy);
        if (orderState) params.set("OrderState", orderState);

        params.set("page", "1");
        console.log(params.toString());
        router.replace(`/tickets?${params.toString()}`);
    }

    return (
        <div className="bg-black p-4 rounded-lg shadow mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <select
                className="border p-2 rounded"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
            >
                <option value="">Sort By</option>
                <option value="categoryname">Category</option>
                <option value="ticketname">Ticket Name</option>
                <option value="price">Price</option>
                <option value="eventdate">Event Date</option>
                <option value="code">Ticket Code</option>
            </select>

            <select
                className="border p-2 rounded"
                value={orderState}
                onChange={(e) => setOrderState(e.target.value)}
                disabled={!orderBy}
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            <input
                className="border p-2 rounded"
                placeholder="Category"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />

            <input
                className="border p-2 rounded"
                placeholder="Ticket Name"
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
            />

            <input
                className="border p-2 rounded"
                placeholder="Ticket Code"
                value={ticketCode}
                onChange={(e) => setTicketCode(e.target.value)}
            />

            <input
                type="number"
                className="border p-2 rounded"
                placeholder="Max Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                type="date"
                className="border p-2 rounded"
                value={minDate}
                onChange={(e) => setMinDate(e.target.value)}
            />

            <input
                type="date"
                className="border p-2 rounded"
                value={maxDate}
                onChange={(e) => setMaxDate(e.target.value)}
            />

            <button
                onClick={applyFilter}
                className="col-span-full bg-white text-black py-2 rounded"
            >
                Apply Filter
            </button>
        </div>
    );
}