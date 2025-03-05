Ext.define('Consulting.desktop.src.view.Onboarding.OnboardingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Onboarding',
    config: {
        checkAll: true,
        listen: {
            controller: {
                "*": {
                    saveFormSuccess: 'onSaveFormSuccess',
                    onPreviousEvent:'onprev',
                }
            }
        }
        
    },
    init: function() {
        console.log('Controller loaded');
        var me = this;
        this.control({
            
            'button[action=updatePdf]': {
                
                click: this.updatePdf
            }
        });
    },
 
    onprev:function(){
this.showPrevious();
    },
    onSaveFormSuccess: function() {
        this.showNext();
    },
  
    onSaveNext: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

   
    doCardNavigation: function (incr) {
        var me = this;
        var activeItem = this.getView().getActiveItem();
        var activeIndex = this.getView().getActiveItemIndex();
        var nextIndex = activeIndex + incr;
        var itemCount = this.getView().getItems().getCount();
        if (nextIndex >= 0 && nextIndex < itemCount) {
            if (activeItem!==6) {
                this.getView().setActiveItemIndex(nextIndex);
                me.getViewModel().set('isPrevDisabled', nextIndex === 0);
                me.getViewModel().set('isNextDisabled', nextIndex === 5);
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
                this.fireEvent('EventpersonalInfoPrevious', currentPanel);
                break;
            case 'identityInfo':
                this.fireEvent('EventidentityInfoPrevious', currentPanel);
                break;
            case 'emergencyContactDetails':
                this.fireEvent('EventemergencyContactPrevious', currentPanel);
                break;
            case 'passportDetails':
                this.fireEvent('EventpassportDetailsPrevious', currentPanel);
                break;
            case 'workAuthorization':
                this.fireEvent('EventworkAuthorizationPrevious', currentPanel);
                break;
            case 'i983Panel':
                    this.fireEvent('Eventi983previous', currentPanel);
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
                this.fireEvent('EventpersonalInfoSaveNext', currentPanel);
                break;
            case 'identityInfo':
                this.fireEvent('EventidentityInfoSaveNext', currentPanel);
                break;
            case 'emergencyContactDetails':
               // this.fireEvent('emergencyContactSaveNext', currentPanel);
               this.showNext();
                break;
            case 'passportDetails':
                this.fireEvent('EventpassportDetailsSaveNext', currentPanel);
                break;
            case 'workAuthorization':
                this.fireEvent('EventworkAuthorizationSaveNext', currentPanel);
                break;
            default:
                console.error('Unknown panel:', currentPanelId);
        }
    },

 
});