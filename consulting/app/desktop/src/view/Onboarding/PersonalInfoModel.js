Ext.define('Consulting.desktop.src.view.Onboarding.PersonalInfoModel', {
    extend: 'Ext.data.Model',
    fields: [
       { name: 'dob', type: 'date' },
        { name: 'firstname', type: 'string' },
        { name: 'lastname', type: 'string' },
        { name: 'SSN', type: 'string' },
        { name: 'phonenumber', type: 'string' },
        { name: 'highestDegree', type: 'string' },
        { name: 'specialization', type: 'string' },
        { name: 'univeristyName', type: 'string' },
       {name:'courseCompletionDate', type:'date'},   
        { name: 'identityTypeLookup', type: 'string' }, // Ensure this matches backend
        { name: 'identityNumber', type: 'string' },
        { name: 'addressLine1', type: 'string' },
        { name: 'city', type: 'string' }, // Use lowercase to match backend
        { name: 'state', type: 'string' },
        { name: 'zipCode', type: 'string' },
        { name: 'expiryDate', type: 'date'},
        { name: 'issueDate', type: 'date'},
        { name: 'passPortNumber', type: 'string' },
        { name: 'passPortIssuedCountry', type: 'string' },
        { name: 'emfullname', type: 'string' },
        { name: 'validFrom', type: 'date'},
        { name: 'validTo', type: 'date'}, // Use consistent naming
        { name: 'documentNumber', type: 'string' },
        { name: 'uscisNumber', type: 'string' },
        { 
            name: 'workAuthLookup', 
            type: 'string',
            mapping: 'workAuthLookup.name' // Ensure backend returns this nested structure
        }
    ]
});

 