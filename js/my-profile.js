var perfil = JSON.stringify({nombre: localStorage.getItem("Nombre"), edad: localStorage.getItem("Edad"), correo: localStorage.getItem("email"), telefono: localStorage.getItem("Telefono")})

//Inicializo las variables con el valor actual en localStorage
var nombre = JSON.parse(perfil).nombre;
var edad = JSON.parse(perfil).edad;
var correo = JSON.parse(perfil).correo;
var telefono = JSON.parse(perfil).telefono;

//Me aseguro de que el nombre no quede como null
if (nombre == null) {
    nombre = "";
}

//Muestro los input en el HTML
document.getElementById("datosPersonales").innerHTML = `
    <table>
        <tr>
            <th> Nombre  <input name="input" type="text" placeholder="Ingresa tu nombre" id="nombre" value="` + nombre + `"> </th> 
            <th> Edad <input name="input" type="number" placeholder="Ingresa tu edad" id="edad" value="` + edad + `" min="1"> </th>
            <th> Correo electrónico <input name="input" type="email" placeholder="Correo electrónico" id="correo" value="` + correo + `"> </th>
            <th> Teléfono de contacto <input name="input" type="number" placeholder="Ingrese un teléfono" id="telefono" value="` + telefono + `"> </th>
        </tr>
    </table>
    <br>
    <button onclick="modificarDatos()">Modificar datos</button>
    <a href="my-profile.html"><button onclick="agregarDatos()">Actualizar datos</button></a>`

//Cada input que ya tenga información cargada, va a estar desactivado por defecto
var inputs = document.getElementsByName("input");
var inputsValues = [];

for (let i = 0; i < inputs.length; i++) {
    inputsValues.push(document.getElementsByName("input")[i].attributes[4].value);

    if(document.getElementsByName("input")[i].attributes[4].value !== ""){
        document.getElementsByName("input")[i].setAttribute("disabled", "disabled");
    }
}

function agregarDatos() {
    //Obtengo los valores de los input y defino las Key del localStorage
    localStorage.setItem("Nombre", document.getElementById("nombre").value);
    localStorage.setItem("Edad", document.getElementById("edad").value);
    localStorage.setItem("email", document.getElementById("correo").value);
    localStorage.setItem("Telefono", document.getElementById("telefono").value);
}

function modificarDatos(){
    for (let i = 0; i < inputs.length; i++) {
            document.getElementsByName("input")[i].removeAttribute("disabled");
    }
}