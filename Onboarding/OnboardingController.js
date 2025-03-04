Ext.define('Consulting.desktop.src.view.Onboarding.OnboardingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Onboarding',
    init: function() {
        console.log('Controller loaded');

        this.control({
            
            'button[action=updatePdf]': {
                
                click: this.updatePdf
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
        }
           // Check if the current page is the last one
           nextIndex= this.getView().getActiveItemIndex();
           if (nextIndex ===4) { // Assuming the last page is the 4th page
            debugger;
            var combo = this.lookupReference('workAuthLookup');
            var workauthname = this.getViewModel().get('person.workauthname');
            this.onWorkAuthChangeBinding(workauthname); // Trigger the binding function
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
    onIdentityTypeChange: function(combo, newValue) {
        var identityNumberField = this.lookupReference('identityNumberField');
        if (identityNumberField) {
            if (newValue === 'TA') {
                identityNumberField.allowBlank = true;
                identityNumberField.setHidden(true);
            } else {
                identityNumberField.allowBlank = false;
                identityNumberField.setHidden(false);
            }
            identityNumberField.validate();
        }
    },
    onWorkAuthChangeBinding: function(newValue) {
        var combo = this.lookupReference('workAuthLookup'); // Get the combobox reference
     
      this.onWorkAuthChange(combo, newValue); // Trigger the change function
    },
    onWorkAuthChange: function(combo, newValue) {
   
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
                refs.i94docField.setHidden(false);
                break;
            case 'i983 Master':
                refs.uscisNumberField.setHidden(false);
                refs.validFromField.setHidden(false);
                refs.validToField.setHidden(false);
                refs.attachDocField.setHidden(false);
                refs.sevisid.setHidden(false);
                refs.sevisschool.setHidden(false);
                refs.DSO.setHidden(false);
                refs.dateawarded.setHidden(false);    
                refs.CIP.setHidden(false);
                refs.EAD.setHidden(false);
                refs.I983.setHidden(false);
                refs.StudentRole.setHidden(false);
                refs.Goals.setHidden(false);
                refs.jobDutiesField.setHidden(false);
              
            default:
                var showFields = ['opt','i983 Master', 'h4ead', 'gc', 'gcead'].includes(newValue);
                refs.uscisNumberField.setHidden(!showFields);
                refs.validFromField.setHidden(!showFields);
                refs.validToField.setHidden(!showFields);
                refs.attachDocField.setHidden(!showFields);
                break;
        }
    },
    doCardNavigation: function (incr) {
        var me = this;
        var activeItem = this.getView().getActiveItem();
        var activeIndex = this.getView().getActiveItemIndex();
        var nextIndex = activeIndex + incr;
        var itemCount = this.getView().getItems().getCount();
        if (nextIndex >= 0 && nextIndex < itemCount) {
            if (activeItem.isValid()) {
                this.getView().setActiveItemIndex(nextIndex);
                me.getViewModel().set('isPrevDisabled', nextIndex === 0);
                me.getViewModel().set('isNextDisabled', nextIndex === itemCount - 2);
            } else {
                Ext.Msg.alert('Validation', 'Please fill out required fields before proceeding.');
            }

        }

     
    },
    showPrevious: function() {
        this.doCardNavigation(-1);
    },
    showNext: function() {
   
       
        this.doCardNavigation(1);
    },
    showReset: function() {
        this.getView().getActiveItem().reset();
    },
    saveCurrentSection: function () {
        var me = this;
        var formPanel = this.getView();
       var form = formPanel.getActiveItem();
      debugger;
    
        if (!form) {
            console.error("No active form found");
            return;
        }

        if (form.isValid()) {
            if (formPanel.items.indexOf(form) === 2) {
                me.showNext();
          
                }
            }},
    updatePdf: function() {
debugger;

        Ext.Ajax.request({
            url: 'http://localhost:8080/api/update-pdf',
            method: 'POST',
         
            success: function(response) {
                Ext.Msg.alert('Success', response.responseText);
            },
            failure: function() {
                Ext.Msg.alert('Failure', 'Failed to update PDF.');
            }
        });
    },
   
    onPreviousButtonClick: function() {
        var currentPanel = this.getView().getActiveItem();
        var currentPanelId = currentPanel.getItemId();

        switch (currentPanelId) {
            case 'personalInfo':
                this.fireEvent('personalInfoPrevious', currentPanel);
                break;
            case 'identityInfo':
                this.fireEvent('identityInfoPrevious', currentPanel);
                break;
            case 'emergencyContactDetails':
                this.fireEvent('emergencyContactPrevious', currentPanel);
                break;
            case 'passportDetails':
                this.fireEvent('passportDetailsPrevious', currentPanel);
                break;
            case 'workAuthorization':
                this.fireEvent('workAuthorizationPrevious', currentPanel);
                break;
            default:
                console.error('Unknown panel:', currentPanelId);
        }
    },

    onSaveNextButtonClick: function() {
        var currentPanel = this.getView().getActiveItem();
        var currentPanelId = currentPanel.getItemId();

        // Fire an event specific to the current panel
        switch (currentPanelId) {
            case 'personalInfo':
                this.fireEvent('personalInfoSaveNext', currentPanel);
                break;
            case 'identityInfo':
                this.fireEvent('identityInfoSaveNext', currentPanel);
                break;
            case 'emergencyContactDetails':
               // this.fireEvent('emergencyContactSaveNext', currentPanel);
               this.showNext();
                break;
            case 'passportDetails':
                this.fireEvent('passportDetailsSaveNext', currentPanel);
                break;
            case 'workAuthorization':
                this.fireEvent('workAuthorizationSaveNext', currentPanel);
                break;
            default:
                console.error('Unknown panel:', currentPanelId);
        }
    },

 
});