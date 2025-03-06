
Ext.define('Consulting.controller.TimesheetAttachmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.timesheetattachment',

    config: {
        listen: {
            controller: {
                "*": {
  
                    eventtimesheetPrev: 'onPrev',
                     eventRecordIdUpdated: 'onRecordIdUpdated'
                }
            }
        }
    },
    onRecordIdUpdated: function(recordId) {
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

        var form = this.getView();
        var me= this;
          if (form.isValid()) {
            var vm = this.getViewModel();
            var timesheetId = vm.get("recordId"); 
            form.submit({
                url: 'http://localhost:8080/api/saveTSAttachment/' + timesheetId,
                method: 'POST',

                success: function(form, action) {
                    debugger;
                    Ext.Msg.alert('Success', 'Form submitted successfully!');
                    var containerPanel = form.up('timesheetattach'); // Find the parent container panel
                    if (containerPanel) {
                        containerPanel.setCollapsed(true); // Collapse the panel
                      /*  setTimeout(function() {
                            window.location.reload(); // Refresh the browser
                        }, 1000); */
                    } else {
                        console.error('TimesheetAttachmentContainer panel not found');
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