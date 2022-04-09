import {populateGenreDropdown, getSelectedGenre, clearCurrentMovie,  getRandomMovie, displayMovie} from './helpers.js'

const tmdbKey = "01b27bd5522298a9d8898d6bdc8fd202";
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try{
    let response = await fetch(urlToFetch, {method: 'GET'});
    if(response.ok){
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres
    }
  }catch(Error){
    console.log(Error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try{
    const response = await fetch(urlToFetch, {method:'GET'});
    if(response.ok){
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  }catch(Err){
    console.log(Err);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id ;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try{
    const response = await fetch(urlToFetch, {method:'GET'});
    if(response.ok){
      const movieInfo = await response.json();
      return movieInfo;
    }
  } catch(err){
    cosole.log(err);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info)
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;

export {showRandomMovie}