const API_KEY = '306ef170';

// fetch("https://www.omdbapi.com/?apikey=306ef170&t=Titanic")
// .then(res => res.json())
// .then(response => {
//   console.log(response)
// })

// Cargar una película predeterminada al iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    const defaultMovie = 'Titanic'; //Math.floor(Math.random() * (max - min + 1)) + min;
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
    const apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieName)}`;

    fetch(apiUrl)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                document.getElementById('movieDetails').innerHTML = 'No fue encontrado.';
            }
        })
        .then(data => {
            // if (data.Response === 'True') {
            if (data.Response === 'True') {
                const movieDetails = document.getElementById('movieDetails');
                movieDetails.innerHTML = '';

                const cardTemplate = document.getElementById('movieCardTemplate');
                const cardClone = cardTemplate.content.cloneNode(true);

                const name = cardClone.querySelector('.card-name');
                name.textContent = 'Nombre: ' + data.Title;

                movieDetails.appendChild(cardClone);
            } else {
                document.getElementById('movieDetails').innerHTML = 'No encontrado.';
            }
        })
        .catch(error => {
            console.log('Ha ocurrido un error:', error);
        });
}