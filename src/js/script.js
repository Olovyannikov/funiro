import {navigation} from "./modules/navigation.module";
import {swiper} from "./modules/slider.module";
import {header} from "./modules/header.module";

document.addEventListener('DOMContentLoaded', () => {
    header();
    navigation();
    swiper();
});
