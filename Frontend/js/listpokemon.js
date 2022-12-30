const pokemonSelect = document.getElementById('pokemon-select');
const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemon-image');
const btnAdd = document.getElementById('btn-add');
//contenido de option
const opcion = document.getElementById('option-container').value;
console.log(localStorage.getItem("user"));
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
        const pokemons = data.results;
        console.log(pokemons);
        for (const index in pokemons) {
            const pokemonOption = document.createElement('option');
            pokemonOption.value = pokemons[index].url;
            pokemonOption.text = pokemons[index].name;
            pokemonSelect.appendChild(pokemonOption);
        }
    });
let nombrePokemon ;
pokemonSelect.addEventListener('change', event => {
    const selectedPokemonUrl = event.target.value;
    console.log(selectedPokemonUrl);
    fetch(selectedPokemonUrl, {})
        .then(response => response.json())
        .then(pokemonData => {
            nombrePokemon = pokemonData.name;
            const pokemonNameText = pokemonData.name;
            console.log(pokemonNameText);
            pokemonName.textContent = pokemonNameText;
            const pokemonImageUrl = pokemonData.sprites.front_default;
            console.log(pokemonImageUrl);
            pokemonImage.src = pokemonImageUrl;
            let datos = JSON.parse(localStorage.getItem('user'));
            console.log(datos);
        });
});

function search(dat) {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response=>response.json())
    .then(data =>{
        if(data.name === opcion){
            return data.name;
        }
    })
}
function Add() {
    let datos = JSON.parse(localStorage.getItem('user'));
    search(opcion)
        let alerta = confirm("desea Agregar a Favoritos?")
        if(alerta==true){
            console.log("saludo");
            datos.pokemones.push(nombrePokemon);
            // console.log(datos.pokemones);
            fetch(`http://localhost:8000/api/users/${datos.id}`)
            .then(response=>response.json())
            .then(data =>{
                console.log(data)

            })

            let pokeObject = {
                name: datos.name,
                email: datos.email,
                usuario: datos.usuario,
                contraseña:datos.contraseña,
                pokemones:datos.pokemones
            }
            fetch(`http://localhost:8000/api/users/${datos.id}`,{method:"PUT",headers:{
                'Content-Type': 'application/json'
                }, body:JSON.stringify(pokeObject)})
                .then(response =>response.json())
                .then(data =>{
                    console.log(data)
                })
                .catch((e)=>{console.log(e)})
        }else{
            alert("hubo un error no pudo guardarse");
        }
}

btnAdd.onclick = ()=>{
    Add();
}

