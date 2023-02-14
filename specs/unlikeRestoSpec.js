/* eslint-disable no-undef */
// import likeButtonInit from '../src/scripts/utils/like-initiator';
/* eslint-disable no-undef */
// import likeButtonInit from '../src/scripts/utils/like-initiator';
import restoFavoriteIdb from '../src/scripts/data/favoriteResto';
import * as TestFactory from './helper/testFactory';

describe('unliking a resto', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await restoFavoriteIdb.putResto({ id: 1 });
  });

  afterEach(async () => {
    await restoFavoriteIdb.deleteResto(1);
  });

  it('should display unlike widget when the resto has been liked', async () => {
    await TestFactory.createLikeButtonWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this resto"]'))
      .toBeTruthy();
  });

  it('should not display like widget when the resto has been liked', async () => {
    await TestFactory.createLikeButtonWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="like this resto"]'))
      .toBeFalsy();
  });

  it('should be able to remove liked resto from the list', async () => {
    await TestFactory.createLikeButtonWithResto({ id: 1 });
    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));
    expect(await restoFavoriteIdb.getAllResto()).toEqual([]);
  });

  it('should not throw error if the unliked resto is not in the list', async () => {
    await TestFactory.createLikeButtonWithResto({ id: 1 });
    await restoFavoriteIdb.deleteResto(1);
    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));
    expect(await restoFavoriteIdb.getAllResto()).toEqual([]);
  });

  it('should not throw error if the unliked resto is not in the list', async () => {
    await TestFactory.createLikeButtonWithResto({ id: 1 });
    await restoFavoriteIdb.deleteResto(1);
    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));
    expect(await restoFavoriteIdb.getAllResto()).toEqual([]);
  });
});
