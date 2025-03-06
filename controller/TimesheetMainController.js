Ext.define('Consulting.desktop.src.view.External.TimesheetMainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.timesheetattach',
    config: {
        checkAll: true,
        listen: {
            controller: {
                "*": {
                    saveFormSuccess: 'onSaveFormSuccess',
                    onPreviousEvent:'onprev',
                    eventexpandpanel:'onexpand'
                }
            }
        }
        
    },
  
    onexpand:function(){
        var vm = this.getViewModel();
        var panel = vm.getView();
      
        if (panel) {
            if (panel.collapsed) {
                panel.expand();
            }
        }
    },
    onprev:function(){
this.showPrevious();
    },
    onSaveFormSuccess: function() {

        this.showNext();
    },
  
  

   
    doCardNavigation: function (incr) {
        var me = this;
        var activeItem = this.getView().getActiveItem();
        var activeIndex = this.getView().getActiveItemIndex();
        var nextIndex = activeIndex + incr;
        var itemCount = this.getView().getItems().getCount();
        if (nextIndex >= 0 && nextIndex < itemCount) {
            if (activeItem!==2) {
                this.getView().setActiveItemIndex(nextIndex);
                me.getViewModel().set('isPrevDisabled', nextIndex === 0);
                me.getViewModel().set('isNextDisabled', nextIndex === 1);
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
            case 'timesheetattachmentpanel':
                this.fireEvent('eventtimesheetPrev', currentPanel);
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
            case 'CreateTimeSheetPanel':
                this.fireEvent('eventtimesheetattachSaveNext', currentPanel);
                break;
            default:
                console.error('Unknown panel:', currentPanelId);
        }
    },

 
});