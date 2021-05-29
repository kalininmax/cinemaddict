import AbstractView from './abstract';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;

  return (
    `<a
      href="#${type}"
      class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">
      ${name}
      ${type !== 'all' ? `<span class="main-navigation__item-count">${count}</span>` : ''}
      </a>`
  );
};

const createFilterTemplate = (filters, currentFilterType) => {
  return filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');
};

class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFilterTemplate(this._filters, this._currentFilter)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== 'A') {
      return;
    }

    const filterType = evt.target.hash.replace(/[#]/g, '');
    this._callback.filterTypeChange(filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}

export { SiteMenu as default };
