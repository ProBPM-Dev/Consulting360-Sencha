Ext.define('Consulting.desktop.src.view.Onboarding.i983Main', {
    // extend: 'Ext.panel.Panel',
    extend: 'Ext.form.Panel',
     alias: 'widget.i983Main',
     controller: 'i983Main',
     requires: [
         'Consulting.desktop.src.view.Onboarding.i983Panel',
         'Consulting.desktop.src.view.Onboarding.i983Attachment',
         'Ext.layout.Card',
        'Consulting.desktop.src.controller.i983Main'
     ],

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
         { xtype: 'i983Panel', itemId: 'i983Panel' },
         { xtype: 'i983attachmentpanel', itemId: 'i983attachmentpanel' },

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