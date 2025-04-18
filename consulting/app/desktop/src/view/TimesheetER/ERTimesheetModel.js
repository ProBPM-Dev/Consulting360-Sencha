Ext.define('Consulting.desktop.src.view.TimesheetER..ERTimesheetModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ertimesheet',

    data: {
        selectedEmployee: null,
        selectedProject: null,
        selectedVendor: null,
        selectedMonth: new Date(),
        formattedDates: []
    },

    stores: {
        employees: {
            fields: ['label', 'value'],
            data: [
                { label: 'Select employee name', value: null },
                { label: 'Employee 1', value: 'employee1' },
                { label: 'Employee 2', value: 'employee2' },
                { label: 'Employee 3', value: 'employee3' }
            ]
        },
        projects: {
            fields: ['label', 'value'],
            data: [
                { label: 'Select project name', value: null },
                { label: 'Project 1', value: 'project1' },
                { label: 'Project 2', value: 'project2' },
                { label: 'Project 3', value: 'project3' }
            ]
        },
        vendors: {
            fields: ['label', 'value'],
            data: [
                { label: 'Select vendor name', value: null },
                { label: 'Vendor 1', value: 'vendor1' },
                { label: 'Vendor 2', value: 'vendor2' },
                { label: 'Vendor 3', value: 'vendor3' }
            ]
        }
    }
});