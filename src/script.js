const inputElement = document.querySelector(".searchTerm");
const buttonElement = document.querySelector(".searchButton");
const dropdown = document.getElementById("dropdown");
const textholder = document.querySelector(".textholder")
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
        return url;
    }
}

let searchService = new SearchApi()

inputElement.addEventListener("keydown", function () {

    dropdown.innerHTML = "";
    const value = this.value;
    console.log(value.length)
    if (value.length >= 2) {
        searchService.searchMovies(value).then(movies => {
            console.log(movies)
            movieList = movies.sort(sortByScore);
            movieList.splice(0, 8).forEach(movie => {
                const option = movieOption(movie);
                dropdown.appendChild(option);
            })
        })
    }
    else {
        dropdown.innerHTML = ``;
    }
})

window.addEventListener("click", (e) => {
    if (!e.target.matches(".dropdown-item")) {
        dropdown.classList.remove("show");
        inputElement.classList.remove("showing")
        textholder.style.display ="none"
    }
})

window.addEventListener("click", (e) => {
    if (e.target.matches(".searchTerm")) {
        dropdown.classList.add("show");
        inputElement.classList.add("showing")
        textholder.style.display ="block"
    }
})


function movieOption(movie) {
    let content = document.createElement("div");
    content.classList.add("dropdown-item");
    let movieName = document.createElement("div");
    movieName.classList.add("title");
    movieNameContent = document.createTextNode(`${movie.title}`);
    movieName.appendChild(movieNameContent);
    content.appendChild(movieName);

    let ratingYear = document.createElement("div");
    ratingYear.classList.add("rating");
    ratingYearContent = document.createTextNode(`${movie.vote_average} Rating, ${movie.release_date.slice(0, 4)}`);
    ratingYear.appendChild(ratingYearContent);
    content.appendChild(ratingYear);

    // let movieYear = document.createElement("div");
    // movieYear.classList.add("year");
    // movieYearContent = document.createTextNode(`${movie.release_date.slice(0, 4)}`);
    // movieYear.appendChild(movieYearContent);
    // content.appendChild(movieYear);

    movieName.addEventListener("click", function (e) {
        let el = this;
        console.log(this)
        document.querySelector(".searchTerm").value = el.textContent;

    })
    return content
}
