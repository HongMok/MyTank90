var AssetHelper = cc.Class({
    extends: cc.Component,

    properties: {
        terrainPrefabs:{
            default: [],
            type: cc.Prefab
        },

        playerPrefabs:{
            default: [],
            type: cc.Prefab
        },

        enemyPrefab: cc.Prefab,

        mvBore: cc.Prefab
    },

    instantiateTerrainById: function( id ){
        var prefab = this.terrainPrefabs[ id ];
        return cc.instantiate( prefab );
    },

    instantiatePlayerByIndex: function( index ){
        var prefab = this.playerPrefabs[ index ];
        return cc.instantiate( prefab );
    },

    instantiateEnemy: function(){
        return cc.instantiate( this.enemyPrefab );
    }

});

module.exports = AssetHelper;
