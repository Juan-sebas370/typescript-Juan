import * as readline from 'readline';

interface Reserva {
    huesped: string;
    telefono: string;
    correo: string;
    precio: number;
}


const reservas : Reserva[] = [];

function agregarEstudiante(Reserva: Reserva): void {
    reservas.push(Reserva);
    console.log(`Reserva agregado: ${Reserva.huesped}`);
}

function buscarReservas(huesped: string): Reserva[] {
    return reservas.filter(Reserva => Reserva.huesped.toLowerCase().includes(huesped.toLowerCase()));
}

function calcularIngresos(): void {
    if (reservas.length === 0) {
        console.log("No hay reservas registrados.");
        return;
    }
    console.log("reservas:");
    let sumaPrecio : number = 0;
    reservas.forEach(Reserva => {
        sumaPrecio += Reserva.precio;
    });
    console.log(`El ingreso total de las reservas es: ${sumaPrecio}`);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu(): void {
    console.log("\n--- Menú de Gestion de reservas ---");
    console.log("1. Agregar reservas");
    console.log("2. Buscar reservas por nombre");
    console.log("3. Calcular el ingreso total");
    console.log("4. Salir");

    rl.question("Selecciona una opción: ", (opcion) => {
        switch (opcion) {
            case '1':
                agregarReservasPrompt();
                break;
            case '2':
                buscarReservasPrompt();
                break;
            case '3':
                calcularIngresos();
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

function agregarReservasPrompt(): void {
    rl.question("Introduce el nombre del Reserva: ", (huesped) => {
        rl.question("Introduce el telefono: ", (telefono) => {
            rl.question("Introduce la correo: ", (correo) => {
                rl.question("Introduce la precio: ", (precio) => {
                    agregarEstudiante({ huesped, telefono, correo, precio: Number(precio) });
                    mostrarMenu();
                });
            });                    
        });
    });
}

function buscarReservasPrompt(): void {
    rl.question("Introduce el Nombre a buscar: ", (Nombre) => {
        const reservasEncontrados = buscarReservas(Nombre);
        console.log("reservas encontrados:", reservasEncontrados);
        mostrarMenu();
    });
}

mostrarMenu();