import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: () => `TCKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` // lo que hace es crear un codigo unico 
    },
    purchase_datetime: {
        type: Date,
        default: Date.now 
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true 
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
