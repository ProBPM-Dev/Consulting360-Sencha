Ext.define('Consulting.desktop.src.controller.PersonalInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personalInfo',
    init: function() {
        this.listen({
            controller: {
                '*': {
                    EventpersonalInfoPrevious: this.onPrevious,
                    EventpersonalInfoSaveNext: this.onSaveNext
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


    onPrevious: function(panel) {
        console.log('Previous button clicked on Personal Info panel');
        
    },

    onSaveNext: function(panel) {
        console.log('Save & Next button clicked on Personal Info panel');
        if (panel.isValid()) {
           
            this.saveCurrentSection();
        } else {
            Ext.Msg.alert('Invalid Data', 'Please enter all mandate fields in the form before submitting.');
        }
    },

    saveCurrentSection: function() {
    var me =this;
        var form = this.getView();
        var currentPanel = this.getView().getActiveItem();
        form.submit({
            url: 'http://localhost:8080/api/saveLoggedInEmployee',
            method: 'POST',

            success: function(form, action) {
                Ext.Msg.alert('Success', 'Form submitted successfully!');
                me.fireEvent('saveFormSuccess');
            },
            failure: function(form, action) {
      
                Ext.Msg.alert('Failed', 'Form submission failed. Please try again.');
                me.fireEvent('saveFormSuccess');
            },
  
        });
    }
});