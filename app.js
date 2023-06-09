const carrito = [];

let rangos = [
    {id:1 , titulo:"Ascendant 3" , precio:5000},
    {id:2 , titulo: "Inmortal 3" , precio:10000},
    {id:3 , titulo:"Radiant" , precio: 15000},
]

let topTen = {id:4 , titulo:"TOP TEN" , precio:30000}

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

 // Capturar el boton de Compra.

 const comprar = document.querySelector("#botoncomprar")
 console.log(comprar)

 // Agregar evento al boton para que guarde la información de contacto. En este caso se guarda dentro de una variable.

 comprar.addEventListener("click", () =>{
    event.preventDefault()
   let nombrecliente = document.getElementById('inputName').value
   let emailcliente = document.getElementById('inputEmail').value
   console.log(nombrecliente)
   console.log(emailcliente)
 })

const rangosJSON = JSON.stringify(rangos); // Paso del arreglo "rangos" a un JSON - Texto plano.
console.log(rangosJSON); // Muestro un JSON - Texto plano.

localStorage.setItem("rangos", rangosJSON); // Envio key.value al localStorage.

const rangosActualizados = JSON.parse(localStorage.getItem("rangos")); // Traigo "rangos" del localStorage en formato de arreglo.
console.log(rangosActualizados); //Muestro el arreglo que traje del localStorage.

rangosActualizados.push(topTen); //Envio un nuevo producto/servicio al arreglo.
console.log(rangosActualizados); //Muestro el arreglo modificado.

const rangosActualizadosJSON = JSON.stringify(rangosActualizados); // Paso del arreglo modificado a un JSON - Texto plano.
console.log(rangosActualizadosJSON); //Muestro el JSON - Texto plano.

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
    //console.log(data.data[4].tiers)
    const { tiers } = data.data[4]
    let body = ''
    for(let i = 21; i < tiers.length; i++){
        //console.log(tiers[i].tierName)
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