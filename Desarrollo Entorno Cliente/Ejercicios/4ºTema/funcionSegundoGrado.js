function segundoGrado(a, b, c) {

    let discriminante = b * b - 4 * a * c;

    if (a === 0) {
        return "No es una ecuación de segundo grado.";
    }

    if (discriminante < 0) {
        return [];
    }

    let resultado1 = (-b + Math.sqrt(discriminante)) / (2 * a);
    let resultado2 = (-b - Math.sqrt(discriminante)) / (2 * a);

    return [resultado1, resultado2];
}

console.log(segundoGrado(2, 3, 1));