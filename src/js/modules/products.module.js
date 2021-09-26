export const products = () => {
    const catalogList = document.querySelector('.catalog-list');
    const catalogMore = document.querySelector('#more');
    let prodQuantity = 0;
    let dataLength = null;

    const normalPrice = str => {
        return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    }

    if (catalogList) {
        const loadProducts = (quantity = 2) => {
            fetch('./../assets/db.json')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    dataLength = data.length;

                    catalogList.innerHTML = '';

                    for (let i = 0; i < dataLength; i++) {
                        if (i < quantity) {
                            let item = data[i];

                            catalogList.innerHTML += `
                                <article class="products__item item-product" data-pid="${item.id}">
                                    <div class="item-product__labels">
                                    <span class="item-product__label item-product__label--new">New</span>
                                    ${item.labels.map(label => `<span class="item-product__label item-product__label--${label.type}">${label.value}</span>`)}
                                    </div><a class="item-product__image" href="#">
                                      <picture>
                                        <source srcset="img/product-${item.id}@2x.webp 2x,img/product-${item.id}.webp" type="image/webp">
                                        <img srcset="img/product-${item.id}@2x.jpeg 2x" src="img/product-${item.id}.jpeg">
                                      </picture></a>
                                    <div class="item-product__body">
                                      <div class="item-product__content">
                                        <h5 class="item-product__title">${item.title}</h5>
                                        <p class="item-product__text">${item.text}</p>
                                      </div>
                                      <div class="item-product__prices">
                                          <span class="item-product__price">${item.price}</span>
                                          <span class="item-product__price item-product__price--old">${item.oldPrice}</span>
                                      </div>
                                      <div class="item-product__actions actions-product">
                                        <div class="actions-product__body">
                                          <button class="actions-product__button btn btn--light js-cart" type="button">Add to cart</button>
                                          <a class="actions-product__link" href="#">
                                            <svg width="24" height="24">
                                              <use href="img/sprite.svg#share"></use>
                                            </svg>Share</a><a class="actions-product__link" href="#">
                                            <svg width="24" height="24">
                                              <use href="img/sprite.svg#heart"></use>
                                            </svg>Like</a>
                                        </div>
                                      </div>
                                    </div>
                                  </article>
                            `;
                        }
                    }
                })
                .then(() => {
                    cartLogic();
                })
        }

        loadProducts(prodQuantity);

        catalogMore.addEventListener('click', () => {
            prodQuantity = prodQuantity + 3;

            loadProducts(prodQuantity);

            if (prodQuantity >= dataLength) {
                catalogMore.style.display = 'none';
            } else {
                catalogMore.style.display = 'block';
            }
        })
    }

    /* Cart */
    let price = 0;
    const cartBtn = document.querySelector('.cart__btn');
    const miniCartList = document.querySelector('.mini-cart__list');
    const fullPrice = document.querySelector('.mini-cart__sum');
    const cartCount = document.querySelector('.cart__count');

    const priceWithoutSpaces = str => str.replace(/\s/g, '');
    const plusFullPrice = currentPrice => price += currentPrice;
    const minusFullPrice = currentPrice => price -= currentPrice;
    const printFullPrice = () => fullPrice.textContent = `${normalPrice(price)} р`;
    const printQuantity = (num) => cartCount.textContent = num;

    const loadCartData = async (id = 1) => {
        await fetch('./../assets/db.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                for (let dataItem of data) {
                    if (dataItem.id === id.toString()) {
                        miniCartList.insertAdjacentHTML('afterbegin', `
                            <li class="mini-cart__item" data-pid="${dataItem.id}">
                                <article class="mini-cart__product mini-product">
                                    <div class="mini-product__image"><img src="./img/product-${dataItem.id}.jpeg" alt="${dataItem.title}" /></div>
                                    <div class="mini-product__content">
                                        <div class="mini-product__text">
                                            <h3 class="mini-product__title">${dataItem.title}</h3>
                                            <span class="mini-product__price">${normalPrice(dataItem.price)} р</span>
                                        </div>
                                        <button class="btn-reset mini-product__delete" aria-label="Удалить товар">
                                            Удалить
                                            <svg>
                                                <use href="img/sprite.svg#trash"></use>
                                            </svg>
                                        </button>
                                    </div>
                                </article>
                            </li>
                        `);

                        return dataItem
                    }
                }
            }).then((item) => {
                plusFullPrice(item.price);
                printFullPrice();
                let num = document.querySelectorAll('.mini-cart__list .mini-cart__item').length;
                cartCount.classList.add(num > 0 ? 'cart__count--visible' : '');
                printQuantity(num);

                if (num > 0) {
                    cartBtn.disabled = false;
                }
            })
    }

    const cartLogic = () => {
        const productBtn = document.querySelectorAll('.js-cart');
        productBtn.forEach(el => {
            el.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.pid;
                loadCartData(id);
                e.currentTarget.classList.add('product__btn--disabled');
                document.querySelector('.cart__btn').disabled = false;
            })
        })

        miniCartList.addEventListener('click', (e) => {
            if (e.target.classList.contains('mini-product__delete')) {

                const self = e.target;
                const parent = self.closest('.mini-cart__item');
                let price = parseInt(priceWithoutSpaces(parent.querySelector('.mini-product__price').textContent));
                const id = parent.dataset.pid;

                document.querySelector(`.js-cart[data-pid="${id}"]`).classList.remove('product__btn--disabled')
                parent.remove();

                minusFullPrice(price);
                printFullPrice();

                let num = document.querySelectorAll('.mini-cart__list .mini-cart__item').length;
                cartCount.textContent = num.toString();
                cartCount.classList.remove(num === 0 ? 'cart__count--visible' : '');
                if (num === 0) {
                    document.querySelector('.cart__btn').disabled = true;
                    document.querySelector('.mini-cart').classList.remove('mini-cart--visible');
                }
                printQuantity(num);
            }
        })
    }

}

