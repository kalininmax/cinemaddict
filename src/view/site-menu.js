import { createElement } from '../mock/utils';

class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    const createFilterItemTemplate = ({ name, count }, isChecked) => {
      if (name === 'all')
        return `<a href="#all" class="main-navigation__item ${isChecked ? 'main-navigation__item--active' : ''}">All movies</a>`;

      return `<a href="#${name}" class="main-navigation__item ${isChecked ? 'main-navigation__item--active' : ''}">${name}
          <span class="main-navigation__item-count">${count}</span></a>`;
    };
    const filtersTemplate = this._filters.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

    return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
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

export { SiteMenu as default };
