document.addEventListener("DOMContentLoaded", () => {
    // Agora é seguro selecionar, o HTML já carregou!
    const grid = document.getElementById('charactersGrid');
    const searchInput = document.getElementById('searchInput');
    const geoBtn = document.getElementById('geoBtn');
    const statusText = document.getElementById('status-text');

    let todosOsNinjas = [];

    async function buscarNinjas() {
        try {
            const resposta = await fetch('https://api.jikan.moe/v4/anime/20/characters');
            const dados = await resposta.json();
            
            todosOsNinjas = dados.data;
            statusText.innerText = `${todosOsNinjas.length} ninjas encontrados!`;
            
            mostrarNaTela(todosOsNinjas);
        } catch (erro) {
            statusText.innerText = "Erro ao carregar a API.";
            console.error(erro);
        }
    }

    function mostrarNaTela(lista) {
        grid.innerHTML = '';
        const listaReduzida = lista.slice(0, 50);

        listaReduzida.forEach(item => {
            const ninja = item.character;
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <img src="${ninja.images.jpg.image_url}" alt="${ninja.name}" loading="lazy">
                <h3>${ninja.name}</h3>
                <span>⭐ ${item.favorites} favoritos</span>
            `;

            card.addEventListener('click', () => {
                if (navigator.vibrate) navigator.vibrate(50);
                alert(`Você selecionou: ${ninja.name}`);
            });

            grid.appendChild(card);
        });
    }

    searchInput.addEventListener('input', (evento) => {
        const textoDigitado = evento.target.value.toLowerCase();
        const ninjasFiltrados = todosOsNinjas.filter(item => {
            return item.character.name.toLowerCase().includes(textoDigitado);
        });
        mostrarNaTela(ninjasFiltrados);
    });

    geoBtn.addEventListener('click', () => {
        if ("geolocation" in navigator) {
            statusText.innerText = "Buscando chakra na sua região...";

            navigator.geolocation.getCurrentPosition((posicao) => {
                const lat = posicao.coords.latitude.toFixed(4);
                const lon = posicao.coords.longitude.toFixed(4);
                alert(`📍 Localização detectada!\nLatitude: ${lat}\nLongitude: ${lon}`);
                statusText.innerText = "Localização encontrada!";
            }, () => {
                alert("Não foi possível rastrear sua localização.");
                statusText.innerText = "Busca falhou.";
            });
        } else {
            alert("Seu celular não suporta Geolocalização.");
        }
    });

    // Aciona a busca inicial
    buscarNinjas();
   
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(() => console.log('Service Worker registrado com sucesso!'))
                .catch(erro => console.log('Erro ao registrar o Service Worker:', erro));
        });
    }
});