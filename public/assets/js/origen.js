// Función para obtener los parámetros de la URL
function getURLParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Matriz de mensajes [source][campaign]  ==> IMPORTANTE: si bien no es obligatorio la cantidad de campañas por sources si lo es que exista un mensaje "default" para evitar problemas.
const mensajes = {
    "google": {
        "default": "¡Bienvenido desde Google! Gestioná las cajas de tu constructora con WhatsApp",
        "Sorby_Leads_Search_NB": "¡Bienvenido desde Google! Descubrí cómo gestionar mejor tu negocio",
        "Sorby_Leads_Search_Brand": "¡Bienvenido desde Google! Te ayudamos a mejorar tus finanzas."
    },
    "Meta": {
        "default": "¡Bienvenido desde Facebook! Gestioná las cajas de tu constructora con WhatsApp",
        "6617261256854": "¡Hola desde Facebook Ads! Sorby tiene la mejor solución para tu constructora.",
        "campaña2": "¡Te vimos en Facebook! Descubre cómo Sorby puede ayudarte."
    },
    "instagram": {
        "default": "¡Bienvenido desde Instagram! Gestioná las cajas de tu constructora con WhatsApp",
        "campaña1": "¡Hola desde Instagram Ads! Te mostramos cómo mejorar tu negocio.",
        "campaña2": "¡Viste Sorby en Instagram! Descubre cómo podemos ayudarte."
    }
};

// Función para actualizar el contenido dependiendo de la fuente y campaña 
function actualizarContenido() {
    var source = getURLParameter('utm_source') || "default"; //Si estos son nulos procede a asignar default para evitar conflictos
    var campaign = getURLParameter('utm_campaign') || "default";//

    var title = document.getElementById("hero-title"); //Referencia al sector del body a modificar por su ID
    var description = document.getElementById("hero-description");//

    // Determinar mensaje según source y campaign (Explicacion debajo)
    var mensaje = (mensajes[source] && mensajes[source][campaign]) ? mensajes[source][campaign] : (mensajes[source] ? mensajes[source]["default"] : "¡Bienvenido! Gestioná tu negocio con WhatsApp.");
    //este es el mas complejo
    /*
    1ra Condicion: mensajes[source] && mensajes[source][campaign]) => ¿hay una fuente (source) y dentro de ella la campaña (campaign) con los parametros de ingresados ?
    2da condicion: mensajes[source] ? mensajes[source]["default"] : "¡Bienvenido! Gestioná tu negocio con WhatsApp."; => Verifica solo la fuente y la campaña utiliza el default, de no encontrar ni siquiera el source usara el mensaje predeterminado.
    */

    // Actualizar contenido
    if (title) title.textContent = mensaje;
    if (description) description.textContent = "Gracias por visitar nuestro sitio. Registrá los ingresos y egresos de tus obras a través de WhatsApp y visualizá en tiempo real tus costos en Google Sheets.";
}

// Función para actualizar el enlace de WhatsApp
function actualizarEnlaceWhatsApp() {
    var source = getURLParameter('utm_source') || "default";
    var campaign = getURLParameter('utm_campaign') || "default";
    var botonWhatsApp = document.getElementById("proba-sorby");

    if (botonWhatsApp) {
        var baseURL = "https://api.whatsapp.com/send?phone=5491128233360&text=";
        var mensajePredeterminado = "Hola, quiero empezar con Sorby";

        switch (source) {
            case "google":
                mensajePredeterminado = "Hola, vengo de Google (" + campaign + "), quiero saber más sobre Sorby!";
                break;
            case "Meta":
                mensajePredeterminado = "¡Hola! Vi Sorby en Facebook (" + campaign + ") y quiero más info.";
                break;
            case "instagram":
                mensajePredeterminado = "Hola, llegué desde Instagram (" + campaign + "), ¿me cuentas más?";
                break;
            default:
                mensajePredeterminado = "Hola, quiero conocer Sorby.";
        }
        botonWhatsApp.href = baseURL + encodeURIComponent(mensajePredeterminado);
    }
}

// Función para enviar datos a medida que llegan (pendiente de implementación final)
function enviarDatos(source, campaign) {
    console.log("Enviando datos:", { source, campaign });
    // Aquí puedes agregar el envío a un servidor o almacenamiento
}

// Ejecutar funciones al cargar el documento
document.addEventListener("DOMContentLoaded", function () {
    var source = getURLParameter('utm_source') || "default";
    var campaign = getURLParameter('utm_campaign') || "default";

    actualizarContenido();
    actualizarEnlaceWhatsApp();
    enviarDatos(source, campaign);
});