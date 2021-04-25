import AbstractView from './abstract';

class FilmsListExtra extends AbstractView {
  constructor(heading) {
    super();
    this._heading = heading;
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
}

export { FilmsListExtra as default };
