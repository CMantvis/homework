const inputElement = document.querySelector(".searchTerm");
const buttonElement = document.querySelector(".searchButton");
const test = document.querySelector(".test")

function sortByScore(a, b) {
    return b.popularity - a.popularity
}

class SearchApi {
    constructor() {
        this.apiKey = "2c5877b70ad14759964f5d3ef7cc0759";
        this.url = "https://api.themoviedb.org/3/search/movie";

    }



    searchMovies(queryString) {
        let url = this._createUrl(queryString)
        return fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let movieList = data.results
                return movieList
            })
    }

    _createUrl(queryString) {
        const sanitizedQueryString = queryString.replace(/ |&/g, function (match) { return (match == "&") ? "%26" : "%20"; })
        const url = `${this.url}?api_key=${this.apiKey}&language=en-US&query=${sanitizedQueryString}&page=1&include_adult=false`
        return url
    }

}

let searchService = new SearchApi()

inputElement.onkeydown = function () {
    const value = this.value;
    if (value.length >= 3) {
        searchService.searchMovies(value).then(movies => {
            movieList = movies.sort(sortByScore)
            const html = movieList.map(movie => {
                return `
                <p>movies title: ${movie.title}, ${movie.vote_average}, ${[...movie.release_date].splice(0, 4).join("")}</p>
                `
            }).splice(0, 8)
            test.innerHTML = html
        })
    }
    else {
        test.innerHTML = `<p>this was deleted</p>`
    }
}

