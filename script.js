// =========================================================
// 1. CONFIGURACIÓN DEL OBJETIVO
// =========================================================
// Define la fecha de destino aquí. El formato es: 'Mes Día, Año Hora:Minutos:Segundos'
// Por ejemplo: 'December 25, 2025 10:00:00'
const TARGET_DATE = new Date('November 17, 2025 00:00:00').getTime(); 
// Si deseas volver al contador de medianoche, comenta la línea anterior y descomenta la siguiente:
// const TARGET_DATE = calculateNextDayMidnight().getTime(); 
// =========================================================


// Variables para los elementos del DOM
const daysEl = document.getElementById('days'); // **NUEVO:** Necesario para días
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownContainer = document.getElementById('countdown-container');
const finalContent = document.getElementById('final-content');
let countdownInterval;

/**
 * Calcula el punto exacto de la medianoche del día siguiente (00:00:00).
 * (Esta función se mantiene para fines de referencia, aunque usamos TARGET_DATE)
 */
function calculateNextDayMidnight() {
    const now = new Date();
    const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0, 0 
    );
    return nextMidnight;
}

/**
 * Formatea un número para que siempre tenga dos dígitos (ej: 5 -> 05).
 */
function formatTime(value) {
    // Los días no se formatean a dos dígitos si son > 99
    if (value >= 100) {
        return value.toString();
    }
    return value < 10 ? `0${value}` : value.toString();
}

/**
 * Reproduce un sonido (si el navegador lo permite).
 * NOTA: Puede que necesite interacción previa del usuario.
 */
function playCelebrationSound() {
    try {
        // Puedes cambiar esta URL por un sonido de cumpleaños si lo tienes alojado.
        const audio = new Audio('audio/cumple.mp3'); 
        audio.volume = 0.5; // Volumen medio
        audio.play().catch(e => console.error("No se pudo reproducir el sonido:", e));
    } catch (e) {
        console.warn("La reproducción de sonido falló:", e);
    }
}


/**
 * Muestra el contenido final, detiene la cuenta regresiva y reproduce un sonido.
 */
function showFinalContent() {
    // Detiene la ejecución del intervalo
    clearInterval(countdownInterval);
    
    // Oculta el contenedor del contador y muestra el mensaje final
    countdownContainer.classList.add('hidden');
    finalContent.classList.remove('hidden');

    // Reproduce el sonido de celebración
    playCelebrationSound();

    // Se asegura de que el contador muestre 00:00:00:00
    if(daysEl) daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    
    console.log("¡El contador ha expirado! Mostrando contenido final.");
}

/**
 * Actualiza el contador regresivo cada segundo.
 */
function updateCountdown() {
    const now = new Date().getTime(); // Hora actual en milisegundos
    const timeDifference = TARGET_DATE - now; // Diferencia de tiempo restante en milisegundos

    // 1. Comprobar si el tiempo ha expirado
    if (timeDifference < 1000) {
        showFinalContent();
        return;
    }

    // 2. Definición de valores de tiempo en milisegundos
    const MS_PER_SECOND = 1000;
    const MS_PER_MINUTE = MS_PER_SECOND * 60;
    const MS_PER_HOUR = MS_PER_MINUTE * 60;
    const MS_PER_DAY = MS_PER_HOUR * 24;

    // 3. Cálculo de tiempo (Días, Horas, Minutos, Segundos)
    
    const days = Math.floor(timeDifference / MS_PER_DAY);
    const timeRemainder = timeDifference % MS_PER_DAY;
    
    const hours = Math.floor(timeRemainder / MS_PER_HOUR);
    const minutes = Math.floor((timeRemainder % MS_PER_HOUR) / MS_PER_MINUTE);
    const seconds = Math.floor((timeRemainder % MS_PER_MINUTE) / MS_PER_SECOND);

    // 4. Actualiza el DOM con los valores formateados
    
    if (daysEl) { // Solo actualiza si el elemento 'days' existe en el HTML
        daysEl.textContent = formatTime(days); 
    }
    
    hoursEl.textContent = formatTime(hours);
    minutesEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);
}

/**
 * Inicializa la aplicación y comienza el contador.
 */
function initializeApp() {
    // Se asegura de que el contador se detenga si ya ha expirado
    if (new Date().getTime() >= TARGET_DATE) {
        showFinalContent();
        return;
    }
    
    console.log("Iniciando contador...");
    // Ejecuta la función inmediatamente para evitar retraso visual inicial
    updateCountdown();
    // Configura el intervalo para actualizar cada 1 segundo (1000 ms)
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Inicia el contador cuando la página se haya cargado completamente
window.onload = initializeApp;