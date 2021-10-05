const CARRITO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const cotizDolar = 40;
var sub1 = 0;
var sub2 = 0;
var carrito = "";

fetch(CARRITO_URL)
    .then(response => response.json())
    .then(data => {
        carrito = data;

        for (let i = 0; i < carrito.articles.length; i++) {
            document.getElementById("itemsCarrito").innerHTML += `
            <div class="list-group-item">
                <div class="row">
                    <div class="col-md-3">
                        <img src="` + carrito.articles[i].src + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ carrito.articles[i].name +`</h4>
                        </div>
                        <p class="mb-1"> Costo unitario ` + carrito.articles[i].currency + ` ` + carrito.articles[i].unitCost + `</p>
                        <p class="mb-1"> Cantidad <input type="number" min="0" value="` + carrito.articles[i].count + `" style="width: 40px;" name="cantidad"> </p>
                    </div>
                </div>
            </div>`
    
            if (carrito.articles[i].currency == "USD") {
                carrito.articles[i].unitCost = carrito.articles[i].unitCost*cotizDolar;
            }
    
            switch (i) {
                case 0:
                    sub1 += carrito.articles[i].unitCost*carrito.articles[i].count;
                    break;
            
                default:
                    sub2 += carrito.articles[i].unitCost*carrito.articles[i].count;
                    break;
            }
        }

        document.getElementById("subtotal").innerHTML = sub1 + sub2;

        document.getElementsByName("cantidad")[0].addEventListener('change', (event) => {
            sub1 = carrito.articles[0].unitCost*event.target.value;
            document.getElementById("subtotal").innerHTML = sub1 + sub2;
        });
    
        document.getElementsByName("cantidad")[1].addEventListener('change', (event) => {
            sub2 = carrito.articles[1].unitCost*event.target.value;
            document.getElementById("subtotal").innerHTML = sub1 + sub2;
        });
    })