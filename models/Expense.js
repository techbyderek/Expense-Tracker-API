const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true, 
        min: 0   
    },
    description: {
        type: String,
        required: false  
    },
    category: {
        type: String,
        required: true, 
        enum: ['Food', 'Transportation', 'Entertainment', 'Bills', 'Other']
    },
    date: {
        type: Date,
        required: true, 
        default: Date.now
    },
    paymentMethod: {
        type: String,
        required: false,  
        enum: ['Cash', 'Credit Card', 'Debit Card']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;