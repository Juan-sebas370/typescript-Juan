import * as readline from 'readline';

interface Libro {
    titulo: string;
    autor: string;
    editorial: string;
    anio: number;
}

const libros: Libro[] = [];

function agregarLibro(libro: Libro): void {
    libros.push(libro);
    console.log(`Libro agregado: ${libro.titulo}`);
}

function buscarPorTitulo(titulo: string): Libro[] {
    return libros.filter(libro => libro.titulo.toLowerCase().includes(titulo.toLowerCase()));
}

function mostrarLibros(): void {
    if (libros.length === 0) {
        console.log("No hay libros disponibles en la biblioteca.");
        return;
    }
    console.log("Libros disponibles en la biblioteca:");
    libros.forEach(libro => {
        console.log(`Título: ${libro.titulo}, Autor: ${libro.autor}, Editorial: ${libro.editorial}, Año: ${libro.anio}`);
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu(): void {
    console.log("\n--- Menú de Biblioteca ---");
    console.log("1. Agregar libro");
    console.log("2. Buscar libro por título");
    console.log("3. Mostrar todos los libros");
    console.log("4. Salir");

    rl.question("Selecciona una opción: ", (opcion) => {
        switch (opcion) {
            case '1':
                agregarLibroPrompt();
                break;
            case '2':
                buscarLibroPrompt();
                break;
            case '3':
                mostrarLibros();
                mostrarMenu();
                break;
            case '4':
                console.log("Saliendo...");
                rl.close();
                break;
            default:
                console.log("Opción no válida. Intenta de nuevo.");
                mostrarMenu();
                break;
        }
    });
}

function agregarLibroPrompt(): void {
    rl.question("Introduce el título del libro: ", (titulo) => {
        rl.question("Introduce el autor del libro: ", (autor) => {
            rl.question("Introduce el editorial del libro: ", (editorial) => {
                rl.question("Introduce el año de publicación: ", (anio) => {
                    agregarLibro({ titulo, autor, editorial, anio: Number(anio) });
                    mostrarMenu();
                });
            });
        });
    });
}

function buscarLibroPrompt(): void {
    rl.question("Introduce el título a buscar: ", (titulo) => {
        const librosEncontrados = buscarPorTitulo(titulo);
        console.log("Libros encontrados:", librosEncontrados);
        mostrarMenu();
    });
}

mostrarMenu();