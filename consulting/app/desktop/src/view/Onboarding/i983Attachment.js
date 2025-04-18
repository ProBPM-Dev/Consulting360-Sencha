
Ext.define('Consulting.desktop.src.view.Onboarding.i983Attachment', {
    extend: 'Ext.form.Panel',
    xtype: 'widget.i983attachmentpanel',
    controller: 'i983attachment',
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
    title: 'Attach i983',
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