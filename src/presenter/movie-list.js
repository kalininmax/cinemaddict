import SiteMenuView from '../view/site-menu';
import SortView from '../view/sort';
import FilmsView from '../view/films';
import FilmListView from '../view/film-list';
import NoFilmView from '../view/no-film';
import ShowMoreButtonView from '../view/show-more-btn';
import FilmListExtraView from '../view/film-list-extra';
import MoviePresenter from './movie';
import { render, remove, RenderPosition } from '../utils/render';
import { sortFilmDateDown, sortFilmDateUp, sortFilmRatingDown, sortFilmRatingUp } from '../utils/film';
import { SortType, UserAction, UpdateType } from '../const';

const FILMS_COUNT_PER_STEP = 5;
// const EXTRA_FILMS_COUNT = 2;

class MovieList {
  constructor(mainContainer, moviesModel, movieFilters, commentsModel) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._mainContainer = mainContainer;
    this._movieFilters = movieFilters;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._moviePresenter = {};
    this._moviePresenterTopRated = {};
    this._moviePresenterMostCommented = {};
    this._currentSortType = SortType.DEFAULT;

    this._siteMenuComponent = new SiteMenuView(this._movieFilters);
    this._filmsComponent = new FilmsView();
    this._sortComponent = null;
    this._showMoreButtonComponent = null;
    this._filmListComponent = new FilmListView();
    this._topRatedFilmListComponent = new FilmListExtraView('Top rated');
    this._mostCommentedFilmListComponent = new FilmListExtraView('Most commented');
    this._noFilmComponent = new NoFilmView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._mainContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderMovieList();
  }

  _getMovies() {
    switch (this._currentSortType) {
      case SortType.DATE_DOWN:
        return this._moviesModel.getMovies().slice().sort(sortFilmDateDown);
      case SortType.DATE_UP:
        return this._moviesModel.getMovies().slice().sort(sortFilmDateUp);
      case SortType.RATING_DOWN:
        return this._moviesModel.getMovies().slice().sort(sortFilmRatingDown);
      case SortType.RATING_UP:
        return this._moviesModel.getMovies().slice().sort(sortFilmRatingUp);
    }
    return this._moviesModel.getMovies();
  }

  _getComments() {
    return this._commentsModel.getComments();
  }

  _handleViewAction(actionType, updateType, update) {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    console.log(actionType, updateType, update);


    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._moviesModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, update);
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
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _renderSiteMenu() {
    render(this._mainContainer, this._siteMenuComponent, RenderPosition.AFTERBEGIN);
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
    if (container === this._topRatedFilmListComponent) {
      this._moviePresenterTopRated[film.id] = moviePresenter;
    }
    if (container === this._mostCommentedFilmListComponent) {
      this._moviePresenterMostCommented[film.id] = moviePresenter;
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

  // _renderFilmListExtra() {
  //   render(this._filmsComponent, this._topRatedFilmListComponent, RenderPosition.BEFOREEND);
  //   render(this._filmsComponent, this._mostCommentedFilmListComponent, RenderPosition.BEFOREEND);

  //   this._renderFilms(0, EXTRA_FILMS_COUNT, this._topRatedFilmListComponent);
  //   this._renderFilms(0, EXTRA_FILMS_COUNT, this._mostCommentedFilmListComponent);
  // }

  _renderMovieList() {
    const films = this._getMovies();
    const filmCount = films.length;
    this._renderSiteMenu();

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
    // this._renderFilmListExtra();
  }
}

export { MovieList as default };
