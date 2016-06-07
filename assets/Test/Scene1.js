var GameHelper = require("GameHelper");
var SceneBase = require('SceneBase');

cc.Class({
    extends: SceneBase,

    ctor: function(){

    },

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        GameHelper.sayHi();

        var pNode = this.node.parent.getChildByName( this.persistNodeName );

        if( cc.game.isPersistRootNode( pNode ) == false ){

            cc.game.addPersistRootNode( pNode );

            cc.log('init persist');
        }

        cc.log('scene1 p say:' );
        this.getPersistNode().say();


        this.node.on( cc.Node.EventType.TOUCH_START, function(evt){
            cc.log("touch scene1");

            cc.director.loadScene("Scene2");
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
