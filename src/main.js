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

const MAIN_FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;


const render = (container, template, position = 'beforeend') => {
  container.insertAdjacentHTML(position, template);
};

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');


render(headerElement, createHeaderProfileTemplate());
render(mainElement, createSiteMenuTemplate());
render(mainElement, createSortTemplate());
render(mainElement, createFilmsListTemplate());
render(footerStats, createFooterStatisticsTemplate());

const filmsElement = mainElement.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');
const filmListContainerElement = filmsElement.querySelector('.films-list__container');

for (let i = 0; i < MAIN_FILM_COUNT; i++) {
  render(filmListContainerElement, createFilmCardTemplate());
}

render(filmsListElement, createShowMoreButtonTemplate());
render(filmsElement, createFilmsListExtraTemplate('Top rated'));
render(filmsElement, createFilmsListExtraTemplate('Most commented'));

const filmListExtraContainerElement = filmsElement.querySelectorAll('.films-list--extra .films-list__container');

for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  render(filmListExtraContainerElement[0], createFilmCardTemplate());
  render(filmListExtraContainerElement[1], createFilmCardTemplate());
}

render(filmsElement, createFilmDetailsTemplate());
render(mainElement, createStatisticTemplate());
