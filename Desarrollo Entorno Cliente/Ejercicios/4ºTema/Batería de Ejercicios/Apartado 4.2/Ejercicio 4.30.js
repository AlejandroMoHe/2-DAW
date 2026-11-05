// Esta función recoge el número y comprueba si el número es divisible o si es menor de su raíz cuadrada
function esPrimo(num) {
    let limite = Math.sqrt(num)
    for (let i = 3; i <= limite; i += 2) {
        if (num % i === 0) {
            return false;
        }else{
            return true
        }
    }
}
esPrimo(127)
