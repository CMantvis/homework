const inputElement = document.querySelector(".searchTerm");
const buttonElement = document.querySelector(".searchButton");
const dropdown = document.getElementById("dropdown")

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
    dropdown.innerHTML=""
    const value = this.value;
    if (value.length >= 3) {
        searchService.searchMovies(value).then(movies => {
            movieList = movies.sort(sortByScore)
            movieList.splice(0, 8).forEach(movie => {
                const option = movieOption(movie)
                dropdown.appendChild(option)
            })

        })
    }
    else {
        dropdown.innerHTML = `<p>this was deleted</p>`
    }
}

// window.addEventListener("click", (e) => {
//     if(!event.target.matches("#dropdown")) {
//     dropdown.classList.remove("show")
//     }

// })

function movieOption(movie) {
    let content = document.createElement("div")
    let movieName = document.createElement("div")
    movieName.classList.add("title")
    movieNameContent = document.createTextNode(`${movie.title}`)
    movieName.appendChild(movieNameContent)
    content.appendChild(movieName)
    let rating = document.createElement("div")
    rating.classList.add("rating")
    content.appendChild(rating)
    return content
}