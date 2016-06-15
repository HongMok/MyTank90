var SpriteComponent = require('SpriteComponent');
var TankLevelConfig = require('TankLevelConfig');
var TankConfig = require('TankConfig');
var GlobalConfig = require('GlobalConfig');

const MovingOffset = 5;

const AniBore = "aniBore";
const AniBomb = "aniTankBomb";

cc.Class({
    extends: SpriteComponent,

    properties: {
        tankLevelId: 1,
        currLifeIndex: 0,
        dir: 1,
        speed: 30,
        isMoving: false,
        isInvincible: false
    },

    onLoad: function () {
        this.aniCtl = this.node.getComponent( cc.Animation );

        this.minPos = GlobalConfig.BlockWidth / 2;
        this.maxPos = GlobalConfig.BlockWidth * GlobalConfig.MapSize - this.minPos;
    },

    init: function(){
        if( null != this.sprite ){
            return ;
        }

        this.isMoving = false;

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

        this.refreshFrame();
    },

    playMvBore: function(){
        this.isInvincible = true;
        this.aniCtl.play( AniBore, 0 );
    },

    endMvBore: function(){
        this.aniCtl.stop( AniBore );
        this.isInvincible = false;

        this.setDir( this.dir );
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

    moveWithDir: function( dir ){
        this.setDir( dir );
        this.setIsMoving( true );
    },

    setDir: function( dir ){
        this._resetTankPosWhenDir( this.dir, dir );
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

        var move = this.speed * dt;
        switch( this.dir ){
            case 1:
                this.node.y += move;
                break;
            case 2:
                this.node.x += move;
                break;
            case 3:
                this.node.y -= move;
                break;
            case 4:
                this.node.x -= move;
                break;
        }

        this._checkOutSide();
    },

    _checkOutSide: function(){
        //出界判断
        if( this.node.x < this.minPos ){
            this.node.x = this.minPos;
        }
        if( this.node.x > this.maxPos ){
            this.node.x = this.maxPos;
        }
        if( this.node.y < this.minPos ){
            this.node.y = this.minPos;
        }
        if( this.node.y > this.maxPos ){
            this.node.y = this.maxPos;
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
    },

    /**
     * 变向时，要把tank放回 16 * n 的轨道上
     * */
    _resetTankPosWhenDir: function( oldDir, newDir ){
        var res = oldDir - newDir;
        if( res == 0 || res == 2 || res == -2 ){
            return ;        //同一轨道
        }

        var num ;
        var offset;
        var halfWidth = GlobalConfig.BlockWidth / 2;
        if( oldDir == 2 || oldDir == 4 ){
            num = parseInt( this.node.x / halfWidth );
            offset = this.node.x % halfWidth;
            if( offset > ( halfWidth / 2 ) ){
                num += 1;
            }
            this.node.x = num * halfWidth;  //reset x
        }
        else{
            num = parseInt( this.node.y / halfWidth );
            offset = this.node.y % halfWidth;
            if( offset > ( halfWidth / 2 ) ){
                num += 1;
            }
            this.node.y = num * halfWidth;  //reset y
        }
    }
});
