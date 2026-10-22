let personas = new Map();

personas.set("11111111A", "Ana");
personas.set("22222222B", "Luis");
personas.set("33333333C", "Maria");
personas.set("44444444D", "Pedro");
personas.set("55555555E", "Lucia");
personas.set("66666666F", "Carlos");
personas.set("77777777G", "Elena");
personas.set("88888888H", "Pablo");
personas.set("99999999J", "Sofia");
personas.set("12345678Z", "David");

personas.forEach((nombre, dni) => {
    console.log(dni, nombre);
});

personas.set("33333333C", "Marta");

console.log("Después del cambio:");

personas.forEach((nombre, dni) => {
    console.log(dni, nombre);
});