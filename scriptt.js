// tapas de los albumes
const imagenesCartas = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Pescado_Rabioso-Spinetta_-_Artaud.png/640px-Pescado_Rabioso-Spinetta_-_Artaud.png", // artaud
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgf6q8fEb1hi3IfJ-_o87Ap-7MCrQQQVdv3w2PYNWbDWyX5LBFhSadVckTSqHgMIEh0iDkNtb2cKCsuiTCUCD2J7IzVphV_NDtMce4gz30rxU4hWqh84yWCkz8ZGBiu0SKnviltwAA4UehE/s400/Clics+Modernos+-+Portada.jpg", // Clics Modernos
    "https://cdn-images.dzcdn.net/images/cover/6ea0540343dcd4a2b05b5a8acb70c087/0x1900-000000-80-0-0.jpg", // locura
    "https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/KZY7N47W3NHGZPIQJ7QCOHTUOY.jpg", // lgdlc
    "https://www.rockaxis.com/img/newsList/2907951.jpg", // almendra
    "https://revistaminuscula.com/wp-content/uploads/2021/09/seru-giran-peperina-tapa-the-image-bank.jpg", // peperina
    "https://cdns-images.dzcdn.net/images/cover/db42842e407c7fec1ae1d72d91f2c3f6/0x1900-000000-80-0-0.jpg", // relax
    "https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/80/46/75/80467535-cddd-cb98-ef6c-0ffabcd6eb79/886445051544.jpg/1200x1200bb.jpg" // pescado2
];

const tableroJuego = document.getElementById("gameBoard");
const botonReiniciar = document.getElementById("restartButton");

let primeraCarta = null;
let segundaCarta = null;
let bloquearTablero = false;
let paresEncontrados = 0;
const totalPares = imagenesCartas.length;

// mezclar las cartas
function mezclarCartas() {
    const cartas = [...imagenesCartas, ...imagenesCartas];
    return cartas.sort(() => Math.random() - 0.5); 
}

// crear las cartas 
function crearCartas() {
    const cartasMezcladas = mezclarCartas();
    tableroJuego.innerHTML = ''; 

    cartasMezcladas.forEach(imagen => {
        const carta = document.createElement("div");
        carta.classList.add("card");
        carta.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back"><img src="${imagen}" alt="Imagen de carta"></div>
            </div>
        `;
        carta.addEventListener("click", voltearCarta);
        tableroJuego.appendChild(carta);
    });
}

// Voltear las cartas
function voltearCarta() {
    if (bloquearTablero) return; // Evitar acciones mientras se está verificando un par
    if (this === primeraCarta) return; // No permite clicar en la misma carta

    this.classList.add("flipped");

    if (!primeraCarta) {
        // Primera carta seleccionada
        primeraCarta = this;
        return;
    }

    segundaCarta = this; // Segunda carta seleccionada
    verificarCoincidencia(); // Verificar si las dos cartas coinciden
}

// Verificar si las cartas coinciden
function verificarCoincidencia() {
    const esCoincidencia = primeraCarta.innerHTML === segundaCarta.innerHTML;

    if (esCoincidencia) {
        deshabilitarCartas(); // Deshabilitar las cartas emparejadas
    } else {
        voltearCartas(); // Volver a voltear las cartas
    }
}

// Deshabilitar cartas emparejadas
function deshabilitarCartas() {
    primeraCarta.removeEventListener("click", voltearCarta);
    segundaCarta.removeEventListener("click", voltearCarta);
    paresEncontrados++;
    verificarVictoria();
    resetearTablero();
}

// Voltear cartas no coincidentes
function voltearCartas() {
    bloquearTablero = true;

    setTimeout(() => {
        primeraCarta.classList.remove("flipped");
        segundaCarta.classList.remove("flipped");
        resetearTablero();
    }, 1000);
}

// Reiniciar el estado de las cartas
function resetearTablero() {
    [primeraCarta, segundaCarta, bloquearTablero] = [null, null, false];
}

function lanzarConfetis() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Comprobar si el jugador ha ganado
function verificarVictoria() {
    if (paresEncontrados === totalPares) {
        setTimeout(() => {
            lanzarConfetis(); // Llamar a la función para los confetis
        }, 500);
    }
}

// Función para lanzar confetis


// Reiniciar el juego
botonReiniciar.addEventListener("click", () => {
    paresEncontrados = 0;
    crearCartas();
});

// Inicializar el juego
crearCartas();
