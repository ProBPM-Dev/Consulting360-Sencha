
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
    var fileField = form.down('filefield');
    var file = fileField.getFiles()[0];
    
    if (!file) {
        Ext.Msg.alert('Error', 'Please select a file.');
        return;
    }

    var formData = new FormData();
    formData.append('file', file);  // Must match @RequestParam("file")

    Ext.Ajax.request({
        url: 'http://localhost:8080/api/saveTSAttachment/9',
        method: 'POST',
        rawData: formData,
        headers: {
            'Content-Type': undefined  // Let browser set multipart boundary
        },
        options: {
            contentType: false  // Prevent ExtJS from overriding
        },
        success: function() {
            Ext.Msg.alert('Success', 'File uploaded!');
        },
        failure: function(res) {
            Ext.Msg.alert('Error', 'Upload failed: ' + res.statusText);
        }
    });
}
});