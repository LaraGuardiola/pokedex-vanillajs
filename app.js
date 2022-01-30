let midScreen = document.querySelector('.mid-screen')
window.onload(showPokemon())

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
    })
}

function removeSprite(){
    let sons = document.querySelectorAll('.mid-screen > *')
    return sons
}

function getParagraphs(){
    let p = document.querySelectorAll('.mid-screen > p')
    return p
}
