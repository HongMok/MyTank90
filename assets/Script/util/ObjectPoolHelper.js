var AssetHelper = require('AssetHelper');

var ObjectPoolHelper = cc.Class({

});

const Map = {
    mvBore: AssetHelper.instantiateEnemy
};

ObjectPoolHelper._pool = {};

ObjectPoolHelper.push = function( objName, obj ){
    var arr = ObjectPoolHelper._pool[ objName ];
    if( arr == null ){
        arr = [ obj ];
    }
    else{
        arr.push( obj );
    }
};

ObjectPoolHelper.pop = function( objName ){
    var arr = ObjectPoolHelper._pool[ objName ];
    if( null == arr || arr.length == 0 ){
        return Map[ objName ]();
    }
};


module.exports = ObjectPoolHelper;
