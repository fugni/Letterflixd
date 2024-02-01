import React, { useState, useEffect } from "react";

const Movies = () => {
    const [letterboxdUser, setLetterboxdUser] = useState("flungi");
    const [errorMessage, setErrorMessage] = useState("");

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            letterboxd();
        }
    };

    const handleInputChange = (event) => {
        setLetterboxdUser(event.target.value);
    };

    const handleGoButtonClick = () => {
        letterboxd();
    };

    const letterboxd = () => {
        const input = document.getElementById("username");
        input.value = letterboxdUser;

        fetch(`https://letterboxd.com/${letterboxdUser}/rss`)
            .then((response) => response.text())
            .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
            .then((data) => {
                const items = data.querySelectorAll("item");

                const moviesContainer = document.querySelector(".movies");
                moviesContainer.innerHTML = "";

                if (items.length === 0) {
                    setErrorMessage("User not found");
                    return;
                }

                setErrorMessage(""); // Clear error message if user is found

                items.forEach((item) => {
                    let title = item.querySelector("title").innerHTML;
                    if (title.includes("(contains spoilers)")) {
                        title = title.substring(0, title.indexOf("(contains spoilers)") - 1);
                    }

                    const movieTitle = title.split(" - ")[0].substring(0, title.split(" - ")[0].length - 6);
                    const movieYear = title.split(" - ")[0].substring(title.split(" - ")[0].length - 4, title.split(" - ")[0].length);
                    const movieRating = title.split(" - ")[1];

                    let movieImage = item.querySelector("description").innerHTML;
                    movieImage = movieImage.substring(movieImage.indexOf('src="') + 5, movieImage.indexOf('"/>'));
                    
                    // movie div creation and appending
                    const movieDiv = document.createElement("div");
                    movieDiv.classList.add("movie");
                    movieDiv.style.backgroundImage = `url(${movieImage})`;
                    movieDiv.innerHTML =
                        '<div class="movie-title-div">' +
                        '<div class="movie-title">' +
                        movieTitle +
                        "</div>" +
                        '<div class="movie-year">' +
                        movieYear +
                        "</div>" +
                        "</div>" +
                        '<div class="movie-rating">' +
                        movieRating +
                        "</div>";
                    moviesContainer.appendChild(movieDiv);
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setErrorMessage("An error occurred. Please try again.");
            });
    };

    useEffect(() => {
        letterboxd(); // Run letterboxd function on component mount
    }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <div>
            <header className="header">
                <h1>Letterflixd</h1>
                <div className="letterboxd-input-container">
                    <label htmlFor="letterboxd-input">Letterboxd Username:</label>
                    <div className="letterboxd-input-buttons">
                        <input
                            id="username"
                            type="text"
                            onKeyPress={handleKeyPress}
                            onChange={handleInputChange}
                            value={letterboxdUser}
                        />
                        <button onClick={handleGoButtonClick}>Go!</button>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </header>

            <div className="movies"></div>
        </div>
    );
};

export default Movies;
