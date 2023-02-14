/* eslint-disable import/prefer-default-export */
import likeButtonInit from '../../src/scripts/utils/like-initiator';
import restoFavoriteIdb from '../../src/scripts/data/favoriteResto';

const createLikeButtonWithResto = async (resto) => {
  await likeButtonInit.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteResto: restoFavoriteIdb,
    resto,
  });
};

export { createLikeButtonWithResto };
