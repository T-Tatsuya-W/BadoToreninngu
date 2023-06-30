function toggleFormation() {
    const formationTitle = document.getElementById('formationTitle');
    
    if (formationTitle.textContent === 'Singles Formations') {
      formationTitle.textContent = 'Doubles Formations';
    } else {
      formationTitle.textContent = 'Singles Formations';
    }
  }

if ('speechSynthesis' in window) {
// Speech Synthesis supported 🎉
alert("supports TTS")
}else{
    // Speech Synthesis Not Supported 😣
    alert("Sorry, your browser doesn't support text to speech!");
}
  
// Get DOM elements
const startGameButton = document.getElementById('startGameButton');
const formationTitle = document.getElementById('formationTitle');
const playerFormationsContainer = document.getElementById('playerFormationsContainer');
const gameContainer = document.getElementById('gameContainer');

// Event listener for "Start Game" button in player formations mode
startGameButton.addEventListener('click', startGame);

// Event listener for "Start Game" button in game mode
// We'll implement this function later

// Start Game function
function startGame() {
  // Hide player formations elements
  formationTitle.style.display = 'none';
  playerFormationsContainer.style.display = 'none';

  // Display game elements
  gameContainer.style.display = 'block';

  // Call function to start the game
  startGameMode();
}


function startGameMode() {
    // Get the court element
    const court = document.getElementById('court');
  
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
  