// Измененя областей


class Resizing {
    constructor() {
        //Tools
        this.Coord = {};
        this.Coord.Start = false;

        // resize button
        this.ResLR = document.querySelector('#resLRgm');
        this.ResTBaside = document.querySelector('#resTBgmAside');
        this.ResTBtable = document.querySelector('#resTBgmTable');

        //BOXES
        this.LeftContainer = this.ResLR.parentNode;
        this.LeftContainerTop = this.ResTBaside.previousElementSibling;
        this.LeftContainerBottom = this.ResTBaside.nextElementSibling;
        this.RightContainerTop = document.querySelector('#contTBgmTopTable');
        this.RightContainerBottom = document.querySelector('#contTBgmTable');
        this.HeaderTableToRightContainer = document.querySelector('.head-tab-box');

        //static resize boolean
        this.ResLRHid = false;
        this.ResTBasideHid = false;
        this.ResTBtableHid = false;
        this.ResBContainerHid = false;

        //dynamic resize boolean
        this.ResLRHidDynamic = false;
        this.ResTBasideHidDynamic = false;
        this.ResTBtableHidDynamic = false;

        // intializ Functions
        this.resizeWindow();
        this.Events();
    }

    resizeWindow() {
        var S = this;

        var top_panel = S.HeaderTableToRightContainer.clientHeight;
        var bx_panel = document.querySelector('#bx-panel-top');
        if (bx_panel)
            top_panel += bx_panel.clientHeight;

        S.RightContainerTop.style.height = S.RightContainerTop.clientHeight + (window.innerHeight - (S.RightContainerBottom.clientHeight + S.RightContainerTop.clientHeight)) - 140 - top_panel -30 + 'px';
        S.LeftContainerTop.firstElementChild.style.height = S.LeftContainerTop.firstElementChild.clientHeight + (window.innerHeight - (S.LeftContainerBottom.clientHeight + S.LeftContainerTop.firstElementChild.clientHeight)) - 15 - top_panel -30 + 'px';
    }

    Events() {
        var S = this;

        // Resize Window
        window.addEventListener('resize', function (e) {
            S.resizeWindow();
        });

        // Static Resize Events
        S.ResLR.firstElementChild.addEventListener('click', function (e) {
            if (S.ResLRHidDynamic) return;

            if (!S.ResTBasideHid)
                S.SPTopResTBaside = S.LeftContainerTop.firstElementChild.clientHeight;

            S.RightToLeftHid();
        });
        S.ResTBaside.firstElementChild.addEventListener('click', function (e) {
            if (S.ResTBasideHidDynamic) return;
            if (!S.ResTBasideHid) {
                S.SPTopResTBaside = S.LeftContainerTop.firstElementChild.clientHeight;
                S.SPBottomResTBaside = S.LeftContainerBottom.clientHeight;
            }
            S.TopToBottomAsideHid();
        });
        S.ResTBtable.firstElementChild.addEventListener('click', function (e) {
            if (S.ResTBtableHidDynamic) return;

            if (!S.ResTBtableHid) {
                S.SPTopResTBtable = S.RightContainerTop.clientHeight;
                S.SPBottomResTBtable = S.RightContainerBottom.clientHeight;
            }

            S.TopToBottomTableHid();

            S.ResTBtableHid = !S.ResTBtableHid;
        });

        // Dynamic Resize Events
        S.ResLR.addEventListener('mousedown', function (e) {
            S.StartPositin = S.LeftContainer.clientWidth;
            S.ResLRHidDynamic = true;
        });
        S.ResTBaside.addEventListener('mousedown', function (e) {
            S.SPTopResTBasideDynamic = S.LeftContainerTop.clientHeight;
            S.SPBottomResTBasideDynamic = S.LeftContainerBottom.clientHeight;
            S.ResTBasideHidDynamic = true;
        });
        S.ResTBtable.addEventListener('mousedown', function (e) {
            S.SPTopResTBtableDynamic = S.RightContainerTop.clientHeight;
            S.SPBottomResTBtableDynamic = S.RightContainerBottom.clientHeight;
            S.ResTBtableHidDynamic = true;
        });
        document.body.addEventListener('mousemove', function (e) {
            if (!S.ResLRHidDynamic && !S.ResTBasideHidDynamic && !S.ResTBtableHidDynamic) return;


            if (S.Coord.Start == false) {

                S.Coord.Start = true;
                S.Coord.StartX = e.pageX;
                S.Coord.StartY = e.pageY;

            }

            if (S.ResLRHidDynamic) {
                S.DoDragResLR(e);
            }
            else if (S.ResTBasideHidDynamic) {
                S.DoDragResTBaside(e);
            }
            else if (S.ResTBtableHidDynamic)
                S.DoDragResTBtable(e);

        });
        document.body.addEventListener('mouseup', function (e) {

            if (S.ResLRHidDynamic || S.ResTBasideHidDynamic || S.ResTBtableHidDynamic) {

                S.ResLRHidDynamic = false;
                S.ResTBasideHidDynamic = false;
                S.ResTBtableHidDynamic = false;
                S.Coord.Start = false;

            }

        });

        //ANIMATE
        S.LeftContainerTop.firstElementChild.addEventListener('transitionend', function (e) {

            if (S.ResTBasideHid)
                S.LeftContainerBottom.style.display = '';

            S.LeftContainerTop.firstElementChild.classList.remove('heightAnimate');

            S.ResTBasideHid = !S.ResTBasideHid;
        });
        S.RightContainerBottom.addEventListener('transitionend', function (e) {
            S.RightContainerTop.classList.remove('heightAnimate');
            S.RightContainerBottom.classList.remove('heightAnimate');
        });
        S.LeftContainer.addEventListener('transitionend', function (e) {
            S.LeftContainer.classList.remove('widthtAnimate');
        });

    }

