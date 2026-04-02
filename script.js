const container = document.getElementById('characters-container');
const searchInput = document.getElementById('search-input');
const geoBtn = document.getElementById('btn-geo'); // Novo botão de GPS

const API_URL = "https://api.jikan.moe/v4/anime/20/characters";

let allCharacters = [];

// Fetch dos personagens
async function getShinobi() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Falha ao contactar a aldeia");

        const data = await response.json();
        allCharacters = data.data;

        render(allCharacters);

    } catch (error) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #ff4444;">Erro: ${error.message}</p>`;
        console.error(error);
    }
}

// Renderização
function render(list) {
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Nenhum ninja encontrado.</p>`;
        return;
    }

    const limitedList = list.slice(0, 50);

    limitedList.forEach(item => {
        const char = item.character;

        const card = document.createElement('div');
        card.className = 'char-card';

        card.innerHTML = `
            <img 
                src="${char.images.jpg.image_url}" 
                alt="Imagem de ${char.name}"
                loading="lazy"
                onerror="this.src='fallback.png'"
            >
            <h3>${char.name}</h3>
        `;

        card.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(30);
        });

        container.appendChild(card);
    });
}

// Filtro de busca com debounce
let timeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        const term = e.target.value.toLowerCase();
        const filtered = allCharacters.filter(item =>
            item.character.name.toLowerCase().includes(term)
        );
        render(filtered);
    }, 300);
});

    //Recurso de Geolocalização
geoBtn.addEventListener('click', () => {
    // Verifica se o navegador suporta geolocalização
    if ("geolocation" in navigator) {
        geoBtn.innerHTML = '⏳'; // Feedback de carregando
        
        navigator.geolocation.getCurrentPosition(
            // Sucesso
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                
                alert(`📍 Posição Ninja Detectada!\nLatitude: ${lat}\nLongitude: ${lon}\n\nMissão Rank S autorizada na sua região!`);
                geoBtn.innerHTML = '📍';
            },
            // Erro
            (error) => {
                console.warn(`Erro de GPS: ${error.message}`);
                alert('Não conseguimos rastrear o seu chakra (GPS desativado ou sem permissão).');
                geoBtn.innerHTML = '📍';
            },
            // Opções
            { enableHighAccuracy: true, timeout: 5000 }
        );
    } else {
        alert("Seu dispositivo não suporta rastreamento ninja (Geolocalização).");
    }
});


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(err => console.log("Erro no SW:", err));
}

// Inicializa a chamada
getShinobi();