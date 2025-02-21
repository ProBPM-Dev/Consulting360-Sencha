Ext.define('Consulting.desktop.src.view.External.CreateTimeSheetPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'eastpanel',
    alias: 'widget.CreateTimeSheetPanel',
    controller: 'createTimesheet',
    width: 300,
    collapsed: true,
    collapseDirection: 'right',
    bind: {
        collapsible: '{eastCollapseConfig}',
        title:'{panelTitle}'
    },
    listeners:{
        beforeexpand:'onBeforeExpand'
    },
    layout: 'vbox',
    viewModel:{
        data:{
            poName:"",
            submitBtnDisabled:true,
            panelTitle:'',
            openPanel:false,
            isHoliday1: false, // Flag for Day 1
            isHoliday2: false,
        }
    },
    items: [
            
        {
            xtype: 'fieldset',
            reference: 'fieldset1',
            bind:{title:'Week {weekStartDate} to {weekEndDate}'},
            instructions: 'Enter hours for each day.',
            defaults: {
                labelWidth: '35%'
            },
            store: {
                fields: ['id', 'year', 'holidayName', 'holiday', 'active'],
                data: Ext.decode(localStorage.getItem('staticData')) || [] // Load from localStorage
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'day1',
                    bind:{label:'{day1Label}', value:'{day1}',
                        cls: '{isHoliday1 ? "holiday-field" : ""}', 
                        readOnly: '{isHoliday1}', 
                        editable: '{!isHoliday1}'},
                    allowBlank: false,
                    required: true,
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    }
                },
                {
                    xtype: 'numberfield',
                    bind:{label:'{day2Label}', value:'{day2}',
            cls: '{isHoliday2 ? "holiday-field" : ""}', 
            readOnly: '{isHoliday2}', 
            editable: '{!isHoliday2}'},
                    name: 'day2',
                    allowBlank: false,
                    minValue: 0,
                    required: true,
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    },
                    listeners: {
                        afterrender: function(field) {
                            console.log('Day 2 Class:', field.getCls()); // Log the applied CSS class
                        }
                    }
                },
                {
                    xtype: 'numberfield',
                    bind:{label:'{day3Label}', value:'{day3}'},
                    name: 'day3',
                    allowBlank: false,
                    minValue: 0,
                    required: true,
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    }
                },
                {
                    xtype: 'numberfield',
                    bind:{label:'{day4Label}', value:'{day4}'},
                    name: 'day4',
                    allowBlank: false,
                    minValue: 0,
                    required: true,
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    }
                },
                {
                    xtype: 'numberfield',
                    bind:{label:'{day5Label}', value:'{day5}'},
                    name: 'day5',
                    allowBlank: false,
                    minValue: 0,
                    required: true,
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    }
                },
                {
                    xtype: 'numberfield',
                    bind:{label:'{day6Label}', value:'{day6}'},
                    name: 'day6',
                    allowBlank: false,
                    minValue: 0,
                    required: true,
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    }
                },
                {
                    xtype: 'numberfield',
                    bind:{label:'{day7Label}', value:'{day7}'},
                    name: 'day7',
                    allowBlank: false,
                    minValue: 0,
                    required: true,
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    }
                }
            ]
        },
        {
            xtype: 'button',
            text: 'Submit',
            bind:{disabled:'{submitBtnDisabled}'},
            margin: '10 0 0 0',
            handler: 'onSubmitButtonClick'
        }
    ]
});
