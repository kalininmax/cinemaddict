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

const FILMS_COUNTER = 20;
const filmItems = [];


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

render(filmsListElement, createShowMoreButtonTemplate());
render(filmsElement, createFilmsListExtraTemplate('Top rated'));
render(filmsElement, createFilmsListExtraTemplate('Most commented'));

render(mainElement, createStatisticTemplate());

for (let i = 0; i < FILMS_COUNTER; i++) {
  filmItems.push(generateFilm(i));
}

filmItems.forEach((film) => {
  render(filmListContainerElement, createFilmCardTemplate(film));
});
render(filmsElement, createFilmDetailsTemplate(filmItems[0]));
