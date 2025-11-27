const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense
} = require('../controllers/expenseController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       required:
 *         - amount
 *         - category
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         amount:
 *           type: number
 *         description:
 *           type: string
 *         category:
 *           type: string
 *           enum: [Food, Transportation, Entertainment, Bills, Other]
 *         date:
 *           type: string
 *           format: date-time
 *         paymentMethod:
 *           type: string
 *           enum: [Cash, Credit Card, Debit Card]
 *         isDeleted:
 *           type: boolean
 *       example:
 *         id: 692628a1ce99571baef77ba
 *         userId: 674d8a9b1ce99571baef77b6
 *         amount: 50
 *         description: Lunch at restaurant
 *         category: Food
 *         date: 2024-11-24T18:30:00.000Z
 *         paymentMethod: Credit Card
 *         isDeleted: false
 */

/**
 * @swagger
 * /api/v1/expenses:
 *   get:
 *     summary: Get all expenses for authenticated user
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Food, Transportation, Entertainment, Bills, Other]
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: List of expenses
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - category
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [Food, Transportation, Entertainment, Bills, Other]
 *               paymentMethod:
 *                 type: string
 *                 enum: [Cash, Credit Card, Debit Card]
 *             example:
 *               amount: 50
 *               description: Lunch at restaurant
 *               category: Food
 *               paymentMethod: Credit Card
 *     responses:
 *       201:
 *         description: Expense created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.route('/')
    .get(auth, getAllExpenses)
    .post(auth, createExpense);

/**
 * @swagger
 * /api/v1/expenses/{id}:
 *   patch:
 *     summary: Update an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *             example:
 *               amount: 75
 *               description: Updated description
 *     responses:
 *       200:
 *         description: Expense updated
 *       404:
 *         description: Expense not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete an expense (soft delete)
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted
 *       404:
 *         description: Expense not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .patch(auth, updateExpense)
    .delete(auth, deleteExpense);

module.exports = router;