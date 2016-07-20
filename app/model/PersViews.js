(function() {
    /**
     * 空检查
     **/
    var emptyCheck = function(v, record) {
        if (!v) {
            throw new Error('value is undefined .');
        }else{
            return v;
        }
    };

    Ext.define('TestApp.model.PersViews', {
        extend: 'Ext.data.Model',
        config: {
            identifier: {
                type: 'uuid'
            },
            fields: [{
                name: 'signOn',
                type: 'string',
                convert: emptyCheck
            }]
        }
    });
})()