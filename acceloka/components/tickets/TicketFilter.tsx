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
        <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-lg mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">

            <select
                className="border border-gray-300 dark:border-gray-700 p-2.5 rounded-xl
                 bg-white dark:bg-gray-900
                 text-gray-800 dark:text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="border border-gray-300 dark:border-gray-700 p-2.5 rounded-xl
                 bg-white dark:bg-gray-900
                 text-gray-800 dark:text-gray-100
                 disabled:opacity-50
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={orderState}
                onChange={(e) => setOrderState(e.target.value)}
                disabled={!orderBy}
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            <input
                className="border border-gray-300 dark:border-gray-700 p-2.5 rounded-xl
                 bg-white dark:bg-gray-900
                 text-gray-800 dark:text-gray-100
                 placeholder:text-gray-400 dark:placeholder:text-gray-500
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Category"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />

            <input
                className="border border-gray-300 dark:border-gray-700 p-2.5 rounded-xl
                 bg-white dark:bg-gray-900
                 text-gray-800 dark:text-gray-100
                 placeholder:text-gray-400 dark:placeholder:text-gray-500
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ticket Name"
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
            />

            <input
                className="border border-gray-300 dark:border-gray-700 p-2.5 rounded-xl
                 bg-white dark:bg-gray-900
                 text-gray-800 dark:text-gray-100
                 placeholder:text-gray-400 dark:placeholder:text-gray-500
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ticket Code"
                value={ticketCode}
                onChange={(e) => setTicketCode(e.target.value)}
            />

            <input
                type="number"
                className="border border-gray-300 dark:border-gray-700 p-2.5 rounded-xl
                 bg-white dark:bg-gray-900
                 text-gray-800 dark:text-gray-100
                 placeholder:text-gray-400 dark:placeholder:text-gray-500
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Max Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                type="date"
                className="border border-gray-300 dark:border-gray-700 p-2.5 rounded-xl
                 bg-white dark:bg-gray-900
                 text-gray-800 dark:text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={minDate}
                onChange={(e) => setMinDate(e.target.value)}
            />

            <input
                type="date"
                className="border border-gray-300 dark:border-gray-700 p-2.5 rounded-xl
                 bg-white dark:bg-gray-900
                 text-gray-800 dark:text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={maxDate}
                onChange={(e) => setMaxDate(e.target.value)}
            />

            <button
                onClick={applyFilter}
                className="col-span-full mt-2
                 bg-blue-600 hover:bg-blue-700
                 text-white font-medium
                 py-2.5 rounded-xl
                 transition-all duration-200
                 shadow-md hover:shadow-lg"
            >
                Apply Filter
            </button>
        </div>
    );
}