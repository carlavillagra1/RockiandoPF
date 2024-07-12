const TicketService = require("../services/ticketService.js");
const ticketService = new  TicketService()



exports.createTicket = async (req, res, next) => {
    try {
        const userId = req.user._id; 
        const ticket = await ticketService.createTicket(userId);

        // Verificar que ticket.cart y ticket.cart.products estén definidos
        if (!ticket.cart || !ticket.cart.products) {
            console.log("el ticket no contiene un carrito o productos validos")
            throw new Error('El ticket no contiene un carrito o productos válidos');
        }

        // Obtener el correo electrónico del usuario
        const userEmail = req.user.email;
        
        // Crear el contenido del correo
        const subject = `Ticket de compra: ${ticket._id}`;
        const text = `Gracias por tu compra. Aquí tienes los detalles de tu ticket: ${JSON.stringify(ticket)}`;
        const html = `
            <h1>Gracias por tu compra</h1>
            <p>Aquí tienes los detalles de tu ticket:</p>
            <ul>
                ${ticket.cart.products.map(p => `<li>${p.product.title} - ${p.quantity} x ${p.product.price}</li>`).join('')}
            </ul>
            <p>Total: ${ticket.totalAmount}</p>
            <p>Fecha: ${ticket.createdAt}</p>
        `;
        
        // Enviar correo electrónico
        await ticketService.endTicketEmail(userEmail, subject, text, html);

        res.status(201).json({ message: 'Ticket creado y correo enviado', payload: ticket });
    } catch (error) {
        next(new Error('Error al crear el ticket: ' + error.message));
    }
};

exports.getTicketById = async (req, res, next) => {
    try {
        const { ticketId } = req.params;
        const ticket = await ticketService.getTicketById(ticketId);
        res.status(200).send({ result: "success", payload: ticket });
    } catch (error) {
        next(new Error("Error al obtener el ticket: " + error.message));
    }
};