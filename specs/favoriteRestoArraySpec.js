/* eslint-disable no-prototype-builtins */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import { itActsAsFavoriteRestoModel } from './contract/favoriteRestoContract';

let favoriteResto = [];
console.log(favoriteResto);
const favoriteRestoArray = {
  getResto(id) {
    if (!id) {
      return;
    }
    return favoriteResto.find((resto) => resto.id == id);
  },

  getAllResto() {
    return favoriteResto;
  },

  putResto(resto) {
    if (!resto.hasOwnProperty('id')) {
      return;
    }

    if (this.getResto(resto.id)) {
      return;
    }
    favoriteResto.push(resto);
  },

  deleteResto(id) {
    favoriteResto = favoriteResto.filter((resto) => resto.id != id);
  },
};

describe('Favorite resto Array contrac test implementation', () => {
  afterEach(() => favoriteResto = []);

  itActsAsFavoriteRestoModel(favoriteRestoArray);
});
