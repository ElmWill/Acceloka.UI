import { fetcher } from "../fetcher";

const API_BASE_URL = "https://localhost:7255/api/v1";

export function getAvailableTickets(query?: string) {
    return fetcher(
        `${API_BASE_URL}/get-available-ticket?${query ?? ""}`
    ); 
}

export function bookTicket(data: any) {
    return fetcher(
        `${API_BASE_URL}/book-ticket`,
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
}

export function getBookedTicket(id: string) {
    return fetcher(
        `${API_BASE_URL}/get-booked-ticket/${id}`
    );
}

export function editBookedTicket(data: any) {
    return fetcher(
        `${API_BASE_URL}/edit-booked-ticket`,
        {
            method: "PUT",
            body: JSON.stringify(data),
        }
    );
}

export function revokeTicket(
    id: string,
    ticketCode: string,
    quantity: number
) {
    return fetcher(
        `${API_BASE_URL}/revoke-ticket/${id}/${ticketCode}/${quantity}`,
        {
            method: "DELETE",
        }
    );
}