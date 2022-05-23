import React, { useState } from 'react';
import Movies from '../Movies/Movies';
import './SearchBox.css';

const SEARCH_API = "http://www.omdbapi.com/?apikey=25dd57db&s=";

function SearchBox() {

    const [ searchLine, setSearchLine] = useState('');
    const [ kino, setMovies] = useState([
        {
            Title:"Night at the Museum",
            Year:"2006","imdbID":"tt0477347",
            Type:"movie",
            Poster:"https://m.media-amazon.com/images/M/MV5BMTQyOTM4MDMxN15BMl5BanBnXkFtZTcwODg5NTQzMw@@._V1_SX300.jpg"
        }
    ]);

    const searchLineChangeHandler = (e) => {
        setSearchLine(e.target.value);
    }
    const searchBoxSubmitHandler = (e) => {
        e.preventDefault();

        // fetch(SEARCH_API+searchLine)
        // .then((res) => res.json())
        // .then((data) => {
        //     setMovies(data.Search)
        // });
    }

    const clicked = () => {
        fetch(SEARCH_API+searchLine)
        .then((res) => res.json())
        .then((data) => {
            setMovies(data.Search)
            // console.log(data.Search);    
        });
    }



    console.log(kino);
 
        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                        onClick={clicked}
                    >
                        Искать
                    </button>
                </form>
                <Movies movies={kino}/>
            </div>
        );
}
 
export default SearchBox;