Ext.define('Consulting.desktop.src.store.ExpenseCategory', {
    extend: 'Ext.data.Store',
    alias: 'store.ExpenseCategory',
    storeId: 'ExpenseCategory',
    
    fields: ['id', 'name', 'active'],  
    
    proxy: {
        type: 'ajax',
        url: 'http://localhost:8080/api/ExpenseCategoryTypes', 
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true,

    listeners: {
        load: function(store, records) {
            if (records.length > 0) {
                localStorage.setItem('staticData', Ext.encode(store.getData().items.map(r => r.getData())));
            }
        }
    }
});