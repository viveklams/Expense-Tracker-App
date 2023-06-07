const express = require("express");
const {
  createExpenseCtrl,
  fetchAllExpenseCtrl,
  fetchSingleExpenseCtrl,
  updateExpenseCtrl,
  deletExpenseCtrl,
} = require("../../controllers/expenses/expenseCtrl");
const authMiddleware = require("../../middlewares/authMiddleware");

const expenseRoute = express.Router();

expenseRoute.post("/", authMiddleware, createExpenseCtrl);
expenseRoute.get("/", authMiddleware, fetchAllExpenseCtrl);
expenseRoute.get("/:id", authMiddleware, fetchSingleExpenseCtrl);
expenseRoute.put("/:id", authMiddleware, updateExpenseCtrl);
expenseRoute.delete("/:id", authMiddleware, deletExpenseCtrl);
module.exports = expenseRoute;
