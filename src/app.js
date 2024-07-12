const express = require('express');
const app = express();
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const productRouterMDB = require('./routes/product.routerMDB.js');
const messageRouterMDB = require('./routes/message.routerMDB.js');
const cartsRouterMDB = require('./routes/carts.routerMDB.js');
const sessionRouter = require('./routes/session.routerMDB.js')
const viewRouter = require('./routes/views.router.js');
const ticketRouter = require('./routes/ticket.routerMDB.js')
const db = require('./config/database.js')
const productManagerMongo = require('./dao/productRepository.js');
const productManager = new productManagerMongo();
const MessageRepository= require('./dao/messageRepository.js');
const messageManager = new MessageRepository();
const passport = require('passport')
const { initializePassport } = require('./config/passport.config.js')
const dotenv = require('dotenv');
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const Server = require('socket.io');
const initializeSocket = require('./config/socket.js'); 
const port = 8080;
dotenv.config()

const httpServer = app.listen(port, console.log(`Server running on port ${port}`));
// Inicializar sockets
initializeSocket(httpServer);

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
});

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB }),
    // cookie: { maxAge: 180 * 60 * 1000 } // 3 horas
}));

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/product', productRouterMDB);
app.use('/api/message', messageRouterMDB);
app.use('/api/carts', cartsRouterMDB);
app.use('/api/views', viewRouter);
app.use('/api/session', sessionRouter);
app.use('/api/tickets', ticketRouter)




