let carrito = [];
let subtotal = 0;

let rangos = [
    {id:0, titulo: "Ascendant 3", precio:5000, img: "./img/Ascendant.png"} ,
    {id:1, titulo: "Inmortal 3", precio:10000, img: "./img/Inmortal.png"},
    {id:2, titulo:"Radiant", precio: 15000, img: "./img/Radiant.jpg"},
]

const contenedorRangos = document.querySelector("#contenedor-producto")

function cargarProductos(){
    rangos.forEach(item => {
        const div = document.createElement("div")
        div.classList.add("container-cards")
        div.innerHTML = `
        <div class="card border-dark mb-3" style="max-width: 20rem">
        <img src="${item.img}" style="max-width: 20rem">
            <div class="card-header">${item.titulo}</div>
            <div class="card-body">
                <p class="card-text">Llevamos tu cuenta al rango competitivo ${item.titulo}.</p>
                <p class="card-text">$${item.precio}.</p>
                    <button type="button" class="producto-agregar btn btn-dark" id="${item.id}">Agregar</button>
                </div>
            </div>
        </div>
        `;
        contenedorRangos.append(div)
    })   
}

cargarProductos();

let botonesAgregar = document.querySelectorAll(".producto-agregar")

botonesAgregar.forEach(boton =>{
    boton.addEventListener("click", agregarAlCarrito);
})

function agregarAlCarrito(e){
    const id = e.currentTarget.id
    const rangoAgregado = rangos.find(rango => rango.id == id)
    
    if(carrito.some(item => item.id == id)){
        const index = carrito.findIndex(rango => rango.id == id)
        carrito[index].cantidad++
    }else{
        rangoAgregado.cantidad = 1;
        carrito.push(rangoAgregado);
    }
    mostrarCarrito();
    Toastify({
        text: "Item agregado al carrito.",
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){}
      }).showToast();
}

let topTen = {id:4 , titulo:"TOP TEN" , precio:30000}

 // MOSTRAR CARRITO.

const mostrarCart = document.getElementById('carrito')
const mostrarSub = document.getElementById('subtotal')

function mostrarCarrito(arr){
    mostrarCart.innerHTML = ""
    if(carrito.length === 0){
        mostrarCart.innerHTML = `El carrito esta vacío.`        
    }else{
        carrito.forEach(producto => {
            subtotal = carrito.reduce((acc, item) => {
                return acc += (item.precio * item.cantidad)
            }, 0);
            const div = document.createElement("div")
            div.classList.add("container-cart")
            div.innerHTML = `
            <p>${producto.titulo}</p>
            <p>${producto.cantidad}</p>
            <p>$${producto.precio * producto.cantidad}</p>
            `
                    mostrarCart.append(div)

        });
    }
    mostrarSubtotal();
}

mostrarCarrito(carrito)

//MOSTRAR SUBTOTAL

function mostrarSubtotal(suma){        
    if(suma === 0){
        mostrarSub.innerHTML = ""
    }else{
        mostrarSub.innerHTML = `Total: $${subtotal}`
    }
}

mostrarSubtotal(subtotal)

// VACIAR CARRITO

let carritoVacio = document.querySelector("#vaciar-carrito")
carritoVacio.addEventListener("click",()=>{
    event.preventDefault()
    if(carrito.length !== 0){
    carrito = [];
    mostrarCarrito();
    mostrarSub.innerHTML = ""
    Toastify({
        text: "Has eliminado todos los items del carrito!",
        duration: 10000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "peru",
        },
        onClick: function(){}
      }).showToast();
      }
})

 // Capturar el boton de Compra.

 const comprar = document.querySelector("#botoncomprar")

 // Agregar evento al boton para que guarde la información de contacto. En este caso se guarda en el localStorage.

 comprar.addEventListener("click", () =>{
    event.preventDefault()
   let nombrecliente = document.getElementById('inputName').value
   let emailcliente = document.getElementById('inputEmail').value
       Toastify({
        text: "Compra realizada! Pronto recibiar un e-mail con la factura.",
        duration: 10000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "green",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    localStorage.setItem("carrito-comprado", JSON.stringify(carrito));
    localStorage.setItem("nombre-cliente-carritoOK", JSON.stringify(nombrecliente));
    localStorage.setItem("email-cliente-carritoOK", JSON.stringify(emailcliente));
 })

const rangosJSON = JSON.stringify(rangos); // Paso del arreglo "rangos" a un JSON - Texto plano.

localStorage.setItem("rangos", rangosJSON); // Envio key.value al localStorage.

const rangosActualizados = JSON.parse(localStorage.getItem("rangos")); // Traigo "rangos" del localStorage en formato de arreglo.

rangosActualizados.push(topTen); //Envio un nuevo producto/servicio al arreglo.

const rangosActualizadosJSON = JSON.stringify(rangosActualizados); // Paso del arreglo modificado a un JSON - Texto plano.

localStorage.setItem("rangos2", rangosActualizadosJSON); // Envio key.value (modificado) al localStorage.

const baseDeAgentes = [ //Base de agentes (personajes)
    { id: "Reyna", nombre: "Reyna", ocupation: "Duelist"},
    { id: "Jett", nombre: "Jett", ocupation: "Killer"  },
    { id: "Killjoy", nombre: "Killjoy", ocupation: "Centinel" },
    { id: "Phoenix", nombre: "Phoenix", ocupation: "Duelist" }
];

const pedirAgentes = () => {
    return new Promise((resolve, reject) => { //Creo la promesa.
        setTimeout(() => { //Seteo el timeout de 5 segundos.
            resolve(baseDeAgentes);
        }, 5000);
    })
}

let url = 'https://valorant-api.com/v1/competitivetiers'
fetch(url)
    .then(response => response.json())
    .then(data => obtenerDatos(data))
    .catch(error => console.log(error))
    
const obtenerDatos = (data) =>{
    const { tiers } = data.data[4]
    let body = ''
    for(let i = 21; i < tiers.length; i++){
        body += `<img src= "${tiers[i].smallIcon}" witdh=50px height=50px> ${tiers[i].tierName} - `
        }
    document.getElementById('rangosAPI').innerHTML = body
    }

let agentes = []; // Creo el arreglo de agentes vacio.

const listaAgentes = document.querySelector("#agents"); //Tomo el elemento donde estará el listado, de agentes a utilizar, del HTML

function mostrarAgentes(arreglo) { //Creo la funcion para mostrar los agentes.
    arreglo.forEach(item => { 
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - ${item.ocupation}` //Tomo el nombre y ocupación del personaje.
        listaAgentes.append(li);
    });
}

pedirAgentes()
    .then((res) => { //Promesa realizada.
        agentes = res;
        mostrarAgentes(agentes);
        console.log("Promise resolved.")
    })
    .catch((rej) => { //Promesa rechazada.
        console.log("Promise rejected.")
    })