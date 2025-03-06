
Ext.define('Consulting.desktop.src.view.External.TimesheetAttachmentPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'timesheetattachmentpanel',
    controller: 'timesheetattachment',
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
    title: 'Attach Timesheet',
    items: [
        {
            xtype: 'fieldset',
            instructions: 'Upload required documents.',
            items: [
                {
                    xtype: 'filefield',
                    label: 'Attach Timesheet',
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