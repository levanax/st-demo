Ext.define('TestApp.controller.phone.KLineChart', {
    extend: 'TestApp.controller.Base',
    requires: [],
    config: {
        refs: {
            kLineChartView: {
                selector: 'kLineChartView',
                xtype: 'kLineChartView'
            }
        },
        routes: {
            'kLineChart': 'goKLineChartView'
        },
        control: {}
    },
    goKLineChartView: function() {
        this.changeView(Ext.create('TestApp.view.phone.KLineChart'));
    }
});