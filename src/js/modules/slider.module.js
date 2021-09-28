import Swiper from "swiper/swiper-bundle";

export const carousel = () => {
    const carousel = new Swiper('.carousel', {
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

    const rooms = new Swiper('.slider-rooms__body', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        parallax: true,
        pagination: {
            el: '.slider-rooms__bullets',
            clickable: true
        },
        navigation: {
            nextEl: '.slider-rooms .slider-arrow--next',
            prevEl: '.slider-rooms .slider-arrow--prev'
        },
        breakpoints: {
            592: {
                slidesPerView: 'auto',
            }
        }
    });
};
