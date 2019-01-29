var Func = function (opt) {
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