Ext.define('Consulting.desktop.src.model.External.TimeSheet', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'day1', type: 'number' },
        { name: 'day2', type: 'number' },
        { name: 'day3', type: 'number' },
        { name: 'day4', type: 'number' },
        { name: 'day5', type: 'number' },
        { name: 'day6', type: 'number' },
        { name: 'day7', type: 'number' },
        { name: 'approvedOn', type: 'date' },
        { name: 'attachmentId', type: 'int' },

        {
            name: 'startDate',
            type: 'date',
            dateFormat: 'Y-m-d', // important for LocalDate binding
            
        },
        {
            name: 'endDate',
            type: 'date',
            dateFormat: 'Y-m-d',
           
        }
    ]
});
