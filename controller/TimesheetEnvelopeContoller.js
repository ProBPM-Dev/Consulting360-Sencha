Ext.define('Consulting.desktop.src.controller.TimesheetEnvelopeContoller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimesheetEnvelopeContoller',
    init: function() {
        var me = this;

        var poTitleData = localStorage.getItem('POTitle');

        if (poTitleData) {

            var poTitles = Ext.decode(poTitleData);

            if (poTitles.length > 0) {               
 var firstRecord = poTitles[0];
                me.getViewModel().set('selectedPO', firstRecord);


                me.fireEvent("eventRefreshTimeSheetGrid", firstRecord);
            }
        }
    },
    onPOSelection: function(combo, newValue) {
        var vm = this.getViewModel(); 
        vm.set("selectedPO", newValue.data);
        this.fireEvent("eventRefreshTimeSheetGrid",newValue.data);
    }
});