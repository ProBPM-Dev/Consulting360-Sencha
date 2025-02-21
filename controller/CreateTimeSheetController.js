Ext.define('Consulting.desktop.src.controller.CreateTimeSheetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.createTimesheet',
    config: {
        listen: {
            controller: {
                "*": {
                    eventCreateTimeSheet: 'CreateTimeSheet',
                    eventEditTimeSheet:'editTimeSheet'
                }
            }
        }
    },

    editTimeSheet:function(record){
        console.log(record);
        var vm = this.getViewModel();
        vm.set('panelTitle',vm.get("poName") + ' Edit TimeSheet');
        this.processResponse(record.data);
        var panel = vm.getView();
        if (panel) {
            if (panel.collapsed) {
                panel.expand();
            }
        }
    },
    onBeforeExpand:function(panel){
        debugger;
        console.log(this.getViewModel().get("openPanel"));
        return this.getViewModel().get("openPanel");

    },
    isHoliday: function(day) {
        debugger;
       
        var holidayData = Ext.decode(localStorage.getItem('staticData')) || [];
    
        var formattedDate = Ext.Date.format(day, 'Y-m-d');
    
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
       processResponse:function(newTimesheet){
        var vm = this.getViewModel();
        var sd = new Date(newTimesheet.startDate);
        var ed = new Date(newTimesheet.endDate);
        vm.set("openPanel",true);
        vm.set("submitBtnDisabled",false);
        
        vm.set("weekStartDate",Ext.Date.format(sd,'m-d-Y'));
        vm.set("weekEndDate",Ext.Date.format(ed,'m-d-Y'));
        var holidayName = this.isHoliday(sd);
        vm.set("day1",newTimesheet.day1);
        vm.set("day1Label",Ext.Date.format(sd,"m-d-Y \\[l\\]" ) + holidayName);
        vm.set("isHoliday1", !!holidayName);

        sd.setDate(sd.getDate()+ 1) ;
        holidayName = this.isHoliday(sd);
        vm.set("day2",newTimesheet.day2);
        vm.set("day2Label",Ext.Date.format(sd,"m-d-Y \\[l\\]" ) + holidayName);
        vm.set("isHoliday2", !!holidayName);
        console.log('isHoliday2:', vm.get('isHoliday2')); 
        
        sd.setDate(sd.getDate()+ 1) ;
        vm.set("day3",newTimesheet.day3);
        vm.set("day3Label",Ext.Date.format(sd,"m-d-Y \\[l\\]" ));
        
        sd.setDate(sd.getDate()+ 1) ;
        vm.set("day4",newTimesheet.day4);
        vm.set("day4Label",Ext.Date.format(sd,"m-d-Y \\[l\\]" ));
        
        sd.setDate(sd.getDate()+ 1) ;
        vm.set("day5",newTimesheet.day5);
        vm.set("day5Label",Ext.Date.format(sd,"m-d-Y \\[l\\]" ));
        
        sd.setDate(sd.getDate()+ 1) ;
        vm.set("day6",newTimesheet.day6);
        vm.set("day6Label",Ext.Date.format(sd,"m-d-Y \\[l\\]" ));
        
        sd.setDate(sd.getDate()+ 1) ;
        vm.set("day7",newTimesheet.day7);
        vm.set("day7Label",Ext.Date.format(sd,"m-d-Y \\[l\\]" ));
       },

       CreateTimeSheet: function(poName) {
        var me= this;
           console.log("Event fired");
           this.getViewModel().set("poName", poName);
           Ext.Ajax.request({
            url: 'http://localhost:8080/api/createTimeSheetforLoggedInEmployee/' + encodeURIComponent(poName),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                debugger;
                var responseData = Ext.decode(response.responseText);

                if (!responseData || !responseData.employeeTimeLineItems || responseData.employeeTimeLineItems.length === 0) {
                    Ext.Msg.alert('Error', 'Failed to create timesheet.');
                    return;
                }

                // Fetch the newly created timesheet details
                var vm = me.getViewModel();
                vm.set('panelTitle',vm.get("poName") + ' Create New TimeSheet');
                var newTimesheet = responseData.employeeTimeLineItems[0];
                me.processResponse(newTimesheet);
                var panel = me.getView();
                if (panel) {
                    if (panel.collapsed) {
                        panel.expand();
                    }
                    Ext.Msg.alert('Success', 'Timesheet created and loaded.');
                }
            }, // Bind the context to the controller
            failure: function (response) {
                Ext.Msg.alert('Error', 'Failed to create timesheet.');
            }
        });
       },

    onSubmitButtonClick: function (button) {
        debugger;
        //var me = this;
   
      //var form=this;
           var form = this.getView(); 
        let fieldset = form.lookupReference('fieldset1');

        if (!fieldset) {
            console.error("No fieldset found");
            return;
        }

        var clientComboBox = Ext.ComponentQuery.query('combobox[label="Choose Client"]')[0];
        var clientTitle = clientComboBox ? clientComboBox.getValue() : null;

        if (!clientTitle) {
            Ext.Msg.alert('Error', 'Please select a client.');
            return;
        }

        var isValid = true;
        var values = {
            title: clientTitle // Include the client title
        };

        fieldset.items.each(function (item) {
            if (item.isFormField) { // Ensures only form fields are processed
                if (item.allowBlank === false && !item.getValue()) {
                    isValid = false;
                    item.markInvalid('This field is required');
                } else {
                    values[item.name] = item.getValue();
                }
            }
        });

        if (isValid) {
            debugger;
         /*   form.submit({
                url: 'http://localhost:8080/api/saveTimeSheetforLoggedInEmployee/' + encodeURIComponent(clientTitle),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (form, action) {
                    Ext.Msg.alert('Success', 'Form submitted successfully!');
                },
                failure: function (form, action) {
                    console.log('Failure:', action);
                    Ext.Msg.alert('Failed', 'Form submission failed. Please try again.');
                }
            });*/
            Ext.Ajax.request({
                url: 'http://localhost:8080/api/saveTimeSheetforLoggedInEmployee/' + encodeURIComponent(clientTitle),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                jsonData: values, // Send the form data as JSON
                success: function (response) {
                    Ext.Msg.alert('Success', 'Form submitted successfully!');
                },
                failure: function (response) {
                    Ext.Msg.alert('Failed', 'Form submission failed. Please try again.');
                }
            });
        }
    }
});