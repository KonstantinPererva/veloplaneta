(function () {
    "use strict";

    var resizeBox = {
        dragObject: {},
        
        node : function() { return document.querySelector('[data-grid="container"]') },

        button : {
            leverHorizontal : function() { return resizeBox.node().querySelector('[data-grid="lever-horizontal"]') },
            leverVerticalCellLeft : function() { return resizeBox.node().querySelector('[data-grid="lever-vertical-cell-left"]') },
            leverVerticalCellRight : function() { return resizeBox.node().querySelector('[data-grid="lever-vertical-cell-right"]') }
        },

        box : {
            cellLeft : function() { return resizeBox.node().querySelector('[data-grid="cell-left"]') },
            cellRight : function() { return resizeBox.node().querySelector('[data-grid="cell-right"]') },
            rowTopCelLeft : function() { return resizeBox.node().querySelector('[data-grid="row-top-cell-left"]') },
            rowBottomCelLeft : function() { return resizeBox.node().querySelector('[data-grid="row-bottom-cell-left"]') },
            rowTopCelRight : function() { return resizeBox.node().querySelector('[data-grid="row-top-cell-right"]') },
            rowBottomCelRight : function() { return resizeBox.node().querySelector('[data-grid="row-bottom-cell-right"]') }
        },

        getDataBox : function (elem){
            var elemWidth = elem.getBoundingClientRect().right - elem.getBoundingClientRect().left;
            var elemHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;

            return {
                width: elemWidth,
                height: elemHeight
            };
        },

        setSizeBoxes : function() {
            resizeBox.box.cellLeft().style.width = resizeBox.getDataBox(resizeBox.box.cellLeft()).width + 'px';

            resizeBox.box.cellRight().style.width = resizeBox.getDataBox(resizeBox.box.cellRight()).width + 'px';

            resizeBox.box.rowTopCelLeft().style.height = resizeBox.getDataBox(resizeBox.box.rowTopCelLeft()).height + 'px';

            resizeBox.box.rowBottomCelLeft().style.height = resizeBox.getDataBox(resizeBox.box.rowBottomCelLeft()).height + 'px';

            resizeBox.box.rowTopCelRight().style.height = resizeBox.getDataBox(resizeBox.box.rowTopCelRight()).height + 'px';

            resizeBox.box.rowBottomCelRight().style.height = resizeBox.getDataBox(resizeBox.box.rowBottomCelRight()).height + 'px';
        },

        lever : function(e) {
            if (e.which !== 1) return;

            var elem = e.target;

            if (elem === resizeBox.button.leverHorizontal()) {
                resizeBox.dragObject = {};

                resizeBox.dragObject.elem = elem;

                resizeBox.dragObject.downX = e.pageX;

                document.body.addEventListener('mousemove', resizeBox.resizeBoxX);

                return;
            }

            if (elem === resizeBox.button.leverVerticalCellLeft()) {
                resizeBox.dragObject = {};

                resizeBox.dragObject.elem = elem;

                resizeBox.dragObject.downY = e.pageY;

                document.body.addEventListener('mousemove', resizeBox.resizeBoxYLeft);

                return;
            }

            if (elem === resizeBox.button.leverVerticalCellRight()) {
                resizeBox.dragObject = {};

                resizeBox.dragObject.elem = elem;

                resizeBox.dragObject.downY = e.pageY;

                document.body.addEventListener('mousemove', resizeBox.resizeBoxYRight);

                return;
            }
        },

        addBodyListenerMousedown : function () { document.body.addEventListener( 'mousedown', resizeBox.lever ) },

        addBodyListenerMouseup : function () { document.body.addEventListener('mouseup', resizeBox.reset) },

        resizeBoxX: function(e) {
            if (!resizeBox.dragObject.elem) return; // элемент не зажат

            var moveX = e.pageX - resizeBox.dragObject.downX;

            resizeBox.box.cellLeft().style.width = parseInt(resizeBox.box.cellLeft().style.width) + moveX + 'px';

            resizeBox.box.cellRight().style.width = parseInt(resizeBox.box.cellRight().style.width) - moveX + 'px';

            resizeBox.dragObject.downX += moveX;
        },

        resizeBoxYLeft: function(e) {
            if (!resizeBox.dragObject.elem) return; // элемент не зажат

            var moveY = e.pageY - resizeBox.dragObject.downY;

            resizeBox.box.rowTopCelLeft().style.height = parseInt(resizeBox.box.rowTopCelLeft().style.height) + moveY + 'px';

            resizeBox.box.rowBottomCelLeft().style.height = parseInt(resizeBox.box.rowBottomCelLeft().style.height) - moveY + 'px';

            resizeBox.dragObject.downY += moveY;
        },

        resizeBoxYRight: function(e) {
            if (!resizeBox.dragObject.elem) return; // элемент не зажат

            var moveY = e.pageY - resizeBox.dragObject.downY;

            resizeBox.box.rowTopCelRight().style.height = parseInt(resizeBox.box.rowTopCelRight().style.height) + moveY + 'px';

            resizeBox.box.rowBottomCelRight().style.height = parseInt(resizeBox.box.rowBottomCelRight().style.height) - moveY + 'px';

            resizeBox.dragObject.downY += moveY;
        },

        removeBodyListenerMousemove: function () {
            document.body.removeEventListener('mousemove', resizeBox.resizeBoxX);

            document.body.removeEventListener('mousemove', resizeBox.resizeBoxYLeft);

            document.body.removeEventListener('mousemove', resizeBox.resizeBoxYRight);
        },

        reset : function () {
            resizeBox.dragObject = {};

            resizeBox.removeBodyListenerMousemove();

            resizeBox.setSizeBoxes();
        },

        init : function () {
            resizeBox.setSizeBoxes();

            resizeBox.addBodyListenerMousedown();

            resizeBox.addBodyListenerMouseup();
        }
    };

    resizeBox.init();
})();