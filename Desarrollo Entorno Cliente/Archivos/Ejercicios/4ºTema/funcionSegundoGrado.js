function segundoGrado (a, b, c){
    signo = prompt("Elige el signo (+, -): ")
    switch (signo){
        case "+":
            resultado = (-b + (Math.sqrt(b * b - 4 * a * c))/2 * a)
        case "-":
            resultado = (-b - (Math.sqrt(b * b - 4 * a * c))/2 * a)
    }
    return resultado
}

console.log(segundoGrado(2, 3, 8))