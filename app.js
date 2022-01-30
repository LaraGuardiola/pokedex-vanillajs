const midScreen = document.querySelector('.mid-screen')

showPokemon()

function showPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=251') 
    .then(response => response.json())
    .then(function(data) {
        for(let i = 0; i < data.results.length; i++){
            let p = document.createElement('p')
            midScreen.appendChild(p)
            p.innerHTML = `${i+1}.${data.results[i].name}`
            p.onclick = function(){
                let p = getParagraphs()
                p.forEach(p => p.remove())
                let index = i + 1
                showSprites(index,data.results[i].name)
            }
        }
    })
}

function showSprites(index,description){
    fetch(`https://pokeapi.co/api/v2/pokemon-form/${index}`)
    .then(response => response.json())
    .then(src => {
        let img = document.createElement('img')
        midScreen.appendChild(img)
        img.src = src.sprites.front_default
        let backBtn = document.createElement('p')
        midScreen.appendChild(backBtn)
        setTimeout(()=>{
            backBtn.setAttribute('class', "back-btn")
            backBtn.innerHTML = "back"
        },100)
        createStats(midScreen,"stat1","name",description)
        createStats(midScreen,"stat2","type",src.types[0].type.name)
        getHabitat(src.id)
        backBtn.onclick = function(){
            let sons = removeSprite()
            sons.forEach(son =>{
                son.remove()
            })
            showPokemon()
        }
    })
}

function getHabitat(id){
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then(response => response.json())
    .then(data => {
        createStats(midScreen,"stat3","habitat", data.habitat.name)
    })
}

function createStats(midScreen,className,stat,description){
    let pokemonName = document.createElement('p')
    midScreen.appendChild(pokemonName)
    pokemonName.innerHTML = `${stat}: ${description}`
    pokemonName.setAttribute('class',className)
}

function removeSprite(){
    let sons = document.querySelectorAll('.mid-screen > *')
    return sons
}

function getParagraphs(){
    let p = document.querySelectorAll('.mid-screen > p')
    return p
}
