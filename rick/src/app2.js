const API_URL = 'https://rickandmortyapi.com/api';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const characterImage = document.getElementById('characterImage');
const characterName = document.getElementById('characterName');
const characterStatus = document.getElementById('characterStatus');
const characterSpecies = document.getElementById('characterSpecies');
const characterGender = document.getElementById('characterGender');
const characterLocation = document.getElementById('characterLocation');
const card = document.querySelector('.card');

// Cargar un personaje aleatorio al azar
fetch(`${API_URL}/character/${Math.floor(Math.random() * 671) + 1}`)
  .then(response => response.json())
  .then(data => displayCharacterData(data))
  .catch(error => console.error(error));

// Buscar un personaje por nombre o ID con el botón
searchButton.addEventListener('click', () => {
  const searchQuery = searchInput.value.toLowerCase();
  fetch(`${API_URL}/character/${searchQuery}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se encontró ningún personaje con ese nombre o ID.');
      }
      return response.json();
    })
    .then(data => displayCharacterData(data))
    .catch(error => displayErrorMessage(error));
});

// Buscar un personaje por nombre o ID con la tecla Enter
searchInput.addEventListener('keyup', e => {
  if (e.key == 'Enter') {
    const searchQuery = searchInput.value.toLowerCase();
    fetch(`${API_URL}/character/${searchQuery}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se encontró ningún personaje con ese nombre o ID.');
        }
        return response.json();
      })
      .then(data => displayCharacterData(data))
      .catch(error => displayErrorMessage(error));
  }
});

// Mostrar la información del personaje en la tarjeta
function displayCharacterData(data) {
  characterImage.src = data.image;
  characterName.innerText = data.name;
  characterStatus.innerText = data.status;
  characterSpecies.innerText = data.species;
  characterGender.innerText = data.gender;
  characterLocation.innerText = data.location.name;
  card.style.display = 'block';
}

// Mostrar un mensaje de error en la tarjeta
function displayErrorMessage(error) {
  characterImage.src = '';
  characterName.innerText = '';
  characterStatus.innerText = '';
  characterSpecies.innerText = '';
  characterGender.innerText = '';
  characterLocation.innerText = '';
  card.style.display = 'none';
  alert(error);
}
