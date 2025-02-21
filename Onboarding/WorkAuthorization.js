Ext.define('Consulting.desktop.src.view.Onboarding.WorkAuthorization', {
    extend: 'Ext.form.Panel',
    alias: 'widget.workAuthorization',
    requires: [
        'Consulting.desktop.src.view.Onboarding.OnboardingController'
    ],
    layout: 'vbox',
    controller: 'Onboarding',
    scrollable: true,
    bodyPadding: 20,
    width: '100%',
    buttons: {
        submit: 'onSubmit'
    },
    listeners: {
        show: 'loadData' 
          },
    defaults: {
        anchor: '100%',
        labelWidth: 150,
        margin: '0 0 15 0'
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Work Authorization',
            defaults: {
                anchor: '100%',
                labelWidth: 150,
                margin: '0 0 15 0'
            },
            items: [
                {
                    xtype: 'combobox',
                    label: 'Work Authorization Status',
                    name: 'workAuthLookup',
                    store: {
                        fields: ['label', 'value'],
                        data: [
                            { label: "OPT Master's", value: 'opt' },
                            { label: "i983 Master's", value: 'i983' },
                            { label: "CPT Master's", value: 'cpt' },
                            { label: "CAP H1B first time from India", value: 'cap' },
                            { label: "H1B", value: 'h1b' },
                            { label: "H4 EAD", value: 'h4ead' },
                            { label: "GC", value: 'gc' },
                            { label: "GC EAD", value: 'gcead' },
                            { label: "US Citizen", value: 'us' }
                        ]
                    },
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'value',
                    allowBlank: false,
                    blankText: 'Work Authorization is required',
                    listeners: {
                        change: 'onWorkAuthChange'
                    }
                },
                {
                    layout: 'vbox',
                    items: [
                        // Conditional fields based on the selected work authorization
                        {
                            xtype: 'textfield',
                            label: 'USCIS Number',
                            name: 'uscisNumber',
                            hidden: true, // Default hidden
                            reference: 'uscisNumberField'
                        },
                        {
                            xtype: 'datefield',
                            label: 'Valid From',
                            name: 'validFrom',
                            format: 'm/d/Y',
                            hidden: true, // Default hidden
                            reference: 'validFromField'
                        },
                        {
                            xtype: 'datefield',
                            label: 'Valid To',
                            name: 'validTo',
                            format: 'm/d/Y',
                            hidden: true, // Default hidden
                            reference: 'validToField'
                        },
                        {
                            xtype: 'filefield',
                            label: 'Attach Document',
                            name: 'attachDoc',
                            buttonText: 'Select File...',
                            hidden: true, // Default hidden
                            reference: 'attachDocField'
                        },
                        {
                            xtype: 'filefield',
                            label: 'i20 Document',
                            name: 'i20',
                            buttonText: 'Select File...',
                            hidden: true, // Default hidden
                            reference: 'i20Field'
                        },
                        {
                            xtype: 'filefield',
                            label: 'CPT Document',
                            name: 'CPTdoc',
                            buttonText: 'Select File...',
                            hidden: true, // Default hidden
                            reference: 'CPTdocField'
                        },
                        {
                            xtype: 'textfield',
                            label: 'Job Duties',
                            name: 'jobDuties',
                            hidden: true, // Default hidden
                            reference: 'jobDutiesField'
                        },
                        {
                            xtype: 'filefield',
                            label: 'Attach 797A Document',
                            name: 'h1bdoc',
                            buttonText: 'Select File...',
                            hidden: true, // Default hidden
                            reference: 'h1bdocField'
                        },
                        {
                            xtype: 'filefield',
                            label: 'Attach i94 Document',
                            name: 'i94doc',
                            buttonText: 'Select File...',
                            hidden: true, // Default hidden
                            reference: 'i94docField'
                        },
                        {
                            xtype: 'filefield',
                            label: 'Attach i9 Document',
                            name: 'i9doc',
                            buttonText: 'Select File...',
                            hidden: true, // Default hidden
                            reference: 'i9docField'
                        }
                    ]
                },
             
            ]
        }
    ]
});
