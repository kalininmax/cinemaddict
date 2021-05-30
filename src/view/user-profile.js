import AbstractView from './abstract';

class UserProfile extends AbstractView {
  constructor(rank) {
    super();
    this._rank = rank;
  }

  getTemplate() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this._rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }
}

export { UserProfile as default };
