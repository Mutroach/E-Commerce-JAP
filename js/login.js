

document.getElementById("ingresar").onclick = function(){
        let email = document.getElementById("email").value;
        let contraseña = document.getElementById("contraseña").value; 

        let hoy = new Date();
        let fecha = hoy.getDate() + "/" + (hoy.getMonth()+1) + "/" + hoy.getFullYear();
        let hora = hoy.getHours() + ":" + hoy.getMinutes();
        let fechaYhora = fecha + " " + hora;

        if (email == "" || contraseña == "") {
            document.getElementById("faltanDatos").innerHTML = "Debes ingresar tu usuario y contraseña";
        }
        else {
            window.location.href = "./front-page.html";
        }

        localStorage.setItem("email", email);
        localStorage.setItem("fechaYhora", fechaYhora);
    };