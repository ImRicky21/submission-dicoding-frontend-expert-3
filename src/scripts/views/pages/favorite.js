import restoFavoriteIdb from '../../data/favoriteResto';
import { createRestoItem } from '../templates/templateCreator';

/* eslint-disable no-empty-function */
const Favorite = {
  async render() {
    return `
    <div class="favorite-page">
          <h2 class="favorite-page__title">Favorite Restaurant</h2>
          <h3 class="favorite-page__title" id="none_resto">Tidak ada restoran favorit</h3>
          <div id="resto-list" class="restos"></div>
    </div>
    `;
  },

  async afterRender() {
    const restos = await restoFavoriteIdb.getAllResto();
    console.log(restos);
    const restoContainer = document.querySelector('#resto-list');
    const emptyResto = document.querySelector('#none_resto');

    if (restos.length !== 0) {
      restos.forEach((restaurant) => {
      // console.log(restos);
        restoContainer.innerHTML += createRestoItem(restaurant);
      });
      emptyResto.style.display = 'none';
    }
  },
};

export default Favorite;
