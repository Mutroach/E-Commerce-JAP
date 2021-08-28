let precioMinimo = "";
let precioMaximo = "";
let jsonData = "";

fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(data => {
        jsonData = data;
    })

function content(){
    let htmlContent = "";

    for(let i = 0; i < jsonData.length; i++){
        let product = jsonData[i];

        htmlContent = 
        `<div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                    
                        <small class="text-muted">` + product.currency + ` `+ product.cost +  `</small>
                    </div>
                    <div><h5>` + product.description + `</h5></div>
                </div>
            </div>
        </div>`;
        
        if(product.cost >= precioMinimo && product.cost <= precioMaximo) {
            document.getElementById("productos").innerHTML += htmlContent;
        }
        else if(precioMinimo === "" && precioMaximo === ""){
            document.getElementById("productos").innerHTML += htmlContent;
        }
    }
    console.log(precioMinimo);
    console.log(precioMaximo);
}

document.getElementById("filtroPrecioBtn").onclick = function() {
    document.getElementById("productos").innerHTML = "";
    precioMinimo = document.getElementById("minimo").value;
    precioMaximo = document.getElementById("maximo").value;
    content();
}
