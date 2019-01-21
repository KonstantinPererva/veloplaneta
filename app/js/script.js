if (document.querySelector('.brand-gallery')) {
    var swiperBrendLogo = new Swiper('.brand-gallery', {
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 2,
        loop: false,
        spaceBetween: 0,
        centerInsufficientSlides: true,
        slideToClickedSlide: true,
        iOSEdgeSwipeDetection: true,
        scrollbar: {
            el: '.brand-gallery__scrollbar',
            draggable: true,
            dragSize: 90
        },
        on: {
            transitionStart: function () {
                console.log(this.activeIndex)
            }
        }

    });
}

if (document.querySelector('.brand-info')) {
    if (window.innerWidth >= 768) {
        var swiperBrendDescr = new Swiper('.brand-info', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            iOSEdgeSwipeDetection: true,
            resistanceRatio: 0,
            scrollbar: {
                el: '.brand-info__scrollbar',
                snapOnRelease: true,
            },
            mousewheel: {
                releaseOnEdges: true,
                invert: false,
                sensitivity: .1,
            }
        });
    }
}

if(document.querySelectorAll('[data-button-toggle]')) {
    var buttonToggle = document.querySelectorAll('[data-button-toggle]');

    Array.prototype.forEach.call(buttonToggle, function (btn) {
        btn.open = false;
    });

    Array.prototype.forEach.call(buttonToggle, function (btn) {
        btn.block = document.querySelector('.' + btn.dataset.buttonToggle);

        if (btn.querySelector('[data-button-text]')) {
            btn.text = btn.querySelector('[data-button-text]');
            btn.targetText = btn.text.textContent;
        }

        btn.addEventListener('click', function () {
            if (btn.open) {
                btn.block.style.height = '';
                btn.open = false;

                if (btn.querySelector('[data-button-text]')) {
                    btn.text.innerHTML = btn.targetText;
                }

                if (btn.block === document.querySelector('.address-dropdown__inner')) {
                    btn.block.style.boxShadow = '';
                }

                if (btn.dataset.buttonToggle === 'address-dropdown__inner') {
                    btn.style.transform = 'rotate(0)';
                }

            } else {
                btn.block.style.height = 'auto';
                btn.open = true;

                if (btn.querySelector('[data-button-text]')) {
                    btn.text.innerHTML = btn.text.dataset.buttonText;
                }

                if (btn.block === document.querySelector('.address-dropdown__inner')) {
                    btn.block.style.boxShadow = '0 3px 3px rgba(0,0,0,.2)';
                }

                if (btn.dataset.buttonToggle === 'address-dropdown__inner') {
                    btn.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
}

if(document.querySelectorAll('[data-open-popup]')) {
    var buttonOpenPopup = document.querySelectorAll('[data-open-popup]');
    var wrapper = document.querySelector('.wrapper');

    Array.prototype.forEach.call(buttonOpenPopup, function (btn) {
        btn.popup = document.querySelector('[data-popup=' + btn.dataset.openPopup + ']');
        btn.substrate = btn.popup.querySelector('[data-popup-substrate]');
        btn.close = btn.popup.querySelector('[data-popup-close]');

        btn.addEventListener('click', function () {
            btn.popup.style.display = 'block';
            wrapper.style.height = '100vh';
            wrapper.style.overflow = 'hidden';
        });

        btn.substrate.addEventListener('click', function () {
            btn.popup.style.display = 'none';
            wrapper.style.height = '';
            wrapper.style.overflow = '';
        });

        btn.close.addEventListener('click', function () {
            btn.popup.style.display = 'none';
            wrapper.style.height = '';
            wrapper.style.overflow = '';
        });
    });
}

if (document.querySelector('.message-list__item')) {
    var item = document.querySelectorAll('.message-list__item');

    item.getElementsList = function () {
        [].forEach.call(item, function (el) {
            el.btn = el.querySelector('.message-block');

            if (el.querySelector('.article-list')) {
                el.dropdown = el.querySelector('.article-list');
            }

            el.arrrow = el.querySelector('.message-block__ico');
        });
    };

    item.deodownListArticle = function () {
        [].forEach.call(item, function (el) {
            el.btn.addEventListener('click', function () {
                [].forEach.call(item, function (el) {
                    el.arrrow.classList.remove('message-block__ico_active');
                    el.dropdown.style.display = 'none';
                });

                el.dropdown.style.display = 'block';

                el.arrrow.classList.add('message-block__ico_active');
            })
        })
    };

    item.innit = function () {
        item.getElementsList();
        item.deodownListArticle()
    };

    item.innit()
}