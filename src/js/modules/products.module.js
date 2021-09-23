export const products = () => {
    const moreBtn = document.querySelector('#more');

    moreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        getProducts(moreBtn);

    });

    const getProducts = async (trigger) => {
        if (!trigger.classList.contains('_load')) {
            trigger.classList.add('_load');
            const data = "./assets/db.json";
            let response = await fetch(data, {
                method: "GET"
            });

            if (response.ok) {
                let result = await response.json();
                loadProducts(result);
                trigger.classList.remove('_load');
                trigger.remove();
            } else {
                trigger.insertAdjacentHTML('afterend', `<p class='error'>Ошибка</p>`)
            }
        }
    }

    const loadProducts = (data) => {
        const productContainer = document.querySelector('.products__items');

        data.products.forEach(item => {
            const productId = item.id;
            const productTitle = item.title;
            const productText = item.text;
            const productUrl = item.url;
            const productImage = './img/product-' + item.id;
            const productPrice = item.price;
            const productOldPrice = item.oldPrice;
            const productLabels = item.labels;

            let template = `
                <article class="products__item item-product" data-pid="${productId}">
                <div class="item-product__labels">
                    ${productLabels.map(item =>
                `<span class="item-product__label item-product__label--${item.type}">
                            ${item.value}
                            </span>`
            )}
                </div>
                <a class="item-product__image" href="#">
                  <picture>
                    <source srcset="${productImage}@2x.webp 2x,${productImage}.webp" type="image/webp"><img srcset="${productImage}@2x.jpeg 2x" src="${productImage}.jpeg">
                  </picture>
                  </a>
                <div class="item-product__body">
                  <div class="item-product__content">
                    <h5 class="item-product__title">${productTitle}</h5>
                    <p class="item-product__text">${productText}</p>
                  </div>
                  <div class="item-product__prices"><span class="item-product__price">${productPrice}</span><span class="item-product__price item-product__price--old">${productOldPrice}</span>
                  </div>
                  <div class="item-product__actions actions-product">
                    <div class="actions-product__body"><a class="actions-product__button btn btn--light" href="#">Add to cart</a><a class="actions-product__link" href="#">
                        <svg width="24" height="24">
                          <use href="img/sprite.svg#share"></use>
                        </svg>Share</a><a class="actions-product__link" href="#">
                        <svg width="24" height="24">
                          <use href="img/sprite.svg#heart"></use>
                        </svg>Like</a></div>
                  </div>
                </div>
              </article>
            `;
            productContainer.insertAdjacentHTML('beforeend', template);
        });


    }
}
