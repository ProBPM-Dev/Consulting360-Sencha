Ext.define('Consulting.desktop.src.controller.WorkAuthorizationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workAuthorization',

    init: function() {
        this.listen({
            controller: {
                '*': {
                    EventworkAuthorizationPrevious: this.onPrevious,
                    EventworkAuthorizationSaveNext: this.onSaveNext
                }
            }
        });
    },
    onAfterRender: function () {
        //  debugger;
          const viewModel = this.getViewModel();
          const personStore = viewModel.getStore('personStore');
          if (personStore) {
              personStore.load({
                  callback: function(records) {
                      if (records.length > 0) {
                          viewModel.set('person', records[0].getData());
                      }
                  }
              });
          } else {
              console.error('Person store is not available.');
          }},
    onPrevious: function(panel) {
        var me =this;
        console.log('Previous button clicked on Work Authorization panel');
        me.fireEvent('onPreviousEvent');
        debugger;
      },

    onSaveNext: function(panel) {
        console.log('Save & Next button clicked on Work Authorization panel');
        if (panel.isValid()) {
            this.saveCurrentSection();
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct the errors in the form before submitting.');
        }
    },

    saveCurrentSection: function() {
        var form = this.getView();
       var me =this;
        form.submit({
            url: 'http://localhost:8080/api/saveLoggedInEmployeeWorkAuthInfo', // Update the URL for Work Authorization Info
            method: 'POST',
            success: function(form, action) {
                Ext.Msg.alert('Success', 'Form submitted successfully!');
                me.fireEvent('saveFormSuccess');
            },
            failure: function(form, action) {
                var response = action.response;
                if (response && response.responseText) {
                    try {
                        var jsonResponse = Ext.JSON.decode(response.responseText);
                        Ext.Msg.alert('Failed', jsonResponse.message || 'Form submission failed. Please try again.');
                    } catch (e) {
                        Ext.Msg.alert('Failed', 'Invalid server response. Please try again.');
                    }
                } else {
                    Ext.Msg.alert('Failed', 'Server is not reachable. Please try again.');
                }
            }
        });
    },
    onWorkAuthChangeBinding: function(newValue) {
        
        var combo = this.lookupReference('workAuthLookup'); // Get the combobox reference
     debugger;
      this.onWorkAuthChange(combo, newValue); // Trigger the change function
    },
    onWorkAuthChange: function(combo, newValue) {
        debugger;
        var refs = this.getReferences();
        refs.uscisNumberField.setHidden(true);
        refs.validFrom.setHidden(true);
        refs.validTo.setHidden(true);
        refs.jobDutiesField.setHidden(true);

        switch (newValue) {
            case 5: // H1B
                refs.jobDutiesField.setHidden(false);
                break;
            case 4: // CAP H1B
                refs.jobDutiesField.setHidden(false);
                break;
            case 2: // i983 Master
            this.saveCurrentSection();
                this.fireEvent('saveFormSuccess');
                break;
            default:
                var showFields = [1, 6, 7, 8].includes(newValue);
                refs.uscisNumberField.setHidden(!showFields);
                refs.validFrom.setHidden(!showFields);
                refs.validTo.setHidden(!showFields);
                break;
        }
    },


    onGenerateI9: function() {
        debugger;
        var me = this;
        var view = this.getView();
        var vm = me.getViewModel();
        var recordId = vm.get('id') || 3; // If 'id' is null, assign 0 as the default value

        
       
    
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
                    url: 'http://localhost:8080/api/savei9Attachment/1',// + recordId,
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

});