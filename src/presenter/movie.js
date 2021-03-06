import dayjs from 'dayjs';
import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/film-details';
import { render, replace, remove, RenderPosition } from '../utils/render';
import { UserAction, UpdateType } from '../const';
import CommentsModel from '../model/comments';

class Movie {
  constructor(filmListComponent, changeData, api) {
    this._filmListComponent = filmListComponent;
    this._filmListContainer = filmListComponent.getElement().querySelector('.films-list__container');
    this._changeData = changeData;
    this._api = api;
    this._commentsModel = new CommentsModel();

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._showDetails = this._showDetails.bind(this);
    this._hideDetails = this._hideDetails.bind(this);
    this._EscKeyDownHandler = this._EscKeyDownHandler.bind(this);
    this._renderPopup = this._renderPopup.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handleWatchListPopupClick = this._handleWatchListPopupClick.bind(this);
    this._handleWatchedPopupClick = this._handleWatchedPopupClick.bind(this);
    this._handleFavoritePopupClick = this._handleFavoritePopupClick.bind(this);

    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(film);

    this._setFilmCardClickHandlers();

    if (prevFilmCardComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListComponent.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  _handleModelEvent(updateType) {
    if (updateType === UpdateType.PATCH) {
      this._hideDetails();
      this._showDetails();
    }
  }

  _setFilmCardClickHandlers() {
    this._filmCardComponent.setFilmCardClickHandler(this._showDetails);
    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _setFilmDetailsClickHandlers() {
    this._filmDetailsComponent.setWatchListClickHandler(this._handleWatchListPopupClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedPopupClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoritePopupClick);
    this._filmDetailsComponent.setCloseButtonClickHandler(this._hideDetails);
    this._filmDetailsComponent.setCommentSubmitHandler(this._handleCommentSubmit);
    this._filmDetailsComponent.setDeleteButtonClickHandler(this._handleDeleteButtonClick);
  }

  _handleWatchListPopupClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            watchlist: !this._film.userDetails.watchlist,
          },
        },
      ),
    );
  }

  _handleWatchedPopupClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            watched: !this._film.userDetails.watched,
            watchingDate: dayjs().toDate(),
          },
        },
      ),
    );
  }

  _handleFavoritePopupClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            favorite: !this._film.userDetails.favorite,
          },
        },
      ),
    );
  }

  _handleWatchListClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            watchlist: !this._film.userDetails.watchlist,
          },
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            watched: !this._film.userDetails.watched,
            watchingDate: dayjs().toDate(),
          },
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            ...this._film.userDetails,
            favorite: !this._film.userDetails.favorite,
          },
        },
      ),
    );
  }

  _handleCommentSubmit(filmId, comment) {
    this._filmDetailsComponent.toggleCommentFormDisable();
    this._api.addComment(filmId, comment)
      .then(() => {
        this._commentsModel.addComment(UpdateType.PATCH, comment);

        this._changeData(
          UserAction.UPDATE_FILM,
          UpdateType.PATCH,
          this._film,
        );
      })
      .catch(() => {
        this._filmDetailsComponent.toggleCommentFormDisable();
        this._filmDetailsComponent.toggleShakeEffect();
      });
  }

  _handleDeleteButtonClick(id) {
    this._filmDetailsComponent.toggleDeleteButtonDisable(id);
    this._api.deleteComment(id)
      .then(() => {
        this._commentsModel.deleteComment(UpdateType.PATCH, id);

        this._changeData(
          UserAction.UPDATE_FILM,
          UpdateType.PATCH,
          Object.assign(
            {},
            this._film,
            {
              comments: this._film.comments.filter((filmComment) => {
                return filmComment !== id;
              }),
            },
          ),
        );
      })
      .catch(() => {
        this._filmDetailsComponent.toggleDeleteButtonDisable(id);
        this._filmDetailsComponent.toggleShakeEffect();
      });
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  _showDetails() {
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this._renderPopup(this._commentsModel.getComments());
      })
      .catch(() => {
        this._commentsModel.setComments([]);
        this._renderPopup(this._commentsModel.getComments());
      });
  }

  _renderPopup(comments) {
    this._filmDetailsComponent = new FilmDetailsView(this._film, comments);
    render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._EscKeyDownHandler);
    this._setFilmDetailsClickHandlers();
  }

  _hideDetails() {
    this._commentsModel.setComments([]);
    remove(this._filmDetailsComponent);
    this._filmDetailsComponent = null;
    document.body.classList.remove('hide-overflow');
  }

  _EscKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._hideDetails();
      document.removeEventListener('keydown', this._EscKeyDownHandler);
    }
  }
}

export { Movie as default };
