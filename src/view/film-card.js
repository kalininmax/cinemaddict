import { humanizeDate, createElement } from '../mock/utils';

class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
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

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export { FilmCard as default };
