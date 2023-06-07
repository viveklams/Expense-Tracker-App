const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../models/Expense");

//-------------------------------------
//Create
//-------------------------------------
const createExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { description, title, amount } = req.body;
  try {
    const expense = await Expense.create({
      description,
      title,
      amount,
      user: req?.user?._id,
    });
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

//Fetch all

const fetchAllExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { page } = req?.query;
  try {
    const expenses = await Expense.paginate(
      {},
      { limit: 10, page: Number(page), sort: "desc", populate: "user" }
    );

    res.json(expenses);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Fetch single
//-------------------------------------
const fetchSingleExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const expense = await Expense.findById(id);
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Update
//-------------------------------------

const updateExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { description, title, amount } = req.body;
  try {
    const expense = await Expense.findByIdAndUpdate(id, {
      description,
      title,
      amount,
    });
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Delete
//-------------------------------------
const deletExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const expense = await Expense.findByIdAndDelete(id);
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});
module.exports = {
  createExpenseCtrl,

  fetchAllExpenseCtrl,
  fetchSingleExpenseCtrl,
  updateExpenseCtrl,
  deletExpenseCtrl,
};
