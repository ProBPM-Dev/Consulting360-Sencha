Ext.define('Consulting.desktop.src.view.Onboarding.i983Panel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.i983Panel',
    controller: 'i983Controller', // Add the controller
    title: 'i983 Form',
    layout: 'vbox',
    scrollable: true,
    bodyPadding: 20,
    width: '100%',
    defaults: {
        anchor: '100%',
        labelWidth: 150,
        margin: '0 0 15 0'
    },
    viewModel: {
        stores: {
            personStore: {
                type: 'store',
                model: 'Consulting.desktop.src.view.Onboarding.PersonalInfoModel', // Replace with your model
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: 'http://localhost:8080/api/getLoggedInEmployeeWorkAuthorizationDetails', // Update the URL
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }
        },
        data: {
            person: {} // Initialize with an empty object
        }
    },
    defaults: {
        anchor: '100%',
        labelWidth: 150,
        margin: '0 0 15 0'
    },
    items: [
        // Form fields go here
    ],
    listeners: {
        afterrender: 'onAfterRender'
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'i983 Form Details',
            items: [
                {
                    xtype: 'textfield',
                    label: 'SEVIS ID No',
                    name: 'sevisid',
                    bind: '{person.sevisid}'
                },
                {
                    xtype: 'textfield',
                    label: 'SEVIS School Code',
                    name: 'sevisschool',
                    bind: '{person.sevisschool}'
                },
                {
                    xtype: 'textfield',
                    label: 'Designated School Official (DSO) Name and Contact Information',
                    name: 'DSO',
                    bind: '{person.DSO}'
                },
                {
                    xtype: 'datefield',
                    label: 'Date Awarded',
                    name: 'dateawarded',
                    format: 'm/d/Y',
                    bind: '{person.dateawarded}'
                },
                {
                    xtype: 'textfield',
                    label: 'Qualifying Major and Classification of Instructional Programs (CIP) Code:',
                    name: 'CIP',
                    bind: '{person.CIP}'
                },
                {
                    xtype: 'textfield',
                    label: 'Employment Authorization Number',
                    name: 'EAD',
                    bind: '{person.EAD}'
                },
                {
                    xtype: 'filefield',
                    label: 'Attach Document',
                    name: 'attachDoc',
                    buttonText: 'Select File...'
                },
                {
                    xtype: 'textareafield',
                    label: 'Student Role',
                    name: 'StudentRole',
                    bind: '{person.StudentRole}',
                    height: 100,
                    maxLength: 500,
                    allowBlank: false
                },
                {
                    xtype: 'textareafield',
                    label: 'Goals and Objectives',
                    name: 'Goals',
                    bind: '{person.Goals}',
                    height: 100,
                    maxLength: 500,
                    allowBlank: false
                },
                {
                    xtype: 'button',
                    text: 'Generate I983',
                    handler: 'onGenerateI983ButtonClick' // Bind to the controller method
                },
                {
                    xtype: 'button',
                    text: 'Submit',
                    formBind: true,
                    handler: 'onSubmitButtonClick' // Bind to the controller method
                },
            
            ]
        }
    ],

});