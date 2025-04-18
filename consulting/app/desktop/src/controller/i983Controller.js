Ext.define('Consulting.desktop.src.controller.i983Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.i983Controller',

    init: function() {
        this.listen({
            controller: {
                '*': {
                    Eventi983previous: this.onPrevious,
            eventi983attachSaveNext: 'onSubmitButtonClick'
                }
            }
        });
    },
    onDownloadI983: function() {
        var vm = this.getViewModel();
      /*  var recordId = vm.get('recordId');
        
        if (!recordId) {
            Ext.Msg.alert('Error', 'No form available to download');
            return;
        }*/
    
       
        var link = document.createElement('a');
        link.href = 'http://localhost:8080/api/geti983Attachment/21' ;
        link.download = 'i983Form.pdf'; // Suggest a filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Fallback Solution 2: If Solution 1 doesn't work
        setTimeout(function() {
            window.open('http://localhost:8080/api/geti983Attachment/' + recordId, '_blank');
        }, 200);
    },
    onDownloadI9: function() {
        var vm = this.getViewModel();
        var recordId = vm.get('recordId');
        
        if (!recordId) {
            Ext.Msg.alert('Error', 'No form available to download');
            return;
        }
    
       
        var link = document.createElement('a');
        link.href = 'http://localhost:8080/api/geti9Attachment/' + recordId;
        link.download = 'i983Form.pdf'; // Suggest a filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Fallback Solution 2: If Solution 1 doesn't work
        setTimeout(function() {
            window.open('http://localhost:8080/api/geti9Attachment/' + recordId, '_blank');
        }, 200);
    },
    onAfterRender: function(panel) {
        debugger;
        var vm = panel.getViewModel();
        var store = vm.getStore('personStore');
    
        // Check if the store is already loaded
        if (store.getCount() > 0) {
            var record = store.getAt(0);
            vm.set({
                'person': record.getData(),
                'recordId': record.get('id') // Set the recordId from the record
            });
        } else {
            // Load data from the store
            store.load({
                callback: function(records, operation, success) {
                    if (success && records.length > 0) {
                        var record = records[0];
                        vm.set({
                            'person': record.getData(),
                            'recordId': record.get('id') // Set the recordId from the record
                        });
                    } else {
                        Ext.Msg.alert('Error', 'Failed to load form data.');
                    }
                }
            });
        }
    }, 
    savei983Form: function() {
        var form = this.getView();
        var me = this;
        var vm = this.getViewModel();
        var id = vm.get("id") || 0; // Default to 0 if id is null or undefined
    
        console.log("Payload ID before submission:", id);
        debugger;
      
    
        form.submit({
            url: 'http://localhost:8080/api/save983FormForLoggedInEmployee', // API endpoint
            method: 'POST',
            params: {
                id:id, // Include the ID in the params
               // Pass the refined payload
            },
            success: function (form, action) {
                debugger;
                var responseData;
        try {
            responseData = Ext.decode(action.response.responseText);
        } catch (e) {
            console.error("JSON Parse Error:", e, action.response.responseText);
            Ext.Msg.alert('Error', 'Invalid JSON response from server.');
            return;
        }

        if (!responseData || !responseData.id) {
            Ext.Msg.alert('Error', 'No ID returned from server.');
            console.error('Unexpected Response Data:', responseData);
            return;
        }

        // ✅ Set recordId from response
        vm.set("recordId", responseData.id);

        // ✅ If using record object, set it like this
        var record = form.getRecord();
        if (record) {
            record.set("id", responseData.id);
            vm.set("recordId", record.data.id);  // Setting it explicitly from record
        }

        Ext.Msg.alert('Success', 'Form saved successfully with ID: ' + responseData.id);
        me.fireEvent('saveFormSuccess');
        me.fireEvent('eventRecordIdUpdated', vm.get("recordId"));
     },
            
            failure: function (response) {
                debugger;
                me.fireEvent('saveFormSuccess');
                var responseData;
                try {
                    responseData = Ext.decode(action.response.responseText);
                } catch (e) {
                    console.error("JSON Parse Error:", e, action.response.responseText);
                    Ext.Msg.alert('Error', 'Invalid JSON response from server.');
                    return;
                }
        
                if (!responseData || !responseData.id) {
                    Ext.Msg.alert('Error', 'No ID returned from server.');
                    console.error('Unexpected Response Data:', responseData);
                    return;
                }
        
                // ✅ Set recordId from response
                vm.set("recordId", responseData.id);
                    Ext.Msg.alert('Success', 'Form saved successfully with ID: ' + responseData.id);
                  
                    me.fireEvent('eventRecordIdUpdated', vm.get("recordId"));
               
            }
            
            
        });
    },
    
    onPrevious: function(panel) {
        var me =this;
        console.log('Previous button clicked on Passport Details panel');
        debugger;
        me.fireEvent('onPreviousEvent');
     },
   


    onSubmitButtonClick: function() {
       
        var form = this.getView();
        if (form.isValid()) {
            this.savei983Form();
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct the errors in the form before submitting.');
        }
    },
   
    

    onGenerateI983ButtonClick: function() {
        debugger;
        var vm = this.getViewModel();
        var me = this; // Store reference to the current context
        var email = 'mellamarthy1@gmail.com'; // Replace with dynamic value if needed
        var employeeId = vm.get("recordId"); ; // Get this from your application context
        var recordId = 21;
        Ext.Ajax.request({
            url: 'http://localhost:8080/api/updateI983-pdf',
            method: 'POST',
            params: { email: email },
            binary: true,
            
            success: function(response) {
                var bytes = response.responseBytes;
                var blob = new Blob([bytes], { type: 'application/pdf' });
               
                var formData = new FormData();
                formData.append('file', blob, 'I9_Form.pdf');
                
        
            },
            
            failure: function(response) {
                Ext.Msg.alert('Error', 'Failed to generate PDF: ' + response.status);
            },
            scope: me // Preserve the context
        });
    },
    onGenerateI9: function() {
        debugger;
        var me = this;
        var view = this.getView();
        var vm = me.getViewModel();
        var recordId = 4;
        
        if (!recordId) {
            Ext.Msg.alert('Error', 'No employee record ID found. Please save the form first.');
            return;
        }
    
        // Get email from the person data
       var personData = vm.get('person');
        //var email = personData.email; // Make sure your person model has an email field
        var email='mellamarthy1@gmail.com';
        if (!email) {
            Ext.Msg.alert('Error', 'Employee email not found');
            return;
        }
    
        Ext.Ajax.request({
            url: 'http://localhost:8080/api/updateI9-pdf',
            method: 'POST',
           params: { email: email },
            binary: true,
            
            success: function(response) {
                var bytes = response.responseBytes;
                var blob = new Blob([bytes], { type: 'application/pdf' });
              
             
                var formData = new FormData();
                formData.append('file', blob, 'I9_Form.pdf');
                
                Ext.Ajax.request({
                    url: 'http://localhost:8080/api/savei9Attachment/' + recordId,
                    method: 'POST',
                    rawData: formData,
                    headers: { 'Content-Type': undefined }, // Let browser set content-type
                    success: function() { 
                        Ext.Msg.alert('Success', 'I-9 form saved successfully!'); 
                    },
                    failure: function(response) {
                        Ext.Msg.alert('Error', 'Failed to save I-9 form: ' + response.statusText);
                    }
                    
                });
                Ext.Ajax.request({
                    url: '/api/deleteTempPdf',
                    method: 'POST',
                    params: { 
                        filePath: 'C:\\Users\\hr\\Documents\\i9Form.pdf' // Or use the variable filePath if you have it
                    },
                    success: function(response) {
                        Ext.Msg.hide();
                        var result = Ext.decode(response.responseText);
                        if (result.status === 'success') {
                            Ext.Msg.alert('Success', 'I-9 form processed successfully!');
                        } else {
                            Ext.Msg.alert('Warning', 'I-9 form saved but temporary file could not be deleted: ' + result.message);
                        }
                    },
                    failure: function(response) {
                        Ext.Msg.hide();
                        Ext.Msg.alert('Warning', 'I-9 form saved but temporary file could not be deleted. Server error: ' + response.statusText);
                    }
                });
            },
            
            failure: function(response) {
                Ext.Msg.alert('Error', 'Failed to generate PDF: ' + response.status);
                Ext.Ajax.request({
                    url: '/api/deleteTempPdf',
                    method: 'POST',
                    params: { filePath: result.filePath },
                    success: function() {
                        Ext.Msg.hide();
                        Ext.Msg.alert('Success', 'I-9 form processed successfully!');
                    },
                    failure: function() {
                        Ext.Msg.hide();
                        Ext.Msg.alert('Warning', 
                            'I-9 form saved but temporary file could not be deleted');
                    }
                });
            },
            scope: me // Preserve the context
        });
    },
    onI983FileClick: function() {
        var record = this.getSelectedRecord(); // Get the selected record
        if (!record) {
            Ext.Msg.alert('Error', 'No file selected');
            return;
        }
    
        var fileId = record.get('id');
        var fileUrl = 'http://localhost:8080/api/geti983Attachment/' + fileId;
        
        // Debug output
        console.log('Attempting to download:', fileUrl);
        
        // Download logic
        var link = document.createElement('a');
        link.href = fileUrl;
        link.download = record.get('fileName') || 'i983_form.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
onI9FileClick: function() {
    var record = this.getSelectedRecord(); // Get the selected record
    if (!record) {
        Ext.Msg.alert('Error', 'No file selected');
        return;
    }

    var fileId = record.get('id');
    var fileUrl = 'http://localhost:8080/api/geti9Attachment/' + fileId;
    
    // Debug output
    console.log('Attempting to download:', fileUrl);
    
    // Download logic
    var link = document.createElement('a');
    link.href = fileUrl;
    link.download = record.get('fileName') || 'i9_form.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
});