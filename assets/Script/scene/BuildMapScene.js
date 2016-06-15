var TerrainConfig = require('TerrainConfig');
//var AssetHelper = require('AssetHelper');
var TerrainBlockConfig = require('TerrainBlockConfig');
var TerrainManager = require('TerrainManager');
var GlobalConfig = require('GlobalConfig');
var GameHelper = require('GameHelper');
var MapConfig = require('MapConfig');
var GlobalData = require('GlobalData');


const BlockWidth = 32;

const HomeX = 6;
const HomeY = 0;


cc.Class({
    extends: cc.Component,

    properties: {
        container: cc.Node,

        txtMapData: cc.EditBox,

        tankCursor: cc.Node,

        tankTwinkleOffset: 30
    },

    onLoad: function () {
        this.assetHelper = GlobalData.assetHelper;
        this.terrainManger = this.container.addComponent( TerrainManager );
        this.terrainManger.assetHelper = this.assetHelper;
        this.modifyList = {};
        this.currCustomBlockIndex = -1;
        this.isSetting = false;

        this.customBlocks = TerrainBlockConfig.getAllCustomConfig();        //����Զ����ͼ��

        this.xbi = 0;    //��ҵ�ǰ��꣬x������
        this.ybi = GlobalConfig.MapSize - 1;   //��ҵ�ǰ��꣬y������
        this.refreshTankPos();

        this.countTwinkleTank = 0;

        this.isInitMap = true;
        this.initMap();
        this.isInitMap = false;

        this.addKeyListener();

        this.refreshMapData();
    },

    refreshMapData: function(){
        this.txtMapData.string = this.terrainManger.serialToData();
    },

    trySetCurrBlock: function(){
        if( this.currCustomBlockIndex != -1 ){
            var block = this.customBlocks[ this.currCustomBlockIndex ];
            this.setBlock( this.xbi, this.ybi, block.getId() );
        }
    },

    addKeyListener: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function( keyCode, event ){
                switch( keyCode ){
                    case GlobalConfig.Up1:
                        self.moveTankCursor( 0, 1 );
                        break;
                    case GlobalConfig.Down1:
                        self.moveTankCursor( 0, -1 );
                        break;
                    case GlobalConfig.Left1:
                        self.moveTankCursor( -1, 0 );
                        break;
                    case GlobalConfig.Right1:
                        self.moveTankCursor( 1, 0 );
                        break;
                    case GlobalConfig.Shoot1:
                        self.changeBlockType();
                        break;
                    case GlobalConfig.StartOrPause:
                        self.confirm();
                        break;
                    case GlobalConfig.Exit:
                        self.cancel();
                        break;
                }
            },
            onKeyReleased: function( keyCode, event ){
                switch( keyCode ){
                    case GlobalConfig.Shoot1:
                        self.isSetting = false;
                        break;
                }
            }
        }, this.node);
    },

    cancel: function(){
        GlobalData.customMapData = null;

        this._backMenu();
    },

    confirm: function(){
        GlobalData.customMapData = this.txtMapData.string;

        this._backMenu();
    },

    _backMenu: function(){
        cc.director.loadScene( 'MenuScene' );
    },

    changeBlockType: function(){
        if( this.isSetting ){
            return ;
        }
        this.isSetting = true;
        this.currCustomBlockIndex++;
        this.currCustomBlockIndex = this.currCustomBlockIndex >= this.customBlocks.length ? 0 : this.currCustomBlockIndex;

        this.trySetCurrBlock();
    },

    initMap: function(){

        var map = MapConfig.getConfigById( 1 );
        if( null != map ){
            this.terrainManger.parseData( map.getMapData() );
            return ;
        }

        this.setBlock( 6, 0, 14 );          //set home
        this.setBlock( 5, 0, 2 );
        this.setBlock( 7, 0, 4 );
        this.setBlock( 5, 1, 16 );
        this.setBlock( 6, 1, 1 );
        this.setBlock( 7, 1, 15 );
    },

    setBlock: function( xbi, ybi, blockId ){
        if( this.isInitMap == false ){
            if( xbi === HomeX && ybi === HomeY ){
                return ;        //�����ֶ��޸�home
            }
        }

        var modId = GameHelper.buildId( xbi, ybi );
        if( this.modifyList[ modId ] != null && this.modifyList[ modId ] === blockId ){
            return ;        //the same
        }

        this.modifyList[ modId ] = blockId;

        this.clearBlock( xbi, ybi );

        var self = this;
        var blockConfig = TerrainBlockConfig.getConfigById( blockId );
        var arrDone = [];
        var startXsi = xbi * GlobalConfig.BlockSize;
        var startYsi = ybi * GlobalConfig.BlockSize;
        var terrainIdList = blockConfig.getTerrainIdList();
        var terrainPosList = blockConfig.getTerrainPos();
        var i, j, k;
        for( i = 0; i < terrainPosList.length; i++ ){
            var pos = terrainPosList[i];
            if( arrDone.indexOf( pos ) != -1 ){
                continue ;
            }

            var terrainId;
            if( i >= terrainIdList.length ){
                terrainId = terrainIdList[0];
            }
            else{
                terrainId = terrainIdList[i];
            }

            var terrainConfig = TerrainConfig.getConfigById( terrainId );

            var xsi = startXsi + parseInt( pos % GlobalConfig.BlockSize );
            var ysi = startYsi + parseInt( pos / GlobalConfig.BlockSize );

            if( terrainId == -1 ){
                self.terrainManger.rmTerrainByPos( xsi, ysi );
                arrDone.push( pos );
                continue;
            }
            else{
                self.terrainManger.addTerrain( xsi, ysi, terrainId );
            }

            var logPos;
            for( j = 0; j < terrainConfig.getSize(); j++ ){
                logPos = pos + j * GlobalConfig.BlockSize;
                for( k = 0;k < terrainConfig.getSize(); k++ ){
                    arrDone.push( logPos + k );         //����ռ�����
                }
            }
        }

        this.refreshMapData();
    },

    clearBlock: function( xbi, ybi ){
        var startXsi = xbi * GlobalConfig.BlockSize;
        var startYsi = ybi * GlobalConfig.BlockSize;
        var xsi, ysi;
        var matClear = [];
        for( var i = 0; i < GlobalConfig.BlockSize; i++ ){
            ysi = startYsi + i;
            for( var j = 0; j < GlobalConfig.BlockSize; j++ ){
                xsi = startXsi + j;
                matClear.push( [ ysi, xsi ] );
                //this.terrainManger.rmTerrainByPos( xsi, ysi );
            }
        }
        this.terrainManger.setDestroy( matClear );
        this.terrainManger.updateRecycle();
    },

    moveTankCursor: function( dx, dy ){
        this.xbi += dx;
        this.ybi += dy;

        this.xbi = this.xbi < 0 ? 0 : this.xbi;
        this.xbi = this.xbi >= GlobalConfig.MapSize ? GlobalConfig.MapSize - 1 : this.xbi;

        this.ybi = this.ybi < 0 ? 0 : this.ybi;
        this.ybi = this.ybi >= GlobalConfig.MapSize ? GlobalConfig.MapSize - 1 : this.ybi;

        this.refreshTankPos();

        if( this.isSetting ){
            this.trySetCurrBlock();
        }
        else{
            if( this.currCustomBlockIndex >= 0 ){
                this.currCustomBlockIndex--;        //�������õ�ͼʱ����һ��λ�ã��ָ�����һ����������
            }
        }
    },

    refreshTankPos: function(){
        this.tankCursor.x = this.xbi * BlockWidth;
        this.tankCursor.y = this.ybi * BlockWidth;
    },

    update: function (dt) {
        this.updateTwinkleTank();
    },

    updateTwinkleTank: function(){
        if( this.countTwinkleTank >= this.tankTwinkleOffset ){
            this.countTwinkleTank = 0;

            this.tankCursor.opacity = this.tankCursor.opacity == 0 ? 255 : 0;       //twinkle tank
        }

        this.countTwinkleTank++;
    }

});
