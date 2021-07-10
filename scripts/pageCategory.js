//страница товаров

import getGoods from "./service.js"

const createCard = ({id, preview, cost, brand, name, sizes}) => {

  const li = document.createElement('li');
  li.classList.add('goods__item');

  li.innerHTML = `
      <article class="good">
         <a class="good__link-img" href="card-good.html#${id}">
             <img class="good__img" src="goods-image/${preview}" alt="">
         </a>
         <div class="good__description">
           <p class="good__price">${cost} &#8381;</p>
           <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
           ${sizes ?
    `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>`
    :
    ''
  }
            
            <a class="good__link" href="card-good.html#${id}">Подробнее</a>
          </div>
      </article>
    `;

  return li
};


export default (hash) => {
  try {
    const goodList = document.querySelector('.goods__list');
    const goodTitle = document.querySelector('.goods__title');

    if (!goodList) {
      throw 'This in not good page!'
    }

    const renderGoodList = data => {
      goodList.textContent = '';

      const cards = data.map(createCard);
      goodList.append(...cards)

    };

    const changeTitle = () => {
      goodTitle.textContent = document.querySelector(`[href*="#${hash}"]`).textContent;
    };



    window.addEventListener('hashchange', () => {
      hash = location.hash.substring(1);
      getGoods(renderGoodList, 'category', hash);
      changeTitle();
    });

    changeTitle();
    getGoods(renderGoodList, 'category', hash)

  } catch (err) {
    console.warn(err)
  }
}

