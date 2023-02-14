/* eslint-disable no-shadow */
import { createDislikeButton, createLikeButton } from '../views/templates/templateCreator';

const likeButtonInit = {
  async init({ likeButtonContainer, favoriteResto, resto }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = resto;
    this._restoFavorite = favoriteResto;
    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resto;

    if (await this._isRestoExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestoExist(id) {
    const resto = await this._restoFavorite.getResto(id);
    return !!resto;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButton();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._restoFavorite.putResto(this._resto);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createDislikeButton();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._restoFavorite.deleteResto(this._resto.id);
      this._renderButton();
    });
  },
};
export default likeButtonInit;
