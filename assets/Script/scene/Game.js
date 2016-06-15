var TerrainManager = require('TerrainManager');
var MapConfig = require('MapConfig');
var GlobalData = require('GlobalData');
var GlobalConfig = require('GlobalConfig');
var TankComponent = require('TankComponent');

cc.Class({
    extends: cc.Component,

    properties: {
        terrainContainer: cc.Node,
        bonusContainer: cc.Node,
        tankContianer: cc.Node
    },

    onLoad: function () {
        this.assetHelper = GlobalData.assetHelper;
        this.playerNum = GlobalData.playerNum;
        this.customMapData = GlobalData.customMapData;
        this.playerList = [];
        this.player1 = null;
        this.player2 = null;
        this.level = 1;
        this.terrainManger = this.terrainContainer.addComponent( TerrainManager );
        this.terrainManger.assetHelper = this.assetHelper;

        this.addKeyListener();

        this.initMap();

        this.initPlayer();
    },

    initPlayer: function(){
        for( var i = 0; i < this.playerNum; i++ ){
            var p = this.assetHelper.instantiatePlayerByIndex( i );
            this.tankContianer.addChild( p );
            p.x = 50;
            p.y = 50;
            var tank = p.getComponent( TankComponent );
            tank.setTankLevelId( 1 );
            tank.playMvBore();
            this.playerList[i] = tank;
        }
        this.player1 = this.playerList[ 0 ];
        this.player2 = this.playerList[ 1 ];
    },

    initMap: function() {
        if( this.customMapData != null && this.customMapData.length > 0 ){
            this.terrainManger.parseData( this.customMapData );

            this.customMapData = null;
            GlobalData.customMapData = null;

            return;
        }
        var map = MapConfig.getConfigById( this.level );
        this.terrainManger.parseData(map.getMapData());
    },

    addKeyListener: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function( keyCode, event ){
                switch( keyCode ){
                    case GlobalConfig.Up1:
                        self.movePlayerByIndexAndDIr( 0, 1 );
                        break;
                    case GlobalConfig.Down1:
                        self.movePlayerByIndexAndDIr( 0, 3 );
                        break;
                    case GlobalConfig.Left1:
                        self.movePlayerByIndexAndDIr( 0, 4 );
                        break;
                    case GlobalConfig.Right1:
                        self.movePlayerByIndexAndDIr( 0, 2 );
                        break;
                    case GlobalConfig.Up2:
                        self.movePlayerByIndexAndDIr( 1, 1 );
                        break;
                    case GlobalConfig.Down2:
                        self.movePlayerByIndexAndDIr( 1, 3 );
                        break;
                    case GlobalConfig.Left2:
                        self.movePlayerByIndexAndDIr( 1, 4 );
                        break;
                    case GlobalConfig.Right2:
                        self.movePlayerByIndexAndDIr( 1, 2 );
                        break;
                    case GlobalConfig.Shoot1:
                        self.shootPlayerByIndex( 0 );
                        break;
                    case GlobalConfig.Exit:
                        self._backMenu();
                        break;
                }
            },
            onKeyReleased: function( keyCode, event ){
                switch( keyCode ){
                    case GlobalConfig.Up1:
                        self.stopPlayerByIndex( 0 );
                        break;
                    case GlobalConfig.Down1:
                        self.stopPlayerByIndex( 0 );
                        break;
                    case GlobalConfig.Left1:
                        self.stopPlayerByIndex( 0 );
                        break;
                    case GlobalConfig.Right1:
                        self.stopPlayerByIndex( 0 );
                        break;
                    case GlobalConfig.Up2:
                        self.stopPlayerByIndex( 1 );
                        break;
                    case GlobalConfig.Down2:
                        self.stopPlayerByIndex( 1 );
                        break;
                    case GlobalConfig.Left2:
                        self.stopPlayerByIndex( 1 );
                        break;
                    case GlobalConfig.Right2:
                        self.stopPlayerByIndex( 1 );
                        break;
                }
            }
        }, this.node);
    },

    shootPlayerByIndex: function( index ){
        var player = this.playerList[ index ];
        if( null != player ){
            player.playMvBomb();
        }
    },

    movePlayerByIndexAndDIr: function( index, dir ){
        var player = this.playerList[ index ];
        if( null != player ){
            player.moveWithDir( dir );
        }
    },

    stopPlayerByIndex: function( index ){
        var player = this.playerList[ index ];
        if( null != player ){
            player.setIsMoving( false );
        }
    },

    _backMenu: function(){
        cc.director.loadScene( 'MenuScene' );
    },

    update: function (dt) {
        this.updatePlayer( dt );
    },

    updatePlayer: function( dt ){
        for( var i = 0; i < this.playerList.length; i++ ){
            this.playerList[i].updateFrame( dt );
        }
    }
});
