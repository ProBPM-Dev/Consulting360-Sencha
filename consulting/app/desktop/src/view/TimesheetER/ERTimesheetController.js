
Ext.define('Consulting.desktop.src.view.TimesheetER.ERTimesheetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ertimesheet',

    onMonthChange: function (field, newValue) {
        var vm = this.getViewModel();
        vm.set('selectedMonth', newValue);
        this.generateMonthlyDates(newValue.getFullYear(), newValue.getMonth() + 1);
    },

    generateMonthlyDates: function (year, month) {
        var date = new Date(year, month - 1, 1);
        var dates = [];
        while (date.getMonth() === month - 1) {
            dates.push({
                type: 'Hours Worked',
                day: Ext.Date.format(date, 'D'),
                date: Ext.Date.format(date, 'd'),
                hoursWorked: 0
            });
            date.setDate(date.getDate() + 1);
        }
        this.getViewModel().set('formattedDates', dates);
    },

    onEditClick: function () {
        // Handle edit button click
    },

    onSaveClick: function () {
        // Handle save button click
    },

    onApproveClick: function () {
        // Handle approve button click
    },

    onDenyClick: function () {
        // Handle deny button click
    }
});

