import AbstractView from './abstract';

class Loading extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>`;
  }
}

export { Loading as default };
