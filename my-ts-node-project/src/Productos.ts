import * as readline from 'readline';

interface Productos {
    nombre: string;
    descripcion: string;
    cantidad: number;
    precio: number;
}

const productos : Productos[] = [];

function agregarProductos(producto : Productos): void {
    productos.push(producto);
    console.log(`Productos agregado: ${producto.nombre}`);
}

function buscarProductos(nombre: string): Productos[] {
    return productos.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

function calcularSalario(): void {
    if (productos.length === 0) {
        console.log("No hay productos registrados.");
        return;
    }
    console.log("Productos en la empresa:");
    let valorTotal : number = 0;
    productos.forEach(producto => {
        valorTotal += producto.cantidad * producto.precio;
    });

    console.log(`El valor total del inventario es: ${valorTotal}`);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu(): void {
    console.log("\n--- Menú de Gestion de Productos ---");
    console.log("1. Agregar Productos");
    console.log("2. Buscar Productos por nombre");
    console.log("3. Calcular el valor total del inventario");
    console.log("4. Salir");

    rl.question("Selecciona una opción: ", (opcion) => {
        switch (opcion) {
            case '1':
                agregarProductosPrompt();
                break;
            case '2':
                buscarProductosPrompt();
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

function agregarProductosPrompt(): void {
    rl.question("Introduce el nombre del producto: ", (nombre) => {
        rl.question("Introduce la descripcion: ", (descripcion) => {
            rl.question("Introduce la cantidad: ", (cantidad) => {
                rl.question("Introduce el precio: ", (precio) => {
                    agregarProductos({ nombre, descripcion, cantidad: Number(cantidad), precio: Number(precio) });
                    mostrarMenu();
                });                    
            });
        });
    });
}

function buscarProductosPrompt(): void {
    rl.question("Introduce el Nombre a buscar: ", (Nombre) => {
        const productoEncontrados = buscarProductos(Nombre);
        console.log("Producto encontrados:", productoEncontrados);
        mostrarMenu();
    });
}

mostrarMenu();