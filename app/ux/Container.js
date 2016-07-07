/**
 * Created by Levana.Xue on 7/7/2016.
 */
Ext.define('TestApp.ux.Container', {
    override: 'Ext.Container',
    config:{

    },
    /**
    *  
    *  添加新 item  
    *  useCompatMultiPlate
    */
    applyItems: function(items, collection) {
        for(var i=0,condition=true;condition;condition=items[i],i++){
            var value = condition;
            if(typeof value['useCompatMultiPlate'] !== 'undefined'){
                if(value['useCompatMultiPlate'] === true){
                    var newItem = {};
                    if(Ext.os.is.Tablet){
                        newItem.xclass= value['xclassTablet'];
                    }else{
                        newItem.xclass= value['xclassPhone'];
                    }
                    items[i] = newItem;
                }
            }
        }
        this.callParent(arguments);
    }
});