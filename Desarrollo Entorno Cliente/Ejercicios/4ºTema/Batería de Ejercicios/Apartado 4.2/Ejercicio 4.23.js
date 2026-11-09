// 4.23. Comprueba si un año es bisiesto.
function esBisiesto(anio) {
    return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
}

console.log(esBisiesto(2024)); // true
console.log(esBisiesto(1900)); // false
