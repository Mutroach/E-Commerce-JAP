const CARRITO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const cotizDolar = 40;
var sub1 = 0;
var sub2 = 0;
var costoEnvio = 0.05;
var subTotal = 0;
var carrito = "";

fetch(CARRITO_URL)
    .then(response => response.json())
    .then(data => {
        carrito = data;

        let itemData = "";

        for (let i = 0; i < carrito.articles.length; i++) {
            
            itemData += `
            <div class="list-group-item justify-content-md-center";>
                    <div class="table">
                        <tr>
                            <span style="display:flex; justify-content:space-around; align-items: center;">
                            <td>
                                <img src="` + carrito.articles[i].src + `" width="100px"">
                            </td>
                            <td>
                                `+ carrito.articles[i].name +`
                            </td>
                            <td> - Costo unitario ` + carrito.articles[i].currency + ` ` + carrito.articles[i].unitCost + `</td>
                            <td> - Cantidad <input type="number" min="0" value="` + carrito.articles[i].count + `" style="width: 40px;" name="cantidad"> </td>
                            <td> Subtotal UYU: `
    
             if (carrito.articles[i].currency == "USD") {
                carrito.articles[i].unitCost = carrito.articles[i].unitCost*cotizDolar;
            }
    
            itemData += `
            <span name="sub">` + carrito.articles[i].unitCost*carrito.articles[i].count + `</span></td>
                        </tr>
                    </div>
                    </span>
            </div>`
            
            document.getElementById("itemsCarrito").innerHTML = itemData;

            switch (i) {
                case 0:
                    sub1 += carrito.articles[i].unitCost*carrito.articles[i].count;
                    break;
            
                default:
                    sub2 += carrito.articles[i].unitCost*carrito.articles[i].count;
                    break;
            }
        }
        subTotal = sub1 + sub2;
        document.getElementById("subtotal").innerHTML = subTotal;
        document.getElementById("costoEnvio").innerHTML = Math.round(subTotal * costoEnvio);
        document.getElementById("total").innerHTML = (subTotal * costoEnvio) + subTotal;

        document.getElementsByName("cantidad")[0].addEventListener('change', (event) => {
            sub1 = carrito.articles[0].unitCost*event.target.value;
            subTotal = sub1 + sub2;
            document.getElementById("subtotal").innerHTML = subTotal;
            document.getElementsByName("sub")[0].innerHTML = sub1;
            document.getElementById("costoEnvio").innerHTML = Math.round(subTotal * costoEnvio);
            document.getElementById("total").innerHTML = (subTotal * costoEnvio) + subTotal;
        });
    
        document.getElementsByName("cantidad")[1].addEventListener('change', (event) => {
            sub2 = carrito.articles[1].unitCost*event.target.value;
            subTotal = sub1 + sub2;
            document.getElementById("subtotal").innerHTML = subTotal;
            document.getElementsByName("sub")[1].innerHTML = sub2;
            document.getElementById("costoEnvio").innerHTML = Math.round(subTotal * costoEnvio);
            document.getElementById("total").innerHTML = (subTotal * costoEnvio) + subTotal;
        });
    })

    function porcentajeEnvio(porcentaje){
        costoEnvio = porcentaje;
        document.getElementById("costoEnvio").innerHTML = Math.round(subTotal * costoEnvio);
        document.getElementById("total").innerHTML = Math.round((subTotal * costoEnvio) + subTotal);
    }

    function confirmarCompra(){
        if(document.getElementsByName("cantidad")[0].value == 0 || document.getElementsByName("cantidad")[1].value == 0){
            document.getElementById("verificacionDatosCompletos").innerHTML = `<p style="color:red; display:flex; justify-content:center;">Debes comprar al menos un artículo de cada producto seleccionado</p>`
        }

        else if(document.getElementsByClassName("DireccionEnvio")[0].value == "" || document.getElementsByClassName("DireccionEnvio")[1].value == "" || document.getElementsByClassName("DireccionEnvio")[2].value == ""){
            document.getElementById("verificacionDatosCompletos").innerHTML = `<p style="color:red; display:flex; justify-content:center;">Debes ingresar la dirección de envío completa</p>` 
        }

        else if((document.getElementById("numero").value == "" || document.getElementById("codigo").value == "" || document.getElementById("vencimiento").value == "") && document.getElementById("cuentaBancaria").value == ""){
            document.getElementById("verificacionDatosCompletos").innerHTML = `<p style="color:red; display:flex; justify-content:center;">Debes completar los datos de la forma de pago</p>` 
        }

        else{
            document.getElementById("verificacionDatosCompletos").innerHTML = "";
            alert("Su compra ha sido realizada con éxito!") 
        }
    }


    document.getElementById("transferencia").onclick = function transferencia(){
        document.getElementById("numero").setAttribute("disabled", true);
        document.getElementById("codigo").setAttribute("disabled", true);
        document.getElementById("vencimiento").setAttribute("disabled", true);

        document.getElementById("cuentaBancaria").removeAttribute("disabled", true);
    }
    
    document.getElementById("tarjeta").onclick = function tarjeta(){
        document.getElementById("cuentaBancaria").setAttribute("disabled", true);

        document.getElementById("numero").removeAttribute("disabled", true);
        document.getElementById("codigo").removeAttribute("disabled", true);
        document.getElementById("vencimiento").removeAttribute("disabled", true);
    }