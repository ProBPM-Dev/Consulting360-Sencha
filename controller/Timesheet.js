Ext.define('Consulting.desktop.src.controller.Timesheet', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Timesheet',


    config: {
        checkAll: true
    },

    onEdit:function(grid, info){
        debugger;
        this.fireEvent("eventEditTimeSheet", info.record);
    },
    
    onCreateTimesheetButtonClick: function (button) {
        var clientComboBox = Ext.ComponentQuery.query('combobox[label="Choose Client"]')[0];
        var clientTitle = clientComboBox ? clientComboBox.getValue() : null;

        if (!clientTitle) {
            Ext.Msg.alert('Error', 'Please select a client.');
            return;
        }
        console.log("firing event");
        this.fireEvent("eventCreateTimeSheet",clientTitle);
        return;
        // Make AJAX request to create a new timesheet
     /*   Ext.Ajax.request({
            url: 'http://localhost:8080/api/createTimeSheetforLoggedInEmployee/' + encodeURIComponent(clientTitle),
            method: 'POST',
            success: function (response) {
                var responseData = Ext.decode(response.responseText);

                if (!responseData || !responseData.employeeTimeLineItems || responseData.employeeTimeLineItems.length === 0) {
                    Ext.Msg.alert('Error', 'Failed to create timesheet.');
                    return;
                }

                // Fetch the newly created timesheet details
                var newTimesheet = responseData.employeeTimeLineItems[0];

                var eastPanel = Ext.ComponentQuery.query('#eastPanel')[0];
                if (eastPanel) {
                    if (eastPanel.collapsed) {
                        eastPanel.expand();
                    }

                    var fieldset = eastPanel.down('fieldset'); // Get the fieldset
                    if (fieldset) {
                        // Set values for each field in the fieldset
                        fieldset.down('datefield[name="startDate"]').setValue(new Date(newTimesheet.startDate));
                        fieldset.down('datefield[name="endDate"]').setValue(new Date(newTimesheet.endDate));
                        fieldset.down('textfield[name="day1"]').setValue(newTimesheet.day1 || 0);
                        fieldset.down('textfield[name="day2"]').setValue(newTimesheet.day2 || 0);
                        fieldset.down('textfield[name="day3"]').setValue(newTimesheet.day3 || 0);
                        fieldset.down('textfield[name="day4"]').setValue(newTimesheet.day4 || 0);
                        fieldset.down('textfield[name="day5"]').setValue(newTimesheet.day5 || 0);
                        fieldset.down('textfield[name="day6"]').setValue(newTimesheet.day6 || 0);
                        fieldset.down('textfield[name="day7"]').setValue(newTimesheet.day7 || 0);
                    }

                    // Reload the grid to reflect the new timesheet
                    var grid = this.getView().down('grid[reference="timesheetGrid"]');
                    if (grid) {
                        grid.getStore().reload();
                    }

                    Ext.Msg.alert('Success', 'Timesheet created and loaded.');
                } else {
                    Ext.Msg.alert('Error', 'East panel not found.');
                }
            }.bind(this), // Bind the context to the controller
            failure: function (response) {
                Ext.Msg.alert('Error', 'Failed to create timesheet.');
            }
        });*/
    },


    // To show all filters from activeFilter object and syncing grid data
    onShowFilters: function(menu) {
        var filterPlugin = this.getView().getPlugin('gridfilters') || {},
            filters = filterPlugin.getActiveFilter() || [],
            colMap = {},
            columns = this.getView().getColumns(),
            currColumn, i, j, currFilter, value, filterConfig, filterItem;

        // creating a colmap for mapping data index to name and xtype of column
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

    // This will return activeFilter after adding new filter
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

    // This will return activeFilter after removing filter
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

    // This will run when closing all-filter dropdown
    onHideFilters: function(menu) {
        var menuItems = menu.getItems(),
            k, allFilterItem;

        for (k = menuItems.length - 1; k > 1; k--) {
            menu.remove(menuItems.items[k]);
        }

        allFilterItem = this.lookupReference('allFilter');
        allFilterItem.setChecked(true);
    },

    // This will run when any individual item will get enable/disable
    toggleFilterItem: function(filterItem) {
        var me = filterItem,
            filterApply;

        if (me.getChecked()) {
            filterApply = this.addFilter(me.filterConfig);
        }
        else {
            filterApply = this.removeFilter(me.filterConfig);
        }

        // To sync all filter
        this.syncAllFIlters();

        // This would update activeFilter and sync grid data
        this.getView().getPlugin('gridfilters').setActiveFilter(filterApply);
    },

    // This will run all filter option enable/disable
    handleAllFilters: function(allFilterItem) {
        var isChecked = allFilterItem.getChecked(),
            i,
            filterButton = this.lookupReference('ShowFilters'),
            menuItems = filterButton.getMenu().getItems().items;

        if (isChecked) {
            this.setCheckAll(true);
        }

        if (this.getCheckAll()) {
            for (i = 2; i < menuItems.length; i++) {
                menuItems[i].setChecked(isChecked);
            }
        }
    },

    // This will run all filter option enable/disable
    syncAllFIlters: function() {
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
            }
            else {
                this.setCheckAll(true);
            }
        }

        allFilterItem.setChecked(isChecked);
    }
});