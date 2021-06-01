import UserProfileView from '../view/user-profile';
import { RenderPosition, render, remove } from '../utils/render';
import { getUserRank } from '../utils/statistics';

class UserProfile {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._userProfileComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    const films = this._moviesModel.getMovies();

    const watchedFilmsCount = films.filter((film) => {
      return film.userDetails.watched;
    }).length;

    if (watchedFilmsCount !== 0) {
      this._userProfileComponent = new UserProfileView(getUserRank(films));
      render(this._container, this._userProfileComponent, RenderPosition.BEFOREEND);
    }
  }

  _update() {
    remove(this._userProfileComponent);
    this.init();
  }

  _handleModelEvent() {
    this._update();
  }
}

export { UserProfile as default };
