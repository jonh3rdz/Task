const API_KEY = '306ef170';
// fetch("https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieName)}")
// .then(res => res.json())
// .then(response => {
//   console.log(response)
// })


// // Cargar una película predeterminada al iniciar la aplicación
// document.addEventListener('DOMContentLoaded', () => {
//   const defaultMovie = Math.floor(Math.random() * (898 - 1 + 1) + 1); //Math.floor(Math.random() * (max - min + 1)) + min;
//   searchMovie(defaultMovie);
// });

// // Manejar el evento de envío del formulario
// document.getElementById('searchForm').addEventListener('submit', (e) => {
//   e.preventDefault();
//   const searchTerm = document.getElementById('searchInput').value.toLowerCase(); //toLowerCase() para mayusculas y minusculas, convierte todo en minuscula
//   searchMovie(searchTerm);
// });

// // Función para buscar una película y mostrar sus detalles
// function searchMovie(movieName) {
//   const apiUrl = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(movieName)}`;

//   fetch(apiUrl)
//     .then(response => {
//       if (response.status === 200) {
//         return response.json()
//       } else {
//         document.getElementById('movieDetails').innerHTML = 'Pokemon no encontrado.';
//       }
//     })
//     .then(data => {
//       // if (data.Response === 'True') {
//       if (data.is_default === true) {
//         const movieDetails = document.getElementById('movieDetails');
//         movieDetails.innerHTML = '';

//         const cardTemplate = document.getElementById('movieCardTemplate');
//         const cardClone = cardTemplate.content.cloneNode(true);

//         const image = cardClone.querySelector('.card-img-top');
//         image.src = data.sprites.other.dream_world.front_default;

//         const name = cardClone.querySelector('.card-name');
//         name.textContent = 'Nombre: ' + data.name;

//         const type = cardClone.querySelector('.movie-type');
//         type.textContent = 'Tipo: ' + data.types[0].type.name;

//         const hp = cardClone.querySelector('.movie-hp');
//         hp.textContent = 'HP: ' + data.stats[0].base_stat;

//         const ataque = cardClone.querySelector('.movie-ataque');
//         ataque.textContent = 'ataque: ' + data.stats[1].base_stat;

//         const Defensa = cardClone.querySelector('.movie-Defensa');
//         Defensa.textContent = 'Defensa: ' + data.stats[2].base_stat;

//         const ataque_especial = 'Ataque Especial: ' + cardClone.querySelector('.movie-ataque_especial');
//         ataque_especial.textContent = data.stats[3].base_stat;

//         movieDetails.appendChild(cardClone);

//         // const movieCard = createMovieCard(data);
//         // movieDetails.appendChild(movieCard);
//       } else {
//         document.getElementById('movieDetails').innerHTML = 'Pokemon no encontrado.';
//       }
//     })
//     .catch(error => {
//       console.log('Ha ocurrido un error:', error);
//     });
// }


fetch("https://rickandmortyapi.com/api/character")
.then(res => res.json())
.then(response => {
  console.log(response)
})

// Cargar una película predeterminada al iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  const defaultMovie = Math.floor(Math.random() * (826 - 1 + 1) + 1); //Math.floor(Math.random() * (max - min + 1)) + min;
  searchMovie(defaultMovie);
});

// Manejar el evento de envío del formulario
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = document.getElementById('searchInput').value.toLowerCase(); //toLowerCase() para mayusculas y minusculas, convierte todo en minuscula
  searchMovie(searchTerm);
});

// Función para buscar una película y mostrar sus detalles
function searchMovie(movieName) {
  const apiUrl = `https://rickandmortyapi.com/api/character/${(movieName)}`;

  fetch(apiUrl)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        document.getElementById('movieDetails').innerHTML = 'Person no encontrado.';
      }
    })
    .then(data => {
      // if (data.Response === 'True') {
      if (data.id != 0) {
        const movieDetails = document.getElementById('movieDetails');
        movieDetails.innerHTML = '';

        const cardTemplate = document.getElementById('movieCardTemplate');
        const cardClone = cardTemplate.content.cloneNode(true);

        const image = cardClone.querySelector('.card-img-top');
        image.src = data.image;

        const name = cardClone.querySelector('.card-name');
        name.textContent = 'Nombre: ' + data.name;

        const gender = cardClone.querySelector('.movie-type');
        gender.textContent = 'Genero: ' + data.gender;

        // const hp = cardClone.querySelector('.movie-hp');
        // hp.textContent = 'HP: ' + data.stats[0].base_stat;

        // const ataque = cardClone.querySelector('.movie-ataque');
        // ataque.textContent = 'ataque: ' + data.stats[1].base_stat;

        // const Defensa = cardClone.querySelector('.movie-Defensa');
        // Defensa.textContent = 'Defensa: ' + data.stats[2].base_stat;

        // const ataque_especial = 'Ataque Especial: ' + cardClone.querySelector('.movie-ataque_especial');
        // ataque_especial.textContent = data.stats[3].base_stat;

        movieDetails.appendChild(cardClone);
      } else {
        document.getElementById('movieDetails').innerHTML = 'Personaje no encontrado.';
      }
    })
    .catch(error => {
      console.log('Ha ocurrido un error:', error);
    });
}