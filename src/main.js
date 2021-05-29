import { generateFilm } from './mock/film';
import { allComments } from './mock/comment';
import { render, RenderPosition } from './utils/render';
import HeaderProfileView from './view/header-profile';
import FooterStatisticView from './view/footer-statistics';
import MoviePresenter from './presenter/movie-list';
import FilterPresenter from './presenter/filter';
import MoviesModel from './model/movies';
import CommentsModel from './model/comments';
import FilterModel from './model/filter';

const FILMS_COUNT = 12;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

const commentsModel = new CommentsModel();
commentsModel.setComments(allComments);

const filterModel = new FilterModel();


const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');
const moviePresenter = new MoviePresenter(mainElement, moviesModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, moviesModel);

render(headerElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(footerStats, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);

filterPresenter.init();
moviePresenter.init();
