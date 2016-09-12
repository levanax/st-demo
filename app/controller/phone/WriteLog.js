Ext.define('TestApp.controller.phone.WriteLog', {
    extend: 'TestApp.controller.Base',
    requires: [],
    config: {
        refs: {
            writeLogView: {
                selector: 'writeLogView',
                xtype: 'writeLogView'
            }
        },
        routes: {
            'writeLog': 'goWriteLogView'
        },
        control: {
            writeLogView: {
                initialize: function(view, eOpts) {
                    var me = this;
                    view.down('button[name=saveBtn]').addListener({
                        tap: {
                            fn: function(button, e, eOpts) {
                                console.log(view.getValues());
                                var string = JSON.stringify(view.getValues());

                                me.saveNoteToStore({
                                    content: string
                                });
                            }
                        }
                    });

                    view.down('button[name=readBtn]').addListener({
                        tap: {
                            fn: function(button, e, eOpts) {
                                me.readNote();
                            }
                        }
                    })
                }
            }
        }
    },
    goWriteLogView: function() {
        this.changeView(Ext.create('TestApp.view.phone.WriteLog'));
    },
    test: function() {},
    /**
     * @param file {}
     * @param file.content
     */
    saveNoteToStore: function(file) {
        fileManager.writeFile({
            path: 'test.txt',
            content: file.content
        }, {
            autoCreate: true,
            isAppend: true
        });
    },
    readNote: function() {
        fileManager.readFile({
            path: 'test.txt'
        });
    }
});