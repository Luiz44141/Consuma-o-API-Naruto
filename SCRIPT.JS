const container = document.getElementById('characters-container');
const searchInput = document.getElementById('search-input');

// URL da API Jikan filtrando por Naruto 
const API_URL = "https://api.jikan.moe/v4/anime/20/characters";

let allCharacters = [];

async function getShinobi() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Falha ao contactar a aldeia");
        
        const data = await response.json();
        // armazenei os personagens pra facilitar as próximas pesquisas ninja
        allCharacters = data.data;
        
        render(allCharacters);
    } catch (error) {
        container.innerHTML = `<p style="color:red">Erro: ${error.message}</p>`;
        console.error(error);
    }
}

function render(list) {
    container.innerHTML = "";
    
    // limitei a visualização para os 100 primeiros personagens, pra não travar a aldeia
    const limitedList = list.slice(0, 100);

    limitedList.forEach(item => {
        const char = item.character;
        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `
            <img src="${char.images.jpg.image_url}" alt="${char.name}">
            <h3>${char.name}</h3>
        `;
        container.appendChild(card);
    });
}

// Lógica de Pesquisa
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allCharacters.filter(item => 
        item.character.name.toLowerCase().includes(term)
    );
    render(filtered);
});

// Execução inicial
getShinobi();