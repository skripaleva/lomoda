import { cartModalClose, cartModalOpen } from "./modal.js";
import pageCategory from "./pageCategory.js";
import pageCartQood from "./pageCartQood.js";
import { getLocalStorage } from "./localStorage.js";

let hash = location.hash.substring(1);
pageCategory(hash);
pageCartQood(hash);

const headerCityButton = document.querySelector('.header__city-button');

const cartOverlay = document.querySelector('.cart-overlay');
const subheaderCart = document.querySelector('.subheader__cart');

const declOfNum = (n, titles) => {
  return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
    0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
};

export const updateGoodCart = () => {
  if (getLocalStorage().length) {
    subheaderCart.textContent = declOfNum(getLocalStorage().length, ['товар', 'товара', 'товаров'])
  } else {
    subheaderCart.textContent = 'Корзина'
  }
};

updateGoodCart();

const updateLocation = () => {
  headerCityButton.textContent = localStorage.getItem('lamoda-location') || 'Ваш город?';
};

headerCityButton.addEventListener('click', () => {
  const city = prompt('Укажите ваш город').trim();
  headerCityButton.textContent = city;
  if (city !== null) {
    localStorage.setItem('lamoda-location', city)
  }
  updateLocation()
});

subheaderCart.addEventListener('click', () => cartModalOpen(cartOverlay));

cartOverlay.addEventListener('click', e => {
  const target = e.target;
  if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
    cartModalClose(cartOverlay);
  }
});