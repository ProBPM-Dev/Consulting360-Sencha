Ext.define('Consulting.desktop.src.controller.WorkAuthorizationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workAuthorization',

    init: function() {
        this.listen({
            controller: {
                '*': {
                    workAuthorizationPrevious: this.onPrevious,
                    workAuthorizationSaveNext: this.onSaveNext
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
        console.log('Previous button clicked on Work Authorization panel');
        var mainContainer = this.getView().up('onboardingPanel'); // Traverse up to the MainContainer
        var mainController = mainContainer.getController(); // Get the OnboardingController
        mainController.showPrevious(); 
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
        var mainContainer = this.getView().up('onboardingPanel'); // Traverse up to the MainContainer
        var mainController = mainContainer.getController(); // Get the OnboardingController

        form.submit({
            url: 'http://localhost:8080/api/saveLoggedInEmployeeWorkAuthInfo', // Update the URL for Work Authorization Info
            method: 'POST',
            success: function(form, action) {
                Ext.Msg.alert('Success', 'Form submitted successfully!');
                mainController.showNext(); // Call showNext in OnboardingController
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
    }
});