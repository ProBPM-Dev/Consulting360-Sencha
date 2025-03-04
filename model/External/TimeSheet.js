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
        {name: 'startDate',type: 'date'},
        {name: 'endDate',type: 'date'},
        { name: 'approvedOn', type: 'date' },

        // Convert 'approvedOn' to an approval status
        {
            name: 'approvalStatus',
            type: 'string',
            convert: function (value, record) {
                return record.get('approvedOn') ? 'Approved' : 'Pending';
            }
        },

        // Convert 'approvedOn' to an icon class
        {
            name: 'approvalIcon',
            type: 'string',
            convert: function (value, record) {
                return record.get('approvedOn') ? 'x-fa fa-lock' : 'x-fa fa-check green';
            }
        }
    
    ]
});  