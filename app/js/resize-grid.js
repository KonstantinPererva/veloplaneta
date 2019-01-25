// Изменения областей сетки

class Resizing {
    constructor(node) {
        this.node = node;

        //tools
        this.dragObject = {};

        //resize buttons
        this.leverHorizontal = this.node.querySelector('[data-grid="lever-horizontal"]');
        this.leverVerticalCellLeft = this.node.querySelector('[data-grid="lever-vertical-cell-left"]');
        this.leverVerticalCellRight = this.node.querySelector('[data-grid="lever-vertical-cell-right"]');

        //boxes
        this.cellLeft = this.node.querySelector('[data-grid="cell-left"]');
        this.cellRight = this.node.querySelector('[data-grid="cell-right"]');
        this.rowTopCelLeft = this.cellLeft.querySelector('[data-grid="row-top"]');
        this.rowBottomCelLeft = this.cellLeft.querySelector('[data-grid="row-bottom"]');
        this.rowTopCelRight = this.cellRight.querySelector('[data-grid="row-top"]');
        this.rowBottomCelRight = this.cellRight.querySelector('[data-grid="row-bottom"]');

        //

    }

    getLeverHorizontal() {
        var lever = function(e) {
            if (e.which != 1) { // если клик правой кнопкой мыши
                return; // то он не запускает перенос
            }

            this.dragObject.elem = e.target;

            console.log(this.dragObject.elem);

            // запомнить координаты, с которых начат перенос объекта
            this.dragObject.downX = e.pageX;

            this.setWidthBoxes();
        };

        this.leverHorizontal.addEventListener( 'mousedown', lever );
    }

    moveLeverHorizontal() {
        var move = function(e) {
            if (!this.dragObject.elem) return; // элемент не зажат

            var moveX = e.pageX - this.dragObject.downX;

            console.log(moveX);

            this.cellLeft.style.width = parseInt(this.cellLeft.style.width) + moveX + 'px';
            this.cellRight.style.width = parseInt(this.cellRight.style.width) - moveX + 'px';
            this.dragObject.downX += moveX;
        };

        document.body.addEventListener('mousemove', move);
    }

    // getLeverVerticalLeft() {
    //     this.leverVerticalCellLeft.addEventListener('onmousedown', function(e) {
    //         if (e.which != 1) { // если клик правой кнопкой мыши
    //             return; // то он не запускает перенос
    //         }
    //
    //         var elem = e.target;
    //
    //         // if (elem != Resizing.leverVerticalCellLeft) return;
    //
    //         Resizing.dragObject.elemY = elem;
    //
    //         console.log(Resizing.dragObject.elemY);
    //
    //         // запомнить координаты, с которых начат перенос объекта
    //         Resizing.dragObject.downY = e.pageY;
    //     });
    // }

    setSizeBoxes() {
        this.cellLeft.style.width = this.getDataBox(this.cellLeft).width + 'px';
        this.cellRight.style.width = this.getDataBox(this.cellRight).width + 'px';

        this.rowTopCelLeft.style.height = this.getDataBox(this.rowTopCelLeft).height + 'px';
        this.rowBottomCelLeft.style.height = this.getDataBox(this.rowBottomCelLeft).height + 'px';
    }

    getDataBox(box) {
        var boxWidth = box.getBoundingClientRect().right - box.getBoundingClientRect().left;
        var boxHeight = box.getBoundingClientRect().bottom - box.getBoundingClientRect().top;
        return {
            width: boxWidth,
            height: boxHeight
        };
    }
    //
    // moveLeverVertical(e) {
    //     document.body.onmousemove = e => {
    //         if (!this.dragObject.elemY) return; // элемент не зажат
    //
    //         var moveY = e.pageY - this.dragObject.downY;
    //
    //         // console.log(moveY);
    //
    //         this.rowTopCelLeft.style.height = parseInt(this.rowTopCelLeft.style.height) + moveY + 'px';
    //         this.rowBottomCelLeft.style.height = parseInt(this.rowBottomCelLeft.style.height) - moveY + 'px';
    //         this.dragObject.downY += moveY;
    //     }
    // }

    resetLeverHorizontal() {
        document.body.addEventListener('mouseup', () => this.dragObject = {})
    }

    init() {
        this.setSizeBoxes();
        this.getLeverHorizontal();
        this.moveLeverHorizontal();

        // this.getLeverVerticalLeft();
        // this.moveLeverVertical();

        this.resetLeverHorizontal();
        // this.resetLeverVertical();
    }
}

var resizingHorizontalBoxes = new Resizing(document.querySelector('[data-grid="container"]'));

resizingHorizontalBoxes.init();