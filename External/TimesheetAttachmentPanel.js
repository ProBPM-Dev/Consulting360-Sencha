
Ext.define('Consulting.view.TimesheetAttachmentPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'timesheetattachmentpanel',
    controller: 'timesheetattachmentpanel',
    viewModel: {
        data: {
            attachmentPanelTitle: 'Attachments'
        }
    },
    layout: 'vbox',
    width: 300,
    collapsible: true,
    collapsed: true,
    collapseDirection: 'right',
    title: 'Attachments',
    items: [
        {
            xtype: 'fieldset',
            title: 'Attach Documents',
            instructions: 'Upload required documents.',
            items: [
                {
                    xtype: 'filefield',
                    label: 'Attach Document',
                    name: 'attachmentDocument',
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