/**
 * Práctica 5.1 - Programación orientada a objetos en JavaScript
 * Gestión de viajes
 */

export class Viaje {
  #precio;

  constructor(destino, dias, precio) {
    // Validación de destino: cadena de texto no vacía
    if (typeof destino !== "string" || destino.trim().length === 0) {
      throw new TypeError("El destino debe ser una cadena de texto no vacía.");
    }

    // Validación de días: entero positivo (> 0)
    if (!Number.isInteger(dias) || dias <= 0) {
      throw new RangeError("La duración en días debe ser un número entero positivo.");
    }

    this.destino = destino.trim();
    this.dias = dias;
    
    // Asignamos a través del setter para reutilizar su validación
    this.precio = precio;
  }

  get precio() {
    return this.#precio;
  }

  set precio(nuevoPrecio) {
    // Debe ser un número finito (descarta NaN, Infinity, -Infinity) y >= 0
    if (!Number.isFinite(nuevoPrecio) || nuevoPrecio < 0) {
      throw new RangeError("El precio debe ser un número finito y no negativo.");
    }
    this.#precio = nuevoPrecio;
  }

  costeDiario() {
    // Validación defensiva antes de dividir
    if (!Number.isInteger(this.dias) || this.dias <= 0) {
      throw new RangeError("No se puede calcular el coste diario: los días deben ser un entero positivo.");
    }
    return this.#precio / this.dias;
  }

  // Método estático opcional para reconstruir instancias validando los datos
  static desdeJSON(datos) {
    if (typeof datos !== "object" || datos === null) {
      throw new TypeError("Los datos recibidos para reconstruir el viaje no son válidos.");
    }
    return new Viaje(datos.destino, datos.dias, datos.precio);
  }
}

// ==========================================
// EJECUCIÓN Y PRUEBAS
// ==========================================

console.log("=== 1. LISTADO DE VIAJES ===");

const viajes = [
  new Viaje("Lisboa", 3, 240),
  new Viaje("Roma", 5, 600),
  new Viaje("Ibiza", 2, 112)
];

for (const viaje of viajes) {
  console.log(
    `Destino: ${viaje.destino} | Días: ${viaje.dias} | Precio: ${viaje.precio} € | Coste diario: ${viaje.costeDiario()} €/día`
  );
}

console.log("\n=== 2. PRUEBAS MÍNIMAS DE VALIDACIÓN ===");

function comprobarError(descripcion, accion) {
  try {
    accion();
    console.log(`FALLO [${descripcion}]: se esperaba un error y no se lanzó.`);
  } catch (error) {
    console.log(`CORRECTO [${descripcion}]: ${error.name} -> ${error.message}`);
  }
}

const viajePrueba = new Viaje("Berlín", 4, 400);
console.log(`Viaje válido creado: ${viajePrueba.destino}, coste inicial: ${viajePrueba.costeDiario()} €/día`);
viajePrueba.precio = 500;
console.log(`Precio modificado a 500 €. Nuevo coste diario: ${viajePrueba.costeDiario()} €/día`);

comprobarError("Días = 0", () => new Viaje("París", 0, 300));
comprobarError("Días negativos", () => new Viaje("París", -3, 300));
comprobarError("Precio negativo (-50)", () => { viajePrueba.precio = -50; });
comprobarError("Precio NaN", () => { viajePrueba.precio = NaN; });
comprobarError("Precio Infinity", () => { viajePrueba.precio = Infinity; });

console.log("\n=== 3. SERIALIZACIÓN Y DESERIALIZACIÓN JSON ===");

const viajeOriginal = viajes[0]; // Lisboa

console.log("JSON directo de instancia (omite #precio):", JSON.stringify(viajeOriginal));

const datosExportables = {
  destino: viajeOriginal.destino,
  dias: viajeOriginal.dias,
  precio: viajeOriginal.precio
};

const textoJSON = JSON.stringify(datosExportables);
console.log("JSON exportado correctamente:", textoJSON);

const datosRecuperados = JSON.parse(textoJSON);
console.log("Datos recuperados con JSON.parse():", datosRecuperados);
console.log("¿Es instancia de Viaje tras JSON.parse()?:", datosRecuperados instanceof Viaje); // false

const viajeReconstruido = Viaje.desdeJSON(datosRecuperados);
console.log("¿Es instancia de Viaje tras Viaje.desdeJSON()?:", viajeReconstruido instanceof Viaje); // true
console.log(`Coste diario del viaje reconstruido: ${viajeReconstruido.costeDiario()} €/día`);


/*
 * ==========================================================================
 * REFLEXIÓN SOBRE EFICIENCIA Y COSTE COMPUTACIONAL
 * ==========================================================================
 *
 * 1. ¿Por qué definir costeDiario() como método de clase es preferible a crear
 * una nueva función dentro de cada instancia cuando hay muchos viajes?
 *
 *    R: Porque así todos los viajes pueden utilizar la misma función, sin
 *    tener que crear una nueva para cada uno. Esto permite ahorrar memoria
 *    y evita repetir código.
 *
 * 2. ¿Qué coste temporal tiene calcular costeDiario() en función del número
 * de viajes? ¿Y mostrar los datos de n viajes?
 *
 *    R:
 *    - Calcular el coste diario de un viaje requiere muy poco tiempo, ya que
 *      solo hay que realizar una división. Si se calcula para muchos viajes,
 *      el tiempo aumenta según el número de viajes.
 *    - Mostrar los datos de todos los viajes también requiere más tiempo
 *      cuantos más viajes haya, porque el programa tiene que recorrerlos
 *      uno por uno.
 *
 * 3. ¿Qué memoria adicional requiere construir un texto JSON de muchos viajes?
 * Explica cualitativamente el coste; no es necesario medir tiempos reales.
 *
 *    R: Necesita memoria adicional porque se crea un nuevo texto con los datos
 *    de todos los viajes. Cuantos más viajes haya y más información contengan,
 *    más espacio necesitará guardar ese texto.
 *
 * 4. ¿Qué criterio debe prevalecer al elegir entre una clase y varios objetos
 * literales: velocidad, claridad, reutilización o una combinación justificada?
 *
 *    R: Lo más importante es combinar la claridad y la reutilización.
 *    Si tenemos muchos viajes con los mismos datos y comportamientos, es
 *    mejor utilizar una clase porque permite organizar mejor el código,
 *    evitar repetir instrucciones y facilitar su mantenimiento. En cambio,
 *    para guardar unos pocos datos sin necesidad de repetir comportamientos,
 *    pueden ser suficientes los objetos literales.
 *
 * ==========================================================================
 */