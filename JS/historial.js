// Obtener el historial guardado en localStorage
const historialGuardado = localStorage.getItem(historialKey);

if (historialGuardado) {
    const pokemones = JSON.parse(historialGuardado); // Usar una variable local aquí
    mostrarHistorialEnCartas(pokemones);
} else {
    // Si no hay historial guardado, mostrar un mensaje
    const historialDiv = document.getElementById('historial-container');
    historialDiv.textContent = 'No hay pokémon en el historial.';
}

async function mostrarHistorialEnCartas(pokemones) {
    const historialDiv = document.getElementById('historial-container');
    historialDiv.innerHTML = ''; // Limpiar el contenido anterior

    if (pokemones.length === 0) {
        historialDiv.textContent = 'No hay pokémon en el historial.';
        return;
    }
     // Obtener información de los Pokémon
    const pokemonDatas = await Promise.all(pokemones.map(obtenerPokemon));
     // Ordenar los Pokémon por experiencia de menor a mayor
    pokemonDatas.sort((pokemon1, pokemon2) => pokemon1.base_experience - pokemon2.base_experience);
    // Iterar sobre cada nombre de Pokémon en el historial
    for (const pokemon of pokemonDatas) {
        // Obtener la información del Pokémon desde la API
        // const pokemon = await obtenerPokemon(nombrePokemon);

        
        // Crear la carta del Pokémon
        const cartaHTML = generarCartaPokemon(
            pokemon.name,
            pokemon.sprites.front_default,
            pokemon.id,
            pokemon.types.map(type => type.type.name),
            pokemon.abilities[0].ability.name,
            pokemon.base_experience
    
        );
        // Agregar la carta al historial
        historialDiv.innerHTML += cartaHTML;
    }
}

