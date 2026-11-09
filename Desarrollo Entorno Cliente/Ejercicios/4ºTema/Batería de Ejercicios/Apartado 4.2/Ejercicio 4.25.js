// 4.25. Devuelve la letra correspondiente a un DNI.
function letraDNI(numero) {
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    return letras[numero % 23];
}

console.log(letraDNI(12345678)); // Z
