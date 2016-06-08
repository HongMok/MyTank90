var SpriteComponent = require('SpriteComponent');
var TankLevelConfig = require('TankLevelConfig');
var TankConfig = require('TankConfig');

const MovingOffset = 5;

cc.Class({
    extends: SpriteComponent,

    properties: {
        tankLevelId: 1,
        currLifeIndex: 0,
        dir: 1,
        isMoving: true
    },

    onLoad: function () {

    },

    init: function(){
        if( null != this.sprite ){
            return ;
        }

        this.sprite = this.node.getComponent( cc.Sprite );
        this.movingCount = 0;
        this.moveAndColorIndex = 0;
    },

    setTankLevelId: function( tankLevelId ){
        this.init();

        this.tankLevelId = tankLevelId;
        this.tankLevelConfig = TankLevelConfig.getConfigById( this.tankLevelId );
        this.tankIdList = this.tankLevelConfig.getTankIdList();
        this.currLifeIndex = 0;

        cc.log('set tank level, life:' + this.tankIdList );

        this._refreshLife();
        this.refreshFrame();
    },

    _refreshLife: function(){
        this.tankConfig = TankConfig.getConfigByTankId( this.tankIdList[ this.currLifeIndex ] );
        this.moveAndColorList = this.tankConfig.getMoveAndColor();
    },

    addLife: function( add ){
        this.currLifeIndex += add;
        if( this.currLifeIndex >= this.tankIdList.length ){
            this.currLifeIndex = this.tankIdList.length - 1;
        }

        cc.log('add life, life:' + this.currLifeIndex );

        this._refreshLife();
        this.refreshFrame();
    },

    decLife: function( dec ){
        this.currLifeIndex -= dec;
        if( this.currLifeIndex < 0 ){
            this.currLifeIndex = 0;
        }

        cc.log('dec life, life:' + this.currLifeIndex );

        this._refreshLife();
        this.refreshFrame();
    },

    setDir: function( dir ){
        this.dir = dir;
        this.refreshFrame();
    },

    setIsMoving: function( isMoving ){
        this.isMoving = isMoving;
    },

    updateFrame: function( dt ){
        this._updateMoving( dt );
    },

    _updateMoving: function( dt ){
        if( this.isMoving == false ){
            return ;
        }

        this.movingCount++;
        if( this.movingCount >= MovingOffset ){
            this.movingCount = 0;
            this._changeMovingFrame();
        }
    },

    _changeMovingFrame: function(){
        this.moveAndColorIndex++;
        if( this.moveAndColorIndex >= this.moveAndColorList.length ){
            this.moveAndColorIndex = 0;
        }

        this.refreshFrame();
    },

    refreshFrame: function(){
        this.setFrameByName( this._buildFrameName() );
    },

    _buildFrameName: function(){
        return this.tankConfig.getNamePrefix() +
                this.tankConfig.getId() + "_" +
                this.tankConfig.getLevel() + "_" +
                this.dir + "_" +
                this.moveAndColorList[ this.moveAndColorIndex ];
    }
});
