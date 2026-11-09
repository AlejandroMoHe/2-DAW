// 4.24. Muestra la tabla de multiplicar de un número.
function tablaMultiplicar(numero) {
    for (let i = 1; i <= 10; i++) {
        console.log(numero + " x " + i + " = " + (numero * i));
    }
}

tablaMultiplicar(5);
