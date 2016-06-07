var DestroyComponent = require('DestroyComponent');
var TerrainConfig = require('TerrainConfig');

cc.Class({
    extends: DestroyComponent,

    properties: {
        id: -1,
        type: -1
    },

    setTerrainId: function( id ){
        this.id = id;
        this.type = this.getConfig().getType();
    },

    getConfig: function(){
        return TerrainConfig.getConfigById( this.id );
    }
});
