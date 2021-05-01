import HeaderProfileView from './view/header-profile';
import FooterStatisticView from './view/footer-statistics';
import MoviePresenter from './presenter/MovieList';
import { generateFilm } from './mock/film';
import { generateFilter } from './mock/filter';
import { render, RenderPosition } from './utils/render';

const FILMS_COUNT = 12;

const filmItems = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(filmItems);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

render(headerElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(footerStats, new FooterStatisticView(filmItems.length), RenderPosition.BEFOREEND);

const moviePresenter = new MoviePresenter(mainElement, filters);

moviePresenter.init(filmItems);
