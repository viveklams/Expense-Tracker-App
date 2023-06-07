const express = require("express");
const {
  createIncomeCtrl,
  fetchIncomesCtrl,
  fetchIncomeCtrl,
  updateIncomeCtrl,
  deletIncomeCtrl,
} = require("../../controllers/income/incomeCtrl");

const authMiddleware = require("../../middlewares/authMiddleware");

const incomeRoute = express.Router();

incomeRoute.post("/", authMiddleware, createIncomeCtrl);
incomeRoute.get("/:id", authMiddleware, fetchIncomesCtrl);
incomeRoute.get("/", authMiddleware, fetchIncomeCtrl);
incomeRoute.put("/:id", authMiddleware, updateIncomeCtrl);
incomeRoute.delete("/:id", authMiddleware, deletIncomeCtrl);
// incomeRoute.get("/", fetchUsersCltrl);

module.exports = incomeRoute;
