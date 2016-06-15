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
            tank.playMvBomb();
            this.playerList[i] = tank;
        }
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
                        self.onPressUp1();
                        break;
                    case GlobalConfig.Down1:
                        break;
                    case GlobalConfig.Left1:
                        break;
                    case GlobalConfig.Right1:
                        break;
                    case GlobalConfig.Up2:
                        break;
                    case GlobalConfig.Down2:
                        break;
                    case GlobalConfig.Exit:
                        self._backMenu();
                        break;
                }
            },
            onKeyReleased: function( keyCode, event ){
                switch( keyCode ){
                }
            }
        }, this.node);
    },

    onPressUp1: function(){
        this.playerList[0].playMvBomb();
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
