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

inputElement.addEventListener("keydown", function () {

    dropdown.innerHTML = ""
    const value = this.value;
    if (value.length >= 3) {
        searchService.searchMovies(value).then(movies => {
            movieList = movies.sort(sortByScore)
            movieList.splice(0, 8).forEach(movie => {
                const option = movieOption(movie)
                dropdown.appendChild(option)
                let x = document.querySelectorAll(".title")
                // console.log(x)
                x.forEach(element => element.addEventListener("click", (e) => {
                    inputElement.value = e.target.textContent
                }))
            })

        })
    }
    else {
        dropdown.innerHTML = `<p>this was deleted</p>`
    }
})

window.addEventListener("click", (e) => {
    if (!e.target.matches(".dropdown-item")) {
        dropdown.classList.remove("show")
    }
    
})

window.addEventListener("click", (e) => {
    console.log(e.target)
    if (e.target.matches(".searchTerm"))
        dropdown.classList.add("show")
})


function movieOption(movie) {
    let content = document.createElement("div")
    content.classList.add("dropdown-item")
    let movieName = document.createElement("div")
    movieName.classList.add("title")
    movieNameContent = document.createTextNode(`${movie.title}`)
    movieName.appendChild(movieNameContent)
    content.appendChild(movieName)

    let rating = document.createElement("div")
    rating.classList.add("rating")
    ratingContent = document.createTextNode(`${movie.vote_average}`)
    rating.appendChild(ratingContent)
    content.appendChild(rating)

    let movieYear = document.createElement("div")
    movieYear.classList.add("year")
    movieYearContent = document.createTextNode(`${movie.release_date.slice(0, 4)}`)
    movieYear.appendChild(movieYearContent)
    content.appendChild(movieYear)
    return content
}
