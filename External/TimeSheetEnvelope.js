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
    tbar: [{
        xtype: 'selectfield',
        reference: 'poTitleCombo', // Add a reference for easy access
        label: 'Customer',
        queryMode: 'local', // Use 'local' if the store is already loaded
        displayField: 'name', // Field to display in the dropdown
        valueField: 'id', // Field to use as the value
        bind: {
            store: '{POTitle}', // Bind to the POTitle store
            value: '{selectedPO.id}' // Bind to the selectedPO in the ViewModel
        },
        listeners: {
            select: 'onPOSelection' // Handle selection event
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