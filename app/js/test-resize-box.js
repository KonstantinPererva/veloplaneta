var Resizing = function(opt) {
    "use strict";

    var option = Object.assign({
        direction: 'horizontal', //'horizontal' or 'vertical'
        node: undefined,
        btn: undefined,
        boxLeft: undefined,
        boxRight: undefined,
        boxTop: undefined,
        boxBottom: undefined
    }, opt);

    var resizeBox = {
        resize: true,
        dragObject: {},
        touches: {},

        node: function () {
            if (!resizeBox.resize) return;
            return document.querySelector(option.node) || null;
        },

        btn: function () {
            if (!resizeBox.resize) return;
            return resizeBox.node().querySelector(option.btn) || null;
        },

        boxLeft: function () {
            if (!resizeBox.resize) return;
            return resizeBox.node().querySelector(option.boxLeft) || null;
        },

        boxRight: function () {
            if (!resizeBox.resize) return;
            return resizeBox.node().querySelector(option.boxRight) || null;
        },

        boxTop: function () {
            if (!resizeBox.resize) return;
            return resizeBox.node().querySelector(option.boxTop) || null;
        },

        boxBottom: function () {
            return resizeBox.node().querySelector(option.boxBottom);
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
            if (option.direction === 'horizontal') {
                resizeBox.boxLeft().style.width = resizeBox.getSizeBoxes(resizeBox.boxLeft()).width + 'px';
                resizeBox.boxRight().style.width = resizeBox.getSizeBoxes(resizeBox.boxRight()).width + 'px';

                return
            }

            if (option.direction === 'vertical') {
                resizeBox.boxTop().style.height = resizeBox.getSizeBoxes(resizeBox.boxTop()).height + 'px';
                resizeBox.boxBottom().style.height = resizeBox.getSizeBoxes(resizeBox.boxBottom()).height + 'px';
            }
        },

        lever : function(e) {
            if (e.which !== 1) return;

            var elem = e.target;

            if (option.direction === 'horizontal' && elem === resizeBox.btn()) {
                resizeBox.setSizeBoxes();

                resizeBox.dragObject = {};

                resizeBox.dragObject.elem = elem;

                resizeBox.dragObject.downX = e.pageX;

                document.body.addEventListener('mousemove', resizeBox.resizeX);

                return;
            }

            if (option.direction === 'vertical' && elem === resizeBox.btn()) {
                resizeBox.dragObject = {};

                resizeBox.dragObject.elem = elem;

                resizeBox.dragObject.downY = e.pageY;

                document.body.addEventListener('mousemove', resizeBox.resizeY);
            }

            //click btn
            // if (elem === resizeBox.button.buttonHorizontal()) {
            //     resizeBox.box.cellLeft().classList.toggle('page-grid__cell-hidden');
            //
            //     resizeBox.box.cellRight().classList.toggle('page-grid__cell-full');
            //
            //     return;
            // }
            //
            // if (elem === resizeBox.button.buttonVerticalCellLeft())  {
            //     resizeBox.box.rowTopCellLeft().classList.toggle('page-grid__row-full');
            //
            //     resizeBox.box.rowBottomCellLeft().classList.toggle('page-grid__row-hidden');
            //
            //     return;
            // }
            //
            // if (elem === resizeBox.button.buttonVerticalCellRight()) {
            //     resizeBox.box.rowTopCellRight().classList.toggle('page-grid__row-full');
            //
            //     resizeBox.box.rowBottomCellRight().classList.toggle('page-grid__row-hidden');
            // }
        },

        addBodyListenerMousedown : function () {
            return document.body.addEventListener( 'mousedown', resizeBox.lever );
        },

        addBodyListenerMouseup : function () {
            return document.body.addEventListener( 'mouseup', resizeBox.reset );
        },

        resizeX: function(e) {
            if (!resizeBox.dragObject.elem) return; // элемент не зажат

            var moveX = e.pageX - resizeBox.dragObject.downX;

            resizeBox.dragObject.downX += moveX;

            resizeBox.boxLeft().style.width = parseInt(resizeBox.boxLeft().style.width) + moveX + 'px';

            resizeBox.boxRight().style.width = parseInt(resizeBox.boxRight().style.width) - moveX + 'px';
        },

        resizeY: function(e) {
            if (!resizeBox.dragObject.elem) return; // элемент не зажат

            var moveY = e.pageY - resizeBox.dragObject.downY;

            resizeBox.dragObject.downY += moveY;

            resizeBox.boxTop().style.height = resizeBox.getSizeBoxes(resizeBox.boxTop()).height + moveY + 'px';

            resizeBox.boxBottom().style.height = resizeBox.getSizeBoxes(resizeBox.boxBottom()).height  - moveY + 'px';
        },

        removeBodyListenerMousemove: function () {
            document.body.removeEventListener('mousemove', resizeBox.resizeX);

            document.body.removeEventListener('mousemove', resizeBox.resizeY);

            document.body.removeEventListener('mouseup', resizeBox.reset);
        },

        reset : function () {
            resizeBox.dragObject = {};

            resizeBox.removeBodyListenerMousemove();
        },

        resetHideBox : function () {
            if(option.direction === 'horizontal') {
                resizeBox.boxLeft().style.width = '';
                resizeBox.boxRight().style.width = '';
            }

            if(option.direction === 'vertical') {
                resizeBox.boxTop().style.height = '';
                resizeBox.boxBottom().style.height = '';
            }

        },

        windowResize : function () {
            window.addEventListener('resize', resizeBox.resetHideBox);
        },

        //Touch.............................

        touchStartMove : function (e) {

            var elem = e.target;

            resizeBox.touches = e.changedTouches;

            if (!(elem === resizeBox.button.leverVerticalCellLeft()) &&
                !(elem === resizeBox.button.leverHorizontal()) &&
                !(elem === resizeBox.button.leverVerticalCellRight())) return;

            resizeBox.dragObject.downX = resizeBox.touches[0].pageX;

            resizeBox.dragObject.downY = resizeBox.touches[0].pageY;

            resizeBox.addBodyListenerTouchMove();

            resizeBox.addBodyListenerTouchEnd();

            // resizeBox.removeBodyListenerMousemove();
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
            resizeBox.addBodyListenerMousedown();

            resizeBox.addBodyListenerMouseup();

            resizeBox.windowResize();

            resizeBox.addBodyListenerTouchStart();
        },

        unresize: function () {
            resizeBox.resize = false;
            resizeBox.init();
        }
    };

    return {
        unresize: resizeBox.unresize,

        init: resizeBox.init
    }
};