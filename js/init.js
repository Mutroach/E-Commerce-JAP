const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.getElementsByName("infoUsuario")[0].innerHTML = localStorage.getItem("email");
document.getElementById("ultimoAcceso").innerHTML = ` Últ. acceso: ` + localStorage.getItem("fechaYhora");

function cerrarSesion() {
  localStorage.clear("email");
}

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