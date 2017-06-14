/**
syncDate format : Constant.FORMAT.DATE_LOG

*/
Ext.define('TestApp.model.DataSyncServerDate', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'storeId',
            type: 'string'
        }, {
            name: 'syncDate',
            type: 'string'
        }]
    }
});