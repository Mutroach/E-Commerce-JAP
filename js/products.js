let precioMinimo = "";
let precioMaximo = "";
let jsonData = "";
function sortPrecioAscendente(){ jsonData.sort((item1, item2) => item1.cost - item2.cost)};
function sortPrecioDescendente(){ jsonData.sort((item1, item2) => item2.cost - item1.cost)};
function sortRelevancia(){ jsonData.sort((item1, item2) => item2.soldCount - item1.soldCount)};

fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        //sortPrecioAscendente();
        content(jsonData);
    })

function content(jsonParametro){
    let htmlContent = "";
   
    for(let i = 0; i < jsonParametro.length; i++){
        let product = jsonParametro[i];

        htmlContent = 
        `<div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                    
                        <small class="text-muted"> Precio: ` + product.currency + ` `+ product.cost +  ` <br> Cantidad de vendidos: ` + product.soldCount + `</small>
                    </div>
                    <div><h5>` + product.description + `</h5></div>
                </div>
            </div>
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
    content(jsonData);
}

document.getElementById("filtroAscendenteBtn").onclick = function() {
    document.getElementById("productos").innerHTML = "";
    sortPrecioAscendente();
    content(jsonData);
}

document.getElementById("filtroDescendenteBtn").onclick = function() {
    document.getElementById("productos").innerHTML = "";
    sortPrecioDescendente();
    content(jsonData);
}

document.getElementById("filtroRelevanciaBtn").onclick = function() {
    document.getElementById("productos").innerHTML = "";
    sortRelevancia();
    content(jsonData);
}

document.getElementById("buscar").addEventListener("keyup", (event) => {
    //let busquedaRealizada = event.key;
    let busquedaRealizada = document.getElementById("buscar").value.toLowerCase();
    let jsonBusqueda = jsonData.filter((producto) => {
        return (producto.name.toLowerCase().includes(busquedaRealizada) || producto.description.toLowerCase().includes(busquedaRealizada));
    });
    document.getElementById("productos").innerHTML = "";
    content(jsonBusqueda);
    //console.log(document.getElementById("buscar").value);
})