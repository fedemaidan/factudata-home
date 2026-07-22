# Manuales de uso · Sorby

Sección pública de documentación: `sorbydata.com/manuales/`

## Cómo publicar un manual nuevo

Tres pasos, sin build ni dependencias.

### 1. Creá la carpeta y el HTML

```
public/manuales/<slug>/index.html
```

Usá `control-obra/index.html` como plantilla. La URL sale sola:
`sorbydata.com/manuales/<slug>/` — no hace falta tocar `firebase.json`
porque cada manual es una carpeta con su `index.html`.

En el `<head>` van siempre estas cuatro líneas (ajustá el título y la
descripción, que son las que salen en Google):

```html
<link href="https://fonts.cdnfonts.com/css/codec-cold" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/manual.css">
<script src="../assets/manual.js"></script>   <!-- al final del body -->
```

### 2. Agregalo al manifiesto

En `assets/manuales.js`, sumá una entrada:

```js
{
  area: "Finanzas",              // agrupador del hub
  titulo: "Caja chica",
  resumen: "Una línea: qué resuelve.",
  slug: "caja-chica",            // null = se muestra "En preparación"
  icono: S.arcos                 // una de las formas de marca
}
```

### 3. Sumalo al sitemap

En `public/sitemap.xml`, agregá su `<url>`.

## Imágenes

Van en `img/<slug>/` como JPG de **1280px de ancho, calidad ~72**
(pesan 40–80 KB cada una). Siempre con `loading="lazy"` y con `width`
y `height` puestos, para que no salte el layout al cargar.

```
img/control-obra/ejecucion.jpg
```

> Las capturas son públicas: usá siempre una obra de demo, nunca datos
> de un cliente real.

## Componentes disponibles

Todos salen de `assets/manual.css` + `assets/manual.js`. Se activan solos
si el HTML los incluye:

| Componente | Cómo se usa |
|---|---|
| Índice con scrollspy | `<nav class="toc">` con links `#seccion` |
| Pestañas | `.tab[data-p="p1"]` + `.panel#p1` |
| Flujo de estados | `.flow[data-flow="x"]` + `#d-x` + datos en `<script type="application/json" id="flujos">` |
| Calculadora de margen | inputs `#c1`–`#c4`, salidas `#o1`–`#o5` |
| Glosario con buscador | `#q` + `#glos .term` + `#sin` |
| Acordeón | `<details><summary>` |
| Aviso | `.nota`, `.nota.ok`, `.nota.warn` |
| Tarjetas | `.cards` + `.card` |
| Figura | `<figure><img><figcaption>` |
| Tabla | `.tabla-wrap` + `<table>` |

## Marca

Paleta y tipografía salen del Manual de Marca y ya están en
`assets/manual.css`:

- **Navy** `#1E4469` · **Celeste** `#23B5D3` · **Teal** `#0097B2` ·
  **Verde** `#2DC197` · **Gris** `#F6F6F6`
- Títulos en **Codec Cold**, cuerpo en **Quicksand**
- El documento es **siempre claro**: el navy se reserva para la portada
  y el pie. No hay modo oscuro, es deliberado.
- Único color fuera de paleta: un rojo funcional (`--bad`) para estados
  de error y sobrecosto, porque la paleta no tiene un color negativo.

## Tono

Primera persona del plural, cercano y concreto: *"te ayudamos a…"*,
*"te avisamos cuando…"*, *"lo calculamos nosotros"*. Le hablamos a
alguien que está en obra, no en una oficina.

## Probar en local

```bash
cd home-oficial
npx firebase serve --only hosting
# o, sin firebase:
cd public && python3 -m http.server 8080
```

Y abrí `http://localhost:8080/manuales/`.
