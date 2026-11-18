# Manual de apoyo — Programación orientada a objetos en JavaScript



## 1. ¿Por qué necesitamos objetos?

Un objeto agrupa **datos** (propiedades) y **comportamientos** (métodos) relacionados. Por ejemplo, un producto tiene un nombre y un precio, y puede calcular su precio con impuestos.

```javascript
const producto = {
  nombre: "Teclado",
  precio: 40,
  precioConIVA() {
    return this.precio * 1.21;
  }
};

console.log(producto.nombre);       // Teclado
console.log(producto.precioConIVA()); // 48.4
```

- `nombre` y `precio` son **propiedades**.
- `precioConIVA()` es un **método**: una función asociada al objeto.
- `this` hace referencia al objeto que recibe la llamada al método, en este ejemplo `producto`.
- `return` **devuelve** un valor; `console.log()` solo lo muestra.

**Atención a `this`:** en un método normal llamado como `producto.precioConIVA()`, `this` es `producto`. Si extraes el método y lo llamas como una función suelta, el contexto puede perderse. En ejemplos de clases usaremos llamadas del tipo `objeto.metodo()`.

### 1.1. Objetos literales frente a clases

Un **objeto literal** se define directamente con `{ ... }`. Es cómodo si necesitas un objeto concreto y pequeño. Una **clase** define un modelo reutilizable para construir muchos objetos de estructura y comportamiento semejantes.

```javascript
// Dos objetos literales: se repite la descripción de su comportamiento.
const cajaA = {
  unidades: 3,
  duplicar() {
    return this.unidades * 2;
  }
};

const cajaB = {
  unidades: 7,
  duplicar() {
    return this.unidades * 2;
  }
};
```

Con una clase, el método se escribe una vez:

```javascript
class Caja {
  constructor(unidades) {
    this.unidades = unidades;
  }

  duplicar() {
    return this.unidades * 2;
  }
}

const cajaA = new Caja(3);
const cajaB = new Caja(7);

console.log(cajaA.duplicar()); // 6
console.log(cajaB.duplicar()); // 14
```

**¿Qué conviene usar?** Si necesitas muchas entidades del mismo tipo, validaciones comunes y métodos compartidos, una clase suele ser más clara. Para un único conjunto de datos, un literal puede ser suficiente. JavaScript permite ambas formas.

## 2. Clases, constructor e instancias

La estructura básica es:

```javascript
class Alumno {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  presentarse() {
    return `Soy ${this.nombre} y tengo ${this.edad} años.`;
  }
}

const ana = new Alumno("Ana", 19);
const pablo = new Alumno("Pablo", 21);
console.log(ana.presentarse());
console.log(pablo.nombre);
```

| Elemento | Significado |
|---|---|
| `class Alumno` | Declara el modelo de objetos. |
| `constructor(...)` | Se ejecuta al construir una nueva instancia. |
| `new Alumno(...)` | Crea una instancia. |
| `this.nombre = nombre` | Guarda el argumento en la propiedad del objeto. |
| `ana.presentarse()` | Invoca un método de esa instancia. |

El **parámetro** `nombre` existe dentro del constructor; la **propiedad** `this.nombre` pertenece al objeto y sigue existiendo después. Una clase no necesita declarar previamente sus propiedades públicas: pueden asignarse en el constructor.

### 2.1. Métodos: calcular frente a mostrar

```javascript
class Rectangulo {
  constructor(ancho, alto) {
    this.ancho = ancho;
    this.alto = alto;
  }

  area() {
    return this.ancho * this.alto;
  }
}

const figura = new Rectangulo(5, 4);
const superficie = figura.area();
console.log(`Área: ${superficie}`); // Área: 20
```

Es preferible que un método de cálculo **devuelva** el resultado para poder reutilizarlo en operaciones, pruebas o mensajes. Reserva `console.log()` para la parte que presenta la información.



## 3. Encapsulación: campos privados con `#`

Las propiedades públicas son accesibles y modificables desde fuera:

```javascript
class ContadorSimple {
  constructor(valor) {
    this.valor = valor;
  }
}

const contador = new ContadorSimple(5);
contador.valor = -200; // JavaScript lo permite: no hay validación.
```

Un **campo privado** se declara con `#` dentro de la clase y solo puede consultarse o modificarse desde su cuerpo:

```javascript
class Contador {
  #valor;

  constructor(valorInicial) {
    this.#valor = valorInicial;
  }

  leer() {
    return this.#valor;
  }
}

const contador = new Contador(5);
console.log(contador.leer()); // 5
// console.log(contador.#valor); // SyntaxError: acceso privado no permitido.
```

`#valor` no es lo mismo que `_valor`: el guion bajo es solo una convención; `#` impone privacidad en el lenguaje. 

## 4. Getters y setters: una interfaz controlada

Un **getter** permite leer un valor como si fuera una propiedad; un **setter** permite asignarlo ejecutando código de validación.

```javascript
class CuentaPuntos {
  #puntos;

  constructor(puntos) {
    this.puntos = puntos; // Usa el setter; no asigna directamente #puntos.
  }

  get puntos() {
    return this.#puntos;
  }

  set puntos(nuevoValor) {
    if (!Number.isInteger(nuevoValor) || nuevoValor < 0) {
      throw new Error("Los puntos deben ser un entero no negativo.");
    }

    this.#puntos = nuevoValor;
  }
}

const cuenta = new CuentaPuntos(10);
console.log(cuenta.puntos); // 10: llama al getter.
cuenta.puntos = 25;         // Llama al setter.
console.log(cuenta.puntos); // 25
```

Otra cosita de javascript: los get y set **no se usan paréntesis** al leer o escribir un getter/setter: `cuenta.puntos`, no `cuenta.puntos()`.



## 5. Validación de datos: impedir estados incorrectos

Si un programa recibe valores inválidos, debe rechazarlos de manera explícita. No es suficiente con confiar en que el usuario introducirá números correctos.

### 5.1. Tipos y condiciones útiles

| Validación | Expresión | Qué comprueba |
|---|---|---|
| Cadena | `typeof valor === "string"` | Que sea texto. |
| Texto no vacío | `valor.trim().length > 0` | Que no esté compuesto solo por espacios. |
| Número | `typeof valor === "number"` | Que sea del tipo número; **no** descarta `NaN`. |
| Número finito | `Number.isFinite(valor)` | Descarta `NaN`, `Infinity`, `-Infinity` y valores no numéricos. |
| Entero | `Number.isInteger(valor)` | Comprueba que es un número entero finito. |
| Entero positivo | `Number.isInteger(valor) && valor > 0` | Descarta `0`, negativos y decimales. |
| Número no negativo | `Number.isFinite(valor) && valor >= 0` | Admite `0`, pero rechaza negativos y no finitos. |

```javascript
console.log(Number.isInteger(4));     // true
console.log(Number.isInteger(4.5));   // false
console.log(Number.isInteger("4"));   // false
console.log(Number.isFinite(NaN));    // false
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(0));      // true
```

No conviene validar importes solo con `valor >= 0`: `Infinity >= 0` es `true`. Una opción segura es exigir **número finito** y **no negativo** simultáneamente.

### 5.2. Rechazar entradas usando `throw`

```javascript
function calcularMedia(total, cantidad) {
  if (!Number.isFinite(total)) {
    throw new TypeError("El total debe ser un número finito.");
  }

  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    throw new RangeError("La cantidad debe ser un entero positivo.");
  }

  return total / cantidad;
}

console.log(calcularMedia(100, 4)); // 25
// calcularMedia(100, 0); // Lanza RangeError.
```

- `throw` **lanza** una excepción y detiene el flujo normal si no se captura.
- `TypeError` resulta apropiado para un tipo de dato incorrecto.
- `RangeError` resulta apropiado para un número fuera del intervalo permitido.
- `Error` es una alternativa general válida para una actividad introductoria.

**Regla importante:** valida antes de efectuar una división o guardar un valor. Si el divisor debe ser positivo, la validación debe garantizar que no es cero.






### 5.3. El constructor puede y ¿debe? validar también

```javascript
class Entrada {
  constructor(evento, plazas) {
    if (typeof evento !== "string" || evento.trim().length === 0) {
      throw new TypeError("El evento debe ser una cadena no vacía.");
    }

    if (!Number.isInteger(plazas) || plazas <= 0) {
      throw new RangeError("Las plazas deben ser un entero positivo.");
    }

    this.evento = evento;
    this.plazas = plazas;
  }
}
```

