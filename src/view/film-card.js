import AbstractView from './abstract';
import { humanizeDate } from '../utils/film';

class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
  }

  getTemplate() {
    const { comments,
      film_info: { title, rating, poster, runtime, genres, description, release: { date } },
      user_details: { watchlist, watched, favorite } } = this._film;
    const watchlistClass = watchlist ? 'film-card__controls-item--active' : '';
    const watchedClass = watched ? 'film-card__controls-item--active' : '';
    const favoriteClass = favorite ? 'film-card__controls-item--active' : '';
    const releaseYear = humanizeDate(date, 'YYYY');

    return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genres}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
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
}

export { FilmCard as default };
