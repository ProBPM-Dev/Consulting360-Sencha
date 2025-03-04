Ext.define('Consulting.desktop.src.view.External.TimeSheetEnvelope', {
    extend: 'Ext.Panel',
    alias: 'widget.timesheetEnvelope',
    requires: [
        'Ext.panel.Collapser',
        'Consulting.desktop.src.store.POTitle',
        'Consulting.desktop.src.controller.TimesheetEnvelopeContoller'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    controller:'TimesheetEnvelopeContoller',
    viewModel: {
        data: {
            selectedPO: ''
        },
        stores: {
            POTitle: {
                type: 'POTitle',
                autoLoad: true
            }
        },
    },
    tbar:[{
        xtype: 'selectfield',
        label: 'Customer',
        queryMode: 'remote',
        displayField: 'name',
        valueField: 'id',
        bind: {
            store: '{POTitle}' 
        },
        listeners:{
            select:'onPOSelection'
        }
    }],
    items: [{
        xtype:'panel',
        height:'100%',
        items:[{
            xtype:'timesheet',
            height:'100%'
        },
        {
        xtype: 'CreateTimeSheetPanel',
        docked: 'right',
        width: '50%',
        collapsible: {
            collapsed: false,
            direction: 'right'
        }
    }]
    }]
})