const API_KEY = '306ef170';

// Cargar una película predeterminada al iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  const defaultMovie = 'Titanic';
  searchMovie(defaultMovie);
});

// Manejar el evento de envío del formulario
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = document.getElementById('searchInput').value;
  searchMovie(searchTerm);
});

// Función para buscar una película y mostrar sus detalles
function searchMovie(movieName) {
  const apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieName)}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        const movieDetails = document.getElementById('movieDetails');
        movieDetails.innerHTML = '';

        const movieCard = createMovieCard(data);
        movieDetails.appendChild(movieCard);
      } else {
        document.getElementById('movieDetails').innerHTML = 'Película no encontrada.';
      }
    })
    .catch(error => {
      console.log('Ha ocurrido un error:', error);
    });
}

// Función para crear una tarjeta de película
function createMovieCard(movie) {
  const card = document.createElement('div');
  card.setAttribute('style', 'max-width: auto; height: auto;');
  card.classList.add('card');

  const image = document.createElement('img');
  image.classList.add('card-img-top');
  image.src = movie.Poster;
  card.appendChild(image);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = movie.Title;
  cardBody.appendChild(title);

  const year = document.createElement('p');
  year.classList.add('card-text');
  year.textContent = 'Año: ' + movie.Year;
  cardBody.appendChild(year);

  const plot = document.createElement('p');
  plot.classList.add('card-text');
  plot.textContent = 'Sinopsis: ' + movie.Plot;
  cardBody.appendChild(plot);

  const language = document.createElement('p');
  language.classList.add('card-text');
  language.textContent = 'Idiomas: ' + movie.Language;
  cardBody.appendChild(language);

  card.appendChild(cardBody);

  return card;
}
