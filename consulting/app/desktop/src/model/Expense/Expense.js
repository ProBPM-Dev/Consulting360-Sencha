Ext.define('Consulting.desktop.src.model.Expense.Expense', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'expenseDate', type: 'date' },
        { name: 'amount', type: 'float' },
        { name: 'approvedOn', type: 'date' },
        { name: 'attachmentId', type: 'int' },
        // Define 'expenseCategory' as an object to match the JSON structure
        { name: 'expenseCategory', type: 'auto' } // Use 'auto' for complex objects
    ]
});