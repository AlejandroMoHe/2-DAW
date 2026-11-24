Este guion está diseñado para ejecutarse en directo en el navegador (con un `index.html` mínimo que cargue `app.js` y la consola de DevTools abierta), avanzando paso a paso para que el alumnado vea tanto el funcionamiento como el fallo típico al recuperar objetos.

## Preparación del entorno (1 minuto)

Crea dos archivos en la misma carpeta y ábrelos con Live Server:

HTML

```
<!-- index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Live Coding: JSON y Reconstrucción de Objetos</title>
</head>
<body>
  <h1>Abre la consola (F12) para seguir la sesión</h1>
  <script type="module" src="./app.js"></script>
</body>
</html>
```

(Al usar `type="module"`, todo el código se ejecuta automáticamente en modo estricto).   



## Paso 1: Crear el molde (`class`) y los 5 objetos en memoria

Empieza escribiendo la clase `Cancion` en `app.js`. Explica en voz alta que una clase unifica **datos** (propiedades inicializadas en el `constructor`) y **comportamiento** (métodos que JavaScript aloja compartidos en `Cancion.prototype` para ahorrar memoria).   



JavaScript

```
// ==========================================
// PASO 1: DEFINICIÓN DE CLASE E INSTANCIAS
// ==========================================
class Cancion {
  titulo = "Sin título";
  artista = "Desconocido";
  genero = "General";
  anio = 2000;
  duracionSeg = 0;

  constructor(titulo, artista, genero, anio, duracionSeg) {
    this.titulo = titulo;
    this.artista = artista;
    this.genero = genero;
    this.anio = anio;
    this.duracionSeg = duracionSeg;
  }

  reproducir() {
    const min = Math.floor(this.duracionSeg / 60);
    const seg = String(this.duracionSeg % 60).padStart(2, "0");
    return `▶ Sonando: "${this.titulo}" - ${this.artista} [${this.genero}, ${this.anio}] (${min}:${seg})`;
  }
}

const playlist = [
  new Cancion("Master of Puppets", "Metallica", "Thrash Metal", 1986, 515),
  new Cancion("Fear of the Dark", "Iron Maiden", "Heavy Metal", 1992, 438),
  new Cancion("Painkiller", "Judas Priest", "Heavy Metal", 1990, 366),
  new Cancion("Roots Bloody Roots", "Sepultura", "Groove Metal", 1996, 212),
  new Cancion("Centro di gravità permanente", "Franco Battiato", "Art Pop", 1981, 235)
];

console.log("1. Objeto original:", playlist[0]);
console.log("¿Es instancia de Cancion?:", playlist[0] instanceof Cancion); // true
console.log(playlist[4].reproducir()); // Probamos el tema de Franco Battiato
```

**Qué señalar en consola en este punto:**

- Al desplegar `playlist[0]`, señala `[[Prototype]]: Object` con `constructor: class Cancion` y el método `reproducir()`.   

  

- El operador `instanceof` confirma que el objeto pertenece a la clase `Cancion` (`true`).   

  

## Paso 2: Guardar los objetos (Serialización con `JSON.stringify`)

Explica la necesidad real: los objetos en RAM desaparecen al cerrar la pestaña o al enviarlos por red a una API. Para almacenarlos o transmitirlos necesitamos convertirlos a texto plano usando **JSON (JavaScript Object Notation)**.   



Escribe a continuación en `app.js`:

JavaScript

```
// ==========================================
// PASO 2: SERIALIZAR A JSON Y GUARDAR
// ==========================================
const playlistJSON = JSON.stringify(playlist, null, 2);

console.log("2. Tipo tras stringify:", typeof playlistJSON); // "string"
console.log("Contenido JSON generado:\n", playlistJSON);

// Guardamos la cadena en el almacenamiento persistente del navegador
localStorage.setItem("mi_playlist", playlistJSON);
```

**Puntos clave para explicar mientras miras la salida en consola:**

1. **Es solo texto:** `typeof` devuelve `"string"`. Ya no es un array navegable con `.length` de elementos ni métodos, sino una cadena de caracteres.   

   

2. **Reglas estrictas de sintaxis:** JSON obliga a encerrar todas las claves entre comillas dobles (`"titulo"`, `"artista"`) y estructura objetos con `{}` y arrays con `[]`.   

   

3. **Amputación de métodos:** Haz que comparen el objeto original con el JSON impreso. **En JSON solo viajan propiedades (datos), nunca métodos** (`reproducir` ha desaparecido).   

   

