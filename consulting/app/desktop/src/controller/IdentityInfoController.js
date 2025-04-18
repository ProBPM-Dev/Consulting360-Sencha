Ext.define('Consulting.desktop.src.controller.IdentityInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.identityInfo',

    init: function() {
        this.listen({
            controller: {
                '*': {
                    EventidentityInfoPrevious: this.onPrevious,
                    EventidentityInfoSaveNext: this.onSaveNext
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
        var me=this;
        console.log('Previous button clicked on Identity Info panel');
        me.fireEvent('onPreviousEvent');
    },

    onSaveNext: function(panel) {
        console.log('Save & Next button clicked on Identity Info panel');
        if (panel.isValid()) {
            this.saveCurrentSection();
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct the errors in the form before submitting.');
        }
    },

    saveCurrentSection: function() {
        var form = this.getView();
        var me=this;
   
        form.submit({
            url: 'http://localhost:8080/api/saveLoggedInEmployeeIdentityInfo',
            method: 'POST',
            success: function(form, action) {
                me.fireEvent('saveFormSuccess');
                Ext.Msg.alert('Success', 'Form submitted successfully!');
               // mainController.showNext();
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
    },
    onIdentityTypeChange: function(combo, newValue) {
      debugger;
        var identityNumberField = this.lookupReference('identityNumberField');
        if (identityNumberField) {
            if (newValue === 3) {
                identityNumberField.allowBlank = true;
                identityNumberField.setHidden(true);
            } else {
                identityNumberField.allowBlank = false;
                identityNumberField.setHidden(false);
            }
            identityNumberField.validate();
        }
    }
});