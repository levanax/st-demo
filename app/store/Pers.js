Ext.define('TestApp.store.Pers', {
    extend: 'Ext.data.Store',
    config: {
        storeId:'pers',
        autoLoad:true,
        model:'TestApp.model.Pers'
    }
});