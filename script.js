document.addEventListener("DOMContentLoaded", () => {
    const generoSelect = document.getElementById("genero");
    const btnRecomendar = document.getElementById("btnRecomendar");
    const resultado = document.getElementById("resultado");

    const recomendaciones = {
        pop: ["Taylor Swift", "Dua Lipa", "Bruno Mars", "Ed Sheeran"],
        rock: ["Queen", "Foo Fighters", "Nirvana", "The Rolling Stones"],
        reggaeton: ["Bad Bunny", "J Balvin", "Karol G", "Daddy Yankee"],
        electronica: ["David Guetta", "Calvin Harris", "Avicii", "Marshmello"],
        jazz: ["Miles Davis", "John Coltrane", "Ella Fitzgerald", "Louis Armstrong"]
    };

    // Cargar preferencia guardada
    const generoGuardado = localStorage.getItem("generoFavorito");
    if (generoGuardado) {
        generoSelect.value = generoGuardado;
        mostrarRecomendaciones(generoGuardado);
    }

    btnRecomendar.addEventListener("click", () => {
        const genero = generoSelect.value;

        if (!genero) {
            resultado.innerHTML = "<strong>⚠️ Por favor, elige un género.</strong>";
            return;
        }

        // Guardar preferencia en localStorage
        localStorage.setItem("generoFavorito", genero);
        
        mostrarRecomendaciones(genero);
    });

    function mostrarRecomendaciones(genero) {
        let lista = recomendaciones[genero];
        resultado.innerHTML = `<h2>🎵 Recomendaciones de MusicMatch:</h2><ul>` + 
            lista.map(a => `<li>${a}</li>`).join("") + "</ul>";
    }
});
