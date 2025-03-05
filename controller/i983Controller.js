Ext.define('Consulting.desktop.src.controller.i983Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.i983Controller',

    init: function() {
        this.listen({
            controller: {
                '*': {
                    Eventi983previous: this.onPrevious,
           
                }
            }
        });
    },
    onPrevious: function(panel) {
        var me =this;
        console.log('Previous button clicked on Passport Details panel');
        debugger;
        me.fireEvent('onPreviousEvent');
     },
    onAfterRender: function() {
        console.log('onAfterRender called');
        const viewModel = this.getViewModel();
        console.log('ViewModel:', viewModel);
    
        const personStore = viewModel.getStore('personStore');
        console.log('Person Store:', personStore);
    
        if (personStore) {
            personStore.load({
                callback: function(records) {
                    console.log('Records loaded:', records);
                    if (records.length > 0) {
                        viewModel.set('person', records[0].getData());
                    }
                }
            });
        } else {
            console.error('Person store is not available.');
        }
    },


    onSubmitButtonClick: function() {
        var form = this.getView();
        if (form.isValid()) {
            this.savei983Form();
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct the errors in the form before submitting.');
        }
    },

    savei983Form: function() {
        var form = this.getView();
        form.submit({
            url: 'http://localhost:8080/api/saveLoggedInEmployeeWorkAuthInfo', // Update the URL for i983 form submission
            method: 'POST',
            success: function(form, action) {
                Ext.Msg.alert('Success', 'i983 Form submitted successfully!');
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

    onGenerateI983ButtonClick: function() {
        var email = 'mellamarthy1@gmail.com';
        Ext.Ajax.request({
            url: 'http://localhost:8080/api/updateI983-pdf',
            method: 'POST',
            params: {
                email: email
            },
            success: function(response) {
                Ext.Msg.alert('Success', response.responseText);
            },
            failure: function() {
                Ext.Msg.alert('Failure', 'Failed to update PDF.');
            }
        });
    }
});