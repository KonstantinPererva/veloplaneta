var Func = function (opt) {
    // var option = {
    //     width: opt.width || 500,
    //     height: opt.height || 300
    // };

    var option = Object.assign({
        width: 500,
        height: 300
    }, opt);

    var obj = {


        init: function () {
            console.log("test");
        }
    };

    return {
        init: obj.init
    }
};

var test = new Func();
test.init();