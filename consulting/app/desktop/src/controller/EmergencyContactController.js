Ext.define('Consulting.desktop.src.controller.EmergencyContactController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.emergencycontact',

    init: function () {
        this.listen({
            controller: {
                '*': {
                    EventemergencyContactPrevious: this.onPrevious,
                    EventemergencyContactSaveNext: this.onSaveNext
                }
            }
        });
    },

    onAfterRender: function () {
        const viewModel = this.getViewModel();
        const personStore = viewModel.getStore('personStore');
        if (personStore) {
            personStore.load({
                callback: function (records) {
                    if (records.length > 0) {
                        // Assuming the API returns two records for the two panels
                        viewModel.set('person1', records[0].getData());
                        viewModel.set('person2', records[1].getData());
                    }
                }
            });
        } else {
            console.error('Person store is not available.');
        }
    },

    onSavePanel1Click: function () {
        const panel1 = this.getView().down('#panel1'); // Get the first panel
        this.saveCurrentSection(panel1, 'person1');
    },

    onSavePanel2Click: function () {
        const panel2 = this.getView().down('#panel2'); // Get the second panel
        this.saveCurrentSection(panel2, 'person2');
    },

    onCancelPanel1Click: function () {
        const panel1 = this.getView().down('#panel1'); // Get the first panel
        panel1.reset(); // Reset the form in Panel 1
    },

    onCancelPanel2Click: function () {
        const panel2 = this.getView().down('#panel2'); // Get the second panel
        panel2.reset(); // Reset the form in Panel 2
    },
 
   saveCurrentSection: function(panel, personBinding) {
        debugger;
  const me = this;
        const viewModel = this.getViewModel();
        const personData = viewModel.get(personBinding); // Get data from ViewModel
        Object.keys(personData).forEach(key => {
            if (personData[key] == null) personData[key] = "";
        });
    
        // Log personData to check if it's populated correctly
        console.log("personData before submission:", personData);
    
        if (panel.isValid()) {
            // Check if required fields (e.g., employeeId) are set
            const form = panel;
            form.setValues(personData);
    
          
            form.submit({
                url: 'http://localhost:8080/api/saveEmergencyContactForLoggedInEmployee', // Server URL
                method: 'POST',
                jsonData: personData,
                success: function(response, opts) {
                    const responseData = Ext.decode(response.responseText); // Parse JSON response
                    
                    // Check if the server returned an ID or any other useful data
                    if (responseData && responseData.id) {
                        Ext.Msg.alert('Success', 'Form submitted successfully!');
                        me.collapseAndExpandPanels(); // Collapse current panel and expand the next one
                    } else {
                        Ext.Msg.alert('Error', 'Failed to submit form. ID not returned.');
                    }
                },
                failure: function(response, opts) {
                    const errorMessage = response.responseText || 'Form submission failed. Please try again.';
                    Ext.Msg.alert('Failed', errorMessage);
                }
            });
    
            // Collapse and expand panels after the submission request is triggered
            me.collapseAndExpandPanels();
        } else {
            Ext.Msg.alert('Error', 'Please fill all required fields.');
        }
    },
  
    collapseAndExpandPanels: function () {
        const panel1 = this.getView().down('#panel1'); // Get the first panel
        const panel2 = this.getView().down('#panel2'); // Get the second panel

        // Collapse the current panel and expand the next one
        if (panel1.isVisible() && !panel1.collapsed) {
            panel1.collapse();
            panel2.expand();
        } else if (panel2.isVisible() && !panel2.collapsed) {
           // panel2.collapse();
            // If there are more panels, expand the next one here
        }
    },

    onPrevious: function () {
        var me=this;
        console.log('Previous button clicked on Emergency Contact panel');
        me.fireEvent('onPreviousEvent');
    },

    onSaveNext: function () {
      
        var me=this;
        console.log('Save & Next button clicked on Emergency Contact panel');
        const panel1 = this.getView().down('#panel1'); // Get the first panel
        const panel2 = this.getView().down('#panel2'); // Get the second panel
       
        if (!panel1.collapsed) {
            this.saveCurrentSection(panel1, 'person1');
        } else  if (!panel2.collapsed)  {
            this.saveCurrentSection(panel2, 'person2'); 
            me.fireEvent('saveFormSuccess');}
    }
});