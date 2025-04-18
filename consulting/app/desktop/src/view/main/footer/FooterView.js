Ext.define('Consulting.view.main.footer.FooterView', {
    extend: 'Ext.Toolbar',
    xtype: 'footerview',
    cls: 'footerview',

    requires: [
        'Consulting.desktop.src.store.CompanyHeadquarter'
    ],

    viewModel: {
        data: {
            companyName: 'Loading...',
            address: 'Loading...'
        },
        stores: {
            companyHeadquarter: {
                type: 'CompanyHeadquarter',
                autoLoad: true
            }
        }
    },

    listeners: {
        initialize: function () {
            let vm = this.getViewModel();
            let store = vm.getStore('companyHeadquarter');

            store.load({
                callback: function (records) {
                    if (records.length > 0) {
                        let record = records[0];
                        vm.set('companyName', record.get('name'));
                        vm.set('address', record.get('addressLine1') + ', ' + record.get('city') + ', ' + record.get('state') + ' ' + record.get('zip'));
                    } else {
                        console.warn('No company data found');
                    }
                }
            });
        }
    },

    layout: {
        type: 'hbox', 
        align: 'center'
    },

    items: [
        { 
            xtype: 'container',
            cls: 'footerviewtext',
            flex: 1, 
            bind: {
                html: '{companyName},{address}'
            }
        },
      /*  { 
            xtype: 'container',
            cls: 'footerviewtext',
            flex: 1, 
            style: 'text-align: right;',
            bind: {
                html: '{address}'
            }
        }*/
    ]
});
