Ext.define('Consulting.desktop.src.controller.Timesheet', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Timesheet',


    config: {
        checkAll: true,
        listen: {
            controller: {
                "*": {
                    eventRefreshTimeSheetGrid: 'onRefreshTimeSheetGrid'
                }
            }
        }
    },
 
    onCellTap: function(grid, location, eOpts) {
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
                this.fireEvent("eventEditTimeSheet", record, selectedPO);
            } else {
                console.log('Record is already approved or selectedPO is not defined.');
            }
        }
    },
    onRefreshTimeSheetGrid  :   function(selectedPO){
        
        this.getViewModel().set("selectedPO",selectedPO);
        this.getViewModel().getStore('timesheet').load();
    },
    onStoreBeforeLoad   :   function(store, operation, eOpts){
        var val = this.getViewModel().get("selectedPO");
        var url = this.getViewModel().get("url");
        store.getProxy().url = url + val.id;
    },
    onEdit:function(grid, info){
        var val = this.getViewModel().get("selectedPO");
        this.fireEvent("eventEditTimeSheet", info.record,val);
    },
    
    
    onCreateTimesheetButtonClick: function (button) {
        console.log("firing event");
        this.fireEvent("eventCreateTimeSheet",this.getViewModel().get("selectedPO"));
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