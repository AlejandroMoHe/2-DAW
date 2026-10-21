//Alejandro Molina y Pedro Javier Silvente

let nombreUsuario = prompt("Nombre de usuario:");
let email = prompt("Escribe tu email:");
let edad = prompt("Introduce tu edad:");
let password = prompt("Escribe tu contraseña:");

let veredicto = 0;

function verificarUsuario(nombreUsuario) {

    if (nombreUsuario.length < 4) {
        console.log("El nombre de usuario debe tener al menos 4 caracteres.");
    }
    else if (nombreUsuario.includes(" ")) {
        console.log("El nombre de usuario no puede tener espacios.");
    }
    else {
        veredicto++;
    }
}

function verificarEmail(email) {

    if (!email.includes("@")) {
        console.log("El email debe tener un @.");
    }
    else if (!email.includes(".")) {
        console.log("El email debe tener un punto.");
    }
    else {
        veredicto++;
    }
}

function verificarEdad(edad) {

    if (edad < 18) {
        console.log("La edad tiene ser 18 o mayor.");
    }
    else {
        veredicto++;
    }
}

function verificarContrasena(password) {

    if (password.length < 8) {
        console.log("La contraseña debe tener al menos 8 caracteres.");
    }
    else {
        veredicto++;
    }
}

function calcularFortaleza(password) {

    let fortaleza = 0;
    let tieneNumero = false;
    let tieneSimbolo = false;

    if (password.length >= 8) {
        fortaleza += 20;
    }

    if (password.length >= 12) {
        fortaleza += 20;
    }

    for (let i = 0; i < password.length; i++) {

        if (password[i] >= "0" && password[i] <= "9") {
            tieneNumero = true;
        }

        if (password[i] == "!" || password[i] == "?" || password[i] == "#" || password[i] == "$" || password[i] == "%") {
            tieneSimbolo = true;
        }
    }

    if (tieneNumero == true) {
        fortaleza += 30;
    }

    if (tieneSimbolo == true) {
        fortaleza += 30;
    }

    return fortaleza;
}

verificarUsuario(nombreUsuario);
verificarEmail(email);
verificarEdad(edad);
verificarContrasena(password);


if (veredicto === 4) {
    console.log("Aceptado");
}
else {
    console.log("Rechazado");
}

let fortaleza = calcularFortaleza(password);

console.log("Fortaleza de contraseña: " + fortaleza + "/100");