Si solo se comprueban los datos cuando se modifican más tarde, un objeto puede nacer con un estado inválido. **Cuidado adicional:** una propiedad pública como `plazas` podría modificarse posteriormente sin pasar por validación; el ejercicio solo exige expresamente un setter para el precio, pero puedes explicar esta limitación de diseño.

## 6. Probar errores sin detener toda la aplicación

Usa `try...catch` para capturar los errores esperados en las pruebas:

```javascript
try {
  calcularMedia(100, 0);
  console.log("Esta línea no se ejecuta si se lanza un error.");
} catch (error) {
  console.log(`Error detectado: ${error.message}`);
}

console.log("El programa continúa.");
```

`catch` se utiliza aquí para **comprobar** que el programa rechaza entradas inválidas, no para ignorar errores ni sustituir las validaciones.

Para pruebas más sistemáticas:

```javascript
function comprobarError(accion) {
  try {
    accion();
    console.log("FALLO: se esperaba un error.");
  } catch (error) {
    console.log(`CORRECTO: ${error.message}`);
  }
}

comprobarError(() => calcularMedia(100, 0));
comprobarError(() => calcularMedia(100, -2));
```

La expresión `() => calcularMedia(...)` es una **función flecha**: retrasa la ejecución hasta que `comprobarError` invoca `accion()` dentro de `try`.

### 5.2.1  ¡Bonus track!  Ejemplo completo combinando throw y try...catch

``` java script
function calcularMedia(total, cantidad) {
    if (!Number.isFinite(total)) {
        throw new TypeError("El total debe ser un número finito.");
    }

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
        throw new RangeError("La cantidad debe ser un entero positivo.");
    }

    return total / cantidad;
}

// Caso correcto
try {
    console.log(calcularMedia(100, 4));
} catch (error) {
    console.log("Error:", error.message);
}

// Caso incorrecto: cantidad igual a cero
try {
    console.log(calcularMedia(100, 0));
} catch (error) {
    console.log("Error:", error.message);
}

// Caso incorrecto: total no numérico
try {
    console.log(calcularMedia("hola", 4));
} catch (error) {
    console.log("Error:", error.message);
}

console.log("Fin del programa");
```







## 7. Arrays, instancias y `for...of`

Un array agrupa valores; puede contener objetos de una misma clase:

```javascript
class Libro {
  constructor(titulo, paginas) {
    this.titulo = titulo;
    this.paginas = paginas;
  }
}

const libros = [
  new Libro("El bosque", 120),
  new Libro("El océano", 205),
  new Libro("La montaña", 90)
];

for (const libro of libros) {
  console.log(`${libro.titulo}: ${libro.paginas} páginas`);
}
```

En `for (const libro of libros)`, `libro` es una variable que, en cada iteración, hace referencia al elemento actual. **`const` no impide que la siguiente iteración use otro elemento**: en cada vuelta se crea una nueva vinculación. Usa `let` si necesitas reasignar esa variable dentro de la misma iteración.

### 7.1. `for...of` no es `for...in`

- `for...of`  recorre los VALORES de una colección.
- `for...in`  recorre las CLAVES (índices o nombres de propiedades) de un objeto.

```javascript
const colores = ["rojo", "verde"];
for (const color of colores) {
  console.log(color); // rojo; verde
}

for (const indice in colores) {
  console.log(indice); // "0"; "1" (claves)
}
```

Para recorrer los **elementos** de un array  de objetos usa  `for...of` es la elección adecuada.

## 8. Mostrar información: plantillas de texto

Las **template literals** se delimitan con acentos graves, `` ` ``; `${expresion}` inserta el resultado de una expresión.

```javascript
const ciudad = "Sevilla";
const noches = 3;
const precioNoche = 75;
console.log(`Ciudad: ${ciudad} | Noches: ${noches} | Total: ${noches * precioNoche} €`);
```

Para redondear al mostrar un importe:

```javascript
const resultado = 100 / 3;
console.log(resultado.toFixed(2)); // "33.33" (cadena de texto)
```

`toFixed(2)` devuelve una **cadena**, no un número. Conviene mantener el cálculo como número y aplicar el formato solo al mostrarlo. En aplicaciones reales, el tratamiento de dinero puede requerir reglas específicas de redondeo.

## 9. JSON: guardar y recuperar datos, no métodos

**JSON** (JavaScript Object Notation) es un formato de texto para intercambiar datos. Admite objetos, arrays, cadenas, números finitos, booleanos y `null`, entre otros; **no** representa métodos de clase ni campos privados de JavaScript.

### 9.1. Convertir a JSON con `JSON.stringify()`

```javascript
const datos = {
  titulo: "Curso de JavaScript",
  sesiones: 6,
  disponible: true
};

