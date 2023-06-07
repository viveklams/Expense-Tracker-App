// const expressAsyncHandler = require("express-async-handler");
// const Expense = require("../../models/Expense");
// const Income = require("../../models/Income");

// const accountStatsCtrl = expressAsyncHandler(async (req, res) => {
//   try {
//     //expenses statistics
//     const expensesStats = await Expense.aggregate([
//       //aggregate - adding up something together

//       //filter
//       { match: { amount: { $gte: 20 } } },
//       {
//         $group: {
//           _id: null, //group by but we want all the in one group. If you group by some fields it means your resultls will be base on that field
//           averageExp: { $avg: "$amount" },
//           totalExp: { $sum: "$amount" },
//           minExp: { $min: "$amount" },
//           maxExp: { $max: "$amount" },
//           totalRecordsExp: { $sum: 1 },
//         },
//       },
//     ]);

//     const incomeStats = await Income.aggregate([
//       //filter
//       { $match: { amount: { $gte: 20 } } },
//       {
//         $group: {
//           _id: null, //group by but we want all the in one group. If you group by some fields it means your resultls will be base on that field
//           averageInc: { $avg: "$amount" },
//           totalInc: { $sum: "$amount" },
//           minInc: { $min: "$amount" },
//           maxInc: { $max: "$amount" },
//           totalRecordsIncome: { $sum: 1 },
//         },
//       },
//     ]);

//     res.json({ expensesStats, incomeStats });
//   } catch (error) {
//     res.json(error);
//   }

//   //const profit = incomeStats[0].totalInc - expensesStats[0].totalExp;
// });

// module.exports = { accountStatsCtrl };

const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../models/Expense");
const Income = require("../../models/Income");

const accountStatsCtrl = expressAsyncHandler(async (req, res) => {
  const expensesStats = await Expense.aggregate([
    //filter
    { $match: { amount: { $gte: 20 } } },
    {
      $group: {
        _id: null, //group by but we want all the in one group. If you group by some fields it means your resultls will be base on that field
        averageExp: { $avg: "$amount" },
        totalExp: { $sum: "$amount" },
        minExp: { $min: "$amount" },
        maxExp: { $max: "$amount" },
        totalRecords: { $sum: 1 },
      },
    },
  ]);

  const incomeStats = await Income.aggregate([
    //filter
    { $match: { amount: { $gte: 20 } } },
    {
      $group: {
        _id: null, //group by but we want all the in one group. If you group by some fields it means your resultls will be base on that field
        averageInc: { $avg: "$amount" },
        totalInc: { $sum: "$amount" },
        minInc: { $min: "$amount" },
        maxInc: { $max: "$amount" },
        totalRecords: { $sum: 1 },
      },
    },
  ]);

  const profit = incomeStats[0].totalInc - expensesStats[0].totalExp;
  res.json({ expensesStats, incomeStats, profit });
});
module.exports = {
  accountStatsCtrl,
};
