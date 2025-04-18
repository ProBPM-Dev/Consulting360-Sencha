Ext.define('Consulting.desktop.src.view.External.CreateTimeSheetPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CreateTimeSheetPanel',
    controller: 'createTimesheet',
    width: 300,
    collapsed: true,
    collapseDirection: 'right',
    border: true,
    bind: {
        collapsible: '{eastCollapseConfig}',
        title:'{panelTitle}'
    },
    requires: [
        'Consulting.desktop.src.controller.CreateTimeSheetController'
    ],
    listeners:{
        beforeexpand:'onBeforeExpand',
         afterrender: 'onAfterRender'
    },
    layout: 'vbox',
    viewModel:{
        data:{
            po:"",
            panelTitle:'',
            openPanel:false,
            recordId:""
        }
    },
    items: [
            
        {
            xtype: 'fieldset',
            reference: 'fieldset1',
            bind:{title:'Week {weekStartDate} to {weekEndDate}'},
            instructions: 'Enter hours for each day.',
            defaults: {
                labelWidth: '35%',
                labelCls:'holiday-label'
            },
            store: {
                fields: ['id', 'year', 'holidayName', 'holiday', 'active'],
                data: Ext.decode(localStorage.getItem('staticData')) || [] // Load from localStorage
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'day1',
                    bind:{
                        label:'{day1Label}', value:'{day1}',
                        labelCls: '{day1Required ? "holiday-label" : ""}', 
                        required: '{day1Required}'
                    },
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    }
                },
                {
                    xtype: 'numberfield',
                    bind:{label:'{day2Label}', value:'{day2}',
                    labelCls: '{day2Required ? "holiday-label" : ""}', 
                    required: '{day2Required}'},
                    name: 'day2',
                    minValue: 0,
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
                    bind:{label:'{day3Label}', value:'{day3}',required: '{day3Required}',labelCls: '{day3Required ? "holiday-label" : ""}'},
                    name: 'day3',
                    minValue: 0,
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    }
                },
                {
                    xtype: 'numberfield',
                    bind:{label:'{day4Label}', value:'{day4}',required: '{day4Required}',labelCls: '{day4Required ? "holiday-label" : ""}'},
                    name: 'day4',
                    minValue: 0,
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    }
                },
                {
                    xtype: 'numberfield',
                    bind:{label:'{day5Label}', value:'{day5}',required: '{day5Required}',labelCls: '{day5Required ? "holiday-label" : ""}'},
                    name: 'day5',
                    minValue: 0,
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    }
                },
                {
                    xtype: 'numberfield',
                    bind:{label:'{day6Label}', value:'{day6}',required: '{day6Required}',labelCls: '{day6Required ? "holiday-label" : ""}'},
                    name: 'day6',
                    minValue: 0,
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    }
                },
                {
                    xtype: 'numberfield',
                    bind:{label:'{day7Label}', value:'{day7}',required: '{day7Required}',labelCls: '{day7Required ? "holiday-label" : ""}'},
                    name: 'day7',
                    minValue: 0,
                    validators: {
                        type: 'format',
                        matcher: /^\d+(\.\d{1,2})?$/
                    }
                },

            ]
        },
     
        
    ]
});
