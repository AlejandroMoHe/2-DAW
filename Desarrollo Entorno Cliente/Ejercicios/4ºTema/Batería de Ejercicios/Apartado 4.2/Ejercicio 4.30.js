// 4.30. Comprueba si un número es primo.
function esPrimo(numero) {
    if (numero < 2) {
        return false;
    }

    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            return false;
        }
    }

    return true;
}

console.log(esPrimo(7));  // true
console.log(esPrimo(10)); // false
