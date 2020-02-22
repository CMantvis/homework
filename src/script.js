

const inputElement = document.querySelector(".searchTerm");
const buttonElement = document.querySelector(".searchButton");
const test = document.querySelector(".test")


function sortByScore (a,b) {
return b.popularity - a.popularity
}

// function getUrl (value) {
//     const value = inputElement.value;
// }

inputElement.onkeyup = function (event) {
    event.preventDefault();
    const value = this.value;
    console.log(value)
    if(value.includes(" ") || value.includes("&")) {
        const whiteSpaces = value.replace(/ |&/g,function(match) {return (match=="&")?"%26":"%20";})
        const url = "https://api.themoviedb.org/3/search/movie?api_key=2c5877b70ad14759964f5d3ef7cc0759&language=en-US" +"&query=" +whiteSpaces +"&page=1&include_adult=false"
        console.log(url)
        if (value.length >=3) {
        fetch(url)
        .then ((response) => response.json())
        .then ((data) => {
            let x = data.results
            
            x.sort(sortByScore)
            const html = x.map (movie=> {
                return `
                <p>movies title: ${movie.title}, ${movie.vote_average}, ${[...movie.release_date].splice(0,4).join("")}</p>
                `
            }).splice(0,8)
            test.innerHTML = html
        })
        .catch ((error) => {
            console.log("error: ", error)
        });
    }
    else {
        test.innerHTML = `<p>this was deleted</p>`
    }
    }
    else {
    const url = "https://api.themoviedb.org/3/search/movie?api_key=2c5877b70ad14759964f5d3ef7cc0759&language=en-US" +"&query=" +value +"&page=1&include_adult=false"
    console.log(url)
    if (value.length >=3) {
    fetch(url)
    .then ((response) => response.json())
    .then ((data) => {
        let x = data.results
        
        x.sort(sortByScore)
        const html = x.map (movie=> {
            return `
            <p>movies title: ${movie.title}, ${movie.vote_average}, ${[...movie.release_date].splice(0,4).join("")}</p>
            `
        }).splice(0,8)
        test.innerHTML = html
    })
    .catch ((error) => {
        console.log("error: ", error)
    });
}
else {
    test.innerHTML = `<p>this was deleted</p>`
}
    }

}

