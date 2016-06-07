cc.Class({
    extends: cc.Component,

    ctor: function(){
        cc.log('persisit node creat');
    },

    properties: {
        testPerfab: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
        cc.log('persist node on load');
    },

    say: function(){
        cc.log('Im persist');
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
