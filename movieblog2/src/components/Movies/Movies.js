import React from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

// const FEATURED_API = "http://www.omdbapi.com/?apikey=25dd57db&s=kurtlar";

const Movies = (props) => {
    // state = {
    //     movies: [
    //         props.movies
    //     ]
    // }

    // const [ movies, setMovies] = useState([]);

    // useEffect(() => {
    //     fetch(FEATURED_API)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         setMovies(data.Search)
    //     });
    // }, []);
// render() {   
    // let movies = props.movies
    
    function button() {
        console.log(props.movies);
    }
    return (
        <>
        <button onClick={button}>button2</button>
        {/* <ul className="movies">
            {movies.map((movie) => (
                <li className="movies__item" key={movie.imdbID}>
                    <MovieItem {...movie} />
                </li>
            ))}
        </ul> */}
        </>
    );
// }
}


export default Movies;