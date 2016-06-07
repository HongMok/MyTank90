var PersistNode = require('PersistNode');

var SceneBase = cc.Class({
    extends: cc.Component,

    properties: {
        persistNodeName: 'persisitNode'
    },

    // use this for initialization
    onLoad: function () {
    },

    getPersistNode: function(){
        return this.node.parent.getChildByName( this.persistNodeName ).getComponent( PersistNode );
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

module.exports = SceneBase;