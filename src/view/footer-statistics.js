import { createElement } from '../mock/utils';

class FooterStatistic {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;
    this._element = null;
  }

  getTemplate() {
    return `<p>${this._filmsCount} movies inside</p>`;
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

export { FooterStatistic as default };
