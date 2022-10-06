import fs from "fs";


export default class Producto {
	constructor() {
		this.itemList = productos;
		this.id = 0;
	}

	async createData(prod) {
		try {
			await fs.promises.writeFile("./lista.txt", JSON.stringify(prod, null, 2), "utf-8");
			return prod;
		} catch (err) {
			console.log("No se pudo agregar el archivo")
		}
	}
	async getById(id) {
		const contenido = await this.getAll();
		const contJson = Array.from(contenido);
		let producto = contJson.filter((prod) => prod.id == id);
		return producto || { error: "producto no encontrado" };
	}
	async getAll() {
		try {
			const contenido = await fs.promises.readFile("./lista.txt", "utf-8");

			return JSON.parse(contenido);
		} catch (err) {
			this.createData([])
			console.log("no existen productos")
		}
	
	}
	async save(prod) {
		try {
			const contenido = await this.getAll();
			const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
			prod.id = indice + 1;
			prod.timeStamp = Date.now();
			contenido.push(prod);
			this.createData(contenido);
			console.log("----Nuevo producto ingresado----")
			return prod;
		} catch (err) {
			const contenido = await this.getAll();
			prod.id = 1;
			prod.timeStamp = Date.now();
			contenido.push(prod);
			this.createData(contenido);
			console.log("----Nuevo producto ingresado----")
			return prod;
		}

	}

	async put(id, prod) {
		try {
			const contenido = await this.getAll();
			let index = contenido.findIndex((p) => p.id === id);
			prod.timeStamp = Date.now();
			if (index >= 0) {
				contenido.splice(index, 1, { ...prod, id });
				this.createData(contenido);
				return prod;
			} else {
				console.log(`Producto con id: ${prod.id} no existe`);
				return null;
			}

		} catch (err) {
			console.log(err)
		}
	}

	async borrar(id) {
		const contenido = await this.getById(id);
		let index = contenido.findIndex((prod) => prod.id == id);
		return contenido.splice(index, 1);
	}
}