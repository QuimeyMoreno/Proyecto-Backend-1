import Ticket from "../../models/ticket.model.js";

class TicketManager {
    constructor(){
        this.model = Ticket;
    }

    create = async (data) => {
        const ticket = new Ticket(data);
        return await ticket.save();
    };
}

export default TicketManager