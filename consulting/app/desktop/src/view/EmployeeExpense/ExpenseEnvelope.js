Ext.define('Consulting.desktop.src.view.EmployeeExpense.ExpenseEnvelope', {
    extend: 'Ext.Panel',
    alias: 'widget.expenseEnvelope',
    requires: [
        'Ext.panel.Collapser',
        'Consulting.desktop.src.controller.ExpenseEnvelopeContoller'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
   controller:'ExpenseEnvelopeContoller',
   viewModel: {
    data: {
        selectedPO: ''
    },
    stores: {
        POTitle: {
            type: 'POTitle',
            autoLoad: true
        }
    },
},
tbar: [{
    xtype: 'selectfield',
    reference: 'poTitleCombo', // Add a reference for easy access
    label: 'Customer',
    queryMode: 'local', // Use 'local' if the store is already loaded
    displayField: 'name', // Field to display in the dropdown
    valueField: 'id', // Field to use as the value
    bind: {
        store: '{POTitle}', // Bind to the POTitle store
        value: '{selectedPO.id}' // Bind to the selectedPO in the ViewModel
    },
    listeners: {
        select: 'onPOSelection' // Handle selection event
    }
}],
    items: [{
        xtype:'panel',
        height:'100%',
        items:[{
            xtype:'Expense',
            height:'100%'
        },
        {
        xtype: 'expenseattach',
        docked: 'right',
        width: '50%',
        collapsible: {
            collapsed: false,
            direction: 'right'
        }
    }]
    }]
})