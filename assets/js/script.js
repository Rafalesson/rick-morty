const characterId = document.getElementById("characterId");
const btnGo = document.getElementById("btn-go");
const photo = document.getElementById("photo");
const closeModal = document.getElementById("close_modal");
const fade = document.getElementById("fade_modal");
const modal = document.getElementById("modal");

const nome = document.getElementById("name")
const statu = document.getElementById("status");
const specie = document.getElementById("specie");
const gender = document.getElementById("gender");
const origin = document.getElementById("origin");

const keys = ["name", "status", "species", "gender", "origin", "image"];

const fetchApi = async (value) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${value}`
  );
  const data = await response.json();

  return data;
};

const toggleModal = () => {
  [modal, fade].forEach((el) => {
    el.classList.toggle("hide");
  });

  // Desabilita o campo de entrada quando o modal está visível e habilita quando está escondido
  characterId.disabled = !modal.classList.contains("hide");

  // Aplica foco ao campo de entrada quando o modal está escondido
  if (modal.classList.contains("hide")) {
    characterId.focus();
  }
};

// Função para detectar dispositivos móveis
function isMobileDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

const buildResult = (result) => {
  const newObj = {};
  keys.forEach((key) => {
    if (result[key]) {
      newObj[key] = result[key];
    }
  });

  // Atualizando o innerHTML dos elementos já declarados
  if (newObj.name) nome.innerHTML = `Nome: <span class="azul md_response">${newObj.name}</span>`;
  if (newObj.status) statu.innerHTML = `Status: <span class="azul md_response">${newObj.status}</span>`;
  if (newObj.species) specie.innerHTML = `Espécie: <span class="azul md_response">${newObj.species}</span>`;
  if (newObj.gender) gender.innerHTML = `Gênero: <span class="azul md_response">${newObj.gender}</span>`;
  if (newObj.origin && newObj.origin.name)
    origin.innerHTML = `Origem: <span class="azul md_response">${newObj.origin.name}</span>`;
  if (result.image) {
    photo.src = result.image
  }

  return newObj;
};

fade.addEventListener("click", (event) => {
  if (event.target === fade) {
    toggleModal();
  }
});

closeModal.addEventListener("click", toggleModal);

btnGo.addEventListener("click", async (event) => {
  event.preventDefault();
  toggleModal();

  const result = await fetchApi(characterId.value);
  
  buildResult(result)

  characterId.value = "";
});

document.addEventListener("DOMContentLoaded", (event) => {
  // Event listener para a tecla Enter no campo de input
  characterId.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      btnGo.click(); // Simula um clique no botão de pesquisa
    }
  });

  // Event listener para a tecla Esc para fechar o modal
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hide")) {
      toggleModal(); // Fecha o modal se ele estiver aberto
    }
  });
});
