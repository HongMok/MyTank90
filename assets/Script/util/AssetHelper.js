var AssetHelper = cc.Class({
    extends: cc.Component,

    properties: {
        terrainPrefabs:{
            default: [],
            type: cc.Prefab
        }
    },

    instantiateTerrainById: function( id ){
        var prefab = this.terrainPrefabs[ id ];
        return cc.instantiate( prefab );
    }

});

module.exports = AssetHelper;
