Ext.define('Consulting.desktop.src.controller.PersonalInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personalInfo',
    init: function() {
        this.listen({
            controller: {
                '*': {
                    personalInfoPrevious: this.onPrevious,
                    personalInfoSaveNext: this.onSaveNext
                }
            }
        });
    },

    onAfterRender: function () {
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
        }
    },

    onSaveNext: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    formatData: function (panel, values, options, e, eOpts) {
        if (values.dob) {
            values.dob = Ext.Date.format(values.dob, 'Y-m-d\\TH:i:s.000');
        }
    },

    onPrevious: function(panel) {
        console.log('Previous button clicked on Personal Info panel');
        // Add logic to handle the "Previous" action for the Personal Info panel
    },

    onSaveNext: function(panel) {
        console.log('Save & Next button clicked on Personal Info panel');
        if (panel.isValid()) {
           
            this.saveCurrentSection();
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct the errors in the form before submitting.');
        }
    },

    saveCurrentSection: function() {
        debugger;
        var form = this.getView();
        var mainContainer = this.getView().up('onboardingPanel'); // Traverse up to the MainContainer
        var mainController = mainContainer.getController(); // Get the OnboardingController

        form.submit({
            url: 'http://localhost:8080/api/saveLoggedInEmployee',
            method: 'POST',

            success: function(form, action) {
                Ext.Msg.alert('Success', 'Form submitted successfully!');
                mainController.showNext();
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', 'Form submission failed. Please try again.');
                mainController.showNext();
            },
  
        });
    }
});