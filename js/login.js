document.addEventListener("DOMContentLoaded", function(e){ 

    document.getElementById("ingresar").onclick = function(){
        let email = document.getElementById("email").value.length;
        let contraseña = document.getElementById("contraseña").value.length; 

        if (email == "" || contraseña == "") {
            document.getElementById("faltanDatos").innerHTML = "Debes ingresar tus datos gil";
            console.log(email);
        }
        else {
            window.location.href = "./front-page.html";
        }
    }
});