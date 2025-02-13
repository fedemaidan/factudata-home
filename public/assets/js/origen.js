// Funci�n para obtener los par�metros de la URL
function getURLParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Matriz de mensajes [source][campaign]  ==> IMPORTANTE: si bien no es obligatorio la cantidad de campa�as por sources si lo es que exista un mensaje "default" para evitar problemas.
const mensajes = {
    "google": {
        "default": "�Bienvenido desde Google! Gestion� las cajas de tu constructora con WhatsApp",
        "Sorby_Leads_Search_NB": "�Bienvenido desde Google! Descubr� c�mo gestionar mejor tu negocio",
        "Sorby_Leads_Search_Brand": "�Bienvenido desde Google! Te ayudamos a mejorar tus finanzas."
    },
    "Meta": {
        "default": "�Bienvenido desde Facebook! Gestion� las cajas de tu constructora con WhatsApp",
        "6617261256854": "�Hola desde Facebook Ads! Sorby tiene la mejor soluci�n para tu constructora.",
        "campa�a2": "�Te vimos en Facebook! Descubre c�mo Sorby puede ayudarte."
    },
    "instagram": {
        "default": "�Bienvenido desde Instagram! Gestion� las cajas de tu constructora con WhatsApp",
        "campa�a1": "�Hola desde Instagram Ads! Te mostramos c�mo mejorar tu negocio.",
        "campa�a2": "�Viste Sorby en Instagram! Descubre c�mo podemos ayudarte."
    }
};

// Funci�n para actualizar el contenido dependiendo de la fuente y campa�a 
function actualizarContenido() {
    var source = getURLParameter('utm_source') || "default"; //Si estos son nulos procede a asignar default para evitar conflictos
    var campaign = getURLParameter('utm_campaign') || "default";//

    var title = document.getElementById("hero-title"); //Referencia al sector del body a modificar por su ID
    var description = document.getElementById("hero-description");//

    // Determinar mensaje seg�n source y campaign (Explicacion debajo)
    var mensaje = (mensajes[source] && mensajes[source][campaign]) ? mensajes[source][campaign] : (mensajes[source] ? mensajes[source]["default"] : "�Bienvenido! Gestion� tu negocio con WhatsApp.");
    //este es el mas complejo
    /*
    1ra Condicion: mensajes[source] && mensajes[source][campaign]) => �hay una fuente (source) y dentro de ella la campa�a (campaign) con los parametros de ingresados ?
    2da condicion: mensajes[source] ? mensajes[source]["default"] : "�Bienvenido! Gestion� tu negocio con WhatsApp."; => Verifica solo la fuente y la campa�a utiliza el default, de no encontrar ni siquiera el source usara el mensaje predeterminado.
    */

    // Actualizar contenido
    if (title) title.textContent = mensaje;
    if (description) description.textContent = "Gracias por visitar nuestro sitio. Registr� los ingresos y egresos de tus obras a trav�s de WhatsApp y visualiz� en tiempo real tus costos en Google Sheets.";
}

// Funci�n para actualizar el enlace de WhatsApp
function actualizarEnlaceWhatsApp() {
    var source = getURLParameter('utm_source') || "default";
    var campaign = getURLParameter('utm_campaign') || "default";
    var botonWhatsApp = document.getElementById("proba-sorby");

    if (botonWhatsApp) {
        var baseURL = "https://api.whatsapp.com/send?phone=5491128233360&text=";
        var mensajePredeterminado = "Hola, quiero empezar con Sorby";

        switch (source) {
            case "google":
                mensajePredeterminado = "Hola, vengo de Google (" + campaign + "), quiero saber m�s sobre Sorby!";
                break;
            case "Meta":
                mensajePredeterminado = "�Hola! Vi Sorby en Facebook (" + campaign + ") y quiero m�s info.";
                break;
            case "instagram":
                mensajePredeterminado = "Hola, llegu� desde Instagram (" + campaign + "), �me cuentas m�s?";
                break;
            default:
                mensajePredeterminado = "Hola, quiero conocer Sorby.";
        }
        botonWhatsApp.href = baseURL + encodeURIComponent(mensajePredeterminado);
    }
}

// Funci�n para enviar datos a medida que llegan (pendiente de implementaci�n final)
function enviarDatos(source, campaign) {
    console.log("Enviando datos:", { source, campaign });
    // Aqu� puedes agregar el env�o a un servidor o almacenamiento
}

// Ejecutar funciones al cargar el documento
document.addEventListener("DOMContentLoaded", function () {
    var source = getURLParameter('utm_source') || "default";
    var campaign = getURLParameter('utm_campaign') || "default";

    actualizarContenido();
    actualizarEnlaceWhatsApp();
    enviarDatos(source, campaign);
});