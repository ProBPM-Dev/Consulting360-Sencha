Ext.define('Consulting.desktop.src.view.Onboarding.PersonalInfoModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'dob', type: 'date' },
        {name:'firstname', type:'string'},
        {name:'lastname', type:'string'},
        {name:'SSN', type:'string'},
        {name:'phonenumber', type:'string'},
        {name:'highestDegree', type:'string'},
        {name:'specialization', type:'string'},
        {name:'univeristyName', type:'string'},
        {name:'courseCompletionDate', type:'date'},
        {name:'identityTypeLookup', type:'string'},
        {name:'identityNumber', type:'string'},
        {name:'addressLine1', type:'string'},
        {name:'City', type:'string'},
        {name:'state', type:'string'},
        {name:'zipCode', type:'string'},
        {name:'expiryDate', type:'date'}
    ],
    
})