import Swiper from "swiper/swiper-bundle";

export const swiper = new Swiper('.carousel', {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    spaceBetween: 32,
    activeIndex: 2,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    breakpoints: {
        1600: {
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.carousel__next',
                prevEl: '.carousel__prev'
            },
            parallax: true,
        }
    }
});
