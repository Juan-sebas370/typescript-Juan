import * as readline from 'readline';

interface Estudiante {
    nombre: string;
    curso: string;
    nota: number;
}


const estudiantes : Estudiante[] = [];

function agregarEstudiante(estudiante: Estudiante): void {
    estudiantes.push(estudiante);
    console.log(`Estudiante agregado: ${estudiante.nombre}`);
}

function buscarEstudiantes(nombre: string): Estudiante[] {
    return estudiantes.filter(estudiante => estudiante.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

function calcularPromNota(): void {
    if (estudiantes.length === 0) {
        console.log("No hay estudiantes registrados.");
        return;
    }
    console.log("estudiantes:");
    let sumaNotas : number = 0;
    estudiantes.forEach(estudiante => {
        sumaNotas += estudiante.nota;
    });
    const prom : number = sumaNotas/estudiantes.length;
    console.log(`La nota promedio de los estudiantes es: ${prom}`);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu(): void {
    console.log("\n--- Menú de Gestion de estudiantes ---");
    console.log("1. Agregar estudiantes");
    console.log("2. Buscar estudiantes por nombre");
    console.log("3. Calcular la nota promedio");
    console.log("4. Salir");

    rl.question("Selecciona una opción: ", (opcion) => {
        switch (opcion) {
            case '1':
                agregarEstudiantesPrompt();
                break;
            case '2':
                buscarEstudiantesPrompt();
                break;
            case '3':
                calcularPromNota();
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

function agregarEstudiantesPrompt(): void {
    rl.question("Introduce el nombre del Estudiante: ", (nombre) => {
        rl.question("Introduce el curso: ", (curso) => {
            rl.question("Introduce la nota: ", (nota) => {
                agregarEstudiante({ nombre, curso, nota: Number(nota) });
                mostrarMenu();
            });                    
        });
    });
}

function buscarEstudiantesPrompt(): void {
    rl.question("Introduce el Nombre a buscar: ", (Nombre) => {
        const estudiantesEncontrados = buscarEstudiantes(Nombre);
        console.log("estudiantes encontrados:", estudiantesEncontrados);
        mostrarMenu();
    });
}

mostrarMenu();