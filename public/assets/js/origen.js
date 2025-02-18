// Función para obtener los parámetros de la URL
function getURLParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Matriz de mensajes
const mensajes = {
    "Sorby_Leads_Search_NB": {
        "titulo": "Calculá materiales para la construcción en 1 minuto",
        "descripcion": "Obtén una lista precisa de materiales con precios actualizados y optimiza tu presupuesto con WhatsApp."
    },
    "Sorby_Leads_Search_Brand": {
        "titulo": "Gestiona tus obras con WhatsApp y Google Sheets",
        "descripcion": "Registra los ingresos y egresos de tus obras a través de WhatsApp y visualiza en tiempo real tus costos totales en Google Sheets."
    },
    "6617261256854": {
        "titulo": "Gestiona tus obras con WhatsApp y Google Sheets",
        "descripcion": "Registra y administra los movimientos de tus obras con facilidad y consulta los costos en tiempo real."
    },
    "default": {
        "titulo": "Gestiona tus obras con WhatsApp y Google Sheets",
        "descripcion": "Utiliza WhatsApp para registrar ingresos y egresos y consulta en Google Sheets los costos actualizados."
    }
};

function actualizarContenido() {
    var campaign = getURLParameter('utm_campaign') || "default";
    var title = document.getElementById("hero-title");
    var description = document.getElementById("hero-description");

    var mensaje = mensajes[campaign] || mensajes["default"];

    if (title) title.textContent = mensaje.titulo;
    if (description) description.textContent = mensaje.descripcion;
}

function actualizarEnlaceWhatsApp() {
    var campaign = getURLParameter('utm_campaign') || "default";
    var baseURL = "https://api.whatsapp.com/send?phone=5491128233360&text=";
    var mensajePredeterminado = "Hola, quiero empezar con Sorby";

    switch (campaign) {
        case "Sorby_Leads_Search_NB":
            mensajePredeterminado = "Hola, quiero probar Sorby";
            break;
        case "Sorby_Leads_Search_Brand":
            mensajePredeterminado = "Hola, quiero probar Sorby.";
            break;
        case "6617261256854":
            mensajePredeterminado = "Hola, quiero probar SorbyData";
            break;
        default:
            mensajePredeterminado = "Hola, quiero conocer Sorby.";
    }

    var enlacesWhatsApp = [
        document.getElementById("proba-sorby"),
        document.getElementById("registrateBtn"),
        document.querySelector(".whatsapp_float")
    ];

    enlacesWhatsApp.forEach(function (enlace) {
        if (enlace) {
            enlace.href = baseURL + encodeURIComponent(mensajePredeterminado);
        }
    });
}

function enviarDatos(campaign) {
    console.log("Enviando datos:", { campaign });
}

document.addEventListener("DOMContentLoaded", function () {
    var campaign = getURLParameter('utm_campaign') || "default";
    actualizarContenido();
    actualizarEnlaceWhatsApp();
    enviarDatos(campaign);
});




//Gracias por visitar nuestro sitio. Registrá los ingresos y egresos de tus obras a través de WhatsApp y visualizá en tiempo real tus costos en Google Sheets.
// Actualizar contenido //Calcula los materiales y sus costos de tus obras utilizando solo whatsapp