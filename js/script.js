function toggleFormation() {
    const formationTitle = document.getElementById('formationTitle');
    
    if (formationTitle.textContent === 'Singles Formations') {
      formationTitle.textContent = 'Doubles Formations';
    } else {
      formationTitle.textContent = 'Singles Formations';
    }
  }
  