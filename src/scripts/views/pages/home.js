import restoSource from '../../data/restoSource';
import { createRestoItem } from '../templates/templateCreator';

const Home = {
  async render() {
    return `
    <section class="hero">
      <div class="hero-item">
        <h2 tabindex="0">Richesto</h2>
        <p tabindex="0">Want a recomended restaurants?</p>
        <div class="line"></div>
      </div>
    </section>
      <h1 class="header-text">"Nearby Restaurant"</h1>
    <section id="main-content" class="restos">
    </secton>
        `;
  },

  async afterRender() {
    const restaurants = await restoSource.homeResto();
    const restoContainer = document.querySelector('.restos');
    restaurants.forEach((resto) => {
      restoContainer.innerHTML += createRestoItem(resto);
    });
  },
};

export default Home;
