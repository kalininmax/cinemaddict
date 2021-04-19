import { createElement } from '../mock/utils';

class FilmsListExtra {
  constructor(heading) {
    this._heading = heading;
    this._element = null;
  }

  getTemplate() {
    const headingText = this._heading;
    const sectionId = this._heading === 'Top rated'
      ? 'top-rated'
      : this._heading === 'Most commented'
        ? 'most-commented'
        : '';
    return `<section id="${sectionId}" class="films-list films-list--extra">
      <h2 class="films-list__title">${headingText}</h2>
      <div class="films-list__container"></div>
    </section>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export { FilmsListExtra as default };
