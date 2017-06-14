Ext.define('TestApp.store.DataSyncServerDate',{
    extend:'Ext.data.Store',
    requires:[
        'TestApp.model.DataSyncServerDate'
    ],
    config:{
        storeId:'dataSyncServerDate',
        pageSize:100,
        autoLoad:true,
        //autoSync:true,
        model:'TestApp.model.DataSyncServerDate',
        proxy: {
            type: 'sql',
            database: 'UserData',
            model:'TestApp.model.DataSyncServerDate',
            table: 'SYSTEM_DATA_SYNC_SERVER_DATE'
        },
        listeners: {
            addrecords: function(store, records, eOpts){
                //var record = records[0];
                //var count = store.getCount();
                //var firstIndex = store.findExact('storeId', record.get('storeId'), 0);
                //if(firstIndex !== -1){
                //    var startIndex = firstIndex+1;
                //    if(startIndex <= count -1){
                //        var secondIndex = store.findExact('storeId', record.get('storeId'), startIndex);
                //        if(secondIndex !== -1){
                //            console.log(firstIndex,secondIndex,'del .......');
                //            var oldRecord = store.getAt(firstIndex);
                //            store.remove(oldRecord);
                //        }
                //    }
                //}
            }
        }
    },
    /**
     * 数据更新时登记
     * @param storeId {String}
     */
    registrationSync: function(storeId) {
        if(Ext.isDefined(storeId)){
            console.debug('in registrationSync storeId' + storeId);
            var store = this;
            var date = moment(new Date()).format(Constant.FORMAT.DATE_LOG);

            var index = store.findExact('storeId', storeId, 0);
            console.log('aaaaaaa))))))',storeId,index);
            if(index !== -1){
                store.getAt(index).set('syncDate', date);
            }else{
                var model = Ext.create('TestApp.model.DataSyncServerDate',{
                    'storeId': storeId,
                    'syncDate': date
                });
                store.add(model);
            }
            store.sync();
        }else{
            throw new Error('storeId is not define.');
        }
    },
    /**
     * 查询数据更新时间
     * @param storeId {String}
     * @return {null | String} data format:Constant.FORMAT.DATE_LOG
     */
    querySyncDate: function(storeId){
        if(Ext.isDefined(storeId)){
            var store = this;
            var index = store.findExact('storeId', storeId, 0);
            if(index !== -1){
                return store.getAt(index).get('syncDate');
            }else{
                return null;
            }
        }else{
            throw new Error('storeId is not define.');
        }
    }
});