const hangmanImage = document.querySelector(".hangman-box  img");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord,correctLetters=[], wrongGuessCount = 0;
const maxGuesses = 6;

const resetGame =() =>{
    correctLetters =[];
    wrongGuessCount =0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled =false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class ="letter"></li>`).join("");
    gameModal.classList.remove("show");
   
}


const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    resetGame();
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}


const gameOver=(isVictory)=>{
    //after 600ms of game complete ... showing modal with relevant details
    setTimeout(() =>{
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML= `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    },300);
}

const initGame = (button, clickedletter) => {
    //checking if clickedletter is exist on the currentword
    if (currentWord.includes(clickedletter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedletter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        //if clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;


    //calling gameover function if any of these conditions meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}
//creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord);