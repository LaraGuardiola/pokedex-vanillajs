let midScreen = document.querySelector('.mid-screen')

function showPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151') 
    .then(response => response.json())
    .then(function(data) {
        for(let i = 0; i < data.results.length; i++){
            console.log(data.results[i].name)
            let p = document.createElement('p')
            midScreen.appendChild(p)
            p.innerHTML = `${i+1}.${data.results[i].name}`
            p.onclick = function(){
                let p = getParagraphs()
                p.forEach(p => p.remove())
                let index = i + 1
                showSprites(index)

            }
        }
    })
}

function showSprites(index){
    fetch(`https://pokeapi.co/api/v2/pokemon-form/${index}`)
    .then(response => response.json())
    .then(src => {
        let img = document.createElement('img')
        midScreen.appendChild(img)
        img.src = src.sprites.front_default
    })
}

window.onload(showPokemon())

function getParagraphs(){
    let p = document.querySelectorAll('.mid-screen > p')
    return p
}
