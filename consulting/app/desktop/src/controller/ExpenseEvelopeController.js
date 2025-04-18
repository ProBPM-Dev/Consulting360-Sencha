Ext.define('Consulting.desktop.src.controller.ExpenseEnvelopeContoller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ExpenseEnvelopeContoller',
    init: function() {
        var me = this;

        var poTitleData = localStorage.getItem('POTitle');

        if (poTitleData) {

            var poTitles = Ext.decode(poTitleData);

            if (poTitles.length > 0) {               
 var firstRecord = poTitles[0];
                me.getViewModel().set('selectedPO', firstRecord);


                me.fireEvent("eventRefreshExpenseGrid", firstRecord);
            }
        }
    },
    onPOSelection: function(combo, newValue) {
        var vm = this.getViewModel(); 
        vm.set("selectedPO", newValue.data);
        this.fireEvent("eventRefreshExpenseGrid",newValue.data);
    }
});