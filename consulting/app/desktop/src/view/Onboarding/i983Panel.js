Ext.define('Consulting.desktop.src.view.Onboarding.i983Panel', { 
    extend: 'Ext.form.Panel',
    xtype: 'widget.i983Panel',
    controller: 'i983Controller',
    title: 'i983 Form',
    layout: 'vbox',
    scrollable: true,
    bodyPadding: 20,
    width: '100%',
    defaults: {
        anchor: '100%',
        labelWidth: 150,
        margin: '0 0 15 0'
    },
    requires: [
        'Consulting.desktop.src.model.Onboarding.i983',
        'Consulting.desktop.src.controller.i983Controller'
    ],
    listeners: {
        show: 'onAfterRender'
    },
    viewModel: {
        stores: {
            personStore: {
                type: 'store',
                model: 'Consulting.desktop.src.model.Onboarding.i983',
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: 'http://localhost:8080/api/get983FormForLoggedInEmployee',
                    reader: {
                        type: 'json',
                        rootProperty: '' // Set to empty string for a single object response
                    }
                },
                listeners: {
                    load: function(store, records, success) {
                        console.log('Store loaded:', records);
                        console.log('Raw response:', store.getProxy().getReader().rawData);
                        if (!success) {
                            console.error('Failed to load store data.');
                        }
                    },
                    exception: function(proxy, response, operation) {
                        console.error('Store load error:', operation.getError());
                    }
                }
            },
       
          
    }, 
        data: {
              recordId:"",
            person: {}
        }
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'i983 Form Details',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id',
                    bind: '{person.id}'
                },
                {
                    xtype: 'textfield',
                    label: 'School Recommending STEM OPT',
                    name: 'schoolRecommendingSTEMOPT',
                    bind: '{person.schoolRecommendingSTEMOPT}'
                },
                {
                    xtype: 'textfield',
                    label: 'School STEM Degree Earned',
                    name: 'schoolSTEMDegreeEarned',
                    bind: '{person.schoolSTEMDegreeEarned}'
                },
                {
                    xtype: 'textfield',
                    label: 'SEVIS ID',
                    name: 'sevisId',
                    bind: '{person.sevisId}'
                },
                {
                    xtype: 'datepickerfield',
                    label: 'STEM OPT Requested From',
                    name: 'STEMOPTRequestedFrom',
                    format: 'm/d/Y',
                    bind: '{person.STEMOPTRequestedFrom}'
                },
                {
                    xtype: 'datepickerfield',
                    label: 'STEM OPT Requested To',
                    name: 'STEMOPTRequestedTo',
                    format: 'm/d/Y',
                    bind: '{person.STEMOPTRequestedTo}'
                },
                {
                    xtype: 'textfield',
                    label: 'CIP Code',
                    name: 'cipCode',
                    bind: '{person.cipCode}'
                },
                {
                    xtype: 'textfield',
                    label: 'Qualifying Degree',
                    name: 'qualifyingDegree',
                    bind: '{person.qualifyingDegree}'
                },
                {
                    xtype: 'checkboxfield',
                    label: 'Prior Degree',
                    name: 'priorDegree',
                    bind: '{person.priorDegree}'
                },
                {
                    xtype: 'textfield',
                    label: 'College EIN',
                    name: 'collegeEIN',
                    bind: '{person.collegeEIN}'
                },
                {
                    xtype: 'textareafield',
                    label: 'Student Role',
                    name: 'studentRole',
                    bind: '{person.studentRole}',
                    height: 100,
                    maxLength: 500,
                    allowBlank: false
                },
                {
                    xtype: 'textareafield',
                    label: 'Goals and Objectives',
                    name: 'goals',
                    bind: '{person.goals}',
                    height: 100,
                    maxLength: 500,
                    allowBlank: false
                },
                {
                    xtype: 'textareafield',
                    label: 'Oversight',
                    name: 'oversight',
                    bind: '{person.oversight}',
                    height: 100,
                    maxLength: 500,
                    allowBlank: false
                },
                {
                    xtype: 'textareafield',
                    label: 'Measures',
                    name: 'measures',
                    bind: '{person.measures}',
                    height: 100,
                    maxLength: 500,
                    allowBlank: false
                },
                {
                    xtype: 'button',
                    text: 'Generate I983',
                    handler: 'onGenerateI983ButtonClick'
                },
                {
                    xtype: 'button',
                    text: 'Generate I9',
                    handler: 'onGenerateI9'
                },
                {
                    xtype: 'button',
                    text: 'Download I-983 Form',
                    reference: 'downloadI983Btn',
                    margin: '10 0 0 0',
                    handler: 'onDownloadI983',
                    bind: {
                        disabled: '{!recordId}'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Download I-9 Form',
                    reference: 'downloadI9Btn',
                    margin: '10 0 0 0',
                    handler: 'onDownloadI9',
                    bind: {
                        disabled: '{!recordId}'
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Download Forms',
            margin: '20 0 0 0',
            items: [{
                xtype: 'container',
                html: '<div class="form-download-instructions">Click the button above to download your I-983 form</div>',
                style: {
                    padding: '10px',
                    color: '#666'
                }
            }]
        }
    ],

    initComponent: function() {
        this.callParent();
        
        Ext.util.CSS.createStyleSheet(`
            .form-download-instructions {
                font-style: italic;
                color: #666;
            }
        `);
    }
 
});