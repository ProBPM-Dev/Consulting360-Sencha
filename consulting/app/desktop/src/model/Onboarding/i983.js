Ext.define('Consulting.desktop.src.model.Onboarding.i983', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'schoolRecommendingSTEMOPT', type: 'string' },
        { name: 'schoolSTEMDegreeEarned', type: 'string' },
        { name: 'STEMOPTRequestedFrom',type: 'string' },
        { name: 'STEMOPTRequestedTo',  type: 'date'},
        { name: 'sevisId', type: 'string' },
        { name: 'cipCode', type: 'string' },
        { name: 'qualifyingDegree', type: 'string' },
        { name: 'priorDegree', type: 'boolean' },
        { name: 'collegeEIN', type: 'string' },
        { name: 'studentRole', type: 'string' },
        { name: 'goals', type: 'string' },
        { name: 'oversight', type: 'string' },
        { name: 'measures', type: 'string' },
        { name: 'additionalRemarks', type: 'string' },
        { name: 'firstEvaluation', type: 'string' },
        { name: 'firstEvaluationFromDate', type: 'date', dateFormat: 'c' },
        { name: 'firstEvaluationToDate', type: 'date', dateFormat: 'c' },
        { name: 'secondEvaluation', type: 'string' },
        { name: 'secondEvaluationFromDate', type: 'date', dateFormat: 'c' },
        { name: 'secondEvaluationToDate', type: 'date', dateFormat: 'c' },
        { name: 'stemoptrequestedFrom', type: 'date' },
        { name: 'stemoptrequestedTo', type: 'date'}
    ],
  
});