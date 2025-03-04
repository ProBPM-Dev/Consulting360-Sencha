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
    buttons: {
        //submit: 'onSubmit'
    },
    viewModel:{
   
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
                            { label: "i983 Master", value: 'i983 Master' },
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
                    bind: '{person.workauthname}',
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
                            reference: 'uscisNumberField',
                            bind: '{person.uscisNumber}',
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
                            xtype: 'textfield',
                            label: 'SEVIS ID No',
                            name: 'sevisid',
                            hidden: true, // Default hidden
                            reference: 'sevisid'
                        },
                        {
                            xtype: 'textfield',
                            label: 'SEVIS School Code',
                            name: 'Sevisschool',
                            hidden: true, // Default hidden
                            reference: 'sevisschool'
                        },
                        {
                            xtype: 'textfield',
                            label: 'Designated School Official (DSO) Name and Contact Information',
                            name: 'DSO',
                            hidden: true, // Default hidden
                            reference: 'DSO'
                        },
                        {
                            xtype: 'datefield',
                            label: 'Date Awarded',
                            name: 'dateawarded',
                            format: 'm/d/Y',
                            hidden: true, // Default hidden
                            reference: 'dateawarded'
                        },
                        {
                            xtype: 'textfield',
                            label: 'Qualifying Major and Classification of Instructional Programs (CIP) Code:',
                            name: 'CIP',
                            hidden: true, // Default hidden
                            reference: 'CIP'
                        },
                        {
                            xtype: 'textfield',
                            label: 'Employment Authorization Number',
                            name: 'EAD',
                            hidden: true, // Default hidden
                            reference: 'EAD'
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
                            xtype: 'textareafield',
                            label: 'Job Duties',
                            name: 'jobDuties',
                            hidden: true, // Default hidden
                            reference: 'jobDutiesField'
                        },
                        {
                            xtype: 'textareafield',
                            label: 'Student Role: Describe the student\'s role with the employer and how that role is directly related to enhancing the student\'s knowledge obtained through his or her qualifying STEM degree',
                            name: 'StudentRole',
                            hidden: true, // Default hidden
                            reference: 'StudentRole',
                            height: 100, // Set a fixed height for the textarea
                            maxLength: 500, // Optional: Limit the number of characters
                            allowBlank: false, // Optional: Field is required
                        },
                        {
                            xtype: 'textareafield',
                            label: 'Goals and Objectives: Describe how the assignment(s) with the employer will help the student achieve his or her specific objectives for work-based learning related to his or her STEM degree. The description must both specify the student\'s goals regarding specific knowledge, skills, or techniques as well as the means by which they will be achieved',
                          name: 'Goals',
                            hidden: true, // Default hidden
                            reference: 'Goals'
                        },
                        {
                            xtype: 'button',
                            text: 'Generate I9',
                            reference: 'I9',
                            hidden: true,
                            handler: function() {
                                var email = 'mellamarthy1@gmail.com';
                                Ext.Ajax.request({
                    url: 'http://localhost:8080/api/updateI9-pdf',
                    method: 'POST',
                    params: {
                        email: email
                    },
                    success: function(response) {
                        Ext.Msg.alert('Success', response.responseText);
                    },
                    failure: function() {
                        Ext.Msg.alert('Failure', 'Failed to update PDF.');
                    }
                });
            }
                           
                        },
                        {
                            xtype: 'button',
                            text: 'Generate I983',
                            reference: 'I983',
                            hidden: true,
                            handler: function() {
                                var email = 'mellamarthy1@gmail.com';
                                Ext.Ajax.request({
                    url: 'http://localhost:8080/api/updateI983-pdf',
                    method: 'POST',
                    params: {
                        email: email
                    },
                    success: function(response) {
                        Ext.Msg.alert('Success', response.responseText);
                    },
                    failure: function() {
                        Ext.Msg.alert('Failure', 'Failed to update PDF.');
                    }
                });
            }
                           
                        }
            
                    ]
                },
             
            ]
        }
    ]
});
