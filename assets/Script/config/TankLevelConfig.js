var TankLevelConfig = cc.Class({

    ctor: function(
        id,
        tankIdList
    ){
        this.id = id;
        this.tankIdList = tankIdList;
    },

    properties: {
        id: 0,
        tankIdList: [],         //有多少条生命，展示id从前到后
    },

    getId: function(){
        return this.id;
    },

    getTankIdList: function(){
        return this.tankIdList;
    }

});

TankLevelConfig._config = [
    new TankLevelConfig( 1, [ 1, 2, 3, 4 ] ),       //player1

    new TankLevelConfig( 2, [ 5 ] ),
    new TankLevelConfig( 3, [ 5, 6 ] ),
    new TankLevelConfig( 4, [ 7 ] ),
    new TankLevelConfig( 5, [ 7, 8 ] ),
    new TankLevelConfig( 6, [ 9 ] ),
    new TankLevelConfig( 7, [ 9, 10 ] ),
    new TankLevelConfig( 8, [ 11 ] ),
    new TankLevelConfig( 9, [ 11, 12 ] ),
    new TankLevelConfig( 10, [ 11, 13 ] ),
    new TankLevelConfig( 11, [ 11, 15 ] ),
    new TankLevelConfig( 12, [ 11, 17 ] ),
    new TankLevelConfig( 13, [ 11, 13, 14 ] ),
    new TankLevelConfig( 14, [ 11, 15, 16 ] ),
    new TankLevelConfig( 15, [ 11, 17, 18 ] )
];

TankLevelConfig.getConfigById = function( id ){
    for( var i = 0; i < TankLevelConfig._config.length; i++ ){
        if( TankLevelConfig._config[i].getId() == id ){
            return TankLevelConfig._config[i];
        }
    }
    return null;
};


module.exports = TankLevelConfig;