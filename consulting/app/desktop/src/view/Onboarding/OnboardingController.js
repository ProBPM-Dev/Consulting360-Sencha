Ext.define('Consulting.desktop.src.view.Onboarding.OnboardingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Onboarding',
    config: {
        checkAll: true,
        listen: {
            controller: {
                "*": {
                    saveFormSuccess: 'onSaveFormSuccess',
                    onPreviousEvent: 'onprev'
                }
            }
        }
    },
    init: function() {
        var me = this;
        this.control({
            'button[action=updatePdf]': {
                click: this.updatePdf
            }
        });
    },
    onprev: function() {
        this.showPrevious();
    },
    onSaveFormSuccess: function() {
        
        this.showNext();
    },
    onSaveNext: function(sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    doCardNavigation: function(incr) {
       debugger;
        var me = this;
        var activeIndex = this.getView().getActiveItemIndex();
        var nextIndex = activeIndex + incr;
        var itemCount = this.getView().getItems().getCount();
        if (nextIndex >= 0 && nextIndex < itemCount) {
            if (nextIndex !== 8) {
                this.getView().setActiveItemIndex(nextIndex);
                me.getViewModel().set('isPrevDisabled', nextIndex === 0);
                me.getViewModel().set('isNextDisabled', nextIndex === 8);
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
   
    onPreviousButtonClick: function() {

        var currentPanel = this.getView().getActiveItem();
        var currentPanelId = currentPanel.getItemId();
        switch (currentPanelId) {
            case 'personalInfo': this.fireEvent('EventpersonalInfoPrevious', currentPanel); break;
            case 'identityInfo': this.fireEvent('EventidentityInfoPrevious', currentPanel); break;
            case 'emergencyContactDetails': this.fireEvent('EventemergencyContactPrevious', currentPanel); break;
            case 'passportDetails': this.fireEvent('EventpassportDetailsPrevious', currentPanel); break;
            case 'workAuthorization': this.fireEvent('EventworkAuthorizationPrevious', currentPanel); break;
            case 'i983Panel':
                this.fireEvent('eventi983Prev', currentPanel);
                break;
            case 'i983attachmentpanel':
                this.fireEvent('eventi983Prev', currentPanel);
                break;   }
    },
    onSaveNextButtonClick: function() {
  
        var currentPanel = this.getView().getActiveItem();
        var currentPanelId = currentPanel.getItemId();
        switch (currentPanelId) {
            case 'personalInfo': this.fireEvent('EventpersonalInfoSaveNext', currentPanel); break;
            case 'identityInfo': this.fireEvent('EventidentityInfoSaveNext', currentPanel); break;
            case 'emergencyContactDetails':this.fireEvent('EventemergencyContactSaveNext', currentPanel); break;
            case 'passportDetails': this.fireEvent('EventpassportDetailsSaveNext', currentPanel); break;
            case 'workAuthorization': this.fireEvent('EventworkAuthorizationSaveNext', currentPanel); break;
            case 'i983Panel':
                this.fireEvent('eventi983attachSaveNext', currentPanel);
                break;}
    }
});
