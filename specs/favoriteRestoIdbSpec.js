/* eslint-disable no-undef */
import { itActsAsFavoriteRestoModel } from './contract/favoriteRestoContract';
import restoFavoriteIdb from '../src/scripts/data/favoriteResto';

describe('favorite resto Idb contract test implementation', () => {
  afterEach(async () => {
    (await restoFavoriteIdb.getAllResto()).forEach(async (resto) => {
      await restoFavoriteIdb.deleteResto(resto.id);
    });
  });

  itActsAsFavoriteRestoModel(restoFavoriteIdb);
});
