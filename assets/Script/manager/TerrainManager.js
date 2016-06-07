
var AssetHelper = require('AssetHelper');
var GlobalConfig = require('GlobalConfig');
var TerrainComponent = require('TerrainComponent');
var GameHelper = require('GameHelper');


var TerrainManager = cc.Class({
    extends: cc.Component,

    properties: {
        assetHelper: AssetHelper
    },

    onLoad: function () {
        this.matMap = [];        //正个map 52*52 个位置的地皮标记
        var i,j;
        var size = GlobalConfig.MapSize * GlobalConfig.BlockSize;
        for( i = 0; i < size; i++ ){
            this.matMap[i] = [];
            for( j = 0; j < size; j++ ){
                this.matMap[i][j] = null;     //默认无地皮
            }
        }

        this.terrainList = {};       //当前在地图上放置的地皮，用key-value形式保存，key=ysi*mask + xsi
    },

    setDestroy: function( mat ){
        var self = this;
        mat.forEach( function( arr ){
            var terrain = self.matMap[ arr[0] ][ arr[1] ];

            if( null != terrain )
            {
                terrain.getComponent( TerrainComponent ).canDestroy = true;
            }
        } );
    },

    updateRecycle: function(){
        var i,j;
        var size = GlobalConfig.MapSize * GlobalConfig.BlockSize;
        for( i = 0; i < size; i++ ){
            for( j = 0; j < size; j++ ){
                var terrain = this.matMap[i][j];
                if( null != terrain )
                {
                    if( terrain.getComponent( TerrainComponent ).canDestroy )       //回收
                    {
                        this.rmTerrain( terrain );
                        //this.matMap[i][j] = null;
                    }
                }
            }
        }
    },

    serialToData: function(){
        var str = "";
        for( var key in this.terrainList ){
            var terrain = this.terrainList[ key ];
            if( null == terrain ){
                continue;
            }
            var terrComp = terrain.getComponent( TerrainComponent );
            str += ( key.toString() + "," + terrComp.id + "#" );
        }
        if( str.length > 1 ){
            str = str.substr( 0, str.length - 1 );
        }
        return str;
    },

    parseData: function( data ){
        if( data == null || data.length == 0 ){
            return;
        }
        var arrMap = data.split("#");
        for( var i = 0; i  < arrMap.length; i++ ){
            var arrTerr = arrMap[i].split(",");
            var id = parseInt( arrTerr[0] );
            var terrId = arrTerr[1];
            var xsi = parseInt( id % GlobalConfig.Mask );
            var ysi = parseInt( id / GlobalConfig.Mask );

            this.addTerrain( xsi, ysi, terrId );
        }
    },

    addTerrain: function( xsi, ysi, terrainId ){
        var terrain = this.assetHelper.instantiateTerrainById( terrainId );
        var comp = terrain.addComponent( TerrainComponent );
        comp.setTerrainId( terrainId );
        var id = GameHelper.buildId( xsi, ysi );
        terrain.x = GlobalConfig.BlockWidth / 4 * xsi;
        terrain.y = GlobalConfig.BlockWidth / 4 * ysi;
        this.node.addChild( terrain );

        this.terrainList[ id ] = terrain;
        this.matMap[ ysi ][ xsi ] = terrain;
    },

    rmTerrainByPos: function( xsi, ysi ){
        var id = GameHelper.buildId( xsi, ysi );
        var lastTerrain = this.terrainList[ id ];
        //this.recycleTerrain( lastTerrain );
        //this.terrainList[ id ] = null;
        this.rmTerrain( lastTerrain );
        return lastTerrain;
    },

    rmTerrain: function( terrain ){
        for( var key in this.terrainList ){
            if( this.terrainList[key] === terrain ){
                this.recycleTerrain( terrain );
                this.terrainList[key] = null;

                var arr = GameHelper.parseId( key );
                this.matMap[ arr[0] ][ arr[1] ] = null;
            }
        }
    },

    recycleTerrain: function( terrain ){
        this.node.removeChild( terrain );
    }


});


module.exports = TerrainManager;