cc.Class({
    extends: cc.Component,

    properties: {
        rowLinePrefab: cc.Prefab,
        colLienPrefab: cc.Prefab,
        
        offset: 0,
        num: 0,
        
        
        smallRowPrefab: cc.Prefab,
        smallColPrefab: cc.Prefab,
        smallOffset: 0,
        smallNum: 0
    },

    // use this for initialization
    onLoad: function () {
        var i = 0;
        
        for( i = 0; i < this.smallNum; i++ ){
            var smallRow = cc.instantiate( this.smallRowPrefab );
            smallRow.x = 0;
            smallRow.y = i * this.smallOffset;
            
            var smallCol = cc.instantiate( this.smallColPrefab );
            smallCol.y = 0;
            smallCol.x = i * this.smallOffset;
            
            smallRow.opacity = 50;
            smallCol.opacity = 50;
            this.node.addChild( smallRow );
            this.node.addChild( smallCol );
        }
        
        for( i = 0; i < this.num; i++ ){
            var row = cc.instantiate( this.rowLinePrefab );
            row.x = 0;
            row.y = i * this.offset;
            
            var col = cc.instantiate( this.colLienPrefab );
            col.y = 0;
            col.x = i * this.offset;
            
            this.node.addChild( row );
            this.node.addChild( col );
        }
        
        
        
        this.node.scaleX = this.node.scaleY = 1.5;
    }

});
