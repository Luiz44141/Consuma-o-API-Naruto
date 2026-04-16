# 🍥 Naruto PWA - Consumo da Jikan API

Um Progressive Web App (PWA) com interface moderna e responsiva (mobile-first) desenvolvido para explorar o universo de Naruto. O projeto realiza o consumo de dados RESTful da **Jikan API** e explora recursos nativos dos dispositivos móveis para criar uma experiência de usuário imersiva.

## 🚀 Funcionalidades

* **Consumo de API:** Integração com a Jikan API para listar e exibir informações sobre o anime de forma dinâmica.
* **Instalabilidade (PWA):** Configuração de `manifest.json` que permite ao usuário instalar a aplicação diretamente na tela inicial do smartphone, comportando-se como um aplicativo nativo.
* **Suporte Offline:** Implementação de **Service Workers** para armazenar arquivos em cache e garantir que parte da aplicação funcione mesmo sem conexão com a internet.
* **Recursos de Hardware Nativo:**
  * 📍 **Geolocalização:** Captura da localização do usuário pelo navegador.
  * 📳 **Feedback Tátil:** Utilização da API de vibração (`vibration API`) para interações na interface.
  * 🔊 **Feedback Sonoro:** Respostas de áudio integradas às ações do usuário.
* **Foco em UI/UX:** Design limpo, adaptável a diferentes tamanhos de tela e focado na usabilidade mobile.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica.
* **CSS3:** Estilização moderna e layout responsivo.
* **JavaScript (Vanilla):** Lógica assíncrona (`fetch`), manipulação do DOM e integração de APIs do navegador.
* **PWA Features:** Web App Manifest e Service Workers.
* **[Jikan API](https://jikan.moe/):** API pública não-oficial de MyAnimeList.

## ⚙️ Como Executar o Projeto Localmente

1. Clone o repositório para a sua máquina:
   ```bash
   git clone (https://github.com/Luiz44141/Consuma-o-API-Naruto.git)
