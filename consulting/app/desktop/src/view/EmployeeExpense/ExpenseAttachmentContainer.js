Ext.define('Consulting.desktop.src.view.EmployeeExpense.ExpenseAttachmentContainer', {
    // extend: 'Ext.panel.Panel',
    extend: 'Ext.form.Panel',
     alias: 'widget.expenseattach',
     controller: 'expenseattach',
     requires: [
         'Consulting.desktop.src.view.EmployeeExpense.ExpensePanel',
         'Consulting.desktop.src.view.EmployeeExpense.ExpenseAttachmentPanel',
         'Ext.layout.Card',
        'Consulting.desktop.src.view.External.ExpenseMainController'
     ],
     width: 400,
     collapsed: true,
     collapseDirection: 'right',
     border: true,
     layout: {
         type: 'card'
     },
     viewModel: {
         data: {
             isPrevDisabled: true,
             isNextDisabled: false,
         }
     },
     items: [
         { xtype: 'ExpensePanel', itemId: 'ExpensePanel' },
         { xtype: 'expenseattachmentpanel', itemId: 'expenseattachmentpanel' },

     ],
     bbar: ['->',
         {
             itemId: 'card-prev',
             xtype: 'button',
             text: '&laquo; Previous',
             handler: 'onPreviousButtonClick', 
             bind: {
                 disabled: '{isPrevDisabled}'
             }
         },
         {
             itemId: 'card-reset',
             xtype: 'button',
             text: 'Reset',
             handler: 'showReset',
         },
         {
             itemId: 'card-next',
             xtype: 'button',
             text: 'Save and Next &raquo;',
             handler: 'onSaveNextButtonClick', 
             bind: {
                 disabled: '{isNextDisabled}'
             }
         }
     
     ] 
 });