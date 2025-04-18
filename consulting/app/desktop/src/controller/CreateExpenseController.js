Ext.define('Consulting.desktop.src.controller.CreateExpenseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.createExpense',
    config: {
        listen: {
            controller: {
                "*": {
                    eventCreateExpense: 'CreateExpense',
                    eventEditExpense:'editExpense',
                    eventexpenseattachSaveNext: 'onSaveAndNext'
                }
            }
        }
    },
 
    editExpense:function(record,po){
       debugger;
 
        var me=this;
        console.log(record);
        var vm = this.getViewModel();
        vm.set("po",po);
        vm.set('panelTitle','Edit TimeSheet for '+ po.name);
        vm.set("recordId",record.data.id);
        vm.set("expenseDate", record.get('expenseDate'));
        vm.set("amount", record.get('amount'));
        vm.set("notes", record.get('notes'));
        vm.set("category", record.get('category'));
        vm.set("openPanel",true);
        vm.set("submitBtnDisabled",false);
        var panel = vm.getView();

        if (panel) {
            if (panel.collapsed) {
                panel.expand();
            }
        }
        me.fireEvent('eventexpandpanel');
    },
    onBeforeExpand:function(panel){
        console.log(this.getViewModel().get("openPanel"));
        return this.getViewModel().get("openPanel");

    },
    onAfterRender: function(panel) {
        // Disable the collapse/expand functionality
        panel.setCollapsible(false);
    },
   

 

    CreateExpense: function(po) {
        debugger;
        var me= this;
        var vm = this.getViewModel();
           console.log("Event fired");
           this.getViewModel().set("po", po);
           vm.set("recordId", 0);
           me.fireEvent('eventexpandpanel');
   
    },
    onSaveAndNext: function (button) {
        debugger;
        var form = this.getView();
        var me = this;
        var vm = this.getViewModel();

     //   const formattedData = form.getFormattedData(); // Call getFormattedData

        // Log the formatted data for debugging
        //console.log('Formatted Data:', formattedData);
        if (form.isValid()) {
            var po = vm.get("po");
            form.submit({
                url: 'http://localhost:8080/api/saveExpenseSheetforLoggedInEmployee/' + po.id,
                method: 'POST',
               // jsonData: formattedData,
        
                success: function(form, action) {
                    var responseData = action.response.result;
                    if (!responseData) {
                        Ext.Msg.alert('Error', 'Failed to create timesheet.');
                        return;
                    }
                    vm.set("recordId", responseData.id);
                    Ext.Msg.alert('Success', 'Form saved successfully!');
                    me.fireEvent('saveFormSuccess');
                    me.fireEvent('eventRecordIdUpdated', vm.get("recordId"));
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', 'Form submission failed. Please try again.');
                    me.fireEvent('saveFormSuccess');
                    me.fireEvent('eventRecordIdUpdated', vm.get("recordId"));
                }
            });
        }
    }
});