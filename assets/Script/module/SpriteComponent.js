cc.Class({
    extends: cc.Component,

    properties: {
        sprite: cc.Sprite
    },

    onLoad: function () {
        //this.sprite = this.node.getComponent( cc.Sprite );
    },

    setFrameByName: function( frame ){
        this.sprite.spriteFrame = this.sprite._atlas.getSpriteFrame( frame );
    }
});
