Ext.define('Consulting.desktop.src.view.Onboarding.WorkAuthorization', {
    extend: 'Ext.form.Panel',
    alias: 'widget.workAuthorization',
    requires: [
        'Consulting.desktop.src.controller.WorkAuthorizationController'
    ],
    layout: 'vbox',
    controller: 'workAuthorization',
    scrollable: true,
    bodyPadding: 20,
    width: '100%',
    viewModel: {
        stores: {
            personStore: {
                type: 'store',
                model: 'Consulting.desktop.src.view.Onboarding.PersonalInfoModel',
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: 'http://localhost:8080/api/getLoggedInEmployeeWorkAuthorizationDetails',
                    reader: {
                        type: 'json'
                    }
                }
            }
        },
        data: {
            person: {} // Initialize with an empty object
        }
    },
    listeners: {
        show: 'onAfterRender'
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
                            { label: "OPT Master's", value: 1 },
                            { label: "i983 Master", value: 2 },
                            { label: "CPT Master's", value: 3 },
                            { label: "CAP H1B first time from India", value: 4 },
                            { label: "H1B", value: 5 },
                            { label: "H4 EAD", value: 6 },
                            { label: "GC", value: 7 },
                            { label: "GC EAD", value: 8 },
                            { label: "US Citizen", value: 9 }
                        ]
                    },
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'value',
                    allowBlank: false,
                    blankText: 'Work Authorization is required',
                    bind: '{person.workAuthLookup}',
                    listeners: {
                        change: 'onWorkAuthChange'
                    }
                },
                {
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'textfield',
                            label: 'USCIS Number',
                            name: 'uscisNumber',
                            hidden: true,
                            reference: 'uscisNumberField',
                            bind: '{person.uscisNumber}'
                        },
                        {
                            xtype: 'datefield',
                            label: 'Valid From',
                            name: 'validFrom',
                            format: 'm/d/Y',
                            hidden: true,
                            reference: 'validFrom',
                            bind: '{person.validFrom}'
                        },
                        {
                            xtype: 'datefield',
                            label: 'Valid To',
                            name: 'validTo',
                            format: 'm/d/Y',
                            hidden: true,
                            reference: 'validTo',
                            bind: '{person.validTo}'
                        },
                        {
                            xtype: 'textareafield',
                            label: 'Job Duties',
                            name: 'jobDuties',
                            hidden: true,
                            reference: 'jobDutiesField',
                            bind: '{person.jobDuties}'
                        },
                        {
                            xtype: 'button',
                            text: 'Generate I9',
                            reference: 'I9',
                            handler: 'onGenerateI9'
                        },
                        {
                            xtype: 'button',
                            text: 'Generate I983',
                            reference: 'I983',
                            hidden: true,
                            handler: 'onGenerateI983'
                        }
                    ]
                }
            ]
        }
    ]
});