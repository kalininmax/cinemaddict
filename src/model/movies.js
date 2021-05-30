import Observer from '../utils/observer';

class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(movies, updateType) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        filmInfo: {
          title: film.film_info.title,
          alternativeTitle: film.film_info.alternative_title,
          rating: film.film_info.total_rating,
          poster: film.film_info.poster,
          ageRating: film.film_info.age_rating,
          director: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          release: {
            date: film.film_info.release.date,
            country: film.film_info.release.release_country,
          },
          runtime: film.film_info.runtime,
          genres: film.film_info.genre,
          description: film.film_info.description,
        },
        userDetails: {
          watchlist: film.user_details.watchlist,
          watched: film.user_details.already_watched,
          watchingDate: film.user_details.watching_date,
          favorite: film.user_details.favorite,
        },
      },
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'film_info': {
          'title': film.filmInfo.title,
          'alternative_title': film.filmInfo.alternativeTitle,
          'poster': film.filmInfo.poster,
          'description': film.filmInfo.description,
          'total_rating': film.filmInfo.rating,
          'release': {
            'date': film.filmInfo.release.date,
            'release_country': film.filmInfo.release.country,
          },
          'runtime': film.filmInfo.runtime,
          'genre': film.filmInfo.genres,
          'director': film.filmInfo.director,
          'writers': film.filmInfo.writers,
          'actors': film.filmInfo.actors,
          'age_rating': film.filmInfo.ageRating,
        },
        'user_details': {
          'watchlist': film.userDetails.watchlist,
          'already_watched': film.userDetails.watched,
          'watching_date': film.userDetails.watchingDate,
          'favorite': film.userDetails.favorite,
        },
      },
    );

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  }
}

export { Movies as default };
