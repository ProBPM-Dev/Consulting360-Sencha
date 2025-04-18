
Ext.define('Consulting.desktop.src.view.EmployeeExpense.ExpenseAttachmentPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'expenseattachmentpanel',
    controller: 'expenseattachment',
    viewModel: {
        data: {
            attachmentPanelTitle: 'Attachments'
        }
    },
    layout: 'vbox',
    width: 470,
   // collapsible: true,
    //collapsed: true,
    //collapseDirection: 'right',
    title: 'Attach Expense',
    items: [
        {
            xtype: 'fieldset',
            instructions: 'Upload required documents.',
            items: [
                {
                    xtype: 'filefield',
                    label: 'Attach Expense',
                    name: 'file',
                    accept: 'application/pdf, image/*'
                }
            ]
        },
 
        {
            xtype: 'button',
            text: 'Submit',
            margin: '10 0 0 0',
            handler: 'onSubmit'
        }
    ]
});