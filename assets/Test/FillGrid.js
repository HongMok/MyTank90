cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        
        num: 0
    },

    // use this for initialization
    onLoad: function () {
        for( var i = 0; i < this.num; i++ ){
            var item = cc.instantiate( this.itemPrefab );
            this.node.addChild( item );
        }
    },

});
