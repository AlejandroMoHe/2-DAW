function calcularLetraDNI(numeroDNI) {
    // Escogemos las letras que permiten en los DNI
    let letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    // Se covierten en un entero para poder operar con él
    let numero = parseInt(numeroDNI, 10);
    // Se hace el recoge el resto del número introducido entre las letras que hay
    let resto = numero % 23;
    //Se devuelve la letra
    return letras.charAt(resto);
}

console.log(calcularLetraDNI("12345678"));