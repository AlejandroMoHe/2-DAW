// 
// PASO 1: DEFINICIÓN DE CLASE E INSTANCIAS
// 
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
    const seg = String(this.duracionSeg % 60);
    return `> Sonando: "${this.titulo}" - ${this.artista} [${this.genero}, ${this.anio}] (${min}:${seg})`;
  }

  guardar () {

    // Código super complicado para grabar   
    console.log("Guardando...")

  }


  // --->



}

const playlist = [
  new Cancion("Master of Puppets", "Metallica", "Thrash Metal", 1986, 515),
  new Cancion("Fear of the Dark", "Iron Maiden", "Heavy Metal", 1992, 438),
  new Cancion("Painkiller", "Judas Priest", "Heavy Metal", 1990, 366),
  new Cancion("Roots Bloody Roots", "Sepultura", "Groove Metal", 1996, 212),
  new Cancion("Centro di gravità permanente", "Franco Battiato", "Art Pop", 1981, 235)
];



// PRUEBAS

console.log("1. Objeto original:", playlist[0]);
console.log("¿Es instancia de Cancion?:", playlist[0] instanceof Cancion); // true
console.log(playlist[4].reproducir()); // Probamos el tema de Franco Battiato









// PASO 2 SERIALIZAR A JSON Y GUARDAR


const playlistJSON = JSON.stringify(playlist,null,2);

console.log("2. Tipo tras stringify:", typeof playlistJSON); // --->  "string"
console.log("Contenido JSON generado:\n", playlistJSON);

// Guardamos usando la función que hayamos preparado....

//playlist[4].guardar();
localStorage.setItem("mi_playlist", playlistJSON);








// // PASO 3: RECUPERAR Y PARSEAR 


const textoRecuperado = localStorage.getItem("mi_playlist");
const datosCrudos = JSON.parse(textoRecuperado);

console.log("3. Array recuperado tras JSON.parse:", datosCrudos);
console.log("Título del tema 1 (dato):", datosCrudos[0].titulo); // ---> Funciona
console.log("¿Es instancia de Cancion?:", datosCrudos[0] instanceof Cancion); // --> false

// Descomentamos  la siguiente línea para provocar el error:
//console.log(datosCrudos[0].reproducir());













//PASO 4 con  bucle tradicional

const playlistReconstruida = [];

for (const dato of datosCrudos) {
  // Paso A: Instanciamos un objeto de la clase Cancion (ya nace con los métodos)
  const cancion = new Cancion();

  // Paso B: Le asignamos los datos crudos recuperados del JSON
  cancion.titulo = dato.titulo;
  cancion.artista = dato.artista;
  cancion.anio = dato.anio;

  // Paso C: Añadimos el objeto ya reconstruido al array final
  playlistReconstruida.push(cancion);
}

console.log("¿Es instancia de Cancion ahora?:", playlistReconstruida[0] instanceof Cancion); // true










