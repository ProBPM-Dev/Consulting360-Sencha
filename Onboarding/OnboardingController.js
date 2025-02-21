Ext.define('Consulting.desktop.src.view.Onboarding.OnboardingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Onboarding',
    init: function() {
        console.log('Controller loaded');
       
    },
    onAfterRender: function () {
        const viewModel = this.getViewModel();
        const personStore = viewModel.getStore('personStore');
        personStore.load({
            callback: function (records) {
                if (records.length > 0) {
                    viewModel.set('person', records[0].getData());
                }
            }
        });
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
    onWorkAuthChange: function(combo, newValue) {
        var refs = this.getReferences();
        refs.uscisNumberField.setHidden(true);
        refs.validFromField.setHidden(true);
        refs.validToField.setHidden(true);
        refs.attachDocField.setHidden(true);
        refs.i20Field.setHidden(true);
        refs.CPTdocField.setHidden(true);
        refs.jobDutiesField.setHidden(true);
        refs.h1bdocField.setHidden(true);
        refs.i94docField.setHidden(true);
        refs.i9docField.setHidden(true);

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
            default:
                var showFields = ['opt', 'i983', 'h4ead', 'gc', 'gcead'].includes(newValue);
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
                me.getViewModel().set('isNextDisabled', nextIndex === itemCount - 1);
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
debugger;
        if (form.isValid()) {
            if (formPanel.items.indexOf(form) === 0) {
                form.submit({
                    url: 'http://localhost:8080/api/saveLoggedInEmployee',
                    method: 'POST',
                    success: function (form, action) {
                        me.showNext();
                        Ext.Msg.alert('Success', 'Form submitted successfully!');
                    },
                    failure: function (form, action) {
                        me.showNext();
                        Ext.Msg.alert('Failed', 'Form submission failed. Please try again.');
                    },
                });
            } else if (formPanel.items.indexOf(form) === 1) {
                    form.submit({
                        url: 'http://localhost:8080/api/saveLoggedInEmployeeIdentityInfo',
                        method: 'POST',
                        success: function (form, action) {
                            me.showNext();
                            Ext.Msg.alert('Success', 'Form submitted successfully!');
                        },
                        failure: function (form, action) {
                            me.showNext();
                            Ext.Msg.alert('Failed', 'Form submission failed. Please try again.');
                        },
                    });
            } else if (formPanel.items.indexOf(form) === 3) {
                form.submit({
                        url: 'http://localhost:8080/api/saveLoggedInEmployeePassportInfo',
                        method: 'POST',
                        success: function (form, action) {
                            me.showNext();
                            Ext.Msg.alert('Success', 'Form submitted successfully!');
                        },
                        failure: function (form, action) {
                            me.showNext();
                            Ext.Msg.alert('Failed', 'Form submission failed. Please try again.');
                        },
                    });
            } else if (formPanel.items.indexOf(form) === 4) {
                form.submit({
                        url: 'http://localhost:8080/api/saveLoggedInEmployeeWorkAuthInfo',
                        method: 'POST',
                        success: function (form, action) {
                            me.showNext();
                            Ext.Msg.alert('Success', 'Form submitted successfully!');
                        },
                        failure: function (form, action) {
                            me.showNext();
                            Ext.Msg.alert('Failed', 'Form submission failed. Please try again.');
                        },
                    });
            } else {
                Ext.Msg.alert('Error', 'Form submission failed. Please try again.');
            }
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct the errors in the form before submitting.');
        }
    },
  /*  onPersonStoreLoad   : function(panel, action) {
        debugger;
        var me = this;
        this.getViewModel().getStore('personStore').load({
            callback: function(records, operation, success) {
                // do something after the load finishes
                var form = me.getView();
                form.loadRecord(records[0].data);  // Load first record into the form
            }
        });
    },
    loadData: function (panel, action) {
        var activeItem = this.getView();
        var form = activeItem.getActiveItem();

        if (activeItem.items.indexOf(form) === 0) {
            Ext.Ajax.request({
                url: 'http://localhost:8080/api/getLoggedInEmployee',
                method: 'GET',
                withCredentials: true,
                cors: true,
                success: function (response) {
                    var identityData = Ext.decode(response.responseText);
                    if (identityData) {
                        form.items.each(function(item) {
                            if (identityData.hasOwnProperty(item.name)) {
                                var value = identityData[item.name];
                                if (item.xtype === 'datefield' && typeof value === 'string') {
                                    debugger;
                                   // var date = new Date(value);
                                   var date = Ext.Date.parse(value, 'Y-m-d');
                                    item.setValue(date);
                                } else {
                                    item.setValue(value);
                                }
                            }
                        });
                    }
                },
                failure: function () {
                    Ext.Msg.alert('Error', 'Failed to load data');
                }
            });
        } else if (formPanel.items.indexOf(form) === 1) {
            Ext.Ajax.request({
                url: 'http://localhost:8080/api/getLoggedInEmployeeIdentityDetails',
                method: 'GET',
                withCredentials: true,
                cors: true,
                success: function (response) {
                    var identityData = Ext.decode(response.responseText);
                    if (identityData) {
                        form.items.each(function(item) {
                            if (identityData.hasOwnProperty(item.name)) {
                                item.setValue(identityData[item.name]);
                            }
                        });
                    }
                },
                failure: function () {
                    Ext.Msg.alert('Error', 'Failed to load identity data');
                }
            });
        } else if (formPanel.items.indexOf(form) === 3) {
            Ext.Ajax.request({
                url: 'http://localhost:8080/api/getLoggedInEmployeePassportDetails',
                method: 'GET',
                withCredentials: true,
                cors: true,
                success: function (response) {
                    var identityData = Ext.decode(response.responseText);
                    if (identityData) {
                        form.items.each(function(item) {
                            if (identityData.hasOwnProperty(item.name)) {
                                item.setValue(identityData[item.name]);
                            }
                        });
                    }
                },
                failure: function () {
                    Ext.Msg.alert('Error', 'Failed to load identity data');
                }
            });
        } else if (formPanel.items.indexOf(form) === 4) {
            Ext.Ajax.request({
                url: 'http://localhost:8080/api/getLoggedInEmployeeWorkAuthorizationDetails',
                method: 'GET',
                withCredentials: true,
                cors: true,
                success: function (response) {
                    var identityData = Ext.decode(response.responseText);
                    if (identityData) {
                        form.items.each(function(item) {
                            if (identityData.hasOwnProperty(item.name)) {
                                item.setValue(identityData[item.name]);
                            }
                        });
                    }
                },
                failure: function () {
                    Ext.Msg.alert('Error', 'Failed to load identity data');
                }
            });
        }
    },
    onSubmit: function () {
        var formPanel = this.getView();
        formPanel.submit({
            url: 'http://localhost:8080/api/saveLoggedInEmployee',
            success: function () {
                Ext.Msg.alert('Success', 'Form submitted successfully!');
            },
            failure: function () {
                Ext.Msg.alert('Error', 'Form submission failed.');
            }
        });
    }*/
});