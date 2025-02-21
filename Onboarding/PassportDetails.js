Ext.define('Consulting.desktop.src.view.Onboarding.PassportDetails', {
    extend: 'Ext.form.Panel',
    alias: 'widget.passportDetails',
    requires: [
        'Consulting.desktop.src.view.Onboarding.OnboardingController'
    ],
    layout: 'vbox',
    controller: 'Onboarding',
    scrollable: true,
    bodyPadding: 20,
    width: '100%',
    buttons: {
       
    },
    defaults: {
        anchor: '100%',
        labelWidth: 150,
        margin: '0 0 15 0'
    },
    listeners: {
        show: 'loadData' 
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
                    name: 'passportnumber',
                    allowBlank: false,
                    blankText: 'passport number is required',
                },
                {
                    xtype: 'datefield',
                    label: 'Passport Expiry Date',
                    name: 'expiryDate',
                    format: 'm/d/Y',
                    labelAlign: 'placeholder',
                    allowBlank: false,
                    blankText: 'Please enter a valid Passport Expiry Date'
                },
                {
                    xtype: 'textfield',
                    label: 'Address Line 1',
                    name: 'addressLine1',
                    labelAlign: 'placeholder',
                    allowBlank: false,
                    blankText: 'Please enter a valid Address'
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
                    blankText: 'Please enter a valid City'
                },
                {
                    xtype: 'textfield',
                    label: 'State',
                    name: 'state',
                    allowBlank: false,
                    blankText: 'Please enter a valid State'
                },
                {
                    xtype: 'textfield',
                    label: 'Country',
                    name: 'passPortIssuedCountry',
                    allowBlank: false,
                    blankText: 'Please enter a valid Country'
                },
                {
                    xtype: 'textfield',
                    label: 'Pincode',
                    name: 'zip',
                    allowBlank: false,
                    blankText: 'Please enter a valid Pincode'
                },
                {
                    xtype: 'filefield',
                    label: 'Attach Passport Document',
                    name: 'passportDocument',
                    buttonText: 'Select File...',
                    accept: 'application/pdf, image/*'
                }
            ]
        },
     
    ]
});
