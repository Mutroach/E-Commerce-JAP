document.getElementById("ingresar").onclick = function(){
        let email = document.getElementById("email").value;
        let contraseña = document.getElementById("contraseña").value; 

        if (email == "" || contraseña == "") {
            document.getElementById("faltanDatos").innerHTML = "Debes ingresar tu usuario y contraseña";
        }
        else {
            window.location.href = "./front-page.html";
        }

        localStorage.setItem("email", email);
        localStorage.setItem("fechaYhora", fechaYhora());
    };

    function fechaYhora() {
        let hoy = new Date();
        let day = (hoy.getDate()).toString();
        let month = (hoy.getMonth()+1).toString();
        let fecha = hoy.getFullYear() + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
        let hora = (hoy.getHours()).toString();
        let minutos = (hoy.getMinutes()).toString();
        let horaCompleta = hora.padStart(2, "0") + ":" + minutos.padStart(2, "0");
        let fechaYhora = fecha + " " + horaCompleta;
    
        return fechaYhora;
    }