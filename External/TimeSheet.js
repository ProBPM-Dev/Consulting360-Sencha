
Ext.define('Consulting.desktop.src.view.External.TimeSheet', {
    extend: 'Ext.container.Container',
    xtype: 'panel-complex-collapsible',
    alias: 'widget.timesheet',

    requires: [
        'Ext.panel.Collapser',
        'Ext.grid.Grid',
         'Consulting.desktop.src.controller.Timesheet',
        'Consulting.desktop.src.model.External.TimeSheet',
        'Consulting.desktop.src.view.External.CreateTimeSheetPanel' 
    ],

    controller: 'Timesheet', 

    viewModel: {
        data: {
            collapsible: true,
           
        },
        formulas: {
            eastCollapseConfig: function (get) {
                return get('collapsible') ? { direction: 'right' } : false;
            }
        }
    },

    layout: 'vbox',

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            margin: '0 0 10 0',
            items: [
                {
                    xtype: 'combobox',
                    label: 'Choose Client',
                    queryMode: 'remote',
                    displayField: 'title',
                    valueField: 'title',
                    align: "right",
                    store: {
                        autoLoad: true,
                        proxy: {
                            type: 'rest',
                            url: 'http://localhost:8080/api/getEmployeePOTitle',
                            reader: {
                                type: 'json'
                            }
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Create Timesheet',
                    align: 'right',
                    margin: '0 0 0 10',
                 handler: 'onCreateTimesheetButtonClick'
             
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            flex: 2,
            defaults: {
                xtype: 'panel',
                border: true
            },
            items: [
                {
                    flex: 2,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'grid',
                            title: 'TimeSheets',
                            reference: 'timesheetGrid',
                            plugins: {
                                gridfilters: true,
                                pagingtoolbar: true
                            },
                            store: {
                                model: 'Consulting.desktop.src.model.External.TimeSheet',
                                autoLoad: true,
                                pageSize: 10,
                                remoteSort: true,
                                remoteFilter: true
                            },
                            rowNumbers: true,
                            columns: [
                                {
                                    text: 'Week Start Date',
                                    dataIndex: 'startDate',
                                    width: 115,
                                    format: 'm-d-Y',
                                    xtype: 'datecolumn'
                                },
                                {
                                    text: 'Week End Date',
                                    dataIndex: 'endDate',
                                    width: 115,
                                    format: 'm-d-Y',
                                    xtype: 'datecolumn'
                                },
                                {
                                    text: 'Day1',
                                    dataIndex: 'day1',
                                    minWidth: 150
                                },
                                {
                                    text: 'Day2',
                                    dataIndex: 'day2',
                                    minWidth: 150
                                },
                                {
                                    text: 'Day3',
                                    dataIndex: 'day3',
                                    minWidth: 150
                                },
                                {
                                    text: 'Day4',
                                    dataIndex: 'day4',
                                    minWidth: 150
                                },
                                {
                                    text: 'Day5',
                                    dataIndex: 'day5',
                                    minWidth: 150
                                },
                                {
                                    text: 'Day6',
                                    dataIndex: 'day6',
                                    minWidth: 150
                                },
                                {
                                    text: 'Day7',
                                    dataIndex: 'day7',
                                    minWidth: 150
                                }, {
                                    width: 70,
                                    hideable: false,
                                    cell: {
                                        tools: {
                                            approve: {
                                                iconCls: 'x-fa fa-check green',
                                                handler: 'onEdit'
                                            }
                                        }
                                    }
                                }    
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    docked: 'top',
                                    items: [
                                        {
                                            text: 'Filter',
                                            iconCls: 'x-fa fa-filter',
                                            xtype: 'button',
                                            reference: 'ShowFilters',
                                            menu: {
                                                listeners: {
                                                    beforeShow: 'onShowFilters',
                                                    beforeHide: 'onHideFilters'
                                                },
                                                items: [
                                                    {
                                                        text: 'All Filter',
                                                        reference: 'allFilter',
                                                        checked: true,
                                                        checkHandler: 'handleAllFilters'
                                                    },
                                                    '-'
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'CreateTimeSheetPanel'
                }
            ]
        }
    ]
});