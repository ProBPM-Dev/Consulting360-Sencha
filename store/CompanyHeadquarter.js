Ext.define('Consulting.desktop.src.store.CompanyHeadquarter', {
    extend: 'Ext.data.Store',
    alias: 'store.CompanyHeadquarter',
    storeId: 'CompanyHeadquarter',
    
    fields: ['id', 'is_active','address_line1','address_line2' ,'city' ,'ein','maddress_line1' ,'maddress_line2' ,'mcity' ,'mstate','mzip' ,'name','state' ,'url',  'zip'],  // Define fields as per your API response
    
    proxy: {
        type: 'ajax',
        url: 'http://localhost:8080/api/empCompanyHeadQuarterInfo', // Your API endpoint
        reader: {
            type: 'json',
            transform: function(data) {
                return { data: Ext.isArray(data) ? data : [data] };
            },
            rootProperty: 'data'
        }
    },

    autoLoad: true,

    listeners: {
        load: function(store, records) {
            if (records.length > 0) {
                // Convert records to JSON and save to localStorage
                localStorage.setItem('staticData', Ext.encode(store.getData().items.map(r => r.getData())));
            }
        }
    }
});