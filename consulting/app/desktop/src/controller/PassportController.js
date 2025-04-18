Ext.define('Consulting.desktop.src.controller.PassportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.passport',

    init: function() {
        this.listen({
            controller: {
                '*': {
                    EventpassportDetailsPrevious: this.onPrevious,
                    EventpassportDetailsSaveNext: this.onSaveNext
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
        console.log('Previous button clicked on Passport Details panel');
        me.fireEvent('onPreviousEvent');
     },

    onSaveNext: function(panel) {
        console.log('Save & Next button clicked on Passport Details panel');
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
            url: 'http://localhost:8080/api/saveLoggedInEmployeePassportInfo', // Update the URL for Passport Info
            method: 'POST',
            success: function(form, action) {
                Ext.Msg.alert('Success', 'Form submitted successfully!');
                me.fireEvent('saveFormSuccess');
             },
            failure: function(form, action) {
                var response = action.response;
                me.fireEvent('saveFormSuccess');
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
    }
});