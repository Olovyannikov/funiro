import {navigation} from "./modules/navigation.module";
import {carousel} from "./modules/slider.module";
import {header} from "./modules/header.module";
import {products} from "./modules/products.module";

document.addEventListener('DOMContentLoaded', () => {
    header();
    navigation();
    products();
    carousel();
});
