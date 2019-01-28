var Accordion = function (node,btn,box) {
    var accordion = {
        node: node,
        btn: btn,
        box:box,

        openBox: function () {
            var button = document.querySelectorAll(accordion.btn);

            [].forEach.call(button, function (btn) {
                btn.active = false;

                btn.addEventListener('click', function (e) {
                    e.preventDefault();

                    var node = btn.parentElement;
                    var container = node.parentElement;



                    var children = container.children;
                    var dropBox = node.querySelector(accordion.box);

                    // [].forEach.call(button, function (btn) {
                    //     btn.classList.remove('active');
                    // });

                    [].forEach.call(children, function (el) {
                        var dropBox = el.querySelector(accordion.box);
                        dropBox.classList.remove('active');

                        var button = el.querySelector(accordion.btn);
                        button.active = false;

                        button.classList.remove('active');
                    });

                    btn.classList.add('active');

                    dropBox.classList.add('active');

                    btn.active = true;
                })
            })
        },

        init: function () {
            accordion.openBox();
        }
    };

    return {
      init: accordion.init
    }
};

var menu = new Accordion(
    '[data-menu="container"]',
    '[data-menu="button"]',
    '[data-menu="dropBox"]'
);

menu.init();

var filter = new Accordion(
    '[data-filter="container"]',
    '[data-filter="button"]',
    '[data-filter="dropBox"]'
);

filter.init();
