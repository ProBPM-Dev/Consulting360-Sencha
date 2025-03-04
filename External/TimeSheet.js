
Ext.define('Consulting.desktop.src.view.External.TimeSheet', {
    extend: 'Ext.grid.Grid',
    alias: 'widget.timesheet',
    requires: [
        'Ext.grid.Grid',
        'Consulting.desktop.src.controller.Timesheet',
        'Consulting.desktop.src.model.External.TimeSheet',
        'Ext.grid.filters.*'
    ],
    controller: 'Timesheet', 
    listeners: {
        childtap: 'onCellTap'
    },
    viewModel:{
        data:{
            url :'http://localhost:8080/api/getTimeSheets/'
        },
        stores: {
            timesheet: {
                model: 'Consulting.desktop.src.model.External.TimeSheet',
                autoLoad: false,
                pageSize: 10,
                remoteSort: true,
                remoteFilter: true,
                proxy: {
                    type: 'rest',
                    url : 'http://localhost:8080/api/getTimeSheets/',
                    reader: {
                        type: 'json',
                        rootProperty: 'content'
                    }
                },
                listeners:{
                    beforeload:'onStoreBeforeLoad'
                }
            }
        }

    },
    bind:{
        title:'{selectedPO.name}',
        store:'{timesheet}'
    },
    plugins: {
        gridfilters: true,
        pagingtoolbar: true
    },
    rowNumbers: true,

    columns: [
        {
            text: 'Week Start Date',
            dataIndex: 'startDate',
            format: 'm-d-Y',
            xtype: 'datecolumn'
        },
        {
            text: 'Week End Date',
            dataIndex: 'endDate',
            format: 'm-d-Y',
            xtype: 'datecolumn'
        },
        {
            text: 'Day1',
            dataIndex: 'day1'
        },
        {
            text: 'Day2',
            dataIndex: 'day2'
        },
        {
            text: 'Day3',
            dataIndex: 'day3'
        },
        {
            text: 'Day4',
            dataIndex: 'day4'
        },
        {
            text: 'Day5',
            dataIndex: 'day5'
        },
        {
            text: 'Day6',
            dataIndex: 'day6'
        },
        {
            text: 'Day7',
            dataIndex: 'day7'
        }, 
        {
            text: 'Approval',
            dataIndex: 'approvedOn', // Date field
            flex: 1,
            renderer: function(value) {
                if (value) {
                    return '<span class="x-fa fa-lock approved-icon" style="color: green;"></span>';
                } else {
                    return '<span class="x-fa fa-edit edit-icon" style="color: blue; cursor: pointer;"></span>';
                }
            },
            cell: {
                encodeHtml: false, // Ensures the HTML renders correctly
            }
        }
    
    ],
    items: [{
        xtype: 'toolbar',
        docked: 'top',
        layout: {
            type: 'hbox',
            align: 'left'
        },
        items: [{
            text: 'Filter',
            iconCls: 'x-fa fa-filter',
            xtype: 'button',
            reference: 'ShowFilters',
            menu: {
                listeners: {
                    beforeShow: 'onShowFilters',
                    beforeHide: 'onHideFilters'
                },
                items: [{
                    text: 'All Filter',
                    reference: 'allFilter',
                    checked: true,
                    checkHandler: 'handleAllFilters'
                }]
            }
        },{
            xtype: 'button',
            align: 'right',
            text: 'Create Timesheet',
            ui: 'action',
            handler: 'onCreateTimesheetButtonClick'
        }]
    }]
});
