
Ext.define('Consulting.controller.i983AttachmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.i983attachment',

    config: {
        listen: {
            controller: {
                "*": {
  
                    eventi983Prev: 'onPrev',
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
        console.log('Previous button clicked on  panel');
        me.fireEvent('onPreviousEvent');
    },
    onSubmit: function() {
debugger;
        var form = this.getView();
        var me= this;
          if (form.isValid()) {
            var vm = this.getViewModel();
            var i983Id = vm.get("recordId"); 
            form.submit({
                url: 'http://localhost:8080/api/savei983Attachment/'+ i983Id,
                method: 'POST',

                success: function(form, action) {
                    debugger;
                    Ext.Msg.alert('Success', 'Form submitted successfully!');
          
                                       
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', 'Form submission failed. Please try again.');
          
                },
                
            });
        }}
});