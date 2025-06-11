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
onSaveAndNext: function(button) {
    var form = this.getView();
    var vm = this.getViewModel();
    var values = form.getValues();
var me=this;
    // Convert expenseDate to milliseconds
    if (values.expenseDate) {
        var ts = Number(values.expenseDate);
        if (ts.toString().length === 10) {
            values.expenseDate = ts * 1000;
        } else {
            values.expenseDate = new Date(values.expenseDate).getTime();
        }
    }

    if (form.isValid()) {
        form.submit({
            url: 'http://localhost:8080/api/saveExpenseSheetforLoggedInEmployee/' + vm.get("po").id,
            method: 'POST',
            params: {
                id: values.id || 0,
                expenseDate: values.expenseDate,
                amount: values.amount,
                notes: values.notes || "",
                "expenseCategory.id": values["expenseCategory.id"] || values.expenseCategory?.id || 0
            },
            success: function(form, action) {
                var responseData = action.result || Ext.decode(action.response.responseText);
                if (!responseData || !responseData.id) {
                    Ext.Msg.alert('Error', 'Failed to save expense sheet. Invalid server response.');
                    return;
                }
                vm.set("recordId", responseData.id);
                Ext.Msg.alert('Success', 'Expense saved successfully!');
               me.fireEvent('saveFormSuccess');
                me.fireEvent('eventRecordIdUpdated', responseData.id);
            },
            failure: function(form, action) {
                var errorMsg = 'Failed to save expense sheet.';
                if (action.response && action.response.responseText) {
                    try {
                        var json = Ext.decode(action.response.responseText);
                        errorMsg = json.message || errorMsg;
                    } catch (e) {
                        errorMsg = action.response.responseText;
                    }
                }
              debugger;
              me.fireEvent('saveFormSuccess');
              me.fireEvent('eventRecordIdUpdated',vm.get("recordId"));
           
                Ext.Msg.alert('Error', errorMsg);
            }
        });
    } else {
        Ext.Msg.alert('Error', 'Please correct form errors before submitting.');
    }
}


});