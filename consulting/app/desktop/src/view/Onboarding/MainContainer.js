Ext.define('Consulting.desktop.src.view.Onboarding.MainContainer', {
   // extend: 'Ext.panel.Panel',
   extend: 'Ext.form.Panel',
    alias: 'widget.onboardingPanel',
    controller: 'Onboarding',
   
    requires: [
        'Consulting.desktop.src.view.Onboarding.PersonalInfo',
        'Consulting.desktop.src.view.Onboarding.IdentityInfo',
        'Consulting.desktop.src.view.Onboarding.EmergencyContactDetails',
        'Consulting.desktop.src.view.Onboarding.PassportDetails',
        'Consulting.desktop.src.view.Onboarding.WorkAuthorization',
        'Consulting.desktop.src.view.Onboarding.i983Panel',
        'Consulting.desktop.src.view.Onboarding.i983Attachment',
        'Ext.layout.Card',
        'Consulting.desktop.src.view.Onboarding.OnboardingController'
    ],
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
        { xtype: 'personalInfo', itemId: 'personalInfo' },
        { xtype: 'identityInfo', itemId: 'identityInfo' },
        { xtype: 'emergencyContactDetails', itemId: 'emergencyContactDetails' },
        { xtype: 'passportDetails', itemId: 'passportDetails' },
        { xtype: 'workAuthorization', itemId: 'workAuthorization' },
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