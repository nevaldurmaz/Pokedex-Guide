const poke_container = document.querySelector(".poke_container")
const search = document.querySelector(".search")
const searchBtn = document.querySelector(".searchBtn")
const searchInput = document.querySelector(".searchInput")
const pokemon_count = 151
const bg_color = {
    grass: '#8BD369',
    fire: '#FF603F',
    water: '#3399FF',
    bug: '#AABB22',
    normal: '#AAAA99',
    flying: '#9AA8FA',
    poison: '#B76EA4',
    electric: '#FFD34E',
    ground: '#E2C56A',
    fairy: '#F1A8EC',
    psychic: '#FF6EA4',
    fighting: '#C56E5C',
    rock: '#C5B679',
    dragon: '#7766EE',
    ice: '#66CCFF',
  }
  // Buton tıklanma

searchBtn.addEventListener("click", () => { 
  search.classList.toggle("active")
})

// İnput alanı düzenleme
  searchInput.addEventListener("input", (e) =>{
  const searchValue = searchInput.value.toLowerCase()
  const pokemonNames = document.querySelectorAll(".poke-name")
  
  // Pokemonlar içerisinde gezinme
  pokemonNames.forEach((pokemonName) =>{
    pokemonName.parentElement.parentElement.style.display = 'block'
    if (!pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      pokemonName.parentElement.parentElement.style.display = 'none'
    }
  })

})
// Pokemonları yakalama

const fetchPokemons = async()=>{
  for(let i=1; i <= pokemon_count; i++){
    await getPokemon(i)
  }
}
const getPokemon = async (id) => {
  // Api den veri kart bilgileri ve görselleri alma
  const url= `https://pokeapi.co/api/v2/pokemon/${id}`

  const res = await fetch(url)
  const data = await res.json()
  // console.log(data)
  createPokemonCard(data)
}
  // Card ı dataların içine atma
  const createPokemonCard = (pokemon) => {
    // Yeni bir Pokemon divi oluşturma
    const pokemonDiv = document.createElement("div")
    pokemonDiv.classList.add("pokemon")

    // Pokemon Cart bilgileri güncelleme
    const pokemonId = pokemon.id.toString().padStart(3, "0")

    // grass bölümündeki types ları düzenleme
    const pokemonType = pokemon.types[0].type.name

    // Backround renk güncellemeleri
    const pokemonBg = bg_color[pokemonType]

    // Div e gelmesi için
    pokemonDiv.style.backgroundColor= `${pokemonBg}`











    // Html den cart bilgisi alma
    const pokemonDivInnerHTML =`    
    <div class="image-container">
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
      alt="Pokemon 1 image"
    />
    </div>
    <div class="poke-info">
    <span class="poke-id"># ${pokemonId}</span>
    <h3 class="poke-name"> ${pokemon.name}</h3>
    <div class="small">
      <small class="poke-exp"
        ><i class="fa-solid fa-flask"></i> ${pokemon.base_experience} exp</small
      >
      <small class="poke-weight"
        ><i class="fa-solid fa-weight-scale"></i> ${pokemon.weight} kg</small
      >
     </div>
     <div class="poke-type"></d>
      <i class="fa-brands fa-uncharted"></i> ${pokemonType}
     </h5>
     </div>
     </div>`
     pokemonDiv.innerHTML = pokemonDivInnerHTML 
     poke_container.appendChild(pokemonDiv)
  }
 

fetchPokemons()
