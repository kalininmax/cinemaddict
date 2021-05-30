import { render, RenderPosition } from './utils/render';
import UserProfilePresenter from './presenter/user-profile';
import FooterStatisticView from './view/footer-statistics';
import MovieListPresenter from './presenter/movie-list';
import FilterPresenter from './presenter/filter';
import MoviesModel from './model/movies';
import FilterModel from './model/filter';
import Api from './api';
import { UpdateType } from './const';

const AUTHORIZATION = 'Basic helpmepls001';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

const movieListPresenter = new MovieListPresenter(mainElement, moviesModel, filterModel, api);
const filterPresenter = new FilterPresenter(mainElement, filterModel, moviesModel, movieListPresenter);
const userProfilePresenter = new UserProfilePresenter(headerElement, moviesModel);


filterPresenter.init();
movieListPresenter.init();
userProfilePresenter.init();

api.getFilms()
  .then((films) => {
    moviesModel.setMovies(UpdateType.INIT, films);
    render(footerStats, new FooterStatisticView(films.length), RenderPosition.BEFOREEND);
  });
// .catch(() => {
//   moviesModel.setMovies(UpdateType.INIT, []);
//   render(footerStats, new FooterStatisticView(0), RenderPosition.BEFOREEND);
// });
