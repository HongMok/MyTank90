var SpriteComponent = require('SpriteComponent');
var TankLevelConfig = require('TankLevelConfig');
var TankConfig = require('TankConfig');

const MovingOffset = 5;

const AniBore = "aniBore";
const AniBomb = "aniTankBomb";

cc.Class({
    extends: SpriteComponent,

    properties: {
        tankLevelId: 1,
        currLifeIndex: 0,
        dir: 1,
        isMoving: false,
        isInvincible: false
    },

    onLoad: function () {
        this.aniCtl = this.node.getComponent( cc.Animation );
    },

    init: function(){
        if( null != this.sprite ){
            return ;
        }

        this.sprite = this.node.getComponent( cc.Sprite );
        this.movingCount = 0;
        this.moveAndColorIndex = 0;

        //this.endMvBore();
        //this.endMvBomb();
    },

    playMvBomb: function(){
        this.aniCtl.play( AniBomb, 0 );
    },

    endMvBomb: function(){
        this.aniCtl.stop( AniBomb );
    },

    playMvBore: function(){
        this.isInvincible = true;
        this.aniCtl.play( AniBore, 0 );
    },

    endMvBore: function(){
        this.aniCtl.stop( AniBore );
        this.isInvincible = false;
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
