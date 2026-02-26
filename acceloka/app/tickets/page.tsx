import { getAvailableTickets } from "@/lib/api/tickets";
import { buildQueryString } from "@/lib/utils/buildQueryString";
import TicketFilter from "@/components/tickets/TicketFilter";
import TicketTable from "@/components/tickets/TicketTable";
import Pagination from "@/components/common/Pagination";
import BookTicketForm from "@/components/tickets/BookTicketForm";

type PageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
    const searchParamsObj = await searchParams;
    const sanitizedParams = Object.entries(searchParamsObj).reduce(
        (acc, [key, value]) => {
            if (Array.isArray(value)) {
                acc[key] = value[0];
            } else {
                acc[key] = value;
            }
            return acc;
        },
        {} as Record<string, string | undefined>
    );

    const query = buildQueryString(sanitizedParams);

    const data = await getAvailableTickets(query);

    return (
        <div className="p-6 max-w-6xl mx-auto">

            <TicketFilter />

            <div className="mt-6">
                {data.tickets.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        Ticket not found.
                    </div>
                ) : (
                    <TicketTable tickets={data.tickets} />
                )}
                <div className="border-t pt-10">
                    <BookTicketForm />
                </div>
                <div className="mt-6">
                    <Pagination
                        currentPage={data.currentPage}
                        totalPages={data.totalPages}
                    />
                </div>
            </div>



        </div>
    );
}
