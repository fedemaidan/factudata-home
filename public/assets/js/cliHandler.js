document.addEventListener("DOMContentLoaded", () => {
        console.log("DOM completamente cargado");

    const form = document.getElementById("cliente-form");
    const enviarFormularioButton = document.getElementById("enviarFormulario");

    if (!enviarFormularioButton || !form) {
        console.error("Formulario o botón no encontrados");
    return;
    }

    enviarFormularioButton.addEventListener("click", async (e) => {
        e.preventDefault();

    const telefono = document.getElementById("telefono").value.trim();
    const mail = document.getElementById("mail").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");

    const datos = {
        telefono,
        mail,
        nombre,
        fbclid
    };

    console.log("Enviando datos a la API:", datos);

    try {
            const response = await fetch("http://localhost:3000/api/CliFormPag", {
        method: "POST",
    headers: {
        "Content-Type": "application/json"
                },
    body: JSON.stringify(datos)
            });

    if (response.ok) {
        console.log("Formulario enviado correctamente");
    form.reset();

    // Obtener mensaje de campaña
    const mensaje = obtenerMensajeWhatsApp();
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=5491128233360&text=${encodeURIComponent(mensaje)}`;
    window.location.href = urlWhatsApp;
            } else {
                const errorText = await response.text();
    console.error("Error al enviar el formulario:", errorText);
    alert("Hubo un error al enviar tus datos.");
            }
        } catch (error) {
        console.error("Error en la conexión con la API:", error);
    alert("No se pudo conectar con el servidor.");
        }
    });
});

    // Función para obtener parámetros de URL
function getURLParameter(name)
{
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

    // Función que retorna el mensaje predeterminado según campaña
function obtenerMensajeWhatsApp()
{
    const campaign = getURLParameter('utm_campaign') || "default";
    const mensajes = {
        "Sorby_Leads_Search_NB": "Hola, quiero probar Sorby",
    "Sorby_Leads_Search_Brand": "Hola, quiero probar Sorby.",
    "6617261256854": "Hola, quiero probar SorbyData",
    "default": "Hola, quiero conocer Sorby."
    };
    return mensajes[campaign] || mensajes["default"];
}
