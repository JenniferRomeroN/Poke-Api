const pokemones = [];
const pokemonData = [];
const empezarDeNuevo = document.getElementById('nuevo');
const historialKey = 'pokemonHistorial'; // Definir historialKey aquí


//Es para cuando buscamos 3 cosas se desabilite y no nos deje escribir, cuando ya tenga las 3 busquedas.
let searchCount = 0;
const boton = document.getElementById('agregar');
const input = document.getElementById('nombre');

// cards
// const fetchButton = document.getElementById('obtener');
// const nftName = document.querySelector('.nft h2');
// const priceElement = document.querySelector('.nft .price p');

// fetchButton.addEventListener('click', async () =>{
//     try{
//         const response = await fetch(` https://pokeapi.co/api/v2/pokemon`);
//         const data = await response.json();

//         if(data){
//             nftName.textContent = data.name;
//             priceElement.textContent = `${data.currency} ${data.price}}`;
//         }else{
//             console.log('Error fetching data')
//         }
//     } catch(error){
//         console.error('Error fetching data')
//     }
// })

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


// document.getElementById('agregar').addEventListener('click', async function () {
//     const nombrePokemon = document.getElementById('nombre').value.toLowerCase();
//     if(nombrePokemon ===''){
//         alert('El campo no puede quedar vacio.')
//         return;
//     }
//     // const nombrePokemon = document.getElementById('nombre').value;
//     pokemones.push(nombrePokemon);
//     document.getElementById('nombre').value = ''; 
//     console.log('Pokémon agregado:', nombrePokemon);
// });

// document.getElementById('obtener').addEventListener('click', async function () {
//     if(pokemones.length === 0){
//         alert('No hay agregado para imprimir.')
//         return;
//     }
//     for (const nombrePokemon of pokemones) {
//         await mostrarPokemon(nombrePokemon);
//     }
// });
// async function obtenerPokemon(nombre) {
//         const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`); 
//         return respuesta.json();
//         }
// main.js
// ...

document.getElementById('agregar').addEventListener('click', async function () {
    const nombrePokemon = document.getElementById('nombre').value.toLowerCase();
    if(nombrePokemon ===''){
        alert('El campo no puede quedar vacio.')
        return;
    }
    
    // const nombrePokemon = document.getElementById('nombre').value;
    pokemones.push(nombrePokemon);
    document.getElementById('nombre').value = ''; 
    console.log('Pokémon agregado:', nombrePokemon);

    // Actualizar el historial en localStorage
    localStorage.setItem(historialKey, JSON.stringify(pokemones));
});



document.getElementById('obtener').addEventListener('click', async function () {
    if(pokemones.length === 0){
        alert('No hay agregado para imprimir.')
        return;
    }
    for (const nombrePokemon of pokemones) {
        await mostrarPokemon(nombrePokemon);
    }
});

async function obtenerPokemon(nombre) {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`); 
            return respuesta.json();
}


// ...


// async function mostrarPokemon(nombre) {
//         const pokemon = await obtenerPokemon(nombre);
//         const pokemonDiv = document.createElement('pokemones');
//         pokemonDiv.classList.add('pokemon');
        
//         const imagenUrl = pokemon.sprites.front_default;
        
//         const tipos = pokemon.types.map(type => type.type.name).join(', ');
    
//         const nombrePokemon = pokemon.name;
//         const idPokemon = pokemon.id;
    
        
//         // pokemonDiv.innerHTML = `
//         //     <img src="${imagenUrl}" alt="${nombre}">
//         //     <h2>Nombre: ${nombrePokemon}</h2>
//         //     <p>ID: ${idPokemon}</p>
//         //     <p>Tipo(s): ${tipos}</p>
//         // `;
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
    // Aquí puedes agregar una confirmación si deseas
    // if (confirm("¿Estás seguro de que quieres actualizar la página?")) {
        location.reload();
    // }
});



// Resto de tu código...

// document.getElementById('historial').addEventListener('click', function() {
//     mostrarHistorial();
// });

// Mueve la función fuera del evento clic del botón
// function mostrarHistorial() {
//     const historialDiv = document.getElementById('historial-container');
//     historialDiv.innerHTML = ''; // Limpiamos el contenido anterior

//     if (pokemones.length === 0) {
//         historialDiv.textContent = 'No hay pokémon en el historial.';
//         return;
//     }

//     const listaHistorial = document.createElement('ul');
//     pokemones.forEach(pokemon => {
//         const listItem = document.createElement('li');
//         listItem.textContent = pokemon;
//         listaHistorial.appendChild(listItem);
//     });

//     historialDiv.appendChild(listaHistorial);
// }

// document.getElementById('historial').addEventListener('click', function() {
//     // Guardar el historial en localStorage
//     localStorage.setItem(historialKey, JSON.stringify(pokemones));
//     // Redirigir a la página de historial
//     window.location.href = 'historial.html';
// });