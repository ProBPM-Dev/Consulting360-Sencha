
Ext.define('Consulting.controller.ExpenseAttachmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.expenseattachment',

    config: {
        listen: {
            controller: {
                "*": {
  
                    eventexpensePrev: 'onPrev',
                     eventRecordIdUpdated: 'onRecordIdUpdated'
                }
            }
        }
    },
    onRecordIdUpdated: function(recordId) {
        debugger;
        var vm = this.getViewModel();
        vm.set("recordId", recordId); // Set the recordId in the ViewModel
        console.log('Record ID updated:', recordId);
    },
         
    onPrev: function(panel) {
        var me=this;
        console.log('Previous button clicked on Identity Info panel');
        me.fireEvent('onPreviousEvent');
    },
    onSubmit: function() {
debugger;
        var form = this.getView();
        var me= this;
          if (form.isValid()) {
            var vm = this.getViewModel();
            var expenseId = vm.get("recordId"); 
            form.submit({
                url: 'http://localhost:8080/api/saveExpenseAttachment/'+ expenseId,
                method: 'POST',

                success: function(form, action) {
                    debugger;
                    Ext.Msg.alert('Success', 'Form submitted successfully!');
                    var containerPanel = form.up('expenseattach'); // Find the parent container panel
                    if (containerPanel) {
                        containerPanel.setCollapsed(true); // Collapse the panel
                      /*  setTimeout(function() {
                            window.location.reload(); // Refresh the browser
                        }, 1000); */
                    } else {
                        console.error('ExpenseAttachmentContainer panel not found');
                    }
                                       
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', 'Form submission failed. Please try again.');
                    var panel = me.getView();
                    if (panel) {
                        if (panel.expanded) {
                            panel.setCollapsed(true); 
                           
                        }
                    }
                },
                
            });
        }}
});