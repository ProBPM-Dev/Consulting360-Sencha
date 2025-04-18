Ext.define('Consulting.desktop.src.view.EmployeeExpense.ExpensePanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ExpensePanel',
    controller: 'createExpense',
    width: 300,
    collapsed: true,
    collapseDirection: 'right',
    border: true,
    bind: {
        collapsible: '{eastCollapseConfig}',
        title: '{panelTitle}'
    },
    requires: [
        'Consulting.desktop.src.controller.CreateExpenseController',
        'Consulting.desktop.src.store.ExpenseCategory'
    ],
    listeners: {
        beforeexpand: 'onBeforeExpand',
        afterrender: 'onAfterRender'
    },
    layout: 'vbox',
    viewModel: {
        data: {
            po: "",
            panelTitle: '',
            openPanel: false,
        },
        stores: {
            expenseCategory: {
                type: 'ExpenseCategory',
                autoLoad: true
            }
        }
    },
    items: [
        {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id',
                    bind: {
                        value: '{recordId}'
                    }
                },
                {
                    xtype: 'datepickerfield',
                    label: 'Expense Date',
                    labelAlign: 'placeholder',
                    validateOnBlur: true,
                    name: 'expenseDate',
                    bind: '{expenseDate}',
                    required: true,
                    maxValue: new Date(),
                    errorMessage: 'Expense date is required'
                },
                {
                    xtype: 'numberfield',
                    name: 'amount',
                    label: 'Amount',
                    bind: '{amount}',
                    minValue: 0,
                    decimalPrecision: 2
                },
                {
                    xtype: 'textfield',
                    name: 'notes',
                    label: 'Notes',
                    bind: '{notes}'
                },
                {
                    xtype: 'combobox',
                    name: 'expenseCategory.id', // Updated to match the expected payload
                    label: 'Category',
                    bind: {
                        store: '{expenseCategory}',
                        value: '{expenseCategory.id}' // Bind to the correct nested structure
                    },
                    displayField: 'name',
                    valueField: 'id',
                    queryMode: 'local',
                    editable: false,
                    forceSelection: true,
                    required: true
                },
             
            ]
        }
    ],
 
});