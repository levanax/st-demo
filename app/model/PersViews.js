(function() {
    /**
     * Cofing 字段 空检查
     **/
    var emptyCheck = function(v, record) {
        if (!v) {
            var fieldName = this.getName();
            throw new Error([
                'CONFIG ERROR : ',
                fieldName,
                ' is undefined .'
            ].join(''));
        } else {
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