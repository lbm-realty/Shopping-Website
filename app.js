const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const indexRouter = require('./routes/index');
const userModel = require('./models/user-model');
const productModel = require('./models/product-model');

const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(
    expressSession ({
        resave: false,
        saveUninitialized: false,
        secret: "heuhee",
    })
);
app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use('/', indexRouter)
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.get('/test', async (req, res) => {
    let user = await userModel
    .find();
    res.send(user)
})

app.listen(3000);