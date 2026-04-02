document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('charactersGrid');
    const searchInput = document.getElementById('searchInput');
    const geoBtn = document.getElementById('geoBtn');
    const statusText = document.getElementById('status-text');

    let todosOsNinjas = [];

    async function buscarNinjas() {
        try {
            const resposta = await fetch('https://api.jikan.moe/v4/anime/20/characters');
            if (!resposta.ok) throw new Error("Erro na API");
            const dados = await resposta.json();
            
            todosOsNinjas = dados.data;
            statusText.innerText = `${todosOsNinjas.length} ninjas encontrados!`;
            
            mostrarNaTela(todosOsNinjas);
        } catch (erro) {
            statusText.innerText = "Falha ao invocar os ninjas.";
            console.error(erro);
        }
    }

    function mostrarNaTela(lista) {
        grid.innerHTML = '';
        if (lista.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; margin-top: 20px;">Nenhum ninja encontrado.</p>`;
            return;
        }
        
        const listaReduzida = lista.slice(0, 60);

        listaReduzida.forEach(item => {
            const ninja = item.character;
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <img src="${ninja.images.jpg.image_url}" alt="${ninja.name}" loading="lazy">
                <h3>${ninja.name}</h3>
                <span>⭐ ${item.favorites.toLocaleString('pt-BR')}</span>
            `;

            card.addEventListener('click', () => {
                if (navigator.vibrate) navigator.vibrate(40);
            });

            grid.appendChild(card);
        });
    }

    let timeoutBusca;
    searchInput.addEventListener('input', (evento) => {
        clearTimeout(timeoutBusca);
        timeoutBusca = setTimeout(() => {
            const textoDigitado = evento.target.value.toLowerCase().trim();
            const ninjasFiltrados = todosOsNinjas.filter(item => 
                item.character.name.toLowerCase().includes(textoDigitado)
            );
            mostrarNaTela(ninjasFiltrados);
        }, 300);
    });

    geoBtn.addEventListener('click', () => {
        if ("geolocation" in navigator) {
            statusText.innerText = "Rastreando chakra...";

            navigator.geolocation.getCurrentPosition((posicao) => {
                const lat = posicao.coords.latitude.toFixed(4);
                const lon = posicao.coords.longitude.toFixed(4);
                alert(`📍 Localização Detectada!\nLatitude: ${lat}\nLongitude: ${lon}`);
                statusText.innerText = "Konoha identificada!";
            }, () => {
                alert("Falha no rastreio do chakra (GPS).");
                statusText.innerText = "GPS Indisponível.";
            }, { timeout: 8000 });
        } else {
            alert("Dispositivo sem suporte a GPS.");
        }
    });

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('SW ok:', reg.scope))
                .catch(err => console.log('SW erro:', err));
        });
    }

    buscarNinjas();
});