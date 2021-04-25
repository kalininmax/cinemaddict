import SiteMenuView from '../view/site-menu';
import SortView from '../view/sort';
import FilmsView from '../view/films';
import FilmListView from '../view/film-list';
import NoFilmView from '../view/no-film';
import ShowMoreButtonView from '../view/show-more-btn';
import FilmListExtraView from '../view/film-list-extra';
import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/film-details';
import { allComments } from '../mock/comment';
import { render, remove, RenderPosition } from '../utils/render';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

class MovieList {
  constructor(mainContainer, movieFilters) {
    this._mainContainer = mainContainer;
    this._movieFilters = movieFilters;
    this._allComments = allComments;

    this._siteMenuComponent = new SiteMenuView(this._movieFilters);
    this._filmsComponent = new FilmsView();
    this._sortComponent = new SortView();
    this._filmListComponent = new FilmListView();
    this._topRatedFilmListComponent = new FilmListExtraView('Top rated');
    this._mostCommentedFilmListComponent = new FilmListExtraView('Most commented');
    this._noFilmComponent = new NoFilmView();
  }

  init(filmItems) {
    this._filmItems = filmItems.slice();
    render(this._mainContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderMovieList();
  }

  _renderSiteMenu() {
    render(this._mainContainer, this._siteMenuComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._filmsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film, container = this._filmListComponent) {
    const filmCard = new FilmCardView(film);
    const filmDetails = new FilmDetailsView(film, this._allComments);
    const filmCardContainer = container.getElement().querySelector('.films-list__container');

    const showDetails = () => {
      render(document.body, filmDetails, RenderPosition.BEFOREEND);
      document.body.classList.add('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
      filmDetails.setCloseButtonClickHandler(hideDetails);
    };

    const hideDetails = () => {
      remove(filmDetails);
      document.body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        hideDetails();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmCard.setFilmCardClickHandler(showDetails);
    render(filmCardContainer, filmCard, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to, container) {
    this._filmItems.slice(from, to).forEach((film) => this._renderFilm(film, container));
  }

  _renderNoFilm() {
    render(this._filmsComponent, this._noFilmComponent, RenderPosition.AFTERBEGIN);
  }

  _renderShowMoreButton() {
    let renderedFilmCount = FILMS_COUNT_PER_STEP;
    const showMoreButton = new ShowMoreButtonView();

    render(this._filmListComponent, showMoreButton, RenderPosition.BEFOREEND);

    const showMore = () => {
      this._filmItems
        .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => this._renderFilm(film));
      renderedFilmCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmCount >= this._filmItems.length) {
        remove(showMoreButton);
      }
    };

    showMoreButton.setClickHandler(showMore);
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
