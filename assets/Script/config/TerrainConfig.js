
/**
 * 地皮配置
 * */
var TerrainConfig = cc.Class({

    ctor: function( id, type, size, tn ){
        this.id = id;
        this.type = type;
        this.size = size;
        this.terrainName = tn;
    },

    properties: {
        type: 0,
        size: 0,
        terrainName: ""
    },

    getId: function(){
        return this.id;
    },

    getType: function(){
        return this.type;
    },

    getSize: function(){
        return this.size;
    }

    //getTerrainName: function(){
    //    return this.terrainName;
    //}
});
TerrainConfig._config = [
    new TerrainConfig( 0, 0, 4, "大本营" ),
    new TerrainConfig( 1, 1, 1, "砖块1" ),
    new TerrainConfig( 2, 1, 1, "砖块2" ),
    new TerrainConfig( 3, 1, 1, "砖块3" ),
    new TerrainConfig( 4, 1, 1, "砖块4" ),
    new TerrainConfig( 5, 2, 2, "钢板" ),
    new TerrainConfig( 6, 3, 2, "草地" ),
    new TerrainConfig( 7, 4, 4, "水" ),
    new TerrainConfig( 8, 5, 2, "冰块" ),
    new TerrainConfig( 9, 0, 4, "废墟" )
];
TerrainConfig.getConfigById = function( id ){
    var terr = null;
    TerrainConfig._config.forEach( function( e ){
        if(e.getId() == id ){
            terr = e;
        }
    } );
    return terr;
};


module.exports = TerrainConfig;