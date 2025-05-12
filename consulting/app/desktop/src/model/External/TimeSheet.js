Ext.define('Consulting.desktop.src.model.External.TimeSheet', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name: 'id',  type: 'int'},
        {name: 'day1',  type: 'number'},
        {name: 'day2',  type: 'number'},
        {name: 'day3',  type: 'number'},
        {name: 'day4',  type: 'number'},
        {name: 'day5',  type: 'number'},
        {name: 'day6',  type: 'number'},
        {name: 'day7',  type: 'number'},
        { name: 'approvedOn', type: 'date' },
        { name: 'attachmentId', type: 'int' },
        // Convert 'approvedOn' to an approval status
{
    name: 'startDate',
    type: 'date',
    convert: function (value) {
        console.log('Raw startDate from API:', value); // ✅ Move this here
        if (typeof value === 'number' && value < 1000000000000) {
            return new Date(value * 1000); // Convert seconds to milliseconds
        }
        return new Date(value);
    }
},

        {
            name: 'endDate',
            type: 'date',
            convert: function (value) {
                if (typeof value === 'number' && value < 1000000000000) {
                    return new Date(value * 1000); // Convert from seconds to milliseconds
                }
                return new Date(value);
            }
        },

    
    ]
});  