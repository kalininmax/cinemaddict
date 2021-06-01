import he from 'he';
import SmartView from './smart';
import { humanizeDate, getHourFromMin } from '../utils/film';
import { render, createElement, RenderPosition } from '../utils/render';
import { ErrorMessage } from '../const';

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
const SHAKE_TIMEOUT = 1000;

const createFilmCommentsTemplate = (filmComments) => {
  let template = '';
  filmComments.forEach(({ author, comment, date, emotion, id }) => {

    template += `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeDate(date, 'YYYY/MM/D HH:MM')}</span>
          <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
        </p>
      </div>
    </li>`;
  });

  return template;
};

const createEmojiListTemplate = (emotions) => {
  const template = emotions.map((emoji) => {
    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
      </label>`;
  }).join('');

  return `<div class="film-details__emoji-list">${template}</div>`;
};

class FilmDetails extends SmartView {
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;
    this._popupForm = this.getElement().querySelector('form');
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._emojiCheckHandler = this._emojiCheckHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);
    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    const {
      filmInfo: { title, alternativeTitle, rating, poster, director, writers, actors, ageRating, runtime, genres, description,
        release: { date, country } },
      userDetails: { watchlist, watched, favorite } } = this._film;

    const filmGenres = genres.join(', ');
    const releaseDate = humanizeDate(date);
    const commentsTemplate = createFilmCommentsTemplate(this._comments);
    const emotionsListTemplate = createEmojiListTemplate(EMOTIONS);
    const watchlistChecked = watchlist ? 'checked' : '';
    const watchedChecked = watched ? 'checked' : '';
    const favoriteChecked = favorite ? 'checked' : '';

    return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close"><button class="film-details__close-btn" type="button">close</button></div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${getHourFromMin(runtime).hours}h ${getHourFromMin(runtime).mins}m</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${filmGenres}</td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"
              ${watchlistChecked}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to
              watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"
              ${watchedChecked}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already
              watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"
              ${favoriteChecked}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to
              favorites</label>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>
            <ul class="film-details__comments-list">
              ${commentsTemplate}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                  name="comment"></textarea>
              </label>
              ${emotionsListTemplate}
            </div>
          </section>
        </div>
      </form>
    </section>`;
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._commentInputHandler);
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._emojiCheckHandler);
  }

  restoreHandlers() {
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setDeleteButtonClickHandler(this._callback.deleteButtonClick);
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setCommentSubmitHandler(this._callback.commentSubmit);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeButtonClickHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('#watchlist').addEventListener('change', this._watchListClickHandler);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('#watched').addEventListener('change', this._watchedClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('#favorite').addEventListener('change', this._favoriteClickHandler);
  }

  _deleteButtonClickHandler(evt) {
    if (evt.target.dataset.commentId) {
      evt.preventDefault();
      const commentId = evt.target.dataset.commentId;

      this._callback.deleteButtonClick(commentId);
    }
  }

  setDeleteButtonClickHandler(callback) {
    this._callback.deleteButtonClick = callback;
    this.getElement().addEventListener('click', this._deleteButtonClickHandler);
  }

  _emojiCheckHandler() {
    const commentForm = this.getElement().querySelector('form');
    const activeEmoji = commentForm.elements['comment-emoji'].value;

    this.updateData({
      emotion: `${activeEmoji}`,
    }, true);

    const container = this.getElement().querySelector('.film-details__add-emoji-label');
    if (container.querySelector('img')) {
      const emojiImage = this.getElement().querySelector('.film-details__add-emoji-label img');
      emojiImage.src = `images/emoji/${activeEmoji}.png`;
      emojiImage.alt = `emoji-${activeEmoji}`;
    } else {
      const element = createElement(`<img src="images/emoji/${activeEmoji}.png" width="55" height="55" alt="emoji-${activeEmoji}">`);
      render(container, element, RenderPosition.BEFOREEND);
    }
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      comment: evt.target.value,
    }, true);
  }

  _commentSubmitHandler(evt) {
    const commentForm = this.getElement().querySelector('form');
    const commentTextarea = commentForm.elements['comment'];

    if ((evt.ctrlKey || evt.metaKey) && evt.code === 'Enter') {
      if (this._data.comment && this._data.emotion) {
        this._callback.commentSubmit(this._film.id, this._data);
        document.removeEventListener('keyup', this._commentSubmitHandler);
      } else {
        commentTextarea.setCustomValidity(ErrorMessage.COMMENT);
        commentTextarea.reportValidity();
      }
    }
  }

  setCommentSubmitHandler(callback) {
    this._callback.commentSubmit = callback;
    document.addEventListener('keyup', this._commentSubmitHandler);
  }

  toggleCommentFormDisable() {
    const commentTextarea = this._popupForm.elements['comment'];
    const emojiInputs = this._popupForm.elements['comment-emoji'];

    commentTextarea.disabled = !commentTextarea.disabled;
    emojiInputs.forEach((input) => {
      input.disabled = !input.disabled;
    });
  }

  toggleDeleteButtonDisable(id) {
    const deleteButton = this._popupForm.querySelector(`[data-comment-id="${id}"]`);
    deleteButton.disabled = !deleteButton.disabled;
    deleteButton.textContent = deleteButton.disabled ? 'Deleting...' : 'Delete';
  }

  toggleShakeEffect() {
    this.getElement().classList.add('shake');
    setTimeout(() => {
      this.getElement().classList.remove('shake');
    }, SHAKE_TIMEOUT);
  }
}

export { FilmDetails as default };