const textoJSON = JSON.stringify(datos);
console.log(textoJSON);
// {"titulo":"Curso de JavaScript","sesiones":6,"disponible":true}
```

`JSON.stringify()` **devuelve un string**. No guarda por sí solo un archivo ni envía nada a una red.

### 9.2. Recuperar los datos con `JSON.parse()`

```javascript
const recuperado = JSON.parse(textoJSON);
console.log(recuperado.titulo); // Curso de JavaScript
console.log(typeof recuperado); // object
```

`JSON.parse()` reconstruye **datos** (objetos y arrays ordinarios). **No conoce la clase original que se utilizó para producir el texto.**

### 9.3. ¿Qué ocurre con los campos privados?

```javascript
class Tarjeta {
  #saldo;

  constructor(titular, saldo) {
    this.titular = titular;
    this.#saldo = saldo;
  }

  get saldo() {
    return this.#saldo;
  }
}

const tarjeta = new Tarjeta("Lucía", 50);
console.log(JSON.stringify(tarjeta));
// {"titular":"Lucía"} — el campo privado no se incluye.
```

Aunque exista un getter `saldo` en el prototipo, `JSON.stringify(tarjeta)` **no lo incorpora automáticamente**: serializa, en general, las propiedades propias, enumerables y accesibles como datos serializables. El campo privado no es una propiedad pública enumerable.

Si necesitas incluir el valor de forma controlada, prepara un **objeto de datos**:

```javascript
const datosTarjeta = {
  titular: tarjeta.titular,
  saldo: tarjeta.saldo // Se lee mediante el getter.
};

const jsonTarjeta = JSON.stringify(datosTarjeta);
console.log(jsonTarjeta); // {"titular":"Lucía","saldo":50}
```

Después de `JSON.parse(jsonTarjeta)`, obtendrás un objeto normal sin métodos ni identidad de `Tarjeta`:

```javascript
const datosLeidos = JSON.parse(jsonTarjeta);
console.log(datosLeidos instanceof Tarjeta); // false

// Si quieres recuperar la instancia, crea otra pasando los datos por el constructor:
const nuevaTarjeta = new Tarjeta(datosLeidos.titular, datosLeidos.saldo);
console.log(nuevaTarjeta instanceof Tarjeta); // true
```

**Ojo:** analizar JSON externo puede producir errores de sintaxis o datos inesperados. Al reconstruir instancias, reutiliza las validaciones del constructor/setters.


## 10. Ampliación opcional: módulos ES

Cuando una clase crece, puede separarse del código que la utiliza. Por ejemplo:

**Archivo `Libro.js`:**

```javascript
export class Libro {
  constructor(titulo) {
    this.titulo = titulo;
  }
}
```

**Archivo `app.js`:**

```javascript
import { Libro } from "./Libro.js";

const libro = new Libro("Introducción a JavaScript");
console.log(libro.titulo);
```



### 10.1. Métodos estáticos

Un método `static` pertenece a la clase, no a sus instancias:

```javascript
class Temperatura {
  static desdeFahrenheit(grados) {
    return (grados - 32) * 5 / 9;
  }
}

console.log(Temperatura.desdeFahrenheit(68)); // 20
```


## 11. Eficiencia y coste computacional

**¿Por qué un método de clase puede ahorrar memoria?** Los métodos declarados en el cuerpo de una clase se alojan normalmente en su **prototipo** y las instancias comparten esa función:

```javascript
class Sensor {
  leer() {
    return 10;
  }
}

const a = new Sensor();
const b = new Sensor();
console.log(a.leer === b.leer); // true
```

Si se crea una nueva función en cada constructor, se obtiene una función distinta por instancia:

```javascript
class SensorAlternativo {
  constructor() {
    this.leer = function () {
      return 10;
    };
  }
}

const a = new SensorAlternativo();
const b = new SensorAlternativo();
console.log(a.leer === b.leer); // false
```

En conjuntos grandes, compartir un método puede reducir memoria y favorecer el mantenimiento. No significa que las clases sean siempre más rápidas: importa el caso de uso, el motor JavaScript y la claridad del diseño. 
