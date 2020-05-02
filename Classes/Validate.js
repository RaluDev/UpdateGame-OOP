class myGame {
    constructor(title, releaseDate, genre, publisher, imageUrl, description) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.genre = genre;
        this.publisher = publisher;
        this.imageUrl = imageUrl;
        this.description = description;
    }
    //validare
    validateFormElement(inputElement, errorMessage) {
        if (inputElement.value === "") {
            if (!document.querySelector('[rel="' + inputElement.id + '"]')) {
                this.buildErrorMessage(inputElement, errorMessage);
            }
        }
        else {
            if (document.querySelector('[rel="' + inputElement.id + '"]')) {
                console.log("the error is erased!");
                document.querySelector('[rel="' + inputElement.id + '"]').remove();
                inputElement.classList.remove("inputError");
            }
        }
    }
    validateReleaseTimestampElement(inputElement, errorMessage) {
        if (isNaN(inputElement.value) && inputElement.value !== "") {
            this.buildErrorMessage(inputElement, errorMessage);
        }
    }
    //error message
    buildErrorMessage(inputEl, errosMsg) {
        inputEl.classList.add("inputError");
        const errorMsgElement = document.createElement("span");
        errorMsgElement.setAttribute("rel", inputEl.id);
        errorMsgElement.classList.add("errorMsg");
        errorMsgElement.innerHTML = errosMsg;
        inputEl.after(errorMsgElement);
    }
    //display joc nou creat in dom
    displayGame(response) {
        const divGame = document.createElement('div');
        divGame.innerHTML = `
                    <h1>${response.title}</h1>
                    <img class='imageUrl' src='${response.imageUrl}'>
                    <p>${response.description}</p> 
                    <button class="delete-btn">Delete Game</button>
                    <button class="update-btn">Edit Game</button>       
        `;
        return divGame;
    }
}









