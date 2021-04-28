import SiteMenuView from '../view/site-menu';
import SortView from '../view/sort';
import FilmsView from '../view/films';
import FilmListView from '../view/film-list';
import NoFilmView from '../view/no-film';
import ShowMoreButtonView from '../view/show-more-btn';
import FilmListExtraView from '../view/film-list-extra';
import MoviePresenter from './movie';
import { updateItem } from '../utils/common';
import { render, replace, remove, RenderPosition } from '../utils/render';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

class MovieList {
  constructor(mainContainer, movieFilters) {
    this._mainContainer = mainContainer;
    this._movieFilters = movieFilters;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._moviePresenter = {};

    this._siteMenuComponent = new SiteMenuView(this._movieFilters);
    this._filmsComponent = new FilmsView();
    this._sortComponent = new SortView();
    this._filmListComponent = new FilmListView();
    this._topRatedFilmListComponent = new FilmListExtraView('Top rated');
    this._mostCommentedFilmListComponent = new FilmListExtraView('Most commented');
    this._noFilmComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(filmItems) {
    this._filmItems = filmItems.slice();
    render(this._mainContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderMovieList();
  }

  _handleFilmChange(updatedFilm) {
    this._filmItems = updateItem(this._filmItems, updatedFilm);
    this._moviePresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderSiteMenu() {
    render(this._mainContainer, this._siteMenuComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._filmsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film, container = this._filmListComponent) {
    const moviePresenter = new MoviePresenter(container, this._handleFilmChange);
    moviePresenter.init(film);
    this._moviePresenter[film.id] = moviePresenter;
  }

  _destroyFilm() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  _renderFilms(from, to, container) {
    this._filmItems.slice(from, to).forEach((film) => this._renderFilm(film, container));
  }

  _renderNoFilm() {
    render(this._filmsComponent, this._noFilmComponent, RenderPosition.AFTERBEGIN);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._filmItems.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearMovieList() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._filmItems.length, FILMS_COUNT_PER_STEP));

    if (this._filmItems.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmListExtra() {
    render(this._filmsComponent, this._topRatedFilmListComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._mostCommentedFilmListComponent, RenderPosition.BEFOREEND);

    this._renderFilms(0, EXTRA_FILMS_COUNT, this._topRatedFilmListComponent);
    this._renderFilms(0, EXTRA_FILMS_COUNT, this._mostCommentedFilmListComponent);
  }

  _renderMovieList() {
    this._renderSiteMenu();

    if (this._filmItems.length === 0) {
      this._renderNoFilm();
      return;
    }

    this._renderSort();
    this._renderFilmList();
    this._renderFilmListExtra();
  }
}

export { MovieList as default };
