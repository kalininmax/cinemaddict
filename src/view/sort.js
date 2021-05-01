import AbstractView from './abstract';
import { SortType } from '../const';

class Sort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE_DOWN}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING_DOWN}">Sort by rating</a></li>
    </ul >`;
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    this.getElement().querySelectorAll('.sort__button').forEach((button) => {
      button.classList.remove('sort__button--active');
    });

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    evt.target.classList.add('sort__button--active');
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
