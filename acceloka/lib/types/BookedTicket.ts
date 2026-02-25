export interface GetBookedTicketResponse {
    bookedTicketId: string;
    totalQuantity: number;
    categories: CategoryGroupResponse[];
}

export interface CategoryGroupResponse {
    categoryName: string;
    totalQuantityPerCategory: number;
    tickets: TicketDetailResponse[];
}

export interface TicketDetailResponse {
    ticketCode: string;
    ticketName: string;
    eventDate: string;
    quantity: number;
}

export interface RevokeBookedTicketRequest {
  bookedTicketId: string;
  ticketCode: string;
  quantity: number;
}

export interface RevokeBookedTicketResponse {
  ticketCode: string;
  ticketName: string;
  categoryName: string;
  remainingQuantity: number;
}

