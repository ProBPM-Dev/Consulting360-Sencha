Ext.define('Consulting.desktop.src.view.Onboarding.PersonalInfo', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalInfo',
    requires: [
        'Consulting.desktop.src.controller.PersonalInfoController'
    ],
    layout: 'vbox', 
    controller: 'personalInfo',
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
                    required: true,  // Modern Toolkit uses 'required' instead of 'allowBlank'
                    bind: '{person.firstname}',
                     validateOnBlur: true, 
                    errorMessage: 'First Name is required'
                },
                {
                    xtype: 'textfield',
                    label: 'Last Name',
                    labelAlign: 'placeholder',
                    name: 'lastname',
                    required: true,
                    bind: '{person.lastname}',
                     validateOnBlur: true, 
                    errorMessage: 'Last Name is required'
                },
                {
                    xtype: 'textfield',
                    label: 'SSN',
                    labelAlign: 'placeholder',
                    name: 'ssn',
                    bind: '{person.ssn}',
                    required: true,
                    errorMessage: 'SSN is required',
                     validateOnBlur: true, 
                    validators: {
                        type: 'format',
                        matcher: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                        message: 'SSN should be in the format 111-222-3333'
                    }
                },
                {
                    xtype: 'textfield',
                    label: 'Phone Number',
                    labelAlign: 'placeholder',
                     validateOnBlur: true, 
                    name: 'phonenumber',
                    required: true,
                    bind: '{person.phonenumber}',
                    errorMessage: 'Phone Number is required',
                    validators: {
                        type: 'format',
                        matcher: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit mobile number'
                    }
                },
                {
                    xtype: 'datepickerfield',
                    label: 'Date Of Birth',
                    labelAlign: 'placeholder',
                     validateOnBlur: true, 
                    name: 'dob',
                    reference: 'dobField',
                    required: true,
                    bind: '{person.dob}',
                    maxValue: new Date(),
                    errorMessage: 'Date Of Birth is required'
                },
                {
                    xtype: 'textfield',
                    label: 'Highest Degree',
                    name: 'highestDegree',
                    bind: '{person.highestDegree}',
                     validateOnBlur: true, 
                    required: true,
                    errorMessage: 'Highest Degree is required'
                },
                {
                    xtype: 'textfield',
                    label: 'University Name',
                    name: 'univeristyName',
                    bind: '{person.univeristyName}',
                     validateOnBlur: true, 
                    required: true,
                    errorMessage: 'University Name is required'
                },
                {
                    xtype: 'datepickerfield',
                    label: 'Course Completion',
                    name: 'courseCompletionDate',
                    bind: '{person.courseCompletionDate}',
                    dateFormat: 'm/d/Y',
                     validateOnBlur: true, 
                    required: true,
                    errorMessage: 'Course Completion Date is required'
                }
            ]
        }
    ]
});
