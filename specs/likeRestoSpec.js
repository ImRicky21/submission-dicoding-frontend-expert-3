/* eslint-disable no-undef */
// import likeButtonInit from '../src/scripts/utils/like-initiator';
import restoFavoriteIdb from '../src/scripts/data/favoriteResto';
import * as TestFactory from './helper/testFactory';

describe('Liking A resto', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when resto has not been liked before', async () => {
    await TestFactory.createLikeButtonWithResto({ id: 1 });
    expect(document.querySelector('[aria-label="like this resto"]'))
      .toBeTruthy();
  });

  it('should not show unlike button when resto has not been liked before', async () => {
    // document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    await TestFactory.createLikeButtonWithResto({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this resto"]'))
      .toBeFalsy();
  });

  it('should be able to like the resto', async () => {
    // document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    await TestFactory.createLikeButtonWithResto({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const resto = await restoFavoriteIdb.getResto(1);

    expect(resto).toEqual({ id: 1 });
    restoFavoriteIdb.deleteResto(1);
  });

  it('should not add resto again when its already liked', async () => {
    await TestFactory.createLikeButtonWithResto({ id: 1 });
    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await restoFavoriteIdb.putResto({ id: 1 });
    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await restoFavoriteIdb.getAllResto()).toEqual([{ id: 1 }]);
    restoFavoriteIdb.deleteResto(1);
  });

  it('should not add a resto when it has no id', async () => {
    await TestFactory.createLikeButtonWithResto({});
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await restoFavoriteIdb.getAllResto()).toEqual([]);
  });
});
