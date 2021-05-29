import SortView from '../view/sort';
import FilmsView from '../view/films';
import StatisticsView from '../view/statistics';
import FilmListView from '../view/film-list';
import NoFilmView from '../view/no-film';
import ShowMoreButtonView from '../view/show-more-btn';
import MoviePresenter from './movie';
import { render, remove, RenderPosition } from '../utils/render';
import { sortFilmDateDown, sortFilmDateUp, sortFilmRatingDown, sortFilmRatingUp } from '../utils/film';
import { filter } from '../utils/filter';
import { SortType, UserAction, UpdateType } from '../const';

const FILMS_COUNT_PER_STEP = 5;

class MovieList {
  constructor(mainContainer, moviesModel, filterModel) {
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._mainContainer = mainContainer;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._moviePresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._filmsComponent = new FilmsView();
    this._statsComponent = new StatisticsView();
    this._sortComponent = null;
    this._showMoreButtonComponent = null;
    this._filmListComponent = new FilmListView();
    this._noFilmComponent = new NoFilmView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    render(this._mainContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderMovieList();
  }

  showStatistics() {
    render(this._mainContainer, this._statsComponent, RenderPosition.BEFOREEND);
    this._statsComponent.show();
  }

  hideStatistics() {
    this._statsComponent.hide();
  }

  destroy() {
    this._clearMovieList({ resetRenderedFilmCount: true, resetSortType: true });

    remove(this._filmsComponent);
    remove(this._filmListComponent);

    this.hideStatistics();

    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getMovies() {
    const filterType = this._filterModel.getFilter();
    const films = this._moviesModel.getMovies();
    const filtredMovies = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE_DOWN:
        return filtredMovies.sort(sortFilmDateDown);
      case SortType.DATE_UP:
        return filtredMovies.sort(sortFilmDateUp);
      case SortType.RATING_DOWN:
        return filtredMovies.sort(sortFilmRatingDown);
      case SortType.RATING_UP:
        return filtredMovies.sort(sortFilmRatingUp);
    }
    return filtredMovies;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._moviesModel.updateMovie(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._moviePresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearMovieList();
        this._renderMovieList();
        break;
      case UpdateType.MAJOR:
        this._clearMovieList({ resetRenderedFilmCount: true, resetSortType: true });
        this._renderMovieList();
        break;

      default:
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearMovieList({ resetRenderedFilmCount: true });
    this._renderMovieList();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film, container = this._filmListComponent) {
    const moviePresenter = new MoviePresenter(container, this._handleViewAction);
    moviePresenter.init(film);
    if (container === this._filmListComponent) {
      this._moviePresenter[film.id] = moviePresenter;
    }
  }

  _destroyFilm() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  _renderFilms(films, container) {
    films.forEach((film) => this._renderFilm(film, container));
  }

  _renderNoFilms() {
    render(this._filmsComponent, this._noFilmComponent, RenderPosition.AFTERBEGIN);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getMovies().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    const films = this._getMovies().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _clearMovieList({ resetRenderedFilmCount = false, resetSortType = false } = {}) {
    const filmCount = this._getMovies().length;

    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};

    remove(this._sortComponent);
    remove(this._noFilmComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderMovieList() {
    const films = this._getMovies();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }
}

export { MovieList as default };
