// 4.31. Recibe varios números y devuelve distintas operaciones.
function operaciones(...numeros) {
    let suma = 0;

    for (let numero of numeros) {
        suma += numero;
    }

    let media = suma / numeros.length;
    let multiplicacion = numeros[0] * numeros[numeros.length - 1];
    let division = numeros[1] / numeros[numeros.length - 2];

    return [suma, media, multiplicacion, division];
}

console.log(operaciones(2, 8, 4, 2, 5));
// Devuelve: suma, media, primero por último y segundo entre penúltimo.
