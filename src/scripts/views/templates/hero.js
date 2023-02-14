class hero extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div class="hero">
    <div class="hero-item">
        <h2 tabindex="0">Richesto</h2>
        <p tabindex="0">Want a recomended restaurants?</p>
        <div class="line"></div>
      </div>
  </div>`;
  }
}

customElements.define('.hero', hero);
