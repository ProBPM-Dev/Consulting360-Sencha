Ext.define('Consulting.desktop.src.controller.EmployeeExpense', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.expense',

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
