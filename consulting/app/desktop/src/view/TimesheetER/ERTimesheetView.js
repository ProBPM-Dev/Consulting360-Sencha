
Ext.define('Consulting.desktop.src.view.TimesheetER.ERTimesheetView', {
    extend: 'Ext.form.Panel',
    xtype: 'ertimesheet',
    controller: 'ertimesheet',
    viewModel: {
        type: 'ertimesheet'
    },
    layout: 'vbox',
    padding: 20,
    title: 'Employer Timesheet',
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
                margin: '0 10 10 0'
            },
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Employee Name',
                    labelAlign: 'top',
                    displayField: 'label',
                    valueField: 'value',
                    bind: {
                        store: '{employees}',
                        value: '{selectedEmployee}'
                    },
                    queryMode: 'local',
                    editable: false,
                    placeholder: 'Select employee name',
                    flex: 1
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Project',
                    labelAlign: 'top',
                    displayField: 'label',
                    valueField: 'value',
                    bind: {
                        store: '{projects}',
                        value: '{selectedProject}'
                    },
                    queryMode: 'local',
                    editable: false,
                    placeholder: 'Select project',
                    flex: 1
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Vendor',
                    labelAlign: 'top',
                    displayField: 'label',
                    valueField: 'value',
                    bind: {
                        store: '{vendors}',
                        value: '{selectedVendor}'
                    },
                    queryMode: 'local',
                    editable: false,
                    placeholder: 'Select vendor',
                    flex: 1
                }
            ]
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Select Month',
            labelAlign: 'top',
            bind: '{selectedMonth}',
            listeners: {
                change: 'onMonthChange'
            },
            flex: 1
        },
        {
            xtype: 'grid',
            bind: '{formattedDates}',
            columns: [
                {
                    text: 'Timesheet Type',
                    dataIndex: 'type',
                    flex: 1
                },
                {
                    text: 'Day',
                    dataIndex: 'day',
                    flex: 1
                },
                {
                    text: 'Date',
                    dataIndex: 'date',
                    flex: 1
                },
                {
                    text: 'Hours Worked',
                    dataIndex: 'hoursWorked',
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        minValue: 0,
                        maxValue: 12
                    }
                }
            ],
            plugins: {
                grideditable: {
                    triggerEvent: 'tap', // Use 'tap' for touch devices
                    editable: {
                        hoursWorked: true // Enable editing for the 'hoursWorked' column
                    }
                }
            },
            flex: 1
        },
        {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
                margin: '0 10 0 0'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    handler: 'onEditClick'
                },
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'x-fa fa-save',
                    handler: 'onSaveClick'
                },
                {
                    xtype: 'button',
                    text: 'Approve',
                    iconCls: 'x-fa fa-check',
                    handler: 'onApproveClick'
                },
                {
                    xtype: 'button',
                    text: 'Deny',
                    iconCls: 'x-fa fa-times',
                    handler: 'onDenyClick'
                }
            ]
        }
    ]
});