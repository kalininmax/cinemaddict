import HeaderProfileView from './view/header-profile';
import SiteMenuView from './view/site-menu';
import FooterStatisticView from './view/footer-statistics';
import SortView from './view/sort';
import FilmsListView from './view/films-list';
import NoFilmView from './view/no-film';
import FilmCardView from './view/film-card';
import ShowMoreButtonView from './view/show-more-btn';
import FilmsListExtraView from './view/films-list-extra';
import FilmDetailsView from './view/film-details';
import { generateFilm } from './mock/film';
import { allComments } from './mock/comment';
import { generateFilter } from './mock/filter';
import { render, remove, RenderPosition } from './utils/render';

const FILMS_COUNT = 12;
const EXTRA_LIST_FILMS_COUNT = 2;
const FILMS_COUNT_PER_STEP = 5;
const filmItems = [];

for (let i = 0; i < FILMS_COUNT; i++) {
  filmItems.push(generateFilm(i));
}

const filters = generateFilter(filmItems);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

render(headerElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(mainElement, new SiteMenuView(filters), RenderPosition.BEFOREEND);

if (filmItems.length === 0) {
  render(mainElement, new NoFilmView(), RenderPosition.BEFOREEND);
} else {
  render(mainElement, new SortView(), RenderPosition.BEFOREEND);
  render(mainElement, new FilmsListView(), RenderPosition.BEFOREEND);
}

render(footerStats, new FooterStatisticView(filmItems.length), RenderPosition.BEFOREEND);

const renderFilmCard = (container, film) => {
  const filmCard = new FilmCardView(film);
  const filmDetails = new FilmDetailsView(film, allComments);

  const showDetails = () => {
    render(document.body, filmDetails, RenderPosition.BEFOREEND);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
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
  filmDetails.setCloseButtonClickHandler(hideDetails);
  render(container, filmCard, RenderPosition.BEFOREEND);
};

const filmsElement = mainElement.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');
const filmListContainerElement = filmsElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(filmItems.length, FILMS_COUNT_PER_STEP); i++) {
  renderFilmCard(filmListContainerElement, filmItems[i]);
}

if (filmItems.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmCount = FILMS_COUNT_PER_STEP;
  const showMoreButton = new ShowMoreButtonView();

  render(filmsListElement, showMoreButton, RenderPosition.BEFOREEND);

  const showMoreCards = () => {
    filmItems
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderFilmCard(filmListContainerElement, film));
    renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= filmItems.length) {
      remove(showMoreButton);
    }
  };

  showMoreButton.setClickHandler(showMoreCards);
}

if (filmItems.length > 0) {
  render(filmsElement, new FilmsListExtraView('Top rated'), RenderPosition.BEFOREEND);
  render(filmsElement, new FilmsListExtraView('Most commented'), RenderPosition.BEFOREEND);
  const topRatedFilmsContainer = filmsElement.querySelector('#top-rated .films-list__container');
  const mostCommentedFilmsContainer = filmsElement.querySelector('#most-commented .films-list__container');
  for (let i = 0; i < EXTRA_LIST_FILMS_COUNT; i++) {
    renderFilmCard(topRatedFilmsContainer, filmItems[i]);
  }
  for (let i = 0; i < EXTRA_LIST_FILMS_COUNT; i++) {
    renderFilmCard(mostCommentedFilmsContainer, filmItems[i]);
  }
}
