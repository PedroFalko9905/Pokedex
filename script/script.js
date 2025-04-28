
const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__gif')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;

// a função tem que ser async pois o dado que você está pegando é um dado de fora, então é um dado assíncrono, para poder usar o await na função, pois não se sabe quanto tempo será necessario para esperar a resposta chegar, então o await serve para falar para função esperar a resposta

// essa função pega informações da API pokéAPI e retorna os dados do número ou do nome do pokémon digítado, e depois converte essas informações em JSON, para poderem ser consumidas
const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200) {
        const data = await APIResponse.json()

        return data        
    }

}


// essa função pega a informação JSON retornada pela panterior e pega os elementos retornados nela para alterar elementos no html 
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon);

    if(data) {
        //retorna ao html o nome do pokemon
        pokemonName.innerHTML = data.name

        //retorna ao html o númeor do pokemon
        pokemonNumber.innerHTML = data.id

        //retorna ao html um gif do pokemon, tem colchetes pois o caminho até a informação da api é longo e tem algumas infomrações como o generation-v que não são intepretadas pelo JavaScript
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']        

        searchPokemon = data.id

        input.value = ''
    } else {
        pokemonName.innerHTML= 'Não encontrado :C'

        input.value = ''
    }


}

//essa função envia a informação colocada na barra de pesquisa
form.addEventListener('submit', () => {

    event.preventDefault()

    renderPokemon(input.value.toLowerCase())

})

//essa função vai para o pokemon anterior 
buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }

})

//essa função vai para o próximo pokemon
buttonNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
