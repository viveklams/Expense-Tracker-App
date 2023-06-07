const express = require("express");
const cors = require("cors");
const app = express();
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
app.use(express.json());

const usersRoute = require("./routes/users/usersRoute");
const incomeRoute = require("./routes/income/incomeRoute");
const expenseRoute = require("./routes/expense/expenseRoute");

const accountStatsRoute = require("./routes/accountStatsRoute/accountStatsRoute");

expenseRoute;

//users routes
app.use("/api/users", usersRoute);

//account stats
app.use("/api/account-stats", accountStatsRoute);
//income routes
app.use("/api/income", incomeRoute);

//expense routes
app.use("/api/expenses", expenseRoute);

//middlewares
app.use(express.json());
app.use(express.json());
app.use(express.json());
app.use(cors());

//Error
app.use(errorHandler);
app.use(notFound);

module.exports = app;