4. **Persistencia:** `localStorage.setItem()` guarda esa cadena de texto bajo una clave en el navegador.   

   

## Paso 3: Recuperar los datos y provocar el fallo (`JSON.parse`)

Este es el momento didáctico más importante de la sesión. Simula que recargamos la aplicación, leemos del almacén y convertimos el texto JSON de vuelta a JavaScript con `JSON.parse()`.   



JavaScript

```
// ==========================================
// PASO 3: RECUPERAR Y PARSEAR (EL PROBLEMA)
// ==========================================
const textoRecuperado = localStorage.getItem("mi_playlist");
const datosCrudos = JSON.parse(textoRecuperado);

console.log("3. Array recuperado tras JSON.parse:", datosCrudos);
console.log("Título del tema 1 (dato):", datosCrudos[0].titulo); // Funciona
console.log("¿Es instancia de Cancion?:", datosCrudos[0] instanceof Cancion); // false

// ¡MOMENTO CLÍMAX EN DIRECTO! Descomenta la siguiente línea para provocar el error:
// console.log(datosCrudos[0].reproducir());
```

**Pregunta al grupo antes de descomentar la última línea:** *"Si `datosCrudos[0].titulo` muestra `'Master of Puppets'`, ¿qué pasará si llamo a `datosCrudos[0].reproducir()`?"*

Al ejecutarlo saltará en rojo:

> ```
> Uncaught TypeError: datosCrudos[0].reproducir is not a function
> ```

**Explicación en la pizarra / consola:**

- `JSON.parse()` reconstruye la estructura de datos como objetos literales genéricos (`Object`), cuyo `[[Prototype]]` es `Object.prototype`, **no** `Cancion.prototype`.   

  

- Por eso `instanceof Cancion` devuelve `false`: tienen los datos de una canción, pero han perdido su identidad de clase y sus métodos.   

  

## Paso 4: Reconstruir los objetos (Rehidratación)

Para devolverles sus métodos, validaciones y prototipo, debemos pasar cada objeto plano por el constructor de `Cancion`. La forma más limpia y profesional en JavaScript moderno es añadir un **método fábrica estático (`static`)** dentro de la propia clase.   



Vuelve arriba a la definición de `class Cancion` y añade este método estático (aprovechando para sanear posibles valores `null` o `undefined` con el operador `??` por si en el futuro los datos vienen de una API externa incompleta):   



JavaScript

```
  // Añadir dentro de class Cancion:
  static desdeJSON(objPlano = {}) {
    return new Cancion(
      objPlano.titulo ?? "Sin título",
      objPlano.artista ?? "Desconocido",
      objPlano.genero ?? "General",
      objPlano.anio ?? 2000,
      objPlano.duracionSeg ?? 0
    );
  }
```

Y ahora completa el **Paso 4** al final de `app.js`:

JavaScript

```
// ==========================================
// PASO 4: RECONSTRUCCIÓN DE INSTANCIAS
// ==========================================
const playlistReconstruida = datosCrudos.map(item => Cancion.desdeJSON(item));

console.log("4. Objeto reconstruido:", playlistReconstruida[0]);
console.log("¿Es instancia de Cancion ahora?:", playlistReconstruida[0] instanceof Cancion); // true

// Ejecutamos el método en las 5 canciones reconstruidas
playlistReconstruida.forEach(cancion => {
  console.log(cancion.reproducir());
});
```

**Qué destacar al ejecutar este bloque:**

- `.map()` recorre cada objeto plano recuperado y lo transforma en una instancia real mediante `Cancion.desdeJSON(item)`.   

  

- `instanceof Cancion` vuelve a dar `true` y las 5 canciones (las 4 de metal y la de Battiato) ejecutan `.reproducir()` sin errores.   

  

## Bonus rápido para cierre (Opcional si sobra tiempo)

Si quieres conectar esto con encapsulamiento moderno (ES2022), plantea esta pregunta: *"¿Qué ocurre si nuestra clase tiene un campo privado como `#reproducciones = 0`?"*.   



- `JSON.stringify()` **no puede leer campos privados `#`**, por lo que los omitirá al guardar.   

  

- Igual que el objeto nativo `Date` implementa su propio método `.toJSON()` para decidir cómo serializarse, en nuestras clases podemos definir un método `toJSON()` que devuelva un objeto literal con los datos públicos y privados que sí queremos exportar al JSON.   

  

¿Quieres que prepare también un ejercicio práctico con errores intencionados (por ejemplo, claves sin comillas dobles, pérdida de campos privados `#` o datos `null` de una API) para que tus alumnos lo depuren tras tu explicación?