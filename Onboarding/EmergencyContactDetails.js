Ext.define('Consulting.desktop.src.view.Onboarding.EmergencyContactDetails', {
    extend: 'Ext.form.Panel',
    alias: 'widget.emergencyContactDetails',
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
    items: [
        {
            xtype: 'fieldset',
            title: 'Emergency Contact Details',
            defaults: {
                anchor: '100%',
                labelWidth: 150,
                margin: '0 0 15 0'
            },
            items: [
                {
                    xtype: 'textfield',
                    label: 'Full Name',
                    name: 'emergencyName1',
                    allowBlank: false,
                    blankText: 'Name is required'
                },
                {
                    xtype: 'textfield',
                    label: 'Mobile Number',
                    name: 'emergencyMobile1',
                    allowBlank: false,
                    blankText: 'Please enter a valid mobile number',
                    regex: /^[0-9]{10}$/,
                    regexText: 'Please enter a valid mobile number'
                },
                {
                    xtype: 'textfield',
                    label: 'Email Address',
                    name: 'emergencyEmail1',
                    allowBlank: false,
                    blankText: 'Email is required',
                    vtype: 'email',
                    vtypeText: 'Please enter a valid email address'
                },
                {
                    xtype: 'textfield',
                    label: 'Address Line 1',
                    name: 'emergencyAddress1',
                    allowBlank: false,
                    blankText: 'Please enter a valid Address'
                },
                {
                    xtype: 'textfield',
                    label: 'Address Line 2',
                    name: 'emergencyAddressLine2'
                },
                {
                    xtype: 'textfield',
                    label: 'City',
                    name: 'emergencyCity',
                    allowBlank: false,
                    blankText: 'Please enter a valid City'
                },
                {
                    xtype: 'textfield',
                    label: 'State',
                    name: 'emergencyState',
                    allowBlank: false,
                    blankText: 'Please enter a valid State'
                },
                {
                    xtype: 'textfield',
                    label: 'Country',
                    name: 'emergencyCountry',
                    allowBlank: false,
                    blankText: 'Please enter a valid Country'
                },
                {
                    xtype: 'textfield',
                    label: 'Pincode',
                    name: 'emergencyPincode',
                    allowBlank: false,
                    blankText: 'Please enter a valid Pincode'
                }
            ]
        },

    ]
});
