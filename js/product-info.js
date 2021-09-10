fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(data => {

    document.getElementById("cuerpo").innerHTML = 
        `<img style="width: 450px"; src="` + data.images[0] + `" alt="` + data.description + `>
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1"><b>`+ data.name +`</b></h4>
            <h5> Precio: ` + data.currency + ` `+ data.cost +  ` <br> Cantidad de vendidos: ` + data.soldCount + ` <br> Categoría: ` + data.category + `</h5>
        </div>
        <div><h5 style="text-align: justify;">` + data.description + `</h5></div>`;
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
    let hoy = new Date();
    let fecha = hoy.getFullYear() + "-" + (hoy.getMonth()+1) + "-" + hoy.getDate();
    let hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    let fechaYhora = fecha + " " + hora;
    var starsChecked = '<span class="fa fa-star checked"></span>';
    var starsUnchecked = '<span class="fa fa-star"></span>';

    if(document.getElementById("comentarioRealizado").value != "" && valorEstrella != "") {
        document.getElementById("comentarios").innerHTML += `
                <div> <b>Usuario: ` + localStorage.getItem("email") + ` </b></div>
                <div> "` + document.getElementById("comentarioRealizado").value + `" </div>
                <div> Puntuación: ` + starsChecked.repeat(valorEstrella) + starsUnchecked.repeat(5-valorEstrella) + `</div>
                <div> Comentario realizado en ` + fechaYhora + `</div>
                <br>`;

    document.getElementById("comentarioRealizado").value = "";
    document.getElementById("error").innerHTML = "";
    document.getElementsByName("estrellas")[0].checked = false;
    document.getElementsByName("estrellas")[1].checked = false;
    document.getElementsByName("estrellas")[2].checked = false;
    document.getElementsByName("estrellas")[3].checked = false;
    document.getElementsByName("estrellas")[4].checked = false;
    valorEstrella = "";
    }
    else {
        document.getElementById("error").innerHTML = `<p style="color:red;">Debes ingresar un comentario y seleccionar una puntuación</p>`;
    }
}

let valorEstrella = "";

function puntuacionEstrella(estrella) {
    valorEstrella = estrella;
}