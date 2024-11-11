class TicketService {
    constructor(ticketDao) {
        this.dao = ticketDao;
    }

    createTicket = async (ticketData) => {
        return await this.dao.create(ticketData);
    };
}

export default TicketService;
