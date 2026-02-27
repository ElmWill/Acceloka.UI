import { fetcher } from "../fetcher";
import { EditBookedTicketRequest, EditBookedTicketResponse, GetBookedTicketResponse, RevokeBookedTicketResponse } from "../types/BookedTicket";
import { BookTicketRequest, BookTicketResponse, GetAvailableTicketsResponse } from "../types/Ticket";

const API_BASE_URL = "http://localhost:5002/api/v1";

export function getAvailableTickets(query?: string) {
    return fetcher<GetAvailableTicketsResponse>(
        `${API_BASE_URL}/get-available-ticket?${query ?? ""}`
    );
}

export async function bookTicket(data: BookTicketRequest) {
    return fetcher<BookTicketResponse>(
        `${API_BASE_URL}/book-ticket`,
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
}

export function getBookedTicket(id: string) {
    return fetcher<GetBookedTicketResponse>(
        `${API_BASE_URL}/get-booked-ticket/${id}`
    );
}

export async function editBookedTicket(
    bookedTicketId: string,
    ticketCode: string,
    quantity: number) {
    return fetcher<EditBookedTicketResponse>(
        `${API_BASE_URL}/edit-booked-ticket`,
        {
            method: "PUT",
            body: JSON.stringify({
                bookedTicketId,
                ticketCode,
                quantity,
            }),
        }
    );
}

export async function revokeTicket(
    id: string,
    ticketCode: string,
    quantity: number
) {
    return fetcher<RevokeBookedTicketResponse>(
        `${API_BASE_URL}/revoke-ticket/${id}/${ticketCode}/${quantity}`,
        {
            method: "DELETE",
        }
    );
}