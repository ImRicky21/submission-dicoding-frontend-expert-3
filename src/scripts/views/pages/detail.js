/* eslint-disable no-undef */
import restoSource from '../../data/restoSource';
import urlParser from '../../routes/url-parser';
import likeButtonInit from '../../utils/like-initiator';
import { createRestoDetail } from '../templates/templateCreator';
import restoFavoriteIdb from '../../data/favoriteResto';

const Detail = {
  async render() {
    return `
      <div id="detail" class="detail-page"></div>
    <div class="menu">
      <div id="food" class="menu-list food-list">
        <h2 tabindex="0" class="drink-list__title"> Food Menu</h2>
      </div>
      <div id="drink" class="menu-list drink-list">
        <h2 tabindex="0" class="drink-list__title"> Drink Menu</h2>
      </div>
      </div>
      <div id="review" class="review-container"></div>

    <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = urlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await restoSource.detailResto(url.id);
    const detailContainer = document.querySelector('#detail');
    const resto = restaurant;
    console.log(resto);
    detailContainer.innerHTML = createRestoDetail(restaurant);

    const foodMenuContainer = document.querySelector('#food');
    restaurant.menus.foods.forEach((food) => {
      foodMenuContainer.innerHTML += `<li>${food.name}</li>`;
    });
    const drinkMenuContainer = document.querySelector('#drink');
    restaurant.menus.drinks.forEach((drink) => {
      drinkMenuContainer.innerHTML += `<li>${drink.name}</li>`;
    });
    const reviewCostumerContainer = document.querySelector('#review');
    restaurant.customerReviews.forEach((review) => {
      reviewCostumerContainer.innerHTML += `
      <div tabindex="0" class="review-item">
        <div class="review-item__icon">
        <h1 class="icon-svg">
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
  
        </h1>
        </div>
          <div class="review-item__detail">
            <h3 class="review-name">${review.name}</h3>
            <p class="review-date">"${review.date}"</p>
            <p class="review-review"> ${review.review} </p>
            </div>
      </div>
      `;
    });
    likeButtonInit.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteResto: restoFavoriteIdb,
      resto: {
        id: resto.id,
        name: resto.name,
        pictureId: resto.pictureId,
        rating: resto.rating,
        city: resto.city,
        description: resto.description,
      },
    });
  },
};

export default Detail;
