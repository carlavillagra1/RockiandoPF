# Rockiando Sport 
###  Proyecto de backend
#### Esta es la primer entrega del proyecto final.

*_Para inicializar, en la terminal escribir lo siguiente :_*

 `npm start`

Luego de inicializar en la terminal, abrir POSTMAN y escribir el puerto que estaremos utilizando en el servidor local.
 
` localhost:8080`

*Las rutas para productos y para el carrito son las siguientes:*

 productos: `localhost:8080/api/products`

 carrito: `localhost:8080/api/carts`

* Consigna 1 : La ruta post/ debera crear un producto.


![](/imgREADME/cap.png)

 Se agrego el producto.

![](/imgREADME/cap2.png)



* Consigna 2 : La ruta put/:id debera tomar el producto de dicho id y actualizar los campos, no se debe actualizar ni eliminar dicho id.
 ![](/imgREADME/cap3.png)

* Consigna 3 :  La ruta delete/:id debera tomar dicho producto con el id indicado y eliminarlo.

  Muestro el productocon el id 5
 ![](/imgREADME/cap4.png)

   Lo borro
 ![](/imgREADME/capborrar.png)



* Consigna 4 :  Para el carrito la ruta post/ debera crear un carrito con la siguiente estructura : id, products: [] .
![](/imgREADME/cap5.png)


* CONSIGNA 6 : Para el carrito la ruta get/:cid debera listar los productos que pertenezcan a dicho carrito con el id proporcionado.
![](/imgREADME/cap8.png)

* Consigna 7 : Para el carrito la ruta post/cid/product/pid debera agregar dicho producto que contenga ese id, ademas se agregara de uno en uno con el quantity incremetandose.

Lo agregue 2 veces asi muestro el quantity que se sumo.
![](/imgREADME/cap7.png)





