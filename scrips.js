
//ARRAYS
let carrito = [];



//TRAER PRODUCTOS DE .JSON

fetch("productos.json")
    .then( response => response.json())
    .then( productos =>  {console.log(productos)

        let btnCarrito
        let AlmacenamientoProductos = document.getElementById("almacenamientoProductos")
        
        

        //VISUALIZACION DE PRODUCTOS

        for (let producto of productos){

        
            let impProducto = document.createElement("div");
            impProducto.innerHTML = `<img class="imgProducto" src="${producto.imgProducto}">
                                    <h4 class="nombreProducto">${producto.nombreProducto}</h4>
                                    <h5 class="precioProducto">$${producto.precioProducto}</h5>`
            impProducto.className = "producto"
            AlmacenamientoProductos.appendChild(impProducto)
            
            let crearBtnCarrito = document.createElement("button")
            crearBtnCarrito.innerHTML = `<img src="images/iconos/iconoAgregarCarrito.png" alt="agregar carrito">`
            crearBtnCarrito.className = "btnCarrito"
            impProducto.appendChild(crearBtnCarrito)
            
            btnCarrito = document.querySelectorAll(".btnCarrito")
        }


        // FUNCIONALDIDAD DE BOTON AGREGAR A CARRITO

        for (let boton of btnCarrito){

            boton.addEventListener("click", agregarCarrito)
        
        }

    })


//FUNCION AGERGAR AL CARRITO

function agregarCarrito(e){
    console.log("producto agregado")
    

    //IDENTIFICACION DE PRODUCTO SELECIONADO 

    let imgBtnCarritoSelec = e.target
    let btnCarritoSelec = imgBtnCarritoSelec.parentNode
    let ProductoSelec = btnCarritoSelec.parentNode
    
    let nombreProductoSelec = ProductoSelec.querySelector("h4").textContent
    let precioProductoSelec = ProductoSelec.querySelector("h5").textContent
    let imgProductoSelec = ProductoSelec.querySelector("img").src
    

    //OBJETO DE PRODUCTO SELECCIONADO

    let producto ={
        nombre: nombreProductoSelec,
        precio: precioProductoSelec,
        img: imgProductoSelec,
        cantidad: 1
    }


    //COMPROBACION DE PRODUCTO REPETIDO 


    let validacion = carrito.some((item)=>{
        return item.nombre == producto.nombre;
    })

    if(validacion){
        carrito.forEach((item) => {
            if(item.nombre == producto.nombre){
                item.cantidad +=1;
            }
        });
    }

    else{
        carrito.push(producto);
    }

    console.log(carrito)
    
    mostrarProductoCarrito()
        
    
}


//CARGA DE PRODUCTOS AL CARRITO 

let impBtnRemover 
let almacenamientoCarrito


function mostrarProductoCarrito(){

    //MOSTRAR PRODUCTOS EN CARRITO

    almacenamientoCarrito = document.getElementById("almacenamientoCarrito")
    

    almacenamientoCarrito.innerHTML = "<h2>CARRITO</h2>";

    for (let producto of carrito){

        let impCarrito = document.createElement("div")
        impCarrito.innerHTML = `<img  class="img_carrito" src="${producto.img}">
                                <div id="infoItem">
                                <h6 class="nombreProducto_carrito">${producto.nombre}</h6>
                                <p class="precioProducto_carrito">${producto.precio}</p>
                                <P class="cantProducto_carrito">cantidad: ${producto.cantidad}</P>
                                <button class="removerProducto">eliminar</button>
                                </div>`
        impCarrito.className = "producto_carrito"
        almacenamientoCarrito.appendChild(impCarrito)
    }

    //LLAMANDO BOTON ELIMINAR


    let btnRemover = document.querySelectorAll(".removerProducto")


    for(let boton of btnRemover){
        boton.addEventListener("click",removerProducto)
    }



    //NOTIFICACION DE OBJETO AGREGADO AL CARRITO

    Toastify({
        text: "Producto agregado al carrito",
        duration: 2000,
        gravity: "bottom",
        position: "left",
        style: {
            background: "black"
        }
    }).showToast();
}

//FUNCIONALIDAD DE BOTON ELIMINAR


function removerProducto(e){

    e.target.parentNode.parentNode.remove();

    let infoItemEliminar = e.target.parentNode

    let nombreProductoEliminar = infoItemEliminar.querySelector("h6").textContent

    let indiceElementoEliminar = carrito.findIndex(item => item.nombre == nombreProductoEliminar)

    if(indiceElementoEliminar != -1){
        carrito.splice(indiceElementoEliminar,1);
    }

    // NOTIFICACION DE PRODUCTO ELIMINADO

    Toastify({
        text: "Producto quitado del carrito",
        duration: 2000,
        gravity: "bottom",
        position: "left",
        style: {
            background: "red"
        }
    }).showToast();
}

