document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById("modalModalFrame");
  const pokList = document.getElementById("pokemonList");
  
function modalFrameDetail(pokemon) {
  
  return`
    <div class="modalBackground">
    <div class=" ${pokemon.type} modalContainer">
      <div class="modalSuperior">
        <div class=" modalHeader">
          <div class="modalTitle">
            <h1>${pokemon.name}</h1>
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
          </div>
          <div>
            <span>#${pokemon.number}</span>
          </div>
        </div>

      </div>

      <div class="modalInferior">

        <img class="modalImg" src="${pokemon.photo}" alt="${pokemon.name}">


        <div class="modalTabs">

          <div class="tabs">
            <button class="tab-button active" data-tab="frame1">Sobre</button>
            <button class="tab-button" data-tab="frame2">Status Base</button>
            <button class="tab-button" data-tab="frame3">Ataques</button>
          </div>

          
          <div class="tab-content">

            <div id="frame1" class="tab-pane active">
              
              <div class="modalContent">
                <span>
                  Nome: ${pokemon.name}
                </span>
                <span>
                  Peso: ${pokemon.weight}
                </span>
                <span>
                  Tamanho: ${pokemon.height}
                </span>
                <span>
                  Abilidades: ${pokemon.abilities.map((ability) => `${ability}`).join(', ')}
                </span>
              </div>
            </div>

            <div id="frame2" class="tab-pane">
              
              <div class="modalContent">
                ${pokemon.stats.map((stat) => `                    
                    <span>
                      ${stat.name}: ${stat.baseStat} <div class="statusBar" style="--porcentagem: ${stat.baseStat}%;"></div>
                    </span>
                    `
                  ).join(' ')
                }
              </div>
            </div>

            <div id="frame3" class="tab-pane">    
              <div class="modalContentOl">
                <ol>
                  ${pokemon.moves.map((move) => `<li>${move}</li>`).join('')}
                </ol>
              </div>
            </div>

          </div>
          <div class="modalFooter">
            <button id="closeModalButton" class="close-button">Fechar</button>
          </div>
        </div>
      </div>

    </div>
      
  </div>
  </div>
  </div>
</div>
`
}

function openModal(pokemonId) {
  pokeApi.getPokeData(pokemonId)
    .then((pokemon) => {
      
      const modalHtml = modalFrameDetail(pokemon);
      modal.innerHTML = modalHtml;
      modal.style.display = "block";
      activeTabFunction()

    })
    .catch((error) => {
      console.error("Erro ao obter dados do Pokémon", error);
    });   
}

function activeTabFunction(){
let tabButtons = document.getElementsByClassName("tab-button");
for (let i = 0; i < tabButtons.length; i++) {
tabButtons[i].addEventListener("click", function() {
    let tab = this.getAttribute("data-tab");
    let tabContent = document.getElementsByClassName("tab-pane");
    for (let j = 0; j < tabContent.length; j++) {
    tabContent[j].classList.remove("active");
    }
    document.getElementById(tab).classList.add("active");
    for (let k = 0; k < tabButtons.length; k++) {
    tabButtons[k].classList.remove("active");
    }
    this.classList.add("active");
    });
  }
}

modal.addEventListener("click", function (event) {
  if(event.target.classList.contains("close-button")) {
      modal.style.display = "none"
    }
})

pokList.addEventListener("click", function (event) {
  if (event.target.closest("li")) {
    const itemId = event.target.closest("li").id;
    openModal(itemId);
  }
});
})
