import SiteMenuView from '../view/site-menu';
import { render, RenderPosition, replace, remove } from '../utils/render';
import { filter } from '../utils/filter';
import { FilterType, UpdateType, MenuItem } from '../const';

class Filter {
  constructor(filterContainer, filterModel, moviesModel, movieListPresenter) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;
    this._movieListPresenter = movieListPresenter;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleMenuClick = this._handleMenuClick.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new SiteMenuView(filters, this._filterModel.getFilter());
    this._filterComponent.setMenuClickHandler(this._handleMenuClick);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleMenuClick(menuItem) {
    switch (menuItem) {
      case MenuItem.ALL_MOVIES:
        this._movieListPresenter.hideStatistics();
        this._movieListPresenter.destroy();
        this._filterModel.setFilter(UpdateType.MAJOR, menuItem);
        this._movieListPresenter.init();
        break;
      case MenuItem.WATCHLIST:
        this._movieListPresenter.hideStatistics();
        this._movieListPresenter.destroy();
        this._filterModel.setFilter(UpdateType.MAJOR, menuItem);
        this._movieListPresenter.init();
        break;
      case MenuItem.HISTORY:
        this._movieListPresenter.hideStatistics();
        this._movieListPresenter.destroy();
        this._filterModel.setFilter(UpdateType.MAJOR, menuItem);
        this._movieListPresenter.init();
        break;
      case MenuItem.FAVORITES:
        this._movieListPresenter.hideStatistics();
        this._movieListPresenter.destroy();
        this._filterModel.setFilter(UpdateType.MAJOR, menuItem);
        this._movieListPresenter.init();
        break;
      case MenuItem.STATS:
        this._movieListPresenter.destroy();
        this._movieListPresenter.showStatistics();
        break;
    }
  }

  _getFilters() {
    const films = this._moviesModel.getMovies();

    return [
      {
        type: FilterType.ALL,
        name: 'All Movies',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}

export { Filter as default };
