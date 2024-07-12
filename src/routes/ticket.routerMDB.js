const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketControllers.js');
const { isAuthenticated  } = require('../public/js/auth.js'); 

router.post('/', isAuthenticated , ticketController.createTicket);
router.get('/:ticketId', isAuthenticated , ticketController.getTicketById);


module.exports = router;
