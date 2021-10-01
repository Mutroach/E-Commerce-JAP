fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(data => {

    productosRelacionados = data.relatedProducts;

    document.getElementById("cuerpo").innerHTML = `
        <div class="list-group-item list-group-item">
            <div class="row">
                <div class="col">
                    <img src="` + data.images[0] + `" alt="` + data.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div style="display:flex; justify-content: space-between;">
                        <small class="text-muted"> Categoría: ` + data.category + `</small>
                        <small class="text-muted">` + data.soldCount + ` vendidos </small>
                    </div>
                    <h2 class="mb-1">`+ data.name +`</h4>
                    <h5>` + data.currency + ` `+ data.cost +  `</h5>
                    <div>
                        <h5 style="text-align:justify;">` + data.description + `</h5>
                    </div>
                </div>
            </div>
        </div>`;
    })

fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(response => response.json())
    .then(data => {

        var starsChecked = '<span class="fa fa-star checked"></span>';
        var starsUnchecked = '<span class="fa fa-star"></span>';

        for(let i = 0; i < data.length; i++){
            let comentario = data[i];

            document.getElementById("comentarios").innerHTML += `
                <div> <b>Usuario: ` + comentario.user + ` </b></div>
                <div> "` + comentario.description + `" </div>
                <div> Puntuación: ` + starsChecked.repeat(comentario.score) + starsUnchecked.repeat(5-comentario.score) + `</div>
                <div> Fecha del comentario: ` + comentario.dateTime + `</div>
                <br>`
        }
})

document.getElementById("enviarComentario").onclick = function() {

    var starsChecked = '<span class="fa fa-star checked"></span>';
    var starsUnchecked = '<span class="fa fa-star"></span>';

    if(document.getElementById("comentarioRealizado").value != "" && valorEstrella != "") {
        document.getElementById("comentarios").innerHTML += `
                <div> <b>Usuario: ` + localStorage.getItem("email") + ` </b></div>
                <div> "` + document.getElementById("comentarioRealizado").value + `" </div>
                <div> Puntuación: ` + starsChecked.repeat(valorEstrella) + starsUnchecked.repeat(5-valorEstrella) + `</div>
                <div> Fecha del comentario: ` + fechaYhora() + `</div>
                <br>`;

    document.getElementById("comentarioRealizado").value = "";
    document.getElementById("error").innerHTML = "";
    document.getElementsByName("estrellas").forEach(element => { element.checked = false; });
    valorEstrella = "";
    }
    
    else {
        document.getElementById("error").innerHTML = `<p style="color:red;">Debes ingresar un comentario y seleccionar una puntuación</p>`;
    }
}

let valorEstrella = "";
function puntuacionEstrella(estrella) { valorEstrella = estrella; }

function fechaYhora() {
    let hoy = new Date();
    let day = (hoy.getDate()).toString();
    let month = (hoy.getMonth()+1).toString();
    let fecha = hoy.getFullYear() + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
    let hora = (hoy.getHours()).toString();
    let minutos = (hoy.getMinutes()).toString();
    let segundos = (hoy.getSeconds()).toString();
    let horaCompleta = hora.padStart(2, "0") + ":" + minutos.padStart(2, "0") + ":" + segundos.padStart(2, "0");
    let fechaYhora = fecha + " " + horaCompleta;

    return fechaYhora;
}

var productosRelacionados = "";
var productsJsonData = "";

fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(data => {
        productsJsonData = data;
    })

function carrousel() {
    document.getElementById("carrousel").innerHTML = `
        <h4 class="mb-1"> Productos relacionados </h4>
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
            <img class="d-block w-100" src="`+ productsJsonData[productosRelacionados[0]].imgSrc +`" data-src="holder.js/900x400?theme=social" data-holder-rendered="true" style="width: 100px; height: auto;">
    
            <div class="carousel-caption d-none d-md-block">
                <h5>` + productsJsonData[productosRelacionados[0]].name + `</h5>
            </div>
            </div>
            <div class="carousel-item">
            <img class="d-block w-100" src="`+ productsJsonData[productosRelacionados[1]].imgSrc +`" data-src="holder.js/900x400?theme=industrial" data-holder-rendered="true" style="width: 100px; height: auto;">
    
            <div class="carousel-caption d-none d-md-block">
                <h5>` + productsJsonData[productosRelacionados[1]].name + `</h5>
            </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>`
}



setTimeout(() => {
    carrousel();
}, 500);
