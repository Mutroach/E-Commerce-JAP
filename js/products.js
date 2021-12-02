let precioMinimo = "";
let precioMaximo = "";
var productsJsonData = "";
function sortPrecioAscendente(){ productsJsonData.sort((item1, item2) => item1.cost - item2.cost)};
function sortPrecioDescendente(){ productsJsonData.sort((item1, item2) => item2.cost - item1.cost)};
function sortRelevancia(){ productsJsonData.sort((item1, item2) => item2.soldCount - item1.soldCount)};

fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(data => {
        productsJsonData = data;
        //sortPrecioAscendente();
        content(productsJsonData);
    })

function content(jsonParametro){
    let htmlContent = "";
    
   
    for(let i = 0; i < jsonParametro.length; i++){
        let product = jsonParametro[i];

        htmlContent = 
        `<div class="col-md-4">
            <a class="card mb-4 shadow-sm custom-card" href="product-info.html" onclick="seleccionarProducto(`+ product.cost +`)">
                <div class="row" style="padding:5px">
                    
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="bd-placeholder-img card-img-top" style="padding:10px">
                    <h3 class="m-3">`+ product.name +`</h3>

                    <div class="card-body">
                        <p class="card-text">` + product.description + `</p>

                        <small class="text-muted"> Precio: ` + product.currency + ` `+ product.cost +  ` Cantidad de vendidos: ` + product.soldCount + `</small>
                    </div>


                </div>
            </a>
        </div>`;
        
        if(product.cost >= precioMinimo && product.cost <= precioMaximo || product.cost >= precioMinimo && precioMaximo == "" || product.cost <= precioMaximo && precioMinimo == "") {
            document.getElementById("productos").innerHTML += htmlContent;
        }
        else if(precioMinimo == "" && precioMaximo == ""){
            document.getElementById("productos").innerHTML += htmlContent;
        }
    }
}

document.getElementById("filtroPrecioBtn").onclick = function() {
    document.getElementById("productos").innerHTML = "";
    precioMinimo = document.getElementById("minimo").value;
    precioMaximo = document.getElementById("maximo").value;
    content(productsJsonData);
}

document.getElementById("filtroAscendenteBtn").onclick = function() {
    document.getElementById("productos").innerHTML = "";
    sortPrecioAscendente();
    content(productsJsonData);
}

document.getElementById("filtroDescendenteBtn").onclick = function() {
    document.getElementById("productos").innerHTML = "";
    sortPrecioDescendente();
    content(productsJsonData);
}

document.getElementById("filtroRelevanciaBtn").onclick = function() {
    document.getElementById("productos").innerHTML = "";
    sortRelevancia();
    content(productsJsonData);
}

document.getElementById("buscar").addEventListener("keyup", (event) => {
    let busquedaRealizada = document.getElementById("buscar").value.toLowerCase();
    let jsonBusqueda = productsJsonData.filter((producto) => {
        return (producto.name.toLowerCase().includes(busquedaRealizada) || producto.description.toLowerCase().includes(busquedaRealizada));
    });
    document.getElementById("productos").innerHTML = "";
    content(jsonBusqueda);
    //console.log(document.getElementById("buscar").value);
})

function seleccionarProducto(valorProducto) {
    localStorage.setItem("ProductoSeleccionado", valorProducto)
}