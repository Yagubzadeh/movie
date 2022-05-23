import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
	const [movies, setMovies] = useState([
		{
			Title: "Kurtlar Vadisi: Irak",
			Year: "2006",
			imdbID: "tt0493264",
			Type: "movie",
			Poster: "https://m.media-amazon.com/images/M/MV5BMTMwNjg1NDg0Nl5BMl5BanBnXkFtZTcwMzc5MTIzMQ@@._V1_SX300.jpg"
		},
		{
			Title: "Kurtlar Vadisi: Filistin",
			Year: "2011",
			imdbID: "tt1784499",
			Type: "movie",
			Poster: "https://m.media-amazon.com/images/M/MV5BMjEzOTY1MjAzOV5BMl5BanBnXkFtZTcwNTg2ODQzNA@@._V1_SX300.jpg"
		},
		{
			Title: "Black Mirror",
			Year: "2011–2019",
			imdbID: "tt2085059",
			Type: "series",	 	
			Poster: "https://m.media-amazon.com/images/M/MV5BYTM3YWVhMDMtNjczMy00NGEyLWJhZDctYjNhMTRkNDE0ZTI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
		},
		{
			Title: "Içerde",
			Year: "2016–2017",
			imdbID: "tt6051216",
			Type: "series",
			Poster: "https://m.media-amazon.com/images/M/MV5BNmE3M2JmNzUtNTg2My00Yzk4LWJkNjctYTUyYjRlN2QxYjhhXkEyXkFqcGdeQXVyMTE2MDU0NzAw._V1_SX300.jpg"
		}
	]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const SEARCHED_API = `http://www.omdbapi.com/?apikey=25dd57db&s=${searchValue}`;
		// http://www.omdbapi.com/?apikey=25dd57db&s=NIGHT

		const response = await fetch(SEARCHED_API);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='#Yagubzadeh'/>
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;
