import AbstractView from './abstract';
import { humanizeDate, getHourFromMin } from '../utils/film';
const MAX_DESCRIPTION_LENGTH = 140;

const cutDesctiption = (description) => {
  const shortDescription = description.length > MAX_DESCRIPTION_LENGTH
    ? description.slice(0, MAX_DESCRIPTION_LENGTH - 1) + '...'
    : description;
  return shortDescription;
};

class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    const { comments,
      filmInfo: { title, rating, poster, runtime, genres, description, release: { date } },
      userDetails: { watchlist, watched, favorite } } = this._film;
    const filmGenres = genres.join(', ');

    const watchlistClass = watchlist ? 'film-card__controls-item--active' : '';
    const watchedClass = watched ? 'film-card__controls-item--active' : '';
    const favoriteClass = favorite ? 'film-card__controls-item--active' : '';
    const releaseYear = humanizeDate(date, 'YYYY');

    return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${getHourFromMin(runtime).hours}h ${getHourFromMin(runtime).mins}m</span>
        <span class="film-card__genre">${filmGenres}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${cutDesctiption(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClass}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClass}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClass}" type="button">Mark as favorite</button>
      </div>
    </article>`;
  }

  _filmCardClickHandler(evt) {
    evt.preventDefault();
    this._callback.filmCardClick();
  }

  setFilmCardClickHandler(callback) {
    this._callback.filmCardClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._filmCardClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._filmCardClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._filmCardClickHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchListClickHandler);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }
}

export { FilmCard as default };
