
var SceneBase = require('SceneBase');

cc.Class({
    extends: SceneBase,

    properties: {

    },

    onLoad: function () {

        var pComp = this.getPersistNode();
        cc.log('scene2 pnode:' + pComp );

        pComp.say();

        var test = cc.instantiate( pComp.testPerfab );

        this.node.addChild( test );

        this.node.on( cc.Node.EventType.TOUCH_START, function(evt){
            cc.log("touch scene2");

            cc.director.loadScene("Scene1");
        });
    }

});
