// historial.js
// ...

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

// async function mostrarHistorialEnCartas(pokemones) {
//     const historialDiv = document.getElementById('historial-container');
//     historialDiv.innerHTML = ''; // Limpiar el contenido anterior

//     if (pokemones.length === 0) {
//         historialDiv.textContent = 'No hay pokémon en el historial.';
//         return;
//     }

//     // Iterar sobre cada nombre de Pokémon en el historial
//     for (const nombrePokemon of pokemones) {
//         // Obtener la información del Pokémon desde la API
//         const pokemon = await obtenerPokemon(nombrePokemon);

//          // Obtener las habilidades y ordenarlas de mayor a menor
//         const habilidades = pokemon.abilities.map(ability => ability.ability.name);
//          habilidades.sort((a, b) => b.length - a.length); // Ordenar por longitud de habilidad, de mayor a menor
        
//         // Crear la carta del Pokémon
//         const cartaHTML = generarCartaPokemon(
//             pokemon.name,
//             pokemon.sprites.front_default,
//             pokemon.id,
//             pokemon.types.map(type => type.type.name),
//             pokemon.abilities.map(ability => ability.ability.name).join(', '),
//             pokemon.base_experience
//         );
//         // Agregar la carta al historial
//         historialDiv.innerHTML += cartaHTML;
//     }
// }

async function mostrarHistorialEnCartas(pokemones) {
    const historialDiv = document.getElementById('historial-container');
    historialDiv.innerHTML = ''; // Limpiar el contenido anterior

    if (pokemones.length === 0) {
        historialDiv.textContent = 'No hay pokémon en el historial.';
        return;
    }

    // Iterar sobre cada nombre de Pokémon en el historial
    for (const nombrePokemon of pokemones) {
        // Obtener la información del Pokémon desde la API
        const pokemon = await obtenerPokemon(nombrePokemon);

       // Obtener las habilidades y ordenarlas alfabéticamente
        const habilidadesOrdenadas = pokemon.abilities
        .map(ability => ability.ability.name)
        .sort((a, b) => a.localeCompare(b)); // Ordenar alfabéticamente
        // Crear la carta del Pokémon
        const cartaHTML = generarCartaPokemon(
            pokemon.name,
            pokemon.sprites.front_default,
            pokemon.id,
            pokemon.types.map(type => type.type.name),
            habilidadesOrdenadas.join(', '), // Usar habilidades ordenadas
            pokemon.base_experience
        );
        // Agregar la carta al historial
        historialDiv.innerHTML += cartaHTML;
    }
}

// ...

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

    // Crear un fragmento de documentos para contener las cartas
    const fragmento = document.createDocumentFragment();

    // Iterar sobre cada nombre de Pokémon en el historial
    for (const nombrePokemon of pokemones) {
        // Obtener la información del Pokémon desde la API
        const pokemon = await obtenerPokemon(nombrePokemon);

        // Obtener las habilidades y ordenarlas alfabéticamente
        const habilidadesOrdenadas = pokemon.abilities
            .map(ability => ability.ability.name)
            .sort((a, b) => a.localeCompare(b)); // Ordenar alfabéticamente

        // Crear la carta del Pokémon
        const cartaHTML = generarCartaPokemon(
            pokemon.name,
            pokemon.sprites.front_default,
            pokemon.id,
            pokemon.types.map(type => type.type.name),
            habilidadesOrdenadas.join(', '), // Usar habilidades ordenadas
            pokemon.base_experience
        );

        // Crear un elemento div para contener la carta y agregarlo al fragmento
        const divCarta = document.createElement('div');
        divCarta.classList.add('carta-historial');
        divCarta.innerHTML = cartaHTML;
        fragmento.appendChild(divCarta);
    }

    // Agregar todas las cartas al contenedor del historial
    historialDiv.appendChild(fragmento);
}

// ...


