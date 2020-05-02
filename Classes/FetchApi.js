class FetchApi {
    constructor(apiURL) {
        this.apiURL = apiURL;
    }
    getGamesList() {
        return fetch(`${this.apiURL}/games`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => response.json());
    }
    deleteGame(gameID) {
        return fetch(`${this.apiURL}/games/${gameID}`, {
            method: "DELETE"
        }).then(r => r.text());
    }
    createGameRequest(gameObject) {
        return fetch(`${this.apiURL}/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: gameObject
        }).then(response => response.json());
    }
    updateGameRequest(gameid, updatedGameObj) {
        return fetch(`${this.apiURL}/games/${gameid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: updatedGameObj
        })
            .then(response => response.json());
    }
}









