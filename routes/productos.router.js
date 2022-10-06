import express from "express";
import Producto from "../clases/Producto.class.js";

const router = express.Router();

const producto = new Producto();

function validarAdmin(req, res, next) {
    if (req.query.admin) {
		next();
 	} else {
		res.send("usted no tiene acceso");
 	}
}

router.post("/",validarAdmin, (req, res) => {
	console.log(req.body);
	producto.save(req.body).then(productoCreado => {
	res.send(productoCreado)
	})
});

router.delete("/:id",validarAdmin, (req, res) => {
	const productoBorrado = producto.borrar(req.params.id);
	res.send(productoBorrado);
});

router.get("/", (req, res) => {
	producto.getAll().then(listaProductos => {
	res.send(listaProductos);
	})
});

router.get("/:id", async (req, res) => {
	const productoBuscado = Number(req.params.id);;
	const cont = await producto.getById(productoBuscado);
	res.send(cont);
});

router.put('/:id', async (req, res) => {
	const {nombre, descripcion, codigo, foto, precio, stock, timeStamp} = req.body;
	const id = await producto.put(Number(req.params.id), {nombre, descripcion, codigo, foto, precio, stock, timeStamp});
	res.json(id);
})

export default router;