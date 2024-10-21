import * as readline from 'readline';

interface Empleado {
    nombre: string;
    identificacion: string;
    puesto: string;
    edad: number;
    salario: number;
}


const empleados : Empleado[] = [];

function agregarEmpleado(empleado: Empleado): void {
    empleados.push(empleado);
    console.log(`Empleado agregado: ${empleado.nombre}`);
}

function buscarEmpleados(nombre: string): Empleado[] {
    return empleados.filter(empleado => empleado.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

function calcularSalario(): void {
    if (empleados.length === 0) {
        console.log("No hay empleados registrados.");
        return;
    }
    console.log("Empleados en la empresa:");
    let sumaSalarios : number = 0;
    empleados.forEach(empleado => {
        sumaSalarios += empleado.salario;
    });
    const prom : number = sumaSalarios/empleados.length;
    console.log(`El salario promedio de los empleados es: ${prom}`);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu(): void {
    console.log("\n--- Menú de Gestion de empleados ---");
    console.log("1. Agregar Empleados");
    console.log("2. Buscar Empleados por nombre");
    console.log("3. Calcular el salario promedio");
    console.log("4. Salir");

    rl.question("Selecciona una opción: ", (opcion) => {
        switch (opcion) {
            case '1':
                agregarEmpleadosPrompt();
                break;
            case '2':
                buscarEmpleadosPrompt();
                break;
            case '3':
                calcularSalario();
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

function agregarEmpleadosPrompt(): void {
    rl.question("Introduce el nombre del empleado: ", (nombre) => {
        rl.question("Introduce la identificacion: ", (identificacion) => {
            rl.question("Introduce el puesto: ", (puesto) => {
                rl.question("Introduce la edad: ", (edad) => {
                    rl.question("Introduce el salario: ", (salario) => {
                        agregarEmpleado({ nombre, identificacion, puesto, edad: Number(edad), salario: Number(salario) });
                        mostrarMenu();
                    });                    
                });
            });
        });
    });
}

function buscarEmpleadosPrompt(): void {
    rl.question("Introduce el Nombre a buscar: ", (Nombre) => {
        const empleadosEncontrados = buscarEmpleados(Nombre);
        console.log("Empleados encontrados:", empleadosEncontrados);
        mostrarMenu();
    });
}

mostrarMenu();