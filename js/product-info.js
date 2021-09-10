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

    document.getElementById("comentarios").innerHTML += `
                <div> <b>Usuario: ` + localStorage.getItem("email") + ` </b></div>
                <div> "` + document.getElementById("comentarioRealizado").value + `" </div>
                <div> Puntuación: te la debo </div>
                <div> Comentario realizado en ` + fechaYhora + `</div>
                <br>`

    document.getElementById("comentarioRealizado").value = ""
}