
Ext.define('Consulting.desktop.src.view.Onboarding.PersonalInfo', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalInfo',
    requires: [
        'Consulting.desktop.src.view.Onboarding.OnboardingController'
    ],
    layout: 'vbox', 
    controller: 'Onboarding',
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
                    url: 'http://localhost:8080/api/getLoggedInEmployee',
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
    defaults: {
        anchor: '100%',
        labelWidth: 150,
        margin: '0 0 15 0',
        border: false
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Personal Information',
            defaults: {
                anchor: '100%',
                labelWidth: 150,
                margin: '0 0 15 0'
            },
            items: [
                {
                    xtype: 'textfield',
                    label: 'First Name',
                    name: 'firstname',
                    allowBlank: false,
                    bind: '{person.firstname}',
                    blankText: 'First Name is required',
                    errorTarget: 'qtip'
                },
                {
                    xtype: 'textfield',
                    label: 'Last Name',
                    labelAlign: 'placeholder',
                    name: 'lastname',
                    bind: '{person.lastname}',
                    allowBlank: false,
                    blankText: 'Last Name is required'
                },
                {
                    xtype: 'textfield',
                    label: 'SSN',
                    labelAlign: 'placeholder',
                    name: 'ssn',
                    bind: '{person.ssn}', 
                    allowBlank: false,
                    blankText: 'SSN is required',
                    regex: /^[0-9]{2}-[0-9]{2}-[0-9]{3}$/,
                    regexText: 'SSN should be in the format 11-22-333'
                },
                {
                    xtype: 'textfield',
                    label: 'Phone Number',
                    labelAlign: 'placeholder',
                    name: 'phonenumber',
                    allowBlank: false,
                    bind: '{person.phonenumber}',
                    blankText: 'Phone Number is required',
                    regex: /^[0-9]{10}$/,
                    regexText: 'Please enter a valid 10-digit mobile number'
                },
                {
                    xtype: 'datefield',
                    label: 'Date Of Birth',
                    labelAlign: 'placeholder',
                    name: 'dob',
                    reference: 'dobField',
                    allowBlank: false,
                    bind: '{person.dob}',
                    maxValue: new Date(),
                    blankText: 'Date Of Birth is required'
                },
                {
                xtype: 'textfield',
                label: 'Highest Degree',
                name: 'highestDegree',
                displayField: 'label',
                valueField: 'value',
                bind: '{person.highestDegree}',
                allowBlank: false,
                blankText: 'HighestDegree is required',
              
            },
            {
                xtype: 'textfield',
                label: 'University Name',
                name: 'univeristyName',
                bind: '{person.univeristyName}',
                allowBlank: false,
                blankText: 'University Name is required'
            },
            {
                xtype: 'datefield',
                label: 'Course Completion',
                name: 'courseCompletionDate',
                bind: '{person.courseCompletionDate}',
                format: 'm/d/Y',
                allowBlank: false,
                blankText: 'Course Completion Date is required'
            }
            ]
        },
   
    ],
    
});