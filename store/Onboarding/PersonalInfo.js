Ext.define('app.store.Onboarding.PersonalInfo', {
    extend: 'Ext.data.Store',
    alias: 'store.personalinfo',
    fields: [
        { name: 'fname', type: 'string' },
        { name: 'mname', type: 'string' },
        { name: 'lname', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'dob', type: 'date', dateFormat: 'm/d/Y' },
        { name: 'mobile', type: 'string' },
        { name: 'ssn', type: 'string' }
    ],
    autoLoad: true // Ensure autoLoad is set to true
});
