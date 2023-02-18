/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

const firstCondt = 'Tidak ada restoran favorit';

Scenario('Showing empty favorite resto', ({ I }) => {
  I.seeElement('h2');
  I.see(firstCondt, '.favorite-page__title');
});

Scenario('like one resto', async ({ I }) => {
  I.see(firstCondt, '#none_resto');
  I.amOnPage('/');

  I.seeElement('section');

  I.wait(1);
  I.seeElement('#mainContent');
  I.seeElement('#main-content');
  I.seeElement('h3');

  I.wait(1);
  const restoFirst = locate('h3 a').first();
  const restoFirstTitle = await I.grabTextFrom(restoFirst);

  I.wait(1);
  I.click(restoFirst);

  I.wait(1);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.wait(0.5);
  I.amOnPage('/#/favorite');
  I.seeElement('.resto-item');

  I.wait(1);
  const restoLikedTitle = await I.grabTextFrom('h3 a');

  I.wait(1);
  assert.strictEqual(restoFirstTitle, restoLikedTitle);
});

Scenario('Unliked Restaurant', async ({ I }) => {
  I.see(firstCondt, '.favorite-page__title');
  I.amOnPage('/');
  I.wait(1);

  I.seeElement('section');
  I.seeElement('#mainContent');
  I.seeElement('#main-content');
  I.seeElement('h3');

  I.wait(0.5);
  const restoFirst = locate('h3 a').first();
  const restoFirstTitle = await I.grabTextFrom('.resto-item__content-name');

  I.click(restoFirst);

  I.wait(1);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.favorite-page__title');

  const restoLiked = locate('h3 a').first();
  const restoLikedTitle = await I.grabTextFrom('h3 a');

  assert.strictEqual(restoFirstTitle, restoLikedTitle);

  I.wait(0.5);

  I.click(restoLiked);

  I.wait(1);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.favorite-page__title');

  I.wait(0.5);
  const noLikedResto = await I.grabTextFrom('h3');
  I.wait(0.5);

  assert.strictEqual(noLikedResto, firstCondt);
});
