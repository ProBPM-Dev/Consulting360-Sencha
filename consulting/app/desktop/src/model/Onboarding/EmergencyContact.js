Ext.define('Consulting.desktop.src.model.Onboarding.EmergencyContact', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'firstName', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'addressLine1', type: 'string' },
        { name: 'addressLine2', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'state', type: 'string' },
        { name: 'zipCode', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'primaryPhoneNumber', type: 'string' },
        { name: 'secondaryPhoneNumber', type: 'string' },
        { name: 'primaryPhoneType', type: 'string' },
        { name: 'secondaryPhoneType', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'specialInstructions', type: 'string' },
        { name: 'isPrimary', type: 'boolean', defaultValue: false }, // Match backend field
        { name: 'employeeId', type: 'int' } // For association
    ]
});