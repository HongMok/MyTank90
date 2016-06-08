var TankComponent = require('TankComponent');
var GlobalConfig = require('GlobalConfig');
var TankConfig = require('TankConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        tank: TankComponent
    },

    onLoad: function () {
        this.addKeyListener();
        this.tankLevelId = 13;
        this.tank.setTankLevelId( this.tankLevelId );

        var tankConfig = TankConfig.getConfigByTankId( 16 );
    },

    addKeyListener: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function( keyCode, event ){
                switch( keyCode ){
                    case GlobalConfig.Up1:
                        self.changeTankDir( GlobalConfig.Dir_Up );
                        break;
                    case GlobalConfig.Down1:
                        self.changeTankDir( GlobalConfig.Dir_Down );
                        break;
                    case GlobalConfig.Left1:
                        self.changeTankDir( GlobalConfig.Dir_Left );
                        break;
                    case GlobalConfig.Right1:
                        self.changeTankDir( GlobalConfig.Dir_Right );
                        break;
                    case GlobalConfig.Up2:
                        self.addTankLife();
                        break;
                    case GlobalConfig.Down2:
                        self.decTankLife();
                        break;
                    case GlobalConfig.Shoot1:
                        self.changeTank();
                        break;
                }
            },
            onKeyReleased: function( keyCode, event ){
                switch( keyCode ){
                    //case GlobalConfig.Shoot1:
                    //    self.isSetting = false;
                    //    break;
                }
            }
        }, this.node);
    },

    changeTank: function(){
        this.tank.setTankLevelId( ++this.tankLevelId );
    },

    addTankLife: function(){
        this.tank.addLife(1);
    },

    decTankLife: function(){
        this.tank.decLife(1);
    },

    changeTankDir: function( dir ){
        this.tank.setDir( dir );
    },

    update: function (dt) {
        this.tank.updateFrame( dt );
    },
});
