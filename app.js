const overlay = document.getElementById('overlay');
const startButton = document.getElementsByClassName('btn__reset')[0];

const keyrow = document.getElementById('qwerty');
let guessButton = document.querySelectorAll('#qwerty .keyrow button');
let guess = guessButton.textContent;

let missed = 0;

// LIST OF POTENTIAL PHRASES
const phrases = [
  'LIAR LIAR PANTS ON FIRE',
  'THE COW JUMPED OVER THE MOON',
  'LIFE IS JUST A BOWL OF CHERRIES',
  'A GAME OF CAT AND MOUSE',
  'WHEN LIFE GIVES YOU LEMONS MAKE LEMONADE'
];

// STARTS GAME WITH BUTTON SUBMIT
startButton.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// RANDOMLY CHOOSE A PHRASE AND SPLIT INTO NEW ARRAY
function getRandomPhraseAsArray(arr) {
  const randomPhrase = Math.floor( Math.random() * arr.length);
  const chosenPhrase = arr[randomPhrase];
  const phraseLetters = chosenPhrase.split('');
  return phraseLetters;
}

const phraseArray = getRandomPhraseAsArray(phrases);

// ADDS CHARACTER ARRAY TO DOCUMENT
function addPhraseToDisplay(array) {
  for ( let i = 0; i < array.length; i++ ) {
    const character = document.createElement('li');
    const characterList = document.querySelector('#phrase ul');
    character.textContent = array[i];
    characterList.append(character);

    // checks if a character is a space or letter
    if (character.textContent === ' ') {
      character.className = 'space';
    } else {
      character.className = 'letter';
    }
  }
}

addPhraseToDisplay(phraseArray);

// CHECKS IF USER'S GUESS IS CORRECT
const letter = document.getElementsByClassName('letter');
function checkLetter(button) {
  const guessUpper = button.textContent.toUpperCase();
  let letterMatch = null;

  // adds correct guess to the user's display
  for ( let i = 0; i < letter.length; i++) {
    if ( letter[i].textContent === guessUpper ) {
      letter[i].classList.add('show');
      letterMatch = guess;
    }
  }
  return letterMatch;
}

//  CONNECTS THE DOC KEYBOARD TO THE USER'S INPUT AND
  // ENSURES A USER CAN'T CLICK THE SAME KEY TWICE
let button = guessButton;
keyrow.addEventListener('click', (e) => {
  button = e.target;

  if (button.tagName === "BUTTON") {
    button.classList.add('chosen');
    button.disabled = true;
    checkLetter(button);

    // if a user's guess was incorrect:
      // their missed count goes up by one and a live heart is swapped
    if (checkLetter(button) === null) {
        missed++;
        let lives = document.querySelector('#scoreboard .tries img[src="images/liveHeart.png"]');
        lives.src = "images/lostHeart.png";
    }
    console.log(missed);
  }

  // checks if the user has won or lost and
    // displays the appropriate screen
  function checkWin() {
    let guessedLetters = document.getElementsByClassName('show');
    let overlayHeader = document.querySelector('#overlay h2');

    if ( letter.length === guessedLetters.length ) {
      overlay.style.display = 'flex';
      overlay.className = 'win';
      overlayHeader.innerHTML = 'Congratulations! You win!';
      startButton.addEventListener('click', () => {
        location.reload();
      });
    }
    if ( missed > 4 ) {
      overlay.style.display = 'flex';
      overlay.className = 'lose';
      overlayHeader.innerHTML = 'Sorry, you lost. Would you like to try again?';
      startButton.addEventListener('click', () => {
        location.reload();
      });
    }
  }

  checkWin();
});
