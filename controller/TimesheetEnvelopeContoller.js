Ext.define('Consulting.desktop.src.controller.TimesheetEnvelopeContoller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimesheetEnvelopeContoller',
    onPOSelection: function(combo, newValue) {
        var vm = this.getViewModel(); 
        vm.set("selectedPO", newValue.data);
        this.fireEvent("eventRefreshTimeSheetGrid",newValue.data);
    }
});