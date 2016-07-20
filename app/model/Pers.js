Ext.define('TestApp.model.Pers', {
	extend: 'Ext.data.Model',
	requires: [
        'Ext.data.Field',
        'Ext.data.association.HasOne',
        'Ext.data.reader.Json'
    ],
	config: {
        identifier: {
            type: 'uuid'
        },
		fields: [{
			name: 'pattern',
			type: 'string'
		},{
			name:'persViews_id',
			type:'auto'
		}],
		hasOne: [{
			model: 'TestApp.model.PersViews',
            reader: {
                type: 'json'
            },
			associatedName: 'persViews',
            autoSync:true
		}],
		proxy: {
            type: 'memory'
        }
	}
});