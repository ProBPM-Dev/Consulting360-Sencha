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
     
      this.onWorkAuthChange(combo, newValue); // Trigger the change function
    },
    onWorkAuthChange: function(combo, newValue) {
        var view = this.getView();
        var me=this;
        var refs = this.getReferences();
        refs.uscisNumberField.setHidden(true);
        refs.validFromField.setHidden(true);
        refs.validToField.setHidden(true);
        refs.attachDocField.setHidden(true);
        refs.i20Field.setHidden(true);
        refs.CPTdocField.setHidden(true);
        refs.jobDutiesField.setHidden(true);
        refs.sevisid.setHidden(true);
        refs.sevisschool.setHidden(true);
        refs.DSO.setHidden(true);
        refs.dateawarded.setHidden(true);    
        refs.CIP.setHidden(true);
        refs.EAD.setHidden(true);
        refs.I983.setHidden(true);
        refs.I9.setHidden(false);
        refs.StudentRole.setHidden(true);
        refs.Goals.setHidden(true);
        switch(newValue) {
            case 'h1b':
                refs.jobDutiesField.setHidden(false);
                refs.h1bdocField.setHidden(false);
                break;
            case 'cpt':
                refs.i20Field.setHidden(false);
                refs.CPTdocField.setHidden(false);
                break;
            case 'cap':
                refs.jobDutiesField.setHidden(false);
              //  refs.i94docField.setHidden(false);
                break;
            case 'i983 Master':
                debugger;
                me.fireEvent('saveFormSuccess');
            default:
                var showFields = ['opt', 'h4ead', 'gc', 'gcead'].includes(newValue);
                refs.uscisNumberField.setHidden(!showFields);
                refs.validFromField.setHidden(!showFields);
                refs.validToField.setHidden(!showFields);
                refs.attachDocField.setHidden(!showFields);
                break;
        }
    }


});