    // Static Resize Function
    RightToLeftHid() {
        var S = this;


        if (!S.LeftContainer.classList.contains('widthtAnimate'))
            S.LeftContainer.classList.add('widthtAnimate');


        if (S.ResLRHid) {
            S.LeftContainerTop.style.width = '';
            S.LeftContainerTop.firstElementChild.style.height = S.LeftContainer.clientHeight + 'px';

            if (!S.ResBContainerHid)
                S.LeftContainerBottom.style.display = '';
            S.ResTBaside.style.display = '';
            S.LeftContainer.style.marginLeft = 0 + 'px';
            S.hidDynamicLine(true);
        }
        else {
            S.LeftContainerTop.style.width = '0px';
            S.LeftContainerTop.firstElementChild.style.height = S.LeftContainer.clientHeight - S.LeftContainerBottom.clientHeight;
            S.LeftContainerBottom.style.display = 'none';
            S.ResTBaside.style.display = 'none';

            var marg = 10;
            if (screen.width > 1525) {
                marg = 15;
            }

            S.LeftContainer.style.marginLeft = (-S.LeftContainer.clientWidth - marg) + 'px';
            S.hidDynamicLine(false);
        }

        S.ResLRHid = !S.ResLRHid;
    }

    TopToBottomAsideHid() {
        var S = this;

        S.LeftContainerTop.firstElementChild.classList.add('heightAnimate');


        if (S.ResTBasideHid) {
            S.LeftContainerBottom.style.height = S.SPBottomResTBaside + 'px';
            S.ResBContainerHid = false;
            S.LeftContainerTop.firstElementChild.style.height = S.SPTopResTBaside + 3 + 'px';
        }
        else {
            var newHeight = S.SPTopResTBaside + S.SPBottomResTBaside;

            S.LeftContainerTop.firstElementChild.style.height = newHeight + 'px';

            S.LeftContainerBottom.style.display = 'none';
            S.ResBContainerHid = true;
        }
    }

    TopToBottomTableHid() {
        var S = this;
        if (!S.RightContainerTop.classList.contains('heightAnimate')) {

            S.RightContainerTop.classList.add('heightAnimate');
            S.RightContainerBottom.classList.add('heightAnimate');
        }


        if (S.ResTBtableHid) {
            S.RightContainerTop.style.height = S.SPTopResTBtable + 'px';
            S.RightContainerBottom.style.height = S.SPBottomResTBtable + 'px';
        }
        else {
            var newHeight = S.RightContainerTop.clientHeight + S.RightContainerBottom.clientHeight;

            S.RightContainerTop.style.height = newHeight + 'px';
            S.RightContainerBottom.style.height = 0 + 'px';

        }
    }

    // Dynamic Resize Function
    DoDragResLR(e) {
        var S = this;

        if (S.ResLRHid) return;

        S.Coord.X = e.pageX;
        S.Coord.Y = e.pageY;

        S.clearSelection();
        S.LeftContainer.style.width = S.StartPositin + (S.Coord.X - S.Coord.StartX) + 'px';
    }

    DoDragResTBaside(e) {
        var S = this;
        S.clearSelection();

        S.Coord.X = e.pageX;
        S.Coord.Y = e.pageY;

        var newHeightTop = S.SPTopResTBasideDynamic + (S.Coord.Y - S.Coord.StartY);
        var newHeightBottom = S.SPBottomResTBasideDynamic + -(S.Coord.Y - S.Coord.StartY) + 2;

        if (newHeightTop < 10 || newHeightBottom < 200) return;

        S.LeftContainerTop.firstElementChild.style.height = newHeightTop + 'px';
        S.LeftContainerBottom.style.height = newHeightBottom + 'px';
    }

    DoDragResTBtable(e) {
        var S = this;


        S.Coord.X = e.pageX;
        S.Coord.Y = e.pageY;

        var newHeightTop = S.SPTopResTBtableDynamic + (S.Coord.Y - S.Coord.StartY);
        var newHeightBottom = S.SPBottomResTBtableDynamic + -(S.Coord.Y - S.Coord.StartY) - 29;
        var newHeightBottomTable = S.SPBottomResTBScrolltableDynamic + -(S.Coord.Y - S.Coord.StartY);

        if (newHeightTop < 0 || newHeightBottom < 60) return;

        S.clearSelection();
        S.RightContainerTop.style.height = newHeightTop + 'px';
        var acttabs = S.RightContainerBottom.querySelectorAll('.tab-body.gmcart');
        acttabs.forEach(function (item) {
            var scroll = item.querySelector('.scroll-box');
            scroll.style.height = newHeightBottom - 50 + 'px';
            item.style.height = newHeightBottom + 'px';
        });
    }

    hidDynamicLine(_case) {
        var S = this;
        if (!_case)
            S.ResLR.style.cursor = 'default';
        else S.ResLR.style.cursor = '';
    }

    clearSelection() {
        if (window.getSelection)
            window.getSelection().removeAllRanges();
        else
            document.selection.empty();
    }


}