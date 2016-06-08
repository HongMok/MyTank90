var TankConfig = cc.Class({

    ctor: function(
        tankId,
        namePrefix,
        id,
        level,
        moveAndColor,
        hasBonus
    ){
        this.tankId = tankId;
        this.namePrefix = namePrefix;
        this.id = id;
        this.level = level;
        this.moveAndColor = moveAndColor;
        this.hasBonus = hasBonus != null ? hasBonus : false;
    },

    properties: {
        tankId: 0,
        namePrefix: "",
        id: 0,
        level: 0,
        moveAndColor: [],
        hasBonus: false
    },

    getTankId: function(){
        return this.tankId;
    },

    getNamePrefix: function(){
        return this.namePrefix;
    },

    getId: function(){
        return this.id;
    },

    getLevel: function(){
        return this.level;
    },

    getMoveAndColor: function(){
        return this.moveAndColor;
    },

    getHasBonus: function(){
        return this.hasBonus;
    }
});

TankConfig._config = [
    new TankConfig( 1, "player", 1, 1, [ 1, 2 ] ),      //player1 4个等级
    new TankConfig( 2, "player", 1, 2, [ 1, 2 ] ),
    new TankConfig( 3, "player", 1, 3, [ 1, 2 ] ),
    new TankConfig( 4, "player", 1, 4, [ 1, 2 ] ),

    new TankConfig( 5, "enemy", 1, 1, [ 1, 2 ] ),
    new TankConfig( 6, "enemy", 1, 1, [ 1, 2, 3, 4 ], true ),

    new TankConfig( 7, "enemy", 2, 1, [ 1, 2 ] ),
    new TankConfig( 8, "enemy", 2, 1, [ 1, 2, 3, 4 ], true ),

    new TankConfig( 9, "enemy", 3, 1, [ 1, 2 ] ),
    new TankConfig( 10, "enemy", 3, 1, [ 1, 2, 3, 4 ], true ),

    new TankConfig( 11, "enemy", 4, 1, [ 1, 2 ] ),
    new TankConfig( 12, "enemy", 4, 1, [ 1, 2, 3, 4 ], true ),

    new TankConfig( 13, "enemy", 4, 2, [ 1, 2, 3, 4 ] ),
    new TankConfig( 14, "enemy", 4, 2, [ 1, 2, 3, 4, 5, 6 ], true ),

    new TankConfig( 15, "enemy", 4, 3, [ 1, 2, 3, 4 ] ),
    new TankConfig( 16, "enemy", 4, 3, [ 1, 2, 3, 4, 5, 6 ], true ),

    new TankConfig( 17, "enemy", 4, 4, [ 1, 2, 3, 4 ] ),
    new TankConfig( 18, "enemy", 4, 4, [ 1, 2, 3, 4, 5, 6 ], true )
];


TankConfig.getConfigByTankId = function( tankId ){
    for( var i = 0; i < TankConfig._config.length; i++ ){
        if( TankConfig._config[i].getTankId() == tankId ){
            return TankConfig._config[i];
        }
    }
    return null;
};


module.exports = TankConfig;
