Ext.require(['Ext.field.ComboBox']);
Ext.define('Consulting.desktop.src.view.Onboarding.AcademicDetails', {
    extend: 'Ext.form.Panel',
    alias: 'widget.academicDetails',
    requires: [
        'Consulting.desktop.src.view.Onboarding.OnboardingController'
    ],
    layout: 'vbox',
    controller: 'Onboarding',
    scrollable: true,
    bodyPadding: 20,
    width: '100%',

    defaults: {
        anchor: '100%',
        labelWidth: 150,
        margin: '0 0 15 0'
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Academic Details',
            defaults: {
                anchor: '100%',
                labelWidth: 150,
                margin: '0 0 15 0'
            },
            items: [
                {
                    xtype: 'combobox',
                    label: 'Qualification',
                    name: 'qualification',
                    store: {
                        fields: ['label', 'value'],
                        data: [
                            { label: "Bachelor's", value: 'bachelor' },
                            { label: "Master's", value: 'master' },
                            { label: 'PhD', value: 'phd' }
                        ]
                    },
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'value',
                    allowBlank: false,
                    blankText: 'Qualification is required',
                    listeners: {
                        change: 'onQualificationChange'
                    }
                },
                {
                    xtype: 'combobox',
                    label: 'Specialization',
                    name: 'specialization',
                    store: {
                        fields: ['label', 'value'],
                        data: [
                            { label: 'Computer Science', value: 'cs' },
                            { label: 'Mechanical Engineering', value: 'me' },
                            { label: 'Electrical Engineering', value: 'ee' }
                        ]
                    },
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'value',
                    allowBlank: false,
                    blankText: 'Specialization is required'
                },
                {
                    xtype: 'textfield',
                    label: 'University Name',
                    name: 'uname',
                    allowBlank: false,
                    blankText: 'University Name is required'
                },
                {
                    xtype: 'datefield',
                    label: 'Course Completion',
                    name: 'ccomp',
                    format: 'm/d/Y',
                    allowBlank: false,
                    blankText: 'Course Completion Date is required'
                },
   
            ]
        },
      
    ]
});
