export interface AvailableTicket {
  eventDate: string;
  quota: number;
  ticketCode: string;
  ticketName: string;
  categoryName: string;
  price: number;
}

export interface GetAvailableTicketsResponse {
  tickets: AvailableTicket[];
  totalTickets: number;
  currentPage: number;
  totalPages: number;
  orderedBy: string;
  orderState: "asc" | "desc";
}

export interface PagedResult<T> {
  tickets: T[];
  totalTickets: number;
  currentPage: number;
  totalPages: number;
  orderedBy: string;
  orderState: "asc" | "desc";
}

export interface BookTicketItem {
  ticketCode: string;
  quantity: number;
}

export interface BookTicketRequest {
  tickets: BookTicketItem[];
}

export interface BookTicketResponse {
  bookedTicketId: string;
  items: {
    ticketCode: string;
    ticketName: string;
    categoryName: string;
    price: number;
    quantity: number;
  }[];
  totalPerCategories: {
    categoryName: string;
    totalPrice: number;
  }[];
  totalPrice: number;
}
