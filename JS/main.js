const pokemones = [];
const pokemonData = [];
const empezarDeNuevo = document.getElementById('nuevo');
const historialKey = 'pokemonHistorial'; // Definir historialKey aquí

async function validarNombrePokemon(nombre) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        return respuesta.status === 200;
    } catch (error) {
        console.error('Error al validar el nombre del Pokémon:', error);
        return false;
    }
}

//Es para cuando buscamos 3 cosas se desabilite y no nos deje escribir, cuando ya tenga las 3 busquedas.
let searchCount = 0;
const boton = document.getElementById('agregar');
const input = document.getElementById('nombre');

//mostrar la info en las cartas
const infoButton = document.getElementById('obtener');
const nftDetails = document.getElementById('main');

// funcion para la busqueda de tres 
boton.addEventListener('click', () =>{
    searchCount++;

    if(searchCount === 3){
        input.disabled = true;
    }
});

document.getElementById('agregar').addEventListener('click', async function () {

    const limite = 6; // Establecer el límite a 6 Pokémon

    const nombrePokemon = document.getElementById('nombre').value.toLowerCase();
    if (nombrePokemon === '') {
        alert('El campo no puede quedar vacío.');
        return;
    }

    if (navigator.onLine) {
        try {
            if (await validarNombrePokemon(nombrePokemon)) {
                pokemones.push(nombrePokemon);
                document.getElementById("nombre").value = ""; // Limpiar el campo de entrada
                console.log("Pokémon agregado:", nombrePokemon);

                if (pokemones.length > limite) {
                    document.getElementById("agregar").disabled = true;
                    document.getElementById("nombre").disabled = true;
                }
            } else {
                alert("Error: El nombre del Pokémon no es válido");
            }
        } catch (error) {
            console.error('Error al validar el nombre del Pokémon:', error);
            alert('Ocurrió un error al validar el nombre del Pokémon.');
        }
    } else {
        alert("Error: No cuentas con conexión a internet.");
    }

    localStorage.setItem(historialKey, JSON.stringify(pokemones));
});



// document.getElementById('obtener').addEventListener('click', async function () {
//     if(pokemones.length === 0){
//         alert('No hay agregado para imprimir.')
//         return;
//     }
//     for (const nombrePokemon of pokemones) {
//         await mostrarPokemon(nombrePokemon);
//     }
// });

async function obtenerPokemon(nombre) {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`); 
            return respuesta.json();
}

async function mostrarPokemon(nombre) {
    const pokemon = await obtenerPokemon(nombre);
    const pokemonDiv = document.createElement('div'); // Cambiado de 'pokemones' a 'div'
    pokemonDiv.classList.add('nft', 'pokemon'); // Agregar clases 'nft' y 'pokemon'
    
    // Obtiene la URL de la imagen del pokemon 
    const imagenUrl = pokemon.sprites.front_default;
    // Obtiene los tipos del pokemon
    const tipos = pokemon.types.map(type => type.type.name).join(', ');

    //Obtener habilidad
    const habilidad = pokemon.abilities.map((ability) => ability.ability.name).join(", ");
    
    // Nos arroja la informacion del pokemon
    const nombrePokemon = pokemon.name;
    const idPokemon = pokemon.id;
    const experiencia = pokemon.base_experience;

    // Generar el HTML de la carta del Pokémon y agregarlo al contenedor
    pokemonDiv.innerHTML = generarCartaPokemon(nombrePokemon, imagenUrl, idPokemon, [tipos], habilidad, experiencia);

    document.getElementById('pokemones').appendChild(pokemonDiv);
}



function generarCartaPokemon(nombre, imagenUrl, idPokemon, tipos, habilidad, experiencia) {
    return `
        <div class="nft">
            <div class='main'>
                <img class='tokenImage' src="${imagenUrl}" alt="${nombre}" />
                <h2>${nombre}</h2>
                </div>
                <p>ID: ${idPokemon}</p>
                <p>Tipo(s): ${tipos.join(", ")}</p>
                <p>Experiencia base: ${experiencia}</p>
                <p>Habilidad: ${habilidad}</p>
                <hr />
            </div>
        </div>
    `;
}
// Obtener el contenedor de Pokémon
const contenedorPokemon = document.getElementById("pokemones");

// Generar cartas de Pokémon y agregarlas al contenedor
pokemonData.forEach(pokemon => {
    const { nombre, imagenUrl, idPokemon, tipos } = pokemon;
    const cartaPokemonHTML = generarCartaPokemon(nombre, imagenUrl, idPokemon, tipos);
    contenedorPokemon.innerHTML += cartaPokemonHTML;
});

empezarDeNuevo.addEventListener('click', function() {
        location.reload();
});
