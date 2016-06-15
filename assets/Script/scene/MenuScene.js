var GlobalConfig = require('GlobalConfig');
var GlobalData = require('GlobalData');
var AssetHelper = require('AssetHelper');

cc.Class({
    extends: cc.Component,

    properties: {
        tank: cc.Node,

        assetHelperPrefab: cc.Prefab,

        modeIndex: 0
    },

    onLoad: function () {
        this.tryInitAssetHelper();

        this.posYList = [ -38, -70, -101 ];

        this.addKeyListener();

        this.refreshMode();
    },

    tryInitAssetHelper: function(){
        if( GlobalData.assetHelper == null ){
            var assetNode = cc.instantiate( this.assetHelperPrefab );
            GlobalData.assetHelper = assetNode.getComponent( AssetHelper );
        }
    },

    addKeyListener: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function( keyCode, event ){
                switch( keyCode ){
                    case GlobalConfig.Up1:
                        self.addModeIndex( -1 );
                        break;
                    case GlobalConfig.Down1:
                        self.addModeIndex( 1 );
                        break;
                    case GlobalConfig.Up2:
                        self.addModeIndex( -1 );
                        break;
                    case GlobalConfig.Down2:
                        self.addModeIndex( 1 );
                        break;
                    case GlobalConfig.StartOrPause:
                        self.selConfirm();
                        break;
                }
            },
            onKeyReleased: function( keyCode, event ){
            }
        }, this.node);
    },

    selConfirm: function(){
        switch( this.modeIndex ){
            case 0:
                this.goGame( 1 );
                break;
            case 1:
                this.goGame( 2 );
                break;
            case 2:
                this.goBuildMap();
                break;
        }
    },

    goGame: function( playerNum ){
        GlobalData.playerNum = playerNum;

        cc.director.loadScene( 'Game' );
    },

    goBuildMap: function(){
        cc.director.loadScene('BuildMapScene');
    },

    addModeIndex: function( add ){
        this.modeIndex += add;
        this.modeIndex = this.modeIndex < 0 ? this.posYList.length - 1 : this.modeIndex;
        this.modeIndex = this.modeIndex >= this.posYList.length ? 0 : this.modeIndex;

        this.refreshMode();
    },

    refreshMode: function(){
        this.tank.y = this.posYList[ this.modeIndex ];
    }
});
