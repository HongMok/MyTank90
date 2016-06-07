
/**
 * 建地图时，地图块的配置
 * */
var TerrainBlockConfig = cc.Class({

    ctor: function( id, terrainIdList, terrainPos ){
        this.id = id;
        this.terrainIdList = terrainIdList;
        this.terrainPos = terrainPos;
    },

    properties: {
        id: 0,
        terrainIdList: [],
        terrainPos: []
    },

    getId: function(){
        return this.id;
    },

    getTerrainIdList: function(){
        return this.terrainIdList;
    },

    getTerrainPos: function(){
        return this.terrainPos;
    }
});

/**
 * 每块区域下标
 * =====================
 * | 12 | 13 | 14 | 15 |
 * | 8  | 9  | 10 | 11 |
 * | 4  | 5  | 6  | 7  |
 * | 0  | 1  | 2  | 3  |
 * =====================
 *
 * */
const Block_Bottom = [ 0, 1, 2, 3, 4, 5, 6, 7 ];
const Block_Up = [ 8, 9, 10, 11, 12, 13, 14, 15 ];
const Block_Left = [ 0, 1, 4, 5, 8, 9, 12, 13 ];
const Block_Right = [ 2, 3, 6, 7, 10, 11, 14, 15 ];
const Block_All = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];

const Corner_Left_Bottom = [ 0, 1, 4, 5 ];
const Corner_Left_Up = [ 8, 9, 12, 13 ];
const Corner_Right_Bottom = [ 2, 3, 6, 7 ];
const Corner_Right_Up = [ 10, 11, 14, 15 ];

/**
 * 给用户自定义地图
 * */
TerrainBlockConfig._config = [
    new TerrainBlockConfig( 0, [-1], Block_All ),             //clear all

    new TerrainBlockConfig( 1, [3,4,3,4,1,2,1,2], Block_Bottom ),           //bricks
    new TerrainBlockConfig( 2, [3,4,1,2,3,4,1,2], Block_Right ),
    new TerrainBlockConfig( 3, [3,4,3,4,1,2,1,2], Block_Up ),
    new TerrainBlockConfig( 4, [3,4,1,2,3,4,1,2], Block_Left ),
    new TerrainBlockConfig( 5, [3,4,3,4,1,2,1,2,3,4,3,4,1,2,1,2], Block_All ),

    new TerrainBlockConfig( 6, [5], Block_Bottom ),           //grid
    new TerrainBlockConfig( 7, [5], Block_Right ),
    new TerrainBlockConfig( 8, [5], Block_Up ),
    new TerrainBlockConfig( 9, [5], Block_Left ),
    new TerrainBlockConfig( 10, [5], Block_All ),

    new TerrainBlockConfig( 11, [6], Block_All ),             //grass

    new TerrainBlockConfig( 12, [7], Block_All ),             //water

    new TerrainBlockConfig( 13, [8], Block_All ),             //ice

    new TerrainBlockConfig( 14, [0], Block_All ),             //home
    new TerrainBlockConfig( 15, [3,4,1,2], Corner_Left_Bottom ),    //brick surround home
    new TerrainBlockConfig( 16, [3,4,1,2], Corner_Right_Bottom )    //brick surround home
];

/**
 * 系统默认块，用于初始化，如大本营
 * */
const SystemBuild = [ 14, 15, 16 ];


TerrainBlockConfig.getAllCustomConfig = function(){
    var arr = [];
    TerrainBlockConfig._config.forEach( function( e ){
        if( SystemBuild.indexOf(e.getId() ) == -1 ){
            arr.push( e );
        }
    } );
    return arr;
};


TerrainBlockConfig.getConfigById = function( id ){
    var conf = null;
    TerrainBlockConfig._config.forEach( function( e ){
        if(e.getId() == id ){
            conf = e;
        }
    });
    return conf;
};



module.exports = TerrainBlockConfig;