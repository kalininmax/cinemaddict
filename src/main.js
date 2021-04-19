import HeaderProfileView from './view/header-profile';
import SiteMenuView from './view/site-menu';
import FooterStatisticView from './view/footer-statistics';
import SortView from './view/sort';
import FilmsListView from './view/films-list';
import FilmCardView from './view/film-card';
import ShowMoreButtonView from './view/show-more-btn';
import FilmsListExtraView from './view/films-list-extra';
import FilmDetailsView from './view/film-details';
import { createStatisticTemplate } from './view/statistics';
import { generateFilm } from './mock/film';
import { allComments } from './mock/comment';
import { generateFilter } from './mock/filter';
import { generateStatistic } from './mock/statistic';
import { render, RenderPosition } from './mock/utils';

const FILMS_COUNT = 24;
const EXTRA_LIST_FILMS_COUNT = 2;
const FILMS_COUNT_PER_STEP = 5;
const filmItems = [];

for (let i = 0; i < FILMS_COUNT; i++) {
  filmItems.push(generateFilm(i));
}

const filters = generateFilter(filmItems);
const statistic = generateStatistic(filmItems);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

render(headerElement, new HeaderProfileView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilmsListView().getElement(), RenderPosition.BEFOREEND);
render(footerStats, new FooterStatisticView(filmItems.length).getElement(), RenderPosition.BEFOREEND);

const filmsElement = mainElement.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');
const filmListContainerElement = filmsElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(filmItems.length, FILMS_COUNT_PER_STEP); i++) {
  render(filmListContainerElement, new FilmCardView(filmItems[i]).getElement(), RenderPosition.BEFOREEND);
}

if (filmItems.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmCount = FILMS_COUNT_PER_STEP;

  render(filmsListElement, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = filmsListElement.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    filmItems
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmListContainerElement, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));
    renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= filmItems.length) {
      showMoreButton.remove();
    }
  });
}

render(filmsElement, new FilmsListExtraView('Top rated').getElement(), RenderPosition.BEFOREEND);
render(filmsElement, new FilmsListExtraView('Most commented').getElement(), RenderPosition.BEFOREEND);
const topRatedFilmsContainer = filmsElement.querySelector('#top-rated .films-list__container');
const mostCommentedFilmsContainer = filmsElement.querySelector('#most-commented .films-list__container');
for (let i = 0; i < EXTRA_LIST_FILMS_COUNT; i++) {
  render(topRatedFilmsContainer, new FilmCardView(filmItems[i]).getElement(), RenderPosition.BEFOREEND);
}
for (let i = 0; i < EXTRA_LIST_FILMS_COUNT; i++) {
  render(mostCommentedFilmsContainer, new FilmCardView(filmItems[i]).getElement(), RenderPosition.BEFOREEND);
}
// renderTemplate(mainElement, createStatisticTemplate(statistic));
// render(filmsElement, new FilmDetailsView(filmItems[0], allComments).getElement(), RenderPosition.BEFOREEND);
