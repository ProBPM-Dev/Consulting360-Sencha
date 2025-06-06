Ext.define('Consulting.desktop.src.controller.CreateTimeSheetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.createTimesheet',
    config: {
        listen: {
            controller: {
                "*": {
                    eventCreateTimeSheet: 'CreateTimeSheet',
                    eventEditTimeSheet:'editTimeSheet',
                    eventtimesheetattachSaveNext: 'onSaveAndNext'
                }
            }
        }
    },
 
    editTimeSheet:function(record,po){
      //  debugger;
 
        var me=this;
        console.log(record);
        var vm = this.getViewModel();
        vm.set("po",po);
        vm.set('panelTitle','Edit TimeSheet for '+ po.name);
        vm.set("recordId",record.data.id);
        this.processResponse(record.data);
        var panel = vm.getView();
      
        if (panel) {
            if (panel.collapsed) {
                panel.expand();
            }
        }
        me.fireEvent('eventexpandpanel');
    },
    onBeforeExpand:function(panel){
        console.log(this.getViewModel().get("openPanel"));
        return this.getViewModel().get("openPanel");

    },
    onAfterRender: function(panel) {
        // Disable the collapse/expand functionality
        panel.setCollapsible(false);
    },
    isHoliday: function(day) {
        var holidayData = Ext.decode(localStorage.getItem('staticData')) || [];
    
        var formattedDate = Ext.Date.format(day, 'Y-m-d');
        var dayOfWeek = Ext.Date.format(day, 'N');
        if(dayOfWeek == 6 || dayOfWeek == 7){
            return 'weekend';
        }
        var holiday = holidayData.find(function(record) {
            var holidayDate = new Date(record.holiday); // Parse ISO date string
            var holidayFormattedDate = Ext.Date.format(holidayDate, 'Y-m-d');
            return holidayFormattedDate === formattedDate && record.active;
        });
        if (holiday) {
            return ' (' + holiday.holidayName + ')';
        }
        return '';
    },
    processDay  :   function(newTimesheet,sd){
      
        var vm = this.getViewModel();
        for(var i=1;i<8;i++){
            var x = "day"+i;
            var holidayName = this.isHoliday(sd);
            vm.set(x,newTimesheet[x]);
            if(holidayName == "weekend"){
                vm.set(x+"Label",Ext.Date.format(sd,"m-d-Y \\[l\\]" ));
                vm.set(x+"Required",false);
            }else if(holidayName != ""){
                vm.set(x+"Label",Ext.Date.format(sd,"m-d-Y \\[l\\]" ) + holidayName);
                vm.set(x+"Required",false);
            }else{
                vm.set(x+"Label",Ext.Date.format(sd,"m-d-Y \\[l\\]" ));
                vm.set(x+"Required",true);
            }
            sd.setDate(sd.getDate()+ 1) ;
        }
    },
    processResponse:function(newTimesheet){
        var vm = this.getViewModel();
               // Get the panel reference
   
        var sd = new Date(newTimesheet.startDate);
        var ed = new Date(newTimesheet.endDate);
        vm.set("openPanel",true);
        vm.set("submitBtnDisabled",false);
        
        vm.set("weekStartDate",Ext.Date.format(sd,'m-d-Y'));
        vm.set("weekEndDate",Ext.Date.format(ed,'m-d-Y'));
        this.processDay(newTimesheet,sd);
    },

    CreateTimeSheet: function(po) {
        debugger;
        var me= this;
           console.log("Event fired");
           this.getViewModel().set("po", po);
           Ext.Ajax.request({
            url: 'http://localhost:8080/api/createTimeSheetforLoggedInEmployee/' + po.id,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                var responseData = Ext.decode(response.responseText);
                if (!responseData) {
                    Ext.Msg.alert('Error', 'Failed to create timesheet.');
                    return;
                }

//vm.set("recordId", responseData.id); // Set the recordId in the ViewModel

                // Fetch the newly created timesheet details
                var vm = me.getViewModel();
                me.fireEvent("eventRefreshTimeSheetGrid");
                vm.set('panelTitle','Timesheet for ' + vm.get("po.name"));
                vm.set("recordId",responseData.id);
                me.processResponse(responseData);
                var panel = me.getView();
                if (panel) {
                    if (panel.collapsed) {
                        panel.expand();
                        me.fireEvent('eventexpandpanel');
                    }
                }
            }, // Bind the context to the controller
            failure: function (response) {
                Ext.Msg.alert('Error', 'Failed to create timesheet.');
            }
        });
    },

   onSaveAndNext: function (button) {
  debugger;
        var form = this.getView();
        var me=this;
        if (form.isValid()) {
            var vm = this.getViewModel();
            var po= vm.get("po");
            var sd = new Date(vm.get("weekStartDate"));
            var ed = new Date(vm.get("weekEndDate"));
            form.submit({
                url: 'http://localhost:8080/api/saveTimeSheetforLoggedInEmployee/' + po.id,
                method: 'POST',
             params: {
    id: vm.get("recordId"),
    startDate: sd.getTime(),
    endDate: ed.getTime()
},

                success: function(form, action) {
             
                    Ext.Msg.alert('Success', 'Form saved successfully!');
                    me.fireEvent('saveFormSuccess');
                    me.fireEvent('eventRecordIdUpdated', vm.get("recordId"));
                },
                failure: function(form, action) {
       
                    Ext.Msg.alert('Failed', 'Form submission failed. Please try again.');
                    me.fireEvent('saveFormSuccess');
                    me.fireEvent('eventRecordIdUpdated', vm.get("recordId"));
                },
      
            });
        }

    }
});