Ext.define('Consulting.desktop.src.view.Onboarding.EmergencyContactDetails', {
    extend: 'Ext.form.Panel',
    alias: 'widget.emergencyContactDetails',
    requires: [
        'Consulting.desktop.src.controller.EmergencyContactController',
    ],
    controller: 'emergencycontact',
    scrollable: true,
    bodyPadding: 20,
    width: '100%',
    defaults: {
        labelWidth: 150,
        margin: '0 0 10 0'
    },
    viewModel: {
        stores: {
            personStore: {
                type: 'store',
                model: 'Consulting.desktop.src.model.Onboarding.EmergencyContact',
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: 'http://localhost:8080/api/getEmergencyContactForLoggedInEmployee',
                    reader: {
                        type: 'json',
                        rootProperty: 'data' // Ensure this matches your API response structure
                    }
                },
            }
        },
        data: {
            person1: {}, // Data for Emergency Contact 1
            person2: {}  // Data for Emergency Contact 2
        }
    },
    listeners: {
        show: 'onAfterRender'
    },
    items: [
        {
            xtype: 'formpanel', // Use formpanel for each panel
            title: 'Emergency Contact Details 1',
            collapsible: true,
            collapsed: false, // Initially expanded
            itemId: 'panel1', // Add itemId for reference
            defaults: {
                anchor: '50%',
                labelWidth: 100,
                margin: '0 0 10 0'
            },
            items: [
                {
                    xtype: 'textfield',
                    label: 'First Name',
                    name: 'firstName', // Match API field name
                    allowBlank: false,
                    blankText: 'First Name is required',
                    bind: '{person1.firstName}' // Bind to firstName in the viewModel
                },
                {
                    xtype: 'textfield',
                    label: 'Last Name',
                    name: 'lastName', // Match API field name
                    allowBlank: false,
                    blankText: 'Last Name is required',
                    bind: '{person1.lastName}' // Bind to lastName
                },
              
                {
                    xtype: 'textfield',
                    label: 'Email Address',
                    name: 'email', // Match API field name
                    allowBlank: false,
                    blankText: 'Email is required',
                    vtype: 'email',
                    vtypeText: 'Please enter a valid email address',
                    bind: '{person1.email}' // Bind to email
                },
                {
                    xtype: 'textfield',
                    label: 'Address Line 1',
                    name: 'addressLine1', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid Address',
                    bind: '{person1.addressLine1}' // Bind to addressLine1
                },
                {
                    xtype: 'textfield',
                    label: 'Address Line 2',
                    name: 'addressLine2', // Match API field name
                    bind: '{person1.addressLine2}' // Bind to addressLine2
                },
                {
                    xtype: 'textfield',
                    label: 'City',
                    name: 'city', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid City',
                    bind: '{person1.city}' // Bind to city
                },
                {
                    xtype: 'textfield',
                    label: 'State',
                    name: 'state', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid State',
                    bind: '{person1.state}' // Bind to state
                },
                {
                    xtype: 'textfield',
                    label: 'Country',
                    name: 'country', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid Country',
                    bind: '{person1.country}' // Bind to country
                },
                {
                    xtype: 'textfield',
                    label: 'Zip Code',
                    name: 'zipCode', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid Zip Code',
                    bind: '{person1.zipCode}' // Bind to zipCode
                },
                {
                    xtype: 'checkboxfield',
                    label: 'Is Primary',
                    name: 'isPrimary', // Match API field name
                    bind: '{person1.isPrimary}', // Bind to primary
                    value: true, // Set the default value to true
                    disabled: true // Disable the checkbox to prevent user changes
                },
                {
                    xtype: 'textfield',
                    label: 'Primary Phone Number',
                    name: 'primaryPhoneNumber', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid mobile number',
                    regex: /^[0-9]{10}$/,
                    regexText: 'Please enter a valid mobile number',
                    bind: '{person1.primaryPhoneNumber}' // Bind to primaryPhoneNumber
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Primary Phone Type',
                    name: 'primaryPhoneType', // Must match exactly
                    bind: '{person1.primaryPhoneType}',
                    allowBlank: true // If optional
                },
                {
                    xtype: 'textfield',
                    label: 'Secondary Phone Number',
                    name: 'secondaryPhoneNumber', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid mobile number',
                    regex: /^[0-9]{10}$/,
                    regexText: 'Please enter a valid mobile number',
                    bind: '{person1.secondaryPhoneNumber}' // Bind to primaryPhoneNumber
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Secondary Phone Type',
                    name: 'secondaryPhoneType', // Must match exactly
                    bind: '{person1.secondaryPhoneType}',
                    allowBlank: true // If optional
                },
            ],
           
        },
        {
            xtype: 'formpanel', // Use formpanel for each panel
            title: 'Emergency Contact Details 2',
            collapsible: true,
            collapsed: true, // Initially collapsed
            itemId: 'panel2', // Add itemId for reference
            defaults: {
                anchor: '50%',
                labelWidth: 100,
                margin: '0 0 15 0'
            },
            items: [
                {
                    xtype: 'textfield',
                    label: 'First Name',
                    name: 'firstName', // Match API field name
                    allowBlank: false,
                    blankText: 'First Name is required',
                    bind: '{person2.firstName}' // Bind to firstName in the viewModel
                },
                {
                    xtype: 'textfield',
                    label: 'Last Name',
                    name: 'lastName', // Match API field name
                    allowBlank: false,
                    blankText: 'Last Name is required',
                    bind: '{person2.lastName}' // Bind to lastName
                },
                {
                    xtype: 'textfield',
                    label: 'Primary Phone Number',
                    name: 'primaryPhoneNumber', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid mobile number',
                    regex: /^[0-9]{10}$/,
                    regexText: 'Please enter a valid mobile number',
                    bind: '{person2.primaryPhoneNumber}' // Bind to primaryPhoneNumber
                },
                {
                    xtype: 'textfield',
                    label: 'Email Address',
                    name: 'email', // Match API field name
                    allowBlank: false,
                    blankText: 'Email is required',
                    vtype: 'email',
                    vtypeText: 'Please enter a valid email address',
                    bind: '{person2.email}' // Bind to email
                },
                {
                    xtype: 'textfield',
                    label: 'Address Line 1',
                    name: 'addressLine1', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid Address',
                    bind: '{person2.addressLine1}' // Bind to addressLine1
                },
                {
                    xtype: 'textfield',
                    label: 'Address Line 2',
                    name: 'addressLine2', // Match API field name
                    bind: '{person2.addressLine2}' // Bind to addressLine2
                },
                {
                    xtype: 'textfield',
                    label: 'City',
                    name: 'city', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid City',
                    bind: '{person2.city}' // Bind to city
                },
                {
                    xtype: 'textfield',
                    label: 'State',
                    name: 'state', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid State',
                    bind: '{person2.state}' // Bind to state
                },
                {
                    xtype: 'textfield',
                    label: 'Country',
                    name: 'country', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid Country',
                    bind: '{person2.country}' // Bind to country
                },
                {
                    xtype: 'textfield',
                    label: 'Zip Code',
                    name: 'zipCode', // Match API field name
                    allowBlank: false,
                    blankText: 'Please enter a valid Zip Code',
                    bind: '{person2.zipCode}' // Bind to zipCode
                },

            ],
           
        }
    ]
});