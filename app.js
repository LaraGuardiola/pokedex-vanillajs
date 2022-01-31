const midScreen = document.querySelector('.mid-screen')
const introGif = document.querySelector('.intro')
const titleGif = document.querySelector('.title')

window.addEventListener('DOMContentLoaded',()=>{
    setTimeout(()=>{
        titleGif.style.display = 'block'
    },23500)
})

document.addEventListener('click',() => {
    addFadeout(introGif,titleGif)
    setTimeout(()=>{
        preparePokemonList()
    },1000)
},false)

function addFadeout(...args){
    args.forEach(elem => {
        elem.classList.add('fadeout-intro')
    })
}

function preparePokemonList(){
    updateStyles()
    showPokemon()
}

function updateStyles(){
    document.querySelector('.mid-screen > .intro').remove()
    titleGif.remove()
    midScreen.style.backgroundColor = '#dcdcde'
    midScreen.classList.add('mid-screen-intro')
}

function showPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=386') 
    .then(response => response.json())
    .then(function(data) {
        getPokemonList(data)
    })
}

function getPokemonList(data){
    for(let i = 0; i < data.results.length; i++){
        let p = document.createElement('p')
        midScreen.appendChild(p)
        p.innerHTML = `${i+1}.${data.results[i].name}`
        p.onclick = function(){
            let pokemon = getParagraphs()
            pokemon.forEach(poke => poke.remove())
            let index = i + 1
            showStats(index,data.results[i].name)
        }
    }
}

function showStats(index,description){
    fetch(`https://pokeapi.co/api/v2/pokemon-form/${index}`)
    .then(response => response.json())
    .then(src => {
        getHabitat(src.id)
        printSprite(src)
        createStats("stat1","name",description)
        createStats("stat2","type",src.types[0].type.name)
        createStats("stat4","#",index) 
    })
}

function printSprite(src){
    let img = document.createElement('img')
    midScreen.appendChild(img)
    img.src = src.sprites.front_default
    let backBtn = document.createElement('p')
    midScreen.appendChild(backBtn)
    setTimeout(()=>{
        backBtn.setAttribute('class', "back-btn")
        backBtn.innerHTML = "back"
    },100)
    backBtn.onclick = function(){
        let sons = removeSprite()
        sons.forEach(son =>{
            son.remove()
        })
        showPokemon()
    }
}

function getHabitat(id){
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then(response => response.json())
    .then(data => {
        createStats("stat3","habitat", data.habitat.name)
    })
}

function createStats(className,stat,description){
    let pokemonStat = document.createElement('p')
    midScreen.appendChild(pokemonStat)
    if(stat === "#"){
        pokemonStat.innerHTML = `${stat}${description}`
        pokemonStat.setAttribute('class',className)
    }else{
        pokemonStat.innerHTML = `${stat}: ${description}`
        pokemonStat.setAttribute('class',className)
    }
    
}

function removeSprite(){
    return document.querySelectorAll('.mid-screen > *')
}

function getParagraphs(){
    return document.querySelectorAll('.mid-screen > p')
}
