var swiperBrendLogo = new Swiper('.brand-gallery', {
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 2,
    loop: false,
    spaceBetween: 0,
    scrollbar: {
        el: '.brand-gallery__scrollbar',
        draggable: true,
        dragSize: 90
    }
});

var swiperBrendDescr = new Swiper('.brand-info', {
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
        el: '.brand-info__scrollbar',
        snapOnRelease: true,
    },
    mousewheel: {
        releaseOnEdges: true,
        invert: false,
        sensitivity: .1,
    },
});
