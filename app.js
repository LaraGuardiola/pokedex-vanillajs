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
            }
        }
        /*for(let x = 1; x < 152; x++)
            fetch(`https://pokeapi.co/api/v2/pokemon-form/${x}`)
            .then(response => response.json())
            .then(src => {
                let img = document.createElement('img')
                midScreen.appendChild(img)
                img.src = src.sprites.front_default
                console.log(src.sprites.front_default)
            })*/
        
    })
}

window.onload(showPokemon())

function getParagraphs(){
    let p = document.querySelectorAll('.mid-screen > p')
    return p
}
