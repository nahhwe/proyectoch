const carrito = [];

let rangos = [
    {id:1 , titulo:"Ascendant 3" , precio:5000},
    {id:2 , titulo: "Inmortal 3" , precio:10000},
    {id:3 , titulo:"Radiant" , precio: 15000},
]

let topTen = {id:4 , titulo:"TOP TEN" , precio:30000}

//Recorre todos los rangos y muestra su información.
for (let rango of rangos){
    let contenedor = document.createElement("div")
    contenedor.innerHTML=
    `
    <div class="card border-dark mb-3" style="max-width: 20rem;">
    <div class="card-header">${rango.titulo}</div>
    <div class="card-body">
        <p class="card-text"> $ ${rango.precio}</p>
            <button type="button" class="btn btn-dark">Agregar al carrito</button>
        </div>
    </div>
    `
    document.body.appendChild(contenedor)
}
// Capturar el boton de Agregar al carrito.

const agregarProductoAscendant = document.querySelector("#agregaritemascendant"); 
console.log(agregarProductoAscendant);

// Agregar evento al boton para que agregue un producto al arreglo (carrito)

agregarProductoAscendant.addEventListener("click", ()=>{
     console.log("Agregaste Ascendant 3 al carrito!");
     carrito.push(rangos[0]);
     console.log(carrito);
 })

 // Capturar el boton de Agregar al carrito.

const agregarProductoInmortal = document.querySelector("#agregariteminmortal"); 
console.log(agregarProductoInmortal);

// Agregar evento al boton para que agregue un producto al arreglo (carrito)

agregarProductoInmortal.addEventListener("click", ()=>{
     console.log("Agregaste Inmortal 3 al carrito!");
     carrito.push(rangos[1]);
     console.log(carrito);
 })

  // Capturar el boton de Agregar al carrito.

const agregarProductoRadiant = document.querySelector("#agregaritemradiant"); 
console.log(agregarProductoRadiant);

// Agregar evento al boton para que agregue un producto al arreglo (carrito)

agregarProductoRadiant.addEventListener("click", ()=>{
     console.log("Agregaste Radiant al carrito!");
     carrito.push(rangos[2]);
     console.log(carrito);     
 })

const rangosJSON = JSON.stringify(rangos); // Paso del arreglo a un JSON - Texto plano.
console.log(rangosJSON);

localStorage.setItem("rangos", rangosJSON); // Envio key.value al localStorage.

const rangosActualizados = JSON.parse(localStorage.getItem("rangos")); // Traigo "rangos" del localStorage en formato de arreglo.
console.log(rangosActualizados); //Muestro el arreglo que traje del localStorage.

rangosActualizados.push(topTen); //Envio un nuevo producto/servicio al arreglo.
console.log(rangosActualizados); //Muestro el arreglo modificado.

const rangosActualizadosJSON = JSON.stringify(rangosActualizados); // Paso del arreglo a un JSON - Texto plano.
console.log(rangosActualizadosJSON); //Muestro el JSON - Texto plano.

localStorage.setItem("rangos2", rangosActualizadosJSON); // Envio key.value (modificado) al localStorage.

/* Deberás agregar y entregar uso de JSON y Storage, y DOM
y eventos del usuario, correspondientes a la tercera entrega de tu proyecto final. */