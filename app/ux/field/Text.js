Ext.define('PortalMobile.ux.field.Text', {
    extend: "Ext.field.Text",
    xtype: 'uxtextfield',
    requires: [],
    config: {
        cls:'ux-text'
    },
    /**
     * @private
     */
    initialize: function () {
        var me = this;
        me.callParent();
        me.updateComponentButtons();
    },
    updateComponentButtons: function () {
        var me = this;
        var componentOuterEle = me.element.down('.x-component-outer');
        componentOuterEle.down('.x-input-el').set({
            'type':'tel'
        });
    }
})