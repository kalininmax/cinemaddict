import { generateFilm } from './mock/film';
import { generateFilter } from './mock/filter';
import { allComments } from './mock/comment';
import { render, RenderPosition } from './utils/render';
import HeaderProfileView from './view/header-profile';
import FooterStatisticView from './view/footer-statistics';
import MoviePresenter from './presenter/movie-list';
import MoviesModel from './model/movies';
import CommentsModel from './model/comments';

const FILMS_COUNT = 12;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

const commentsModel = new CommentsModel();
commentsModel.setComments(allComments);


const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');
const moviePresenter = new MoviePresenter(mainElement, moviesModel, filters, commentsModel);

render(headerElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(footerStats, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);

moviePresenter.init();
