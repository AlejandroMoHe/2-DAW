// 4.33. Devuelve los caracteres que no pertenecen al alfabeto español.
// Se utiliza filter para seleccionar los caracteres.
function caracteresNoValidos(palabras) {
    let caracteres = palabras.join("").split("");

    return caracteres.filter(function (letra) {
        return !/[a-zñ]/i.test(letra);
    });
}

console.log(caracteresNoValidos(["hola^", "niño", "casa$&"]));
// Devuelve los símbolos que aparecen en las cadenas de texto.
