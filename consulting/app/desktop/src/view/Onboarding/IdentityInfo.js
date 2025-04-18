Ext.require(['Ext.field.ComboBox']);
Ext.define('Consulting.desktop.src.view.Onboarding.IdentityInfo', {
    extend: 'Ext.form.Panel',
    alias: 'widget.identityInfo',
    requires: [
        'Consulting.desktop.src.controller.IdentityInfoController'
    ],
    layout: 'vbox', 
    controller: 'identityInfo',
    scrollable: true,
    bodyPadding: 20,
    width: '100%',
   /* listeners: {
        beforeSubmit: 'formatData',
        initialize: 'loadData'
    },*/
    listeners: {
        show: 'onAfterRender'
    },
    viewModel: {
        stores: {
            personStore: {
                type: 'store',
                model: 'Consulting.desktop.src.view.Onboarding.PersonalInfoModel',
                autoLoad: true,
                proxy: {   
                    type: 'ajax',
                    url: 'http://localhost:8080/api/getLoggedInEmployeeIdentityDetails',
                    reader: {
                        type: 'json'
                    }
                },
              
            }
        },
        data: {
            person: {} ,
            identityType: null
        }

    },
    defaults: {
        anchor: '100%',
        labelWidth: 150,
        margin: '0 0 15 0'
    },
  
    items: [
        {
           
                    xtype: 'fieldset',
                    title: 'Identity Details',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 150,
                        margin: '0 0 15 0'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            label: 'Choose Identity Type',
                            name: 'identityTypeLookup',
                            store: {
                                fields: ['label', 'value'],
                                data: [
                                    { label: 'Driving License', value: 1  },
                                    { label: 'State ID', value: 2 },
                                    { label: 'Temporary Address', value: 3 }
                                ]
                            },
                            queryMode: 'local',
                            displayField: 'label',
                            valueField: 'value',
                            bind: '{person.identityTypeLookup}',
                            allowBlank: false,
                            blankText: 'Choose an identity type',
                           bind: '{identityType}' , // Bind to ViewModel
                            listeners: {
                                
                                change: 'onIdentityTypeChange' // Bind to the controller method
                            }
                        },
                       {
                                xtype: 'textfield',
                                label: 'Identity Document Number',
                                name: 'identityNumber',
                                allowBlank: false,
                                blankText: 'Please enter a valid Identity-Number',
                                reference: 'identityNumberField',
                                bind: {
                                    hidden: '{identityType === "3"}' ,
                                    value:'{person.identityNumber}'
                                }
                            },
                            {
                                xtype: 'datefield',
                                label: 'Expiry Date',
                                name: 'expiryDate',
                                format: 'm/d/Y',
                                allowBlank: false,
                                blankText: 'Please enter a valid Expiry Date',
                                bind: {
                                    hidden: '{identityType === "3"}' ,
                                    value:'{person.expiryDate}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                label: 'Address Line 1',
                                name: 'addressLine1',
                                allowBlank: false,
                                blankText: 'Please enter a valid Address',
                                bind: {
                                    hidden: '{identityType === "3"}' ,
                                    value:'{person.addressLine1}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                label: 'City',
                                name: 'city',
                                allowBlank: false,
                                blankText: 'Please enter a valid City',
                                bind: {
                                    hidden: '{identityType === "3"}' ,
                                    value:'{person.city}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                label: 'State',
                                name: 'state',
                                allowBlank: false,
                                blankText: 'Please enter a valid State',
                                bind: {
                                    hidden: '{identityType === "3"}' ,
                                    value:'{person.state}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                label: 'Country',
                                name: 'country',
                                allowBlank: false,
                                blankText: 'Please enter a valid Country',
                                bind: {
                                    hidden: '{identityType === "3"}' ,
                                    value:'{person.country}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                label: 'Pincode',
                                name: 'zipCode',
                                allowBlank: false,
                                blankText: 'Please enter a valid Pincode',
                                bind: {
                                    hidden: '{identityType === "3"}' ,
                                    value:'{person.zipCode}'
                                }
                            },


                        {
                                
                                bind: {
                                    hidden: '{identityType !== "3"}'  // Show only for Temporary Address
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: 'Temporary Address Line 1',
                                        name: 'tempaddressLine1',
                                        bind:'{person.addressLine1}',
                                        allowBlank: false,
                                        blankText: 'Please enter a valid Address'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: 'Temporary City',
                                        name: 'tempCity',
                                        allowBlank: false,
                                        blankText: 'Please enter a valid City',
                                         bind:'{person.city}'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: 'Temporary State',
                                        name: 'tempState',
                                        allowBlank: false,
                                        blankText: 'Please enter a valid State',
                                        bind:'{person.state}'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: 'Temporary Country',
                                        name: 'tempCountry',
                                        allowBlank: false,
                                        blankText: 'Please enter a valid Country',
                                         bind:'{person.country}'
                                    },
                                    {
                                        xtype: 'textfield',
                                        label: 'Temporary Pincode',
                                        name: 'tempzipCode',
                                        allowBlank: false,
                                           bind:'{person.zipCode}',
                                        blankText: 'Please enter a valid Pincode'
                                    }
                                ]
                            },

                           
                    ]
                }
            ],
           
      
});
