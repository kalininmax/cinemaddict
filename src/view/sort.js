import AbstractView from './abstract';
import { SortType } from '../const';

class Sort extends AbstractView {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return `<ul class="sort">
      <li><a href="#" class="sort__button ${this._currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button ${this._currentSortType === SortType.DATE_DOWN || this._currentSortType === SortType.DATE_UP ? 'sort__button--active' : ''}" data-sort-type="${SortType.DATE_DOWN}">Sort by date</a></li>
      <li><a href="#" class="sort__button ${this._currentSortType === SortType.RATING_DOWN || this._currentSortType === SortType.RATING_UP ? 'sort__button--active' : ''}" data-sort-type="${SortType.RATING_DOWN}">Sort by rating</a></li>
    </ul >`;
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== 'A') {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);

    switch (evt.target.dataset.sortType) {
      case SortType.DATE_DOWN:
        evt.target.dataset.sortType = SortType.DATE_UP;
        break;
      case SortType.DATE_UP:
        evt.target.dataset.sortType = SortType.DATE_DOWN;
        break;
      case SortType.RATING_DOWN:
        evt.target.dataset.sortType = SortType.RATING_UP;
        break;
      case SortType.RATING_UP:
        evt.target.dataset.sortType = SortType.RATING_DOWN;
        break;
      default:
        break;
    }
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

export { Sort as default };
