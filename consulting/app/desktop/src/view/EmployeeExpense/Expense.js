Ext.define('Consulting.desktop.src.view.EmployeeExpense.Expense', {
    extend: 'Ext.grid.Grid',
    alias: 'widget.Expense',
    requires: [
        'Ext.grid.Grid',
        'Consulting.desktop.src.controller.Expense',
        'Consulting.desktop.src.model.Expense.Expense',
        'Ext.grid.filters.*'
    ],
    controller: 'Expense',
    listeners: {
        childtap: 'onCellTap' // Use 'celltap' for cell clicks
    },
    viewModel: {
        data: {
            url: 'http://localhost:8080/api/getExpenseSheets/'
        },
        stores: {
            Expense: {
                model: 'Consulting.desktop.src.model.Expense.Expense',
                autoLoad: false,
                pageSize: 10,
                remoteSort: true,
                remoteFilter: true,
                proxy: {
                    type: 'rest',
                    url: 'http://localhost:8080/api/getExpenseSheets/',
                    reader: {
                        type: 'json',
                        rootProperty: 'content'
                    }
                },
                listeners: {
                    beforeload: 'onStoreBeforeLoad'
                }
            }
        }
    },
    bind:{
        title:'{selectedPO.name}',
        store:'{Expense}'
    },
    plugins: {
        gridfilters: true,
        pagingtoolbar: true
    },
    rowNumbers: true,
    columns: [
        {
            text: 'Expense Date',
            dataIndex: 'expenseDate',
            format: 'm-d-Y',
            xtype: 'datecolumn'
        },
        {
            text: 'Category',
            dataIndex: 'expenseCategory',
            renderer: function(value) {
                // Ensure 'value' is an object and has the 'name' property
                if (value && typeof value === 'object' && value.name) {
                    return value.name;
                }
                return 'N/A'; // Fallback if 'value' is not as expected
            }
        },
        {
            text: 'amount',
            dataIndex: 'amount'
        },
        {
            text: 'notes',
            dataIndex: 'notes'
        },
        {
            text: 'Attachment',
            dataIndex: 'empExpenseAttachments',
            flex: 1,
            renderer: function(value, metaData, record) {
                if (value && value.length > 0) {
                    var fileType = value[0].fileType;
                    if (fileType.startsWith('image/') || fileType === 'application/pdf' || fileType.startsWith('text/')) {
                        return '<span class="x-fa fa-download download-icon" style="color: #007bff; cursor: pointer;"></span>';
                    }
                }
                return 'No Attachment';
            },
            cell: {
                encodeHtml: false
            }
        },
        {
            text: 'Approval',
            dataIndex: 'approvedOn',
            flex: 1,
            renderer: function(value) {
                if (value) {
                    return '<span class="x-fa fa-lock approved-icon" style="color: green;"></span>';
                } else {
                    return '<span class="x-fa fa-edit edit-icon" style="color: blue; cursor: pointer;"></span>';
                }
            },
            cell: {
                encodeHtml: false
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
        }, {
            xtype: 'button',
            align: 'right',
            text: 'Create Expense',
            ui: 'action',
            handler: 'onCreateExpenseButtonClick'
        }]
    }]
});