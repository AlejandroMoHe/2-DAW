let pinCorrecto = 1234;
let pinIngresado = null;
let intentos = 0;

do {
    pinIngresado = prompt("Introduce el PIN de seguridad:");
    intentos++;

    if (pinIngresado === pinCorrecto) {
        console.log("PIN correcto. Acceso permitido.");
    } else if (intentos < 3) {
        console.log("PIN incorrecto. Te quedan " + (3 - intentos) + " intentos.");
    }

} while (pinIngresado !== pinCorrecto && intentos < 3);

if (pinIngresado !== pinCorrecto) {
    console.log("Has alcanzado el máximo de intentos. Acceso bloqueado.");
}