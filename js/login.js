document.addEventListener("DOMContentLoaded", function(e){ 

    document.getElementById("ingresar").onclick = function(){
        let email = document.getElementById("email").value;
        let contraseña = document.getElementById("contraseña").value; 

        if (email == "" || contraseña == "") {
            document.getElementById("faltanDatos").innerHTML = "Debes ingresar tu usuario y contraseña";
        }
        else {
            window.location.href = "./front-page.html";
        }
    }
});