Ext.define('Consulting.desktop.src.view.Onboarding.PassportDetails', {
    extend: 'Ext.form.Panel',
    alias: 'widget.passportDetails',
    requires: [
        'Consulting.desktop.src.controller.PassportController'
    ],
    layout: 'vbox',
    controller: 'passport',
    scrollable: true,
    bodyPadding: 20,
    width: '100%',
    viewModel:{
   
        stores: {
            personStore: {
                
                type: 'store',
                model: 'Consulting.desktop.src.view.Onboarding.PersonalInfoModel',
                autoLoad: true,
                proxy: {   
                    type: 'ajax',
                    url: 'http://localhost:8080/api/getLoggedInEmployeePassportDetails',
                    reader: {
                        type: 'json'
                    }
                },
              
            }
        },
        data: {
            person: {} // Initialize with an empty object
        }
    
    },
    listeners: {
        show: 'onAfterRender'
       
    },
    buttons: {
       
    },
    defaults: {
        anchor: '100%',
        labelWidth: 150,
        margin: '0 0 15 0'
    },
 
    items: [
        {
            xtype: 'fieldset',
            title: 'Passport Details',
            defaults: {
                anchor: '100%',
                labelWidth: 150,
                margin: '0 0 15 0'
            },
            items: [
                {
                    xtype: 'textfield',
                    label: 'Passport Number',
                    labelAlign: 'placeholder',
                    name: 'passPortNumber',
                    allowBlank: false,
                    blankText: 'passport number is required',
                    bind: '{person.passPortNumber}',
                },
                {
                    xtype: 'datefield',
                    label: 'Passport Expiry Date',
                    name: 'expiryDate',
                    format: 'm/d/Y',
                    labelAlign: 'placeholder',
                    allowBlank: false,
                    blankText: 'Please enter a valid Passport Expiry Date',
                    bind: '{person.expiryDate}',
                },
                {
                    xtype: 'textfield',
                    label: 'Address Line 1',
                    name: 'addressLine1',
                    labelAlign: 'placeholder',
                    allowBlank: false,
                    blankText: 'Please enter a valid Address',
                    bind: '{person.addressLine1}',
                },
                {
                    xtype: 'textfield',
                    label: 'Address Line 2',
                    name: 'addressLine2'
                },
                {
                    xtype: 'textfield',
                    label: 'City',
                    name: 'city',
                    allowBlank: false,
                    blankText: 'Please enter a valid City',
                    bind: '{person.city}',
                },
                {
                    xtype: 'textfield',
                    label: 'State',
                    name: 'state',
                    allowBlank: false,
                    blankText: 'Please enter a valid State',
                    bind: '{person.state}',
                },
                {
                    xtype: 'textfield',
                    label: 'Country',
                    name: 'passPortIssuedCountry',
                    allowBlank: false,
                    blankText: 'Please enter a valid Country',
                    bind: '{person.passPortIssuedCountry}',
                },
                {
                    xtype: 'textfield',
                    label: 'Pincode',
                    name: 'zip',
                    allowBlank: false,
                    blankText: 'Please enter a valid Pincode',
                    bind: '{person.zipCode}',
                },
              
            ]
        },
     
    ]
});
