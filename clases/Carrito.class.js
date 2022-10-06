import Producto from "./Producto.class.js";
import fs from "fs";


export default class Carrito {
	constructor() {
		this.producto = new Producto();
		this.carritos = [];
		this.id = 1;
	}

	async crearCarrito(){
		await fs.promises.writeFile("./carrito.txt", JSON.stringify([], null, 2), "utf-8");
	}

	async listar(id) {
		let prod = this.carritos.find((carr) => carr.id == id);
		return prod || { error: "carrito no encontrado" };
	}

	async listarAll() {
		try{
			const contenido = await fs.promises.readFile("./carrito.txt", "utf-8");
			if(Array.isArray(contenido)){
				console.log("Carro vacio")
				return JSON.parse(contenido);

			}else{
			console.log("Carrito con algo")
			return JSON.parse(contenido);
			}
		}catch(err){
			this.crearCarrito()
			console.log("Archivo de carrito creado")
		}
	}

	addCarrito() {
		const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
		return carr;
	}

	async guardarProductoEnCarrito(idProd, idCarrito) {
		console.log(idProd);
		const producto = await this.producto.getById(idProd);
		this.carritos.forEach((carro) => {
			carro.id == idCarrito ? carro.productos.push(producto) : null;
		});
		console.log(producto);
		return this.carritos;
	}

	actualizar(carr, id) {
		carr.id = Number(id);
		let index = this.carritos.findIndex((carr) => carr.id == id);
		this.productos.splice(index, 1, carr);
	}

	borrar(id) {
		let index = this.carritos.findIndex((carr) => carr.id == id);
		return this.carritos.splice(index, 1);
	}
}