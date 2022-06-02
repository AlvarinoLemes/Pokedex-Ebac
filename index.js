const page = document.querySelector('#pokedex-page')

fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    .then(response => {
        return response.json()
    })
        .then(async data => {
           const box = document.querySelector('#pokemon-box')
           page.innerHTML = ''

           for (let i = 0; i < data.results.length; i++) {
                box.querySelector('#pokemon-name').innerHTML = data.results[i].name
                box.querySelector('#pokemon-name').style.textTransform = "capitalize"

                const pokemonImage = await fetch('https://pokeapi.co/api/v2/pokemon-form/' + data.results[i].name)
                const image = await pokemonImage.json()
                box.querySelector('#pokemon-img').src = image.sprites.front_default

                const pokemonType = await fetch('https://pokeapi.co/api/v2/pokemon-form/' + data.results[i].name)
                const type = await pokemonType.json()

                box.querySelector('#pokemon-type').innerHTML = ''
                for(let i = 0; i < type.types.length; i++) {
                    const nameType = document.createElement("span")
                    nameType.appendChild(document.createTextNode(type.types[i].type.name))
                    nameType.style.backgroundColor = color(type.types[i].type.name)
                    nameType.style.padding = "4px"
                    nameType.style.margin = "2px"
                    nameType.style.borderRadius = "4px"
                    box.querySelector('#pokemon-type').appendChild(nameType)
                }

                page.innerHTML += box.outerHTML
           }
       })

color = (typeName) => {
    switch(typeName) {
        case "grass": return "#90EE90"
        case "poison": return "#9370DB"
        case "water": return "#87CEFA"
        case "fire": return "#FFA500"
        case "flying": return "#00BFFF"
        case "bug": return "#9ACD32"
        case "normal": return "#C0C0C0"
        case "electric": return "#FFFF00"
        case "ground": return "#EEE8AA"
        case "fairy": return "#FFE4E1"
        case "fighting": return "#D2691E"
        case "psychic": return "#EE82EE"
        case "rock": return "#CD853F"
        case "steel": return "#778899"
        case "ice": return "#00CED1"
        case "ghost": return "#7B68EE"
        case "dragon": return "#FA8072"
        default: return "#FFFFFF"
    }
}