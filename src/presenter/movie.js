import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/film-details';
import { allComments } from '../mock/comment';
import { render, replace, remove, RenderPosition } from '../utils/render';

class Movie {
  constructor(filmListComponent, changeData) {
    this._filmListComponent = filmListComponent;
    this._filmListContainer = filmListComponent.getElement().querySelector('.films-list__container');
    this._allComments = allComments;
    this._changeData = changeData;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._showDetails = this._showDetails.bind(this);
    this._hideDetails = this._hideDetails.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film, this._allComments);

    this._setFilmCardClickHandlers();
    this._setFilmDetailsClickHandlers();


    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListComponent.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (document.body.contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  _setFilmCardClickHandlers() {
    this._filmCardComponent.setFilmCardClickHandler(this._showDetails);
    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _setFilmDetailsClickHandlers() {
    this._filmDetailsComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setCloseButtonClickHandler(this._hideDetails);
    this._filmDetailsComponent.setEmojiCheckHandler();
  }

  _handleWatchListClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          user_details: {
            ...this._film.user_details,
            watchlist: !this._film.user_details.watchlist,
          },
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          user_details: {
            ...this._film.user_details,
            watched: !this._film.user_details.watched,
          },
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          user_details: {
            ...this._film.user_details,
            favorite: !this._film.user_details.favorite,
          },
        },
      ),
    );
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  _showDetails() {
    render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscKeyDown);
    this._setFilmDetailsClickHandlers();
  }

  _hideDetails() {
    remove(this._filmDetailsComponent);
    document.body.classList.remove('hide-overflow');
  }

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._hideDetails();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }
}

export { Movie as default };
