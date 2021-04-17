import { createHeaderProfileTemplate } from './view/header-profile';
import { createSiteMenuTemplate } from './view/site-menu';
import { createFooterStatisticsTemplate } from './view/footer-statistics';
import { createSortTemplate } from './view/sort';
import { createFilmsListTemplate } from './view/films-list';
import { createFilmCardTemplate } from './view/film-card';
import { createShowMoreButtonTemplate } from './view/show-more-btn';
import { createStatisticTemplate } from './view/statistics';
import { createFilmsListExtraTemplate } from './view/films-list-extra';
import { createFilmDetailsTemplate } from './view/film-details';
import { generateFilm } from './mock/film';
import { allComments } from './mock/comment';
import { generateFilter } from './mock/filter';
import { generateStatistic } from './mock/statistic';

const FILMS_COUNT = 24;
const EXTRA_LIST_FILMS_COUNT = 2;
const FILMS_COUNT_PER_STEP = 5;
const filmItems = [];

for (let i = 0; i < FILMS_COUNT; i++) {
  filmItems.push(generateFilm(i));
}

const filters = generateFilter(filmItems);
const statistic = generateStatistic(filmItems);

const render = (container, template, position = 'beforeend') => {
  container.insertAdjacentHTML(position, template);
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

render(headerElement, createHeaderProfileTemplate());
render(mainElement, createSiteMenuTemplate(filters));
render(mainElement, createSortTemplate());
render(mainElement, createFilmsListTemplate());
render(footerStats, createFooterStatisticsTemplate(filmItems.length));

const filmsElement = mainElement.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');
const filmListContainerElement = filmsElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(filmItems.length, FILMS_COUNT_PER_STEP); i++) {
  render(filmListContainerElement, createFilmCardTemplate(filmItems[i]));
}

if (filmItems.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmCount = FILMS_COUNT_PER_STEP;

  render(filmsListElement, createShowMoreButtonTemplate());

  const showMoreButton = filmsListElement.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    filmItems
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmListContainerElement, createFilmCardTemplate(film)));
    renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= filmItems.length) {
      showMoreButton.remove();
    }
  });
}

render(filmsElement, createFilmsListExtraTemplate('Top rated'));
render(filmsElement, createFilmsListExtraTemplate('Most commented'));
const topRatedFilmsContainer = filmsElement.querySelector('#top-rated .films-list__container');
const mostCommentedFilmsContainer = filmsElement.querySelector('#most-commented .films-list__container');
for (let i = 0; i < EXTRA_LIST_FILMS_COUNT; i++) {
  render(topRatedFilmsContainer, createFilmCardTemplate(filmItems[i]));
}
for (let i = 0; i < EXTRA_LIST_FILMS_COUNT; i++) {
  render(mostCommentedFilmsContainer, createFilmCardTemplate(filmItems[i]));
}
render(mainElement, createStatisticTemplate(statistic));
render(filmsElement, createFilmDetailsTemplate(filmItems[0], allComments));
