const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonName = document.getElementById('pokemonName');
const pokemonType = document.getElementById('pokemonType');
const pokemonHP = document.getElementById('pokemonHP');
const pokemonAttack = document.getElementById('pokemonAttack');
const pokemonDefense = document.getElementById('pokemonDefense');
const pokemonSpecialAttack = document.getElementById('pokemonSpecialAttack');
const card = document.querySelector('.card');

// Cargar un Pokémon aleatorio al azar
fetch(`${API_URL}${Math.floor(Math.random() * 898) + 1}`)
  .then(response => response.json())
  .then(data => displayPokemonData(data))
  .catch(error => console.error(error));

// Buscar un Pokémon por nombre o número con boton
searchButton.addEventListener('click', () => {
  const searchQuery = searchInput.value.toLowerCase();
  fetch(`${API_URL}${searchQuery}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se encontró ningún Pokémon con ese nombre o número.');
      }
      return response.json();
    })
    .then(data => displayPokemonData(data))
    .catch(error => displayErrorMessage(error));
});

// Buscar un Pokémon por nombre o número con apretar enter
searchInput.addEventListener("keyup", e => {
  if (e.key == "Enter") {
    const searchQuery = searchInput.value.toLowerCase();
    fetch(`${API_URL}${searchQuery}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se encontró ningún Pokémon con ese nombre o número.');
        }
        return response.json();
      })
      .then(data => displayPokemonData(data))
      .catch(error => displayErrorMessage(error));
  }
});

// Mostrar la información del Pokémon en la tarjeta
function displayPokemonData(data) {
  pokemonImage.src = data.sprites.other.dream_world.front_default;
  pokemonName.innerText = capitalizeFirstLetter(data.name);
  pokemonType.innerText = capitalizeFirstLetter(data.types[0].type.name);
  pokemonHP.innerText = data.stats[0].base_stat;
  pokemonAttack.innerText = data.stats[1].base_stat;
  pokemonDefense.innerText = data.stats[2].base_stat;
  pokemonSpecialAttack.innerText = data.stats[3].base_stat;
  card.style.display = 'block';
}

// Mostrar un mensaje de error en la tarjeta
function displayErrorMessage(error) {
  pokemonImage.src = '';
  pokemonName.innerText = '';
  pokemonType.innerText = '';
  pokemonHP.innerText = '';
  pokemonAttack.innerText = '';
  pokemonDefense.innerText = '';
  pokemonSpecialAttack.innerText = '';
  card.style.display = 'none';
  alert(error);
}

// Convertir la primera letra de una cadena en mayúscula
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}