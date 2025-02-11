// Funci�n para obtener los par�metros de la URL
function getURLParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Funci�n para actualizar el contenido dependiendo de la fuente
function actualizarContenido() {
    var source = getURLParameter('utm_source'); // obtiene el parametro de URL
    var title = document.getElementById("hero-title"); //obtencion del elemento por su id
    var description = document.getElementById("hero-description");//obtencion del elemento por su id

    //Condicional <--POSIBLE SWITCH ?-->
    if (source === "google") {
        title.textContent = "�Bienvenido desde Google! Gestion� las cajas de tu constructora con WhatsApp";
        description.textContent = "Gracias por visitar nuestro sitio desde Google. Registr� los ingresos y egresos de tus obras a trav�s de WhatsApp y visualiz� en tiempo real tus costos totales en Google Sheets.";
    } else if (source === "facebook") {
        title.textContent = "�Bienvenido desde Facebook! Gestion� las cajas de tu constructora con WhatsApp";
        description.textContent = "Gracias por visitar nuestro sitio desde Facebook. Registr� los ingresos y egresos de tus obras a trav�s de WhatsApp y visualiz� en tiempo real tus costos totales en Google Sheets.";
    }
}

// Metodo de modificacion de mensaje automatico de Whatsapp segun Fuente origen
function actualizarEnlaceWhatsApp() {
    var source = getURLParameter('utm_source'); // Obtener el origen de la URL
    var botonWhatsApp = document.getElementById("proba-sorby");

    if (botonWhatsApp) {
        var baseURL = "https://api.whatsapp.com/send?phone=5491128233360&text=";
        var mensajePredeterminado = "Sorby, quiero comenzar"; // Mensaje por defecto

        // Personalizar el mensaje seg�n el origen
        if (source === "google") {
            mensajePredeterminado = "Hola, vengo de Google, quiero saber m�s sobre Sorby!";
        } else if (source === "facebook") {
            mensajePredeterminado = "�Hola! Vi Sorby en Facebook y quiero m�s info.";
        }

        // Actualizar el enlace del bot�n
        botonWhatsApp.href = baseURL + encodeURIComponent(mensajePredeterminado);
    }
}

// El documento al terminar de cargar llamara estas funciones: �Posible conflicto con otros scripts!
document.addEventListener("DOMContentLoaded", function () {
    actualizarContenido();
    actualizarEnlaceWhatsApp();
});