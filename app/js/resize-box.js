var Resizing = function(node) {
    "use strict";

    var resizeBox = {

        node : node,

        dragObject: {},

        touches: {},
        
        // node : function() { return document.querySelector('[data-grid="container"]') },

        button : {
            leverHorizontal : function() { return resizeBox.node.querySelector('[data-grid="lever-horizontal"]') },
            leverVerticalCellLeft : function() { return resizeBox.node.querySelector('[data-grid="lever-vertical-cell-left"]') },
            leverVerticalCellRight : function() { return resizeBox.node.querySelector('[data-grid="lever-vertical-cell-right"]') },
            buttonHorizontal : function() { return resizeBox.button.leverHorizontal().querySelector('[data-grid="button-toggle"]') },
            buttonVerticalCellLeft : function() { return resizeBox.button.leverVerticalCellLeft().querySelector('[data-grid="button-toggle"]') },
            buttonVerticalCellRight : function() { return resizeBox.button.leverVerticalCellRight().querySelector('[data-grid="button-toggle"]') }
        },

        box : {
            cellLeft : function() { return resizeBox.node.querySelector('[data-grid="cell-left"]') },
            cellRight : function() { return resizeBox.node.querySelector('[data-grid="cell-right"]') },
            rowTopCellLeft : function() { return resizeBox.node.querySelector('[data-grid="row-top-cell-left"]') },
            rowBottomCellLeft : function() { return resizeBox.node.querySelector('[data-grid="row-bottom-cell-left"]') },
            rowTopCellRight : function() { return resizeBox.node.querySelector('[data-grid="row-top-cell-right"]') },
            rowBottomCellRight : function() { return resizeBox.node.querySelector('[data-grid="row-bottom-cell-right"]') }
        },

        getSizeBoxes : function (elem){
            var elemWidth = elem.getBoundingClientRect().right - elem.getBoundingClientRect().left;
            var elemHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;

            return {
                width: elemWidth,
                height: elemHeight
            };
        },

        setSizeBoxes : function() {
            resizeBox.box.cellLeft().style.width = resizeBox.getSizeBoxes(resizeBox.box.cellLeft()).width + 'px';
            resizeBox.box.cellRight().style.width = resizeBox.getSizeBoxes(resizeBox.box.cellRight()).width + 'px';

            resizeBox.box.rowTopCellLeft().style.height = resizeBox.getSizeBoxes(resizeBox.box.rowTopCellLeft()).height + 'px';
            resizeBox.box.rowBottomCellLeft().style.height = resizeBox.getSizeBoxes(resizeBox.box.rowBottomCellLeft()).height + 'px';

            resizeBox.box.rowTopCellRight().style.height = resizeBox.getSizeBoxes(resizeBox.box.rowTopCellRight()).height + 'px';
            resizeBox.box.rowBottomCellRight().style.height = resizeBox.getSizeBoxes(resizeBox.box.rowBottomCellRight()).height + 'px';
        },

        setSizeNode : function () {
            resizeBox.node.style.width = window.innerWidth + 'px';
            resizeBox.node.style.height = document.documentElement.clientHeight + 'px';
        },

        lever : function(e) {
            if (e.which !== 1) return;

            var elem = e.target;

            if (elem === resizeBox.button.leverHorizontal()) {
                resizeBox.dragObject = {};

                resizeBox.dragObject.elem = elem;

                resizeBox.dragObject.downX = e.pageX;

                resizeBox.setSizeBoxes();

                document.body.addEventListener('mousemove', resizeBox.resizeBoxX);

                return;
            }

            if (elem === resizeBox.button.leverVerticalCellLeft()) {
                resizeBox.dragObject = {};

                resizeBox.dragObject.elem = elem;

                resizeBox.dragObject.downY = e.pageY;

                resizeBox.setSizeBoxes();

                document.body.addEventListener('mousemove', resizeBox.resizeBoxYLeft);

                return;
            }

            if (elem === resizeBox.button.leverVerticalCellRight()) {
                resizeBox.dragObject = {};

                resizeBox.dragObject.elem = elem;

                resizeBox.dragObject.downY = e.pageY;

                resizeBox.setSizeBoxes();

                document.body.addEventListener('mousemove', resizeBox.resizeBoxYRight);

                return;
            }

            if (elem === resizeBox.button.buttonHorizontal()) {
                resizeBox.box.cellLeft().classList.toggle('page-grid__cell-hidden');

                resizeBox.box.cellRight().classList.toggle('page-grid__cell-full');

                return;
            }

            if (elem === resizeBox.button.buttonVerticalCellLeft())  {
                resizeBox.box.rowTopCellLeft().classList.toggle('page-grid__row-full');

                resizeBox.box.rowBottomCellLeft().classList.toggle('page-grid__row-hidden');

                return;
            }

            if (elem === resizeBox.button.buttonVerticalCellRight()) {
                resizeBox.box.rowTopCellRight().classList.toggle('page-grid__row-full');

                resizeBox.box.rowBottomCellRight().classList.toggle('page-grid__row-hidden');
            }
        },

        addBodyListenerMousedown : function () {
            document.body.addEventListener( 'mousedown', resizeBox.lever );
        },

        addBodyListenerMouseup : function () {
            document.body.addEventListener( 'mouseup', resizeBox.reset );

            document.body.addEventListener( 'touchend', resizeBox.reset );
        },

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

            resizeBox.box.rowTopCellLeft().style.height = parseInt(resizeBox.box.rowTopCellLeft().style.height) + moveY + 'px';

            resizeBox.box.rowBottomCellLeft().style.height = parseInt(resizeBox.box.rowBottomCellLeft().style.height) - moveY + 'px';

            resizeBox.dragObject.downY += moveY;
        },

        resizeBoxYRight: function(e) {
            if (!resizeBox.dragObject.elem) return; // элемент не зажат

            var moveY = e.pageY - resizeBox.dragObject.downY;

            resizeBox.box.rowTopCellRight().style.height = parseInt(resizeBox.box.rowTopCellRight().style.height) + moveY + 'px';

            resizeBox.box.rowBottomCellRight().style.height = parseInt(resizeBox.box.rowBottomCellRight().style.height) - moveY + 'px';

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
        },

        resetHideBox : function () {
            resizeBox.box.rowTopCellLeft().style.height = '';
            resizeBox.box.rowBottomCellLeft().style.height = '';
            resizeBox.box.rowTopCellRight().style.height = '';
            resizeBox.box.rowBottomCellRight().style.height = '';
        },

        windowResize : function () {
            window.addEventListener('resize', function() {
                resizeBox.setSizeNode();

                resizeBox.resetHideBox();
            });
        },

        //Touch.............................

        touchStartMove : function (e) {

            var elem = e.target;

            resizeBox.touches = e.changedTouches;

            // if (elem !== (resizeBox.button.leverVerticalCellLeft() || resizeBox.button.leverHorizontal() || resizeBox.button.leverVerticalCellRight())) return;

            resizeBox.dragObject.downX = resizeBox.touches[0].pageX;

            resizeBox.dragObject.downY = resizeBox.touches[0].pageY;

            var x = Math.round(resizeBox.touches[0].pageX);
            var y = Math.round(resizeBox.touches[0].pageY);

            resizeBox.box.rowTopCellRight().innerHTML = ' ...... ' + x + ' ...... ' + y;

            resizeBox.setSizeBoxes();

            resizeBox.addBodyListenerTouchMove();

            resizeBox.addBodyListenerTouchEnd();

            resizeBox.removeBodyListenerMousemove();
        },

        touchMove : function (e) {

            var elem = e.target;

            if (elem === resizeBox.button.leverHorizontal()) {

                resizeBox.touches = e.changedTouches;

                var moveX = resizeBox.touches[0].pageX - resizeBox.dragObject.downX;

                resizeBox.box.cellLeft().style.width = resizeBox.getSizeBoxes(resizeBox.box.cellLeft()).width + moveX + 'px';

                resizeBox.box.cellRight().style.width = resizeBox.getSizeBoxes(resizeBox.box.cellRight()).width - moveX + 'px';

                resizeBox.dragObject.downX += moveX;

                return;
            }

            if (elem === resizeBox.button.leverVerticalCellLeft()) {

                resizeBox.touches = e.changedTouches;

                var moveYL = resizeBox.touches[0].pageY - resizeBox.dragObject.downY;

                resizeBox.box.rowTopCellLeft().style.height = resizeBox.getSizeBoxes(resizeBox.box.rowTopCellLeft()).height + moveYL + 'px';

                resizeBox.box.rowBottomCellLeft().style.height = resizeBox.getSizeBoxes(resizeBox.box.rowBottomCellLeft()).height - moveYL + 'px';

                resizeBox.dragObject.downY += moveYL;

                return;
            }

            if (elem === resizeBox.button.leverVerticalCellRight()) {

                resizeBox.touches = e.changedTouches;

                var moveYR = resizeBox.touches[0].pageY - resizeBox.dragObject.downY;

                resizeBox.box.rowTopCellRight().style.height = resizeBox.getSizeBoxes(resizeBox.box.rowTopCellRight()).height + moveYR + 'px';

                resizeBox.box.rowBottomCellRight().style.height = resizeBox.getSizeBoxes(resizeBox.box.rowBottomCellRight()).height - moveYR + 'px';

                resizeBox.dragObject.downY += moveYR;
            }
        },

        touchEndMove : function () {
            resizeBox.dragObject = {};

            resizeBox.removeListenerTouch();
        },

        removeListenerTouch : function () {
            document.body.removeEventListener( 'touchmove', resizeBox.touchMove );

            document.body.removeEventListener( 'touchend', resizeBox.touchEndMove );
        },

        addBodyListenerTouchStart : function () {
            document.body.addEventListener( 'touchstart', resizeBox.touchStartMove );
        },

        addBodyListenerTouchMove : function () {
            document.body.addEventListener( 'touchmove', resizeBox.touchMove );
        },

        addBodyListenerTouchEnd : function () {
            document.body.addEventListener( 'touchend', resizeBox.touchEndMove );
        },

        //Touch.....End.....................

        init : function () {
            resizeBox.setSizeBoxes();

            resizeBox.addBodyListenerMousedown();

            resizeBox.addBodyListenerMouseup();

            resizeBox.setSizeNode();

            resizeBox.windowResize();

            resizeBox.addBodyListenerTouchStart();
        }
    };

    resizeBox.init();
};


var catalog = new Resizing(document.querySelector('[data-grid="container"]'));