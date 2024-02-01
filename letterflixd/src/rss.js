console.log("letterflixd/src/rss.js loaded");
const input = document.getElementById("username");

let letterboxdUser = "flungi";
document.title = "Letterboxd User: " + letterboxdUser;
input.value = letterboxdUser;

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        letterboxd();
    }
});

function letterboxd() {
    document.querySelector(".movies").innerHTML = "";
    letterboxdUser = input.value;
    document.title = "Letterboxd User: " + letterboxdUser;
    fetch("https://letterboxd.com/" + letterboxdUser + "/rss")
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((data) => {
            const items = data.querySelectorAll("item");
            console.log(items);

            items.forEach((item) => {
                let title = item.querySelector("title").innerHTML;
                if (title.includes("(contains spoilers)")) {
                    title = title.substring(0, title.indexOf("(contains spoilers)") - 1);
            }
            
            let movieTitle = title.split(" - ")[0].substring(0, title.split(" - ")[0].length - 6)
            let movieYear = title.split(" - ")[0].substring(title.split(" - ")[0].length - 4, title.split(" - ")[0].length)
            let movieRating = title.split(" - ")[1]

            let movieImage = item.querySelector("description").innerHTML;
            movieImage = movieImage.substring(movieImage.indexOf("src=\"") + 5, movieImage.indexOf("\"/>"));

            // movie div creation and appending
            let movieDiv = document.createElement("div");
            movieDiv.classList.add("movie");
            movieDiv.style.backgroundImage = "url(" + movieImage + ")";
            movieDiv.innerHTML = 
                "<div class=\"movie-title-div\">" +
                    "<div class=\"movie-title\">" + movieTitle + "</div>" +
                    "<div class=\"movie-year\">" + movieYear + "</div>" +
                "</div>" +
                "<div class=\"movie-rating\">" + movieRating + "</div>";
            document.querySelector(".movies").appendChild(movieDiv);
        
        });
    })
}

letterboxd();