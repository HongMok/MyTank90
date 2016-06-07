var LevelConfig = cc.Class({

    ctor: function(){

    },

    properties: {
        id: 0,
        mapId: 0,
    },

    getId: function(){
        return this.id;
    }

});

LevelConfig._config = [];

LevelConfig.getConfigById = function( id ){
    for( var i = 0; i < LevelConfig._config.length; i++ ){
        if( LevelConfig._config[i].getId() == id ){
            return LevelConfig._config[i];
        }
    }
    return null;
};


module.exports = LevelConfig;