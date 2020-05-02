const apiURL = new FetchApi('https://games-app-siit.herokuapp.com');


// Get games cu async
async function getGames() {
    const arrayOfGames = await apiURL.getGamesList();
    for (var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);
    }
}

getGames();



//creare div pentru fiecare joc si adaugare in DOM

const createDomElement = gameObj => {
    const container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");
    gameELement.setAttribute("id", gameObj._id)
    gameELement.innerHTML = `<h1>${gameObj.title}</h1> 
                            <img src="${gameObj.imageUrl}" />
                            <p>${gameObj.description}</p> 
                            <button class="delete-btn">Delete Game</button>
                            <button class="update-btn">Edit Game</button>`;

//creare update form
    const updateGameElement = document.createElement("form");
    updateGameElement.classList.add('updateForm');
    updateGameElement.innerHTML = `
                                <label for="gameTitle">Title *</label>
                                <input type="text" value="${gameObj.title}" name="gameTitle" id="Title"/>

                                <label for="gameDescription">Description</label>
                                <textarea name="gameDescription" id="Description">${gameObj.description}</textarea>
                        
                                <label for="gameImageUrl">Image URL *</label>
                                <input type="text" name="gameImageUrl" id="ImageUrl" value="${gameObj.imageUrl}"/>
                        
                                <button class="updateBtn">Save Changes</button>
                                <button class="cancelBtn">Cancel</button>`;


    container1.appendChild(gameELement);


    // display update form on button click / delete game on button click
      
    document.getElementById(`${gameObj._id}`).addEventListener("click", event => {
        // console.log(gameELement, event.target.parentElement);
        
        if (event.target.classList.contains('delete-btn')) {
            // deleteGame cu async
            async function deleteG() {
                const target = await apiURL.deleteGame(`${gameObj._id}`);
                removeDeletedElementFromDOM(event.target.parentElement);
            } 
            deleteG();

        } else if (event.target.classList.contains('update-btn')) {
            event.target.parentElement.appendChild(updateGameElement);
        } else if (event.target.classList.contains('cancelBtn')) {
            removeDeletedElementFromDOM(updateGameElement);
        } else if (event.target.classList.contains('updateBtn')) {
            event.preventDefault();

            updateDomElement(event.target.parentElement.parentElement);
            removeDeletedElementFromDOM(updateGameElement);
        }
    });
}


//aduce si econdeaza datele din update form
 const updateDomElement = gameElement => {
    //luam valorile din update form, din cele trei inputuri
    const newGameTitle = document.getElementById("Title").value;
    const newGameDescription = document.getElementById("Description").value;
    const newGameImageUrl = document.getElementById("ImageUrl").value;

    //le atribuim la cele din gameElemen
    gameElement.querySelector('h1').innerHTML = newGameTitle;
    gameElement.querySelector('p').innerHTML = newGameDescription;
    gameElement.querySelector('img').src = newGameImageUrl;

    //le encodam cu url params
    const urlencoded = new URLSearchParams();
    urlencoded.append("title", newGameTitle);
    urlencoded.append("description", newGameDescription);
    urlencoded.append("imageUrl", newGameImageUrl);

    // updateGameRequest cu async
    async function update() {
        const updatedG = await apiURL.updateGameRequest (gameElement.id, urlencoded);
        console.log(gameElement, urlencoded);
    }
    update();
}


 
// remove element from dom
const removeDeletedElementFromDOM = domElement => {
    domElement.remove();
}



//event pe submitt, validare elemente, functia creare new game 
document.querySelector(".submitBtn").addEventListener("click", event => {
    event.preventDefault();
    //selectare elemente
    const newGame = new myGame(document.getElementById("gameTitle"), 
                                            document.getElementById("gameRelease"), 
                                            document.getElementById("gameGenre"), 
                                            document.getElementById("gamePublisher"), 
                                            document.getElementById("gameImageUrl"), 
                                            document.getElementById("gameDescription"));


    //validare
    newGame.validateFormElement(newGame.title, "The title is required!");
    newGame.validateFormElement(newGame.genre, "The genre is required!");
    newGame.validateFormElement(newGame.publisher, "The image URL is required!");
    newGame.validateFormElement(newGame.releaseDate, "The release date is required!");

    newGame.validateReleaseTimestampElement(newGame.releaseDate, "The release date you provided is not a valid timestamp!");

    //encoded params
    if (newGame.title.value !== "" && newGame.genre.value !== "" && newGame.imageUrl.value !== "" && newGame.releaseDate.value !== "") {
        const urlencoded = new URLSearchParams();
        urlencoded.append("title", newGame.title.value);
        urlencoded.append("releaseDate", newGame.releaseDate.value);
        urlencoded.append("genre", newGame.genre.value);
        urlencoded.append("publisher", newGame.publisher.value);
        urlencoded.append("imageUrl", newGame.imageUrl.value);
        urlencoded.append("description", newGame.description.value);

       
        //creare game request cu async
        async function createGame() {
            const response = await apiURL.createGameRequest(urlencoded);
            const addGameInDom = newGame.displayGame(response);
            document.querySelector('.container').appendChild(addGameInDom);

        }
        createGame();
    }
});

   