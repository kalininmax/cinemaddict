import AbstractView from './abstract';

class FooterStatistic extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return `<p>${this._filmsCount} movies inside</p>`;
  }
}

export { FooterStatistic as default };
