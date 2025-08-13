const searchBtn = document.getElementById('searchBtn');
const genreSelect = document.getElementById('genreSelect');
const artistInput = document.getElementById('artistInput');
const artistsContainer = document.getElementById('artistsContainer');
const songsContainer = document.getElementById('songsContainer');
const eventsContainer = document.getElementById('eventsContainer');

// Token temporal de Spotify (puedes reemplazarlo por uno nuevo si expira)
const SPOTIFY_TOKEN = "TU_TOKEN_TEMPORAL_AQUI";

// Guardar género favorito
genreSelect.addEventListener('change', () => {
    localStorage.setItem('favoriteGenre', genreSelect.value);
});

// Cargar género favorito
window.addEventListener('load', () => {
    const favorite = localStorage.getItem('favoriteGenre');
    if(favorite) genreSelect.value = favorite;
});

searchBtn.addEventListener('click', () => {
    const genre = genreSelect.value;
    const artistName = artistInput.value.trim();

    if(!genre && !artistName){
        alert("Selecciona un género o escribe un artista");
        return;
    }

    artistsContainer.innerHTML = "";
    songsContainer.innerHTML = "";
    eventsContainer.innerHTML = "";

    searchSpotify(genre, artistName);
    showEvents(genre || artistName);
});

async function searchSpotify(genre, artistName){
    try {
        // Buscar artistas
        let query = artistName ? `q=${encodeURIComponent(artistName)}&type=artist` : `q=genre:${genre}&type=artist`;
        let res = await fetch(`https://api.spotify.com/v1/search?${query}&limit=5`, {
            headers: { "Authorization": `Bearer ${SPOTIFY_TOKEN}` }
        });
        let data = await res.json();
        if(!data.artists) return;

        data.artists.items.forEach(artist => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${artist.images[0]?.url || 'https://via.placeholder.com/200'}" alt="${artist.name}">
                <h3>${artist.name}</h3>
                <a href="${artist.external_urls.spotify}" target="_blank">Abrir en Spotify</a>
            `;
            artistsContainer.appendChild(card);

            searchTopTracks(artist.id);
        });

    } catch(err){
        console.error(err);
    }
}

async function searchTopTracks(artistId){
    try {
        let res = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
            headers: { "Authorization": `Bearer ${SPOTIFY_TOKEN}` }
        });
        let data = await res.json();
        if(!data.tracks) return;

        data.tracks.slice(0,3).forEach(track => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${track.album.images[0]?.url || 'https://via.placeholder.com/200'}" alt="${track.name}">
                <h3>${track.name}</h3>
                <a href="${track.external_urls.spotify}" target="_blank">Abrir en Spotify</a>
                ${track.preview_url ? `<audio controls src="${track.preview_url}"></audio>` : ''}
            `;
            songsContainer.appendChild(card);
        });

    } catch(err){
        console.error(err);
    }
}

// Función ficticia para eventos
function showEvents(keyword){
    const fakeEvents = [
        {name: "Concierto VIP "+keyword, date: "2025-09-15", location: "Estadio Central"},
        {name: "Festival "+keyword, date: "2025-10-01", location: "Parque Nacional"},
        {name: "Show Exclusivo "+keyword, date: "2025-11-20", location: "Teatro Principal"}
    ];

    fakeEvents.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${event.name}</h3>
            <p>📅 ${event.date}</p>
            <p>📍 ${event.location}</p>
        `;
        eventsContainer.appendChild(card);
    });
}
