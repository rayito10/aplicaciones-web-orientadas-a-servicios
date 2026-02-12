//Obtenemos el contenedor de las cards por su ID
const container = document.getElementById('cards-container');

//Endpoint de la API que usaré
const API_URL = 'https://www.scorebat.com/video-api/v3/free-feed/?token=Mjc2MTQ0XzE3NzA4MzUwNjNfMmU3Y2E2M2NlOTQ1Y2Q4MjAxYTVjYzBkMTM5M2VmZDMzNDBhMTlkMw==';

//Esta función utiliza una API de banderas, donde trae un png de la bandera correspondiente según la bandera de la liga.
function obtenerURLbandera(competitionName) 
{
    //Convierte el nombre del país de la liga a una cadena con letras minúsculas
    const name = competitionName.toLowerCase();
    
    //Asigna indefinido a la variable del código del país
    let countryCode = 'un'; 

    //Se le asigna un código según el país
    if (name.includes('england') || name.includes('premier league')) countryCode = 'gb-eng';
    else if (name.includes('spain') || name.includes('la liga')) countryCode = 'es';
    else if (name.includes('italy') || name.includes('serie a')) countryCode = 'it';
    else if (name.includes('germany') || name.includes('bundesliga')) countryCode = 'de';
    else if (name.includes('france') || name.includes('ligue 1')) countryCode = 'fr';
    else if (name.includes('mexico') || name.includes('liga mx')) countryCode = 'mx';
    else if (name.includes('brazil')) countryCode = 'br';
    else if (name.includes('argentina')) countryCode = 'ar';
    else if (name.includes('portugal')) countryCode = 'pt';
    else if (name.includes('netherlands') || name.includes('eredivisie')) countryCode = 'nl';
    else if (name.includes('usa') || name.includes('mls')) countryCode = 'us';
    else if (name.includes('saudi arabia')) countryCode = 'sa';
    else if (name.includes('champions league') || name.includes('europa league')) countryCode = 'eu';

    //Retorna el link de la imagen de la API
    return `https://flagcdn.com/w40/${countryCode}.png`;
}


//Función para traer los resúmenes
function fetchPartidos() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error('Error en la API');
            return response.json();
        })
        .then(data => {
            mostrarPartidos(data.response);
        })
        .catch(error => {
            console.error('Error:', error);
            container.innerHTML = `<p style="text-align:center;">No se pudieron cargar los datos.</p>`;
        });
}


//Función para mostrar los partidos
function mostrarPartidos(partidos) {
    let htmlMarkup = '';

    //Si no hay partidos, muestra un mensaje
    if (!partidos || partidos.length === 0) {
        container.innerHTML = '<p style="text-align:center;">No hay partidos hoy.</p>';
        return;
    }

    //ForEach para poner los partidos
    partidos.forEach(partido => {
        const flagUrl = obtenerURLbandera(partido.competition);

        htmlMarkup += `
            <article class="card">
                <img src="${partido.thumbnail}" alt="${partido.title}" class="match-thumb" loading="lazy">
                <div class="card-content">
                    <div class="torneo">
                        <img src="${flagUrl}" class="flag-icon" alt="Flag">
                        <span class="card-competition">${partido.competition}</span>
                    </div>
                    <h2 class="card-title">${partido.title}</h2>
                    <a href="${partido.matchviewUrl}" target="_blank" class="btn-watch">
                        Ver Resumen
                    </a>
                </div>
            </article>
        `;
    });

    //Inyecta los datos de la tarjeta
    container.innerHTML = htmlMarkup;
}

document.addEventListener('DOMContentLoaded', fetchPartidos);