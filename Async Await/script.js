console.log("script loaded");

const newGameButton = document.getElementById("new-game");
const dealButton = document.getElementById("deal");
const cardSpan = document.getElementById("new-card");

const personButton = document.getElementById("new-person")
const personImage = document.getElementById("person-image")
const nameSpan = document.getElementById("person-name")

let deckId = null;
dealButton.disabled = true;
personButton.disabled = true;

//const deal = () => {
// }
async function deal(){
    try{
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
        const data = await response.json()
        console.log(data)
        card = data.cards[0].code
        cardSpan.innerText = card;
    }
    catch(error){
        console.log("Deal API Request Failed", error)
    }
}

dealButton.addEventListener("click", (e) => {
    deal()
});

const generateOpponent = async () => {
    try{
        const response = await fetch(`https://randomuser.me/api/`)
        const data = await response.json()
        console.log(data)

        const person = data.results[0]
        const fullName = `${person.name.first} ${person.name.last}`;
        nameSpan.innerText = fullName
        personImage.src = person.picture.medium
    }
    catch(error){
        console.log("Person API Request Failed", error)
    }
}
personButton.addEventListener("click", (e) =>{
    generateOpponent()
})

//const newGame = async () => {
// }
async function newGame(){
    try{
        const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
        const data = await response.json()
        console.log(data)
        deckId = data.deck_id;
        dealButton.disabled = false
        personButton.disabled = false
    }
    catch(error){
        console.log("New Game API Request Failed", error)
    }
}

newGameButton.addEventListener("click", (e) => {
    newGame()
});



