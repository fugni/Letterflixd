function Header() {
    return (
        <header className="header">
            <h1>Letterflixd</h1>
            <div className="letterboxd-input-container">
                <label htmlFor="letterboxd-input">Letterboxd Username:</label>
                <div className="letterboxd-input-buttons">
                    <input type="text" id="letterboxd-input" defaultValue="flungi"></input>
                    <button>Go</button>
                </div>
            </div>
        </header>
    );
}

export default Header;
