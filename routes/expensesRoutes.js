const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense
} = require('../controllers/expenseController');

router.route('/')
    .get(auth, getAllExpenses)
    .post(auth, createExpense);

router.route('/:id')
    .patch(auth, updateExpense)
    .delete(auth, deleteExpense);

module.exports = router;