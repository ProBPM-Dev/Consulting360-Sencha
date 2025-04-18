Ext.define('Consulting.desktop.src.controller.i983Main', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.i983Main',
    config: {
        checkAll: true,
        listen: {
            controller: {
                "*": {
                    eventsaveFormSuccess: 'onSaveFormSuccess',
                    onPreviousEvent:'onprev',
     
                }
            }
        }
        
    },
  
    onprev:function(){
this.showPrevious();
    },
    onSaveFormSuccess: function() {
debugger;
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
        debugger;
        var currentPanel = this.getView().getActiveItem();
        var currentPanelId = currentPanel.getItemId();

        switch (currentPanelId) {
            case 'i983attachmentpanel':
                this.fireEvent('eventi983Prev', currentPanel);
                break;          
            default:
                console.error('Unknown panel:', currentPanelId);
        }
    },

    onSaveNextButtonClick: function() {
        debugger;
        var currentPanel = this.getView().getActiveItem();
        var currentPanelId = currentPanel.getItemId();

        // Fire an event specific to the current panel
        switch (currentPanelId) {
            case 'i983Panel':
                this.fireEvent('eventi983attachSaveNext', currentPanel);
                break;
            default:
                console.error('Unknown panel:', currentPanelId);
        }
    },

 
});