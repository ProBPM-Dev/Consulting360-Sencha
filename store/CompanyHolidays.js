Ext.define('Consulting.desktop.src.store.CompanyHolidays', {
    extend: 'Ext.data.Store',
    alias: 'store.CompanyHolidays',
    storeId: 'CompanyHolidays',
    
    fields: ['id', 'year', 'holidayName', 'holiday', 'active'],  
    
    proxy: {
        type: 'ajax',
        url: 'http://localhost:8080/api/empCompanyHolidaysInfo', 
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