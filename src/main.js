import { generateFilm } from './mock/film';
import { render, RenderPosition } from './utils/render';
import HeaderProfileView from './view/header-profile';
import FooterStatisticView from './view/footer-statistics';
import MovieListPresenter from './presenter/movie-list';
import FilterPresenter from './presenter/filter';
import MoviesModel from './model/movies';
import FilterModel from './model/filter';

const FILMS_COUNT = 12;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

const filterModel = new FilterModel();

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

const movieListPresenter = new MovieListPresenter(mainElement, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, moviesModel, movieListPresenter);

render(headerElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(footerStats, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);

filterPresenter.init();
movieListPresenter.init();

