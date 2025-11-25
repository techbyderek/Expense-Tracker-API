const Expense = require('../models/Expense');

const getAllExpenses = async (req, res) => {
    try {
        const filter = { 
            userId: req.user._id,
            isDeleted: false 
        };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        const expenses = await Expense.find(filter);

        res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const createExpense = async (req, res) => {
    try {
        const expense = await Expense.create({
            ...req.body,
            userId: req.user._id
        });
        
        res.status(201).json({
            success: true,
            data: expense
        });
    } catch(error){
        res.status(400).json({
            success: false,
            error: error.message 
        });
    }
};

const updateExpense = async (req, res) => {
    try{
        const expense = await Expense.findOneAndUpdate(
            { 
                _id: req.params.id,
                userId: req.user._id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        
        if(!expense){
            return res.status(404).json({
                success: false,
                error: 'Expense not found or unauthorized'
            });
        }
        
        res.status(200).json({
            success: true,
            data: expense
        });
        
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOneAndUpdate(
            { 
                _id: req.params.id,
                userId: req.user._id
            },
            { isDeleted: true },     
            { new: true }
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                error: 'Expense not found or unauthorized'
            });
        }
        
        res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message 
        });
    }
};

module.exports = {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense
};