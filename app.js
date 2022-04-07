const fs = require('fs')
const { CLIENT_RENEG_LIMIT } = require('tls')

let contador = 0
let productos = []

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }
    save(title, price, thumbnail){
        const id = ++contador
        const producto = {
            title,
            price,
            thumbnail,
            id
        }
        productos.push(producto)
        escribir(JSON.stringify(productos))
    }
    getById(id){
        leer(id)
    }
    getAll(){
        leerTodos()
    }
    deleteById(id){
        borrarId(id)
    }
    deleteAll(){
        borrarTodo()
    }
}

async function escribir(productos) {
    try {
        const escribirDocumento = await fs.promises.writeFile('productos',productos)
        console.log('Guardado con éxito')
    } catch (error) {
        throw new Error(error)
    }
}
async function leer(id) {
    try {
    const lectura = await fs.promises.readFile('productos', 'utf-8')
    .then(data =>{
        const  obtenerId = JSON.parse(data)
        /* obtenerId.forEach(element => {
            console.log(element.id)
        }); */
        const demo = obtenerId.filter(objeto =>{
            if (objeto.id == id) {
                console.log(objeto)
            }
        })
    })
    } catch (error) {
        console.log(error)
    }
}
async function leerTodos() {
    try {
        const todos = await fs.promises.readFile('productos', 'utf-8')
        .then(data =>{
            console.log(JSON.parse(data))
        })
    } catch (error) {
        console.log(error)
    }
}
async function borrarId(id){
    let productos = []
    try {
        const result = fs.promises.readFile('productos', 'utf-8')
        .then(data=>{
            const datos = JSON.parse(data)
            datos.forEach(element => {
                
                if (element.id === id) {
                    /* console.log('demo') */
                } else {
                    productos.push(element)
                }
            });
            escribir(JSON.stringify(productos))
        })
    } catch (error) {
        console.log(error)
    }
}
async function borrarTodo() {
    try {
        const result = fs.promises.readFile('productos', 'utf-8')
        .then(data=>{
            const datos = JSON.parse(data)
            productos = []
            escribir(JSON.stringify(productos))
        })
    } catch (error) {
        console.log(error)
    }
}


const producto1 = new Contenedor('productos')
producto1.save('horno',1500,'https://horno')
const producto2 = new Contenedor('productos')
producto2.save('tv',100,'https://tv')
const producto3 = new Contenedor('productos')
producto3.save('moto',10000,'https://moto')

producto3.deleteAll()