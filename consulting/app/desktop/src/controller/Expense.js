Ext.define('Consulting.desktop.src.controller.Expense', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Expense',
    config: {
        checkAll: true,
        listen: {
            controller: {
                "*": {
                    eventRefreshExpenseGrid: 'onRefreshExpenseGrid',
                
                }
            }
        }
    },
    showFilePopup: function(attachmentId, fileName, fileType) {
        var fileUrl = 'http://localhost:8080/api/getExpenseAttachment/' + attachmentId;
    
        // Create the popup window
        var popup = Ext.create('Ext.Window', {
            title: fileName,
            width: 800,
            height: 600,
            layout: 'fit',
            modal: true,
            closable: true,
            closeAction: 'hide',
            tbar: [
                {
                    text: 'Download',
                    iconCls: 'x-fa fa-download',
                    handler: function() {
                        // Trigger file download
                        var link = document.createElement('a');
                        link.href = fileUrl;
                        link.download = fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                },
                '->', // Spacer
                {
                    text: 'Close',
                    iconCls: 'x-fa fa-times',
                    handler: function() {
                        popup.close();
                    }
                }
            ],
            items: [] // Placeholder for PDF viewer
        });
    
        // Create a container for the PDF viewer
        var pdfContainer = Ext.create('Ext.Component', {
            reference: 'pdfViewerContainer', // Use a reference instead of an ID
            autoEl: {
                tag: 'div',
                style: 'width: 100%; height: 100%; overflow: auto;'
            }
        });
    
        // Add the container to the popup
        popup.add(pdfContainer);
    
        // Show the popup
        popup.show();
    
        // Ensure the popup and its components are rendered before accessing them
        popup.on('afterrender', function() {
            // Access the PDF container using the reference
            var container = popup.lookupReference('pdfViewerContainer');
            if (!container) {
                Ext.Msg.alert('Error', 'PDF viewer container not found');
                return;
            }
    
            // Fetch the PDF file using the Fetch API
            fetch(fileUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch PDF: ' + response.statusText);
                    }
                    return response.arrayBuffer(); // Get the binary data as ArrayBuffer
                })
                .then(arrayBuffer => {
                    // Convert ArrayBuffer to Uint8Array for PDF.js
                    var pdfData = new Uint8Array(arrayBuffer);
    
                    // Load the PDF using PDF.js
                    pdfjsLib.getDocument({ data: pdfData }).promise.then(function(pdf) {
                        var containerEl = container.getEl().dom;
    
                        // Render each page of the PDF
                        for (var pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                            pdf.getPage(pageNum).then(function(page) {
                                var scale = 1.5;
                                var viewport = page.getViewport({ scale: scale });
    
                                // Create a canvas for the page
                                var canvas = document.createElement('canvas');
                                var context = canvas.getContext('2d');
                                canvas.height = viewport.height;
                                canvas.width = viewport.width;
    
                                // Append the canvas to the container
                                containerEl.appendChild(canvas);
    
                                // Render the page onto the canvas
                                var renderContext = {
                                    canvasContext: context,
                                    viewport: viewport
                                };
                                page.render(renderContext);
                            });
                        }
                    }).catch(function(error) {
                        Ext.Msg.alert('Error', 'Failed to load PDF: ' + error.message);
                    });
                })
                .catch(error => {
                    Ext.Msg.alert('Error', 'Failed to fetch PDF: ' + error.message);
                });
        });
    },
    onRefreshExpenseGrid  :   function(selectedPO){
     
        this.getViewModel().set("selectedPO",selectedPO);
        this.getViewModel().getStore('Expense').load();
    },
    onCreateExpenseButtonClick: function (button) {
        console.log("firing event");
        this.fireEvent("eventCreateExpense",this.getViewModel().get("selectedPO"));
    },
    onStoreBeforeLoad   :   function(store, operation, eOpts){
      
        var val = this.getViewModel().get("selectedPO");
        var url = this.getViewModel().get("url");
        store.getProxy().url = url + val.id;
    },
    onEdit:function(grid, info){
        debugger;
        var val = this.getViewModel().get("selectedPO");
        this.fireEvent("eventEditExpense", info.record,val);
    },
    onCellTap: function(grid, location, eOpts) {
        debugger;
        var target = location.event.target; // Get the clicked element
        var record = location.record; // Get the record associated with the clicked row
        var column = location.column; // Get the column associated with the clicked cell
    
        // Check if the clicked element is the edit icon
        if (target && target.classList.contains('edit-icon')) {
            console.log('Edit icon clicked:', {
                record: record.getData(),
                column: column.getText(),
                value: record.get(column.dataIndex)
            });
    
            // Get the selectedPO from the ViewModel
            var selectedPO = this.getViewModel().get("selectedPO");
    
            // Ensure the record is not approved and selectedPO is defined
            if (!record.get('approvedOn') && selectedPO) {
                console.log('Firing eventEditTimeSheet...');
                this.fireEvent("eventEditExpense", record, selectedPO);
            } else {
                console.log('Record is already approved or selectedPO is not defined.');
            }
        }
    
        // Check if the clicked element is the download icon in the "Attachment" column
        if (target && target.classList.contains('download-icon')) {
            console.log('Download icon clicked:', {
                record: record.getData(),
                column: column.getText(),
                value: record.get(column.dataIndex)
            });
    
            // Get the empTimeAttachments array from the record
            var attachments = record.get('empExpenseAttachments');
            if (attachments && attachments.length > 0) {
                // Use the first attachment's details
                var attachment = attachments[0];
                var attachmentId = attachment.id;
                var fileName = attachment.fileName;
                var fileType = attachment.fileType;
    
                // Show the file in a popup
                this.showFilePopup(attachmentId, fileName, fileType);
            } else {
                Ext.Msg.alert('Info', 'No attachment available for this timesheet.');
            }
        }
    },
    onShowFilters: function(menu) {
        var filterPlugin = this.getView().getPlugin('gridfilters') || {},
            filters = filterPlugin.getActiveFilter() || [],
            colMap = {},
            columns = this.getView().getColumns(),
            currColumn, i, j, currFilter, value, filterConfig, filterItem;

        for (i = 1; i < columns.length; i++) {
            currColumn = columns[i];
            colMap[currColumn.getDataIndex()] = {
                name: currColumn.getText(),
                xtype: currColumn.xtype
            };
        }
        for (j in filters) {
            currFilter = filters[j];
            value = currFilter.value;

            if (currFilter.property) {
                filterConfig = {
                    operator: currFilter.operator,
                    property: currFilter.property,
                    value: currFilter.value
                };

                if (colMap[currFilter.property].xtype === 'datecolumn') {
                    value = Ext.Date.format(new Date(value), 'd-m-Y');
                }

                filterItem = menu.add({
                    text: colMap[currFilter.property].name + ": " +
                        currFilter.operator + " " + value,
                    checked: true,
                    filterConfig: filterConfig
                });
                filterItem.setCheckHandler(this.toggleFilterItem.bind(this));
            }
        }
    },

    addFilter: function(currFilter) {
        var count = true,
            inCurrFilter, j,
            filterPlugin = this.getView().getPlugin('gridfilters') || {},
            inFilters = Ext.clone(filterPlugin.getActiveFilter() || []);

        for (j in inFilters) {
            inCurrFilter = inFilters[j];

            if (inCurrFilter.property === currFilter.property &&
                inCurrFilter.value === currFilter.value &&
                inCurrFilter.operator === currFilter.operator) {
                count = false;
            }
        }

        if (count) {
            inFilters.push(currFilter);
        }

        return inFilters;
    },

    removeFilter: function(currFilter) {
        var filters = [],
            inCurrFilter, j,
            inFilters = this.getView().getPlugin('gridfilters').getActiveFilter();

        for (j in inFilters) {
            inCurrFilter = inFilters[j];

            if (!(currFilter.property === inCurrFilter.property &&
                currFilter.operator === inCurrFilter.operator &&
                currFilter.value === inCurrFilter.value)) {
                filters.push(inCurrFilter);
            }
        }

        return filters;
    },

    onHideFilters: function(menu) {
        var menuItems = menu.getItems(),
            k, allFilterItem;

        for (k = menuItems.length - 1; k > 1; k--) {
            menu.remove(menuItems.items[k]);
        }

        allFilterItem = this.lookupReference('allFilter');
        allFilterItem.setChecked(true);
    },

    toggleFilterItem: function(filterItem) {
        var me = filterItem,
            filterApply;

        if (me.getChecked()) {
            filterApply = this.addFilter(me.filterConfig);
        } else {
            filterApply = this.removeFilter(me.filterConfig);
        }

        this.syncAllFilters();

        this.getView().getPlugin('gridfilters').setActiveFilter(filterApply);
    },

    syncAllFilters: function() {
        var allFilterItem = this.lookupReference('allFilter'),
            isChecked = true,
            i,
            filterButton = this.lookupReference('ShowFilters'),
            menuItems = filterButton.getMenu().getItems().items;

        for (i = 2; i < menuItems.length; i++) {
            if (!menuItems[i].getChecked()) {
                isChecked = false;
                this.setCheckAll(false);
                break;
            } else {
                this.setCheckAll(true);
            }
        }
        allFilterItem.setChecked(isChecked);
    },

    handleAllFilters: function(allFilterItem) {
        var isChecked = allFilterItem.getChecked(),
            i,
            filterButton = this.lookupReference('ShowFilters'),
            menuItems = filterButton.getMenu().getItems().items,
            filters = [];

        if (isChecked) {
            for (i = 2; i < menuItems.length; i++) {
                filters.push(menuItems[i].filterConfig);
            }
        }
        this.getView().getPlugin('gridfilters').setActiveFilter(filters);
    },

    onShowExpensePanel: function() {
        // Get a reference to the east panel
        var eastPanel = this.getView().up('mainview').down('eastpanel'); // Use 'mainview' instead of 'viewport'

        if (eastPanel) {
            // Enable the panel if it's disabled
            eastPanel.setDisabled(false);

            // Expand the panel if it's collapsed
            if (eastPanel.collapsed) {
                eastPanel.setCollapsed(false);
            }

            // Bring the panel into focus
            eastPanel.show();
        } else {
            Ext.Msg.alert('Error', 'Expense Panel not found.');
        }
    },

    onSubmitExpense: function() {
        // Handle form submission logic here
        var form = this.getView().up('mainview').down('eastpanel').getForm(); // Use 'mainview' instead of 'viewport'
        if (form.isValid()) {
            Ext.Msg.alert('Success', 'Expense submitted successfully.');
        } else {
            Ext.Msg.alert('Error', 'Please fill out all required fields.');
        }
    },
});
