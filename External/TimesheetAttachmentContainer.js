Ext.define('Consulting.desktop.src.view.External.TimesheetAttachmentContainer', {
    // extend: 'Ext.panel.Panel',
    extend: 'Ext.form.Panel',
     alias: 'widget.timesheetattach',
     controller: 'timesheetattach',
     requires: [
         'Consulting.desktop.src.view.External.CreateTimeSheetPanel',
         'Consulting.desktop.src.view.External.TimesheetAttachmentPanel',
         'Ext.layout.Card',
         'Consulting.desktop.src.view.External.TimesheetMainController'
     ],
     width: 300,
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
         { xtype: 'CreateTimeSheetPanel', itemId: 'CreateTimeSheetPanel' },
         { xtype: 'timesheetattachmentpanel', itemId: 'timesheetattachmentpanel' },

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