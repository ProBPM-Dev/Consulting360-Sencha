Ext.define('Consulting.desktop.src.store.POTitle', {
    extend: 'Ext.data.Store',
    alias: 'store.POTitle',
    storeId: 'POTitle',

    fields: ['id', 'name'], 

    proxy: {
        
        type: 'ajax',
        url: 'http://localhost:8080/api/getEmployeePOTitle', 
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
           // debugger;
            if (records.length > 0) {
                
                localStorage.setItem('POTitle', Ext.encode(store.getData().items.map(r => r.getData())));
            }
        }
    }
});