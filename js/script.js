// Get DOM elements
const startGameButton = document.getElementById('RGStartButton');
const formationTitle = document.getElementById('PFTitleButton');
const PFcourt = document.getElementById('PFcourt');
var PFMode = 1;


if ('speechSynthesis' in window) {
    // Speech Synthesis supported 🎉]
    }else{
        // Speech Synthesis Not Supported 😣
        alert("Sorry, your browser doesn't support text to speech!");
    }


// Event listener for "Start Game" button in player formations mode
startGameButton.addEventListener('click', startGame);
PFcourt.addEventListener('click', addPlayerIcon);

// Event listener for "Start Game" button in game mode
// We'll implement this function later

// Start Game function
function startGame() {
    // Hide player formations elements
    formationTitle.style.display = 'none';

    // Display game elements
    // gameContainer.style.display = 'block';

    // Call function to start the game
    startGameMode();
}


function startGameMode() {
    // Get the court element
    const court = document.getElementById('RGcourt');
  
    // Generate random corner highlights
    const numHighlights = 4; // Number of highlights to generate
    const highlights = [];
  
    for (let i = 0; i < numHighlights; i++) {
        const randomX = Math.random() * 100; // Random X coordinate (0-100)
        const randomY = Math.random() * 100; // Random Y coordinate (0-100)

        const highlight = document.createElement('div');
        highlight.classList.add('corner-highlight');
        highlight.style.left = randomX + '%';
        highlight.style.top = randomY + '%';

        highlights.push(highlight);
    }
  
    // Update the court element with corner highlights
    highlights.forEach((highlight) => {
        court.appendChild(highlight);
    });
  
    // Handle user response and calculate score
  
    // Transition back to player formations mode (optional)
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





// Draw Arrow
PFcourt.addEventListener('touchstart', startDrawing);
PFcourt.addEventListener('touchend', stopDrawing);

let isDrawing = false;
let startPoint = {};
const CLICK_THRESHOLD = 5;

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
    const arrows = PFcourt.getElementsByClassName('arrow');
    while (arrows.length > 0) {
      arrows[0].remove();
    }

    console.log("draw an arrow");
    const arrow = document.createElement('div');
    arrow.classList.add('arrow');
    const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
    const length = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
    arrow.style.width = length + 'px';
    arrow.style.transform = `translate(${startPoint.x}px, ${startPoint.y}px) rotate(${angle}rad)`;
    PFcourt.appendChild(arrow);
  }
  