var GlobalConfig = require('GlobalConfig');

var GameHelper = cc.Class({

});

GameHelper.buildId = function( x, y ){
    return GlobalConfig.Mask * y + x;
};

GameHelper.parseId = function( id ){
    var x = parseInt( id % GlobalConfig.Mask );
    var y = parseInt( id / GlobalConfig.Mask );
    return [ y, x ];
};


module.exports = GameHelper;