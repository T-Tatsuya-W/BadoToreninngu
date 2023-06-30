// Get DOM elements
const RGButton = document.getElementById('RGButton');
const formationTitle = document.getElementById('PFTitleButton');
const PFcourt = document.getElementById('PFcourt');
const RGcourt = document.getElementById('RGcourt');
const Settings = document.getElementById('settingsPage');
var PFMode = 1;


if ('speechSynthesis' in window) {
    // Speech Synthesis supported 🎉]
    }else{
        // Speech Synthesis Not Supported 😣
        alert("Sorry, your browser doesn't support text to speech!");
    }


// Event listener for "Start Game" button in player formations mode
RGButton.addEventListener('click', SetupGame);
PFcourt.addEventListener('click', addPlayerIcon);

// Event listener for "Start Game" button in game mode
// We'll implement this function later

// Start Game function
function SetupGame() {
    // Hide player formations elements
    removeAllPlayerIcons();
    removeArrows();
    formationTitle.style.display = 'none';
    PFcourt.style.display = 'none';
    RGButton.style.display = 'none';
    RGButton.style.display = 'none';
    Settings.style.display = 'block';
    
}



// Get DOM elements
const startGameButton = document.getElementById('startGameButton');
const intervalInput = document.getElementById('intervalInput');
const speechCheckbox = document.getElementById('speechCheckbox');
const usernameInput = document.getElementById('usernameInput');

// Event listener for "Start Game" button
startGameButton.addEventListener('click', startGame);

// Start Game function
function startGame() {
  // Retrieve the selected settings
  const interval = parseInt(intervalInput.value);
  const enableSpeech = speechCheckbox.checked;
  const username = usernameInput.value;

  // Hide the settings page
  document.getElementById('settingsPage').style.display = 'none';

  // Start the game with the selected settings
  startReactionGame(interval, enableSpeech, username);
}

function startReactionGame(interval, enableSpeech, username) {
    console.log("game starts");
    // Game logic goes here
    // You can use the provided interval, enableSpeech, and username variables
    // to customize the behavior of the game based on the selected settings.
    // For example, you can use the interval to control the time between sets,
    // enableSpeech to determine whether to use speech prompts, and username to
    // store the player's name for later use.
  
    // Display the game elements
    // ...
  }
  




// Function to add a player icon at the clicked position
function addPlayerIcon(given) {
    // Get the clicked coordinates relative to the court image
    const rect = PFcourt.getBoundingClientRect();
    const x = given.x;
    const y = given.y;

    // Calculate the vertical position as a %
    const imageHeight = rect.height;
    const verticalPosition = (y/imageHeight)*100;
  
    // Create a player icon element (red circle)
    const playerIcon = document.createElement('div');
    playerIcon.style.left = x + 'px';
    playerIcon.style.top = y + 'px';

    if (verticalPosition < 50){
        playerIcon.style.backgroundColor = 'red';
        playerIcon.classList.add('player-icon-red');
    } else {
        playerIcon.style.backgroundColor = 'blue';
        playerIcon.classList.add('player-icon-blue');
    }
    
    
    // Append the player icon to the court
    PFcourt.appendChild(playerIcon);

    const redPlayerIcons = PFcourt.getElementsByClassName('player-icon-red');
    const bluePlayerIcons = PFcourt.getElementsByClassName('player-icon-blue');


    if (PFMode === 1){
        if (redPlayerIcons.length > 1) {
            redPlayerIcons[0].remove(); // Remove the first red player icon
        }if (bluePlayerIcons.length > 1) {
            bluePlayerIcons[0].remove(); // Remove the first red player icon
        }
      } else if (PFMode === 2) {
        if (redPlayerIcons.length > 2) {
          redPlayerIcons[0].remove(); // Remove the oldest red player icon
        }
        if (bluePlayerIcons.length > 2) {
          bluePlayerIcons[0].remove(); // Remove the oldest blue player icon
        }
      }

}


// Toggle Formation Title and counters
function toggleFormation() {
    const formationTitle = document.getElementById('PFTitle');
    
    if (formationTitle.textContent === 'Singles Formations') {
        formationTitle.textContent = 'Doubles Formations';
        let utterance = new SpeechSynthesisUtterance("doubles");
        PFMode = 2;
        removeAllPlayerIcons();
        // speechSynthesis.speak(utterance);
    } else {
        formationTitle.textContent = 'Singles Formations';
        let utterance = new SpeechSynthesisUtterance("Singles");
        PFMode = 1;
        removeAllPlayerIcons();
        // speechSynthesis.speak(utterance);
    }
}

// Function to remove all player icons from the court
function removeAllPlayerIcons() {
    const playerIconsRed = PFcourt.getElementsByClassName('player-icon-red');
    while (playerIconsRed.length > 0) {
      playerIconsRed[0].remove();
    }
    const playerIconsBlue = PFcourt.getElementsByClassName('player-icon-blue');
    while (playerIconsBlue.length > 0) {
      playerIconsBlue[0].remove();
    }
}

function removeArrows() {
    const arrows = PFcourt.getElementsByClassName('arrow');
    while (arrows.length > 0) {
      arrows[0].remove();
    }
}



// Draw Arrow
PFcourt.addEventListener('touchstart', startDrawing);
PFcourt.addEventListener('touchend', stopDrawing);

let isDrawing = false;
let startPoint = {};
const CLICK_THRESHOLD = 100;

function startDrawing(event) {
    const rect = PFcourt.getBoundingClientRect();

    event.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
    isDrawing = true;
    startPoint = {
        x: event.changedTouches[0].clientX-rect.left,
        y: event.changedTouches[0].clientY-rect.top
    };
}

function stopDrawing() {
    const rect = PFcourt.getBoundingClientRect();

    if (isDrawing) {
        isDrawing = false;
        const endPoint = {
            x: event.changedTouches[0].clientX-rect.left,
            y: event.changedTouches[0].clientY-rect.top
        };

        // Check if the movement distance is below the click threshold
        const dx = endPoint.x - startPoint.x;
        const dy = endPoint.y - startPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < CLICK_THRESHOLD) {
            // Handle click event separately (e.g., add player icons)
            addPlayerIcon(endPoint);
        } else {
            // Handle drag event (e.g., draw arrow)
            drawArrow(startPoint, endPoint);
        }
    }
}


function drawArrow(startPoint, endPoint) {
    //delete any existing arrows.
    removeArrows();
    
    console.log("draw an arrow");
    const arrow = document.createElement('div');
    arrow.classList.add('arrow');
    const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
    const length = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
    arrow.style.width = length + 'px';
    arrow.style.transform = `translate(${startPoint.x}px, ${startPoint.y}px) rotate(${angle}rad)`;
    PFcourt.appendChild(arrow);
  }
  