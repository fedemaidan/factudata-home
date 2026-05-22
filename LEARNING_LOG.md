# 📓 Learning log — sorbydata.com

Registro de hallazgos observados al usar / mirar la landing y app.
**Solo acumular**, no implementar hasta que se decida priorizar.

Para cada hallazgo:
- **Severidad**: Alta / Media / Baja
- **Página / Dispositivo**: dónde se observó
- **Observación**: qué se ve
- **Hipótesis de impacto**: por qué importa para conversión
- **Posibles soluciones**: opciones a discutir, sin compromiso

---

## #1 — ✅ IMPLEMENTADO — CTA principal NO está above-the-fold en mobile
- **Severidad:** Alta
- **Página:** `/` (home)
- **Dispositivo:** Mobile
- **Observación:** Al cargar la home en mobile, lo único visible es el headline ("¿Tus gastos están desordenados?") + ilustración del muchacho. El botón **"Agendá gratis"** queda debajo del fold — el usuario tiene que scrollear para verlo.
- **Hipótesis de impacto:** Usuarios impacientes o de paso (clicks de ad) pueden salir sin ver que existe un CTA. Podría explicar parte del gap `visitas → abrioModal`.
- **Posibles soluciones:**
  - Reducir tamaño del headline en mobile
  - Achicar / recortar la ilustración
  - Mover el botón "Agendá gratis" arriba del headline o al lado
  - CTA sticky en header mobile siempre visible
  - Reordenar: headline + CTA arriba, subtítulo y arte después
- **Solución aplicada (22-may-2026):** CSS-only en `public/css/custom.css` dentro del breakpoint `@media (max-width: 768px)`:
  - **Imagen del personaje (`.hero-img-mobile`) ocultada en mobile** — no aporta a conversión, ocupa fold valioso
  - h1 reducido de 4.3em → 3.8em, line-height 1.1 (cabe mejor sin imagen)
  - p reducido de 1.8em → 1.6em
  - Más margen entre texto y CTAs (margin-top 18px) para respiración visual
- **Verificación local:** CTA Y top = 168px, bottom = 235px. Above-the-fold en iPhone SE viewport útil (568px) e iPhone 12 útil (740px), con margen.
- **Iteración previa descartada:** primero probamos reordenar con `order` y mantener la imagen achicada (170px). Quedaba apretado y el screenshot generó dudas. Sacar la imagen en mobile resultó más limpio.
- **KPI primario para validar:** `eligioSlot / visitasLanding` mobile, comparando 7 días pre vs 7 días post deploy. Objetivo: subir +20% relativo.
- **KPI secundario:** Heatmap del CTA "Agendá gratis" en home post-deploy.

## #2 — ✅ RESUELTO — Modal sí se ve en grabaciones (era falsa alarma)
- **Estado:** Resuelto.
- **Observación original:** En una grabación específica no se veía el modal abriéndose, hipótesis de bug Clarity / masking.
- **Realidad:** El modal SÍ se ve en otras grabaciones. La grabación inicial era simplemente de un visitante que no había clickeado "Agendar" (rebote rápido).
- **Aprendizaje:** No sacar conclusiones de una sola grabación. Antes de levantar hipótesis de bug, filtrar grabaciones por URL contiene `/agendar/` para validar con N>1.

---

## #3 — "¿No encontrás horario?" → WhatsApp es el escape route favorito
- **Severidad:** Alta
- **Página:** `/agendar/horario`
- **Dispositivo:** Mobile (todas las sesiones observadas)
- **Observación:** Analizando 8 grabaciones reales del 21-22 May, **3 de 8 (37%) hicieron click en "¿No encontrás horario? Contactanos por WhatsApp"** después de mirar los slots. Una llegó a clickear WhatsApp para irse del sitio.
- **Hipótesis de impacto:** El usuario ve los slots disponibles y NO le sirven (por horario AR-laboral, timezone, día específico, o sensación de "no hay nada para mí"). Encuentra el escape route y se va. Probablemente NO termina escribiendo al WhatsApp tampoco — sólo se va.
- **Posibles soluciones:**
  - **Mostrar horarios noche/finde** además del rango actual
  - **Quick action "Cualquier horario me sirve"** que salte el calendario y lleve directo al form (ya existe `elegirProximo`, pero está poco prominente arriba del calendar)
  - **Texto del fallback más amable** — actualmente dice "¿No encontrás horario?" que es un escape. Cambiarlo a "Prefiero que me llamen vos" abre otra puerta sin sentir fricción
  - **Permitir agendar a 2-3 semanas** — si los slots actuales son sólo próximos 5 días hábiles, agregar más días reduce el "no hay nada"
- **Próximo paso:** Mirar cuántos slots aparecen realmente en mobile y si la grilla se ve "vacía" o "llena". Validar si el endpoint `/api/agendar/slots` devuelve suficientes opciones.

---

## #4 — `/agendar/horario` tiene tiempos de carga >10s en mobile
- **Severidad:** Alta
- **Página:** `/agendar/horario`
- **Dispositivo:** Mobile (sesión `57e01j`)
- **Observación:** Una grabación reporta "tiempos de carga prolongados (más de 10 segundos)" al cargar el step de horario. Esto coincide con el momento en que se llama a `GET /api/agendar/slots`.
- **Hipótesis de impacto:** En mobile 4G la gente espera 3-5s antes de cerrar la pestaña. >10s es muerte segura. Esto explica también las sesiones donde "ocultaron la página" (cambiaron de app porque tardaba) — y la mayoría no vuelve.
- **Posibles soluciones:**
  - **Cachear `/api/agendar/slots`** server-side por 5-15 min (los slots no cambian tan rápido)
  - **Pre-cargar slots al abrir el modal** mientras el usuario mira el calendar (ya se hace en `abrirModalAgendar`, pero hay que verificar que se dispare antes del click)
  - **Endpoint más liviano** — verificar si está haciendo llamadas pesadas a Google Calendar API
  - **Skeleton loading visible** — ya existe pero verificar que se vea durante toda la carga
- **Próximo paso:** Medir el response time real de `/api/agendar/slots` desde mobile. Mirar logs del server. Si es >2s, optimizar.

---

## #5 — Form completado pero usuario hace "Cambiar horario" y se va
- **Severidad:** Media
- **Página:** `/agendar/datos`
- **Dispositivo:** Mobile (sesión `1wejg4z`)
- **Observación:** El usuario llenó campos del form, después clickeó "Cambiar horario" y abandonó. Reconsideró antes de finalizar.
- **Hipótesis de impacto:** Algo en el form lo hizo dudar (probablemente "Tu email *" obligatorio, o el horario que eligió originalmente no le servía y al volver atrás se desmotiva). El botón "Cambiar horario" preserva el form pero psicológicamente es un punto de fuga.
- **Posibles soluciones:**
  - **Mostrar slot elegido más prominente en el form** y permitir cambiarlo inline (sin volver al step anterior)
  - **Hacer email opcional** y aceptar sólo teléfono (riesgo: perder canal de contacto)
  - **Mostrar el calendario al costado del form en desktop**, en mobile como acordeón colapsable
  - **Persistir el form en localStorage** así si vuelve no pierde lo escrito
- **Próximo paso:** Decidir si email obligatorio es realmente necesario o si pueden contactarlo sólo con WhatsApp.

---

## #6 — Sesiones largas con "página oculta" prolongado = distracción mobile típica
- **Severidad:** Media (no actionable directo, contexto)
- **Páginas:** todas
- **Dispositivo:** Mobile
- **Observación:** Varias sesiones (48 min, 19 min, 14 min) tienen poca actividad de clicks. La gente abre el sitio, cambia de app, vuelve más tarde. Algunas vuelven al sitio desde OTRO click del mismo ad.
- **Hipótesis de impacto:** Es comportamiento normal en mobile — gente con multitarea. Pero refuerza que **la decisión de agendar tiene que ser RÁPIDA**: en los primeros 60s o se cae.
- **Posibles soluciones:**
  - **Acelerar el time-to-modal**: ya CTA above-the-fold (#1) + slots cacheados (#4)
  - **Notificación tipo "Tu horario está reservado por X minutos"** que cree urgencia, pero solo si los slots realmente compiten
  - **Email de retargeting** si el usuario dejó email pero no terminó (no aplica acá porque no llegan al form)
- **Próximo paso:** Ninguno inmediato. Tener en cuenta para todas las otras decisiones de UX.

---

## #7 — 100% del tráfico viene del mismo ad de Facebook
- **Severidad:** Alta (estratégico, no UX)
- **Observación:** Todas las 8 sesiones tienen `utm_campaign=6713158471654`, `utm_source=an`, `utm_medium=paid`, vienen de `l.facebook.com/`. Un solo ad creativo está trayendo TODO el tráfico medido.
- **Hipótesis de impacto:** Si ese ad está mal targeteado o promete algo que la landing no entrega, todo el funnel cae. La conversión de 0% no es necesariamente "la landing está rota" — puede ser "el ad trae gente equivocada".
- **Posibles soluciones (afuera del scope técnico):**
  - **Revisar el creative del ad**: ¿qué promete? ¿coincide con lo que ve en la landing?
  - **A/B test con otro audience** en Facebook Ads Manager
  - **Diversificar canales**: Google Ads search ("software gastos obra"), LinkedIn para arquitectos, orgánico, etc.
  - **Revisar el lead magnet implícito**: la gente que clickea en FB ad ¿busca "demo de software" o "info de cómo registrar gastos"?
- **Próximo paso:** Ver el creative del ad y compararlo con la propuesta de la landing.

---

## Patrones cruzados (resumen ejecutivo de las 8 sesiones)
- 8/8 sesiones mobile Android Chrome Argentina
- 8/8 desde el mismo ad de Facebook
- 0/8 completaron booking
- 3/8 (37%) clickearon "¿No encontrás horario?"
- 1/8 llegó al form y abandonó al cambiar horario
- 1/8 reportó carga >10s en `/agendar/horario`
- 4/8 tienen "página oculta" prolongada (distraídos / multitarea)

---

# 🎯 Potenciales mejoras (priorizadas)

Matriz **impacto vs esfuerzo**. Estimaciones a refinar según data real.

## 🚀 Quick wins (alto impacto, bajo esfuerzo)

### M1. CTA "Agendá gratis" above-the-fold en mobile
- **Vinculado a:** #1
- **Esfuerzo:** XS (CSS + reorder)
- **Impacto esperado:** +10-20% en `visita → abrió modal` en mobile
- **Acción:** Reducir headline a 1.5em mobile, achicar la ilustración a 30vh, o agregar CTA sticky en el nav mobile.

### M2. Cambiar copy del fallback de WhatsApp + jerarquía visual
- **Vinculado a:** #3
- **Esfuerzo:** XS-S (cambio de texto + jerarquía CSS)
- **Impacto esperado:** Convertir el 37% que se va a WhatsApp en leads ASAP que sí dejan contacto
- **Acción:** Reemplazar "¿No encontrás horario? Contactanos por WhatsApp" por **"Prefiero que me llamen ustedes"** + dispara el flow ASAP (que ya existe) en vez del wa.me directo.
- **Jerarquía visual (decisión a tomar):**
  - **Opción A (recomendada inicialmente):** calendar grande + fallback como botón **secundario** mediano debajo. Forzás a intentar el calendar pero das salida prolija. Preserva calidad de lead.
  - **Opción B (más agresivo):** dos CTAs igualados al inicio ("Elegir horario" vs "Que me llamen"). Más volumen, menor calidad.
  - **Opción C (radical):** WhatsApp/llamada como CTA principal, slot escondido. Solo si SDR tiene capacidad y conversión llamada→cliente es alta.
- **Variables clave para decidir entre A/B/C:**
  - Capacidad diaria de tu SDR
  - Show-up rate de los que agendan slot vs WhatsApp
  - Conversión final a cliente por canal (slot vs llamada)
- **Próximo paso:** Empezar con A. Cuando tengas 1-2 semanas de data, A/B testear contra B.

### M3. Hacer prominente "Tomar primer horario disponible"
- **Vinculado a:** #3
- **Esfuerzo:** XS (CSS)
- **Impacto esperado:** Bypassa el calendario para los indecisos
- **Acción:** Convertir el actual link tipo-link en un botón secundario grande encima del calendar. Texto: "🚀 Agendá en 1 click — primer horario disponible".

### M4. Cachear `/api/agendar/slots` en backend
- **Vinculado a:** #4
- **Esfuerzo:** S (10-15 min agregar cache en memoria con TTL 5 min)
- **Impacto esperado:** Si el endpoint hoy tarda >5s, bajar a <100ms. Reduce abandono masivo.
- **Acción:** Agregar `node-cache` o `lru-cache` en `agendarRoutes.js` con TTL 5 min. Invalidar al crear booking.

### M5. Mostrar más días en el calendario
- **Vinculado a:** #3
- **Esfuerzo:** S (cambiar lógica de `getAvailableSlots`)
- **Impacto esperado:** Reduce "no encuentro horario" — más opciones = más probable que encuentre
- **Acción:** En vez de próximos 5 días hábiles, mostrar próximos 10. Si Google Calendar lo permite, incluir tardes (17-19hs).

---

## 🧪 Mediano (alto impacto, esfuerzo medio)

### M6. Slot elegido editable inline en el form (no "Cambiar horario")
- **Vinculado a:** #5
- **Esfuerzo:** M (refactor del step 2)
- **Impacto esperado:** Evita el punto de fuga "Cambiar horario" → form vacío. Retiene la energía del usuario.
- **Acción:** En el step 2, el badge del horario ya seleccionado se vuelve clickeable y abre un mini-picker inline sin perder los datos del form.

### M7. Persistir form en localStorage
- **Vinculado a:** #5, #6
- **Esfuerzo:** S
- **Impacto esperado:** Si el usuario sale y vuelve (común en mobile distraído), encuentra sus datos pre-cargados. Sólo invitar a continuar.
- **Acción:** Guardar nombre/email/teléfono en localStorage on change. Al abrir el modal, si hay datos guardados, mostrar "¿Continuar como Juan?" arriba.

### M8. Reducir campos obligatorios del form
- **Vinculado a:** #5
- **Esfuerzo:** XS (cambiar required a opcional + ajustar backend)
- **Impacto esperado:** ↑ submits — menos campos = menos fricción
- **Acción:** Probar dos variantes:
  - **Variante A**: Sólo nombre obligatorio. Email Y WhatsApp ambos opcionales pero al menos uno requerido.
  - **Variante B**: Sólo WhatsApp obligatorio. Nombre opcional, email opcional.
  - A/B testearlas. Si B convierte mejor, validar que el equipo SDR puede operar sólo con WhatsApp.

### M9. Mejorar copy del headline para matchear el ad
- **Vinculado a:** #7
- **Esfuerzo:** S (depende del ad)
- **Impacto esperado:** Reduce bounce. Headline coherente con la promesa del ad = menos fricción cognitiva.
- **Acción:** Mirar qué dice el ad de FB. Ajustar headline para repetir esas palabras clave (consistencia entre clic y landing).

### M10. Optimizar peso/render mobile
- **Vinculado a:** #4, #6
- **Esfuerzo:** M
- **Impacto esperado:** Mejor LCP/INP en mobile. Reduce sesiones que se ocultan por lentitud.
- **Acción:** Auditar con Lighthouse. Sospecho que jQuery + Bootstrap + carousel + Firebase init son pesados. Posible: lazy-load del carousel, defer Firebase analytics, sacar fuentes externas.

---

## 🎯 Estratégico (alto impacto, alto esfuerzo)

### M11. A/B test de canales de tráfico
- **Vinculado a:** #7
- **Esfuerzo:** L (campañas nuevas, presupuesto)
- **Impacto esperado:** Diversifica el riesgo. Si Google search convierte 5x mejor por intent, descubrirlo es game-changer.
- **Acción:** Crear campaña Google Search con keywords "registro gastos obra", "control caja constructora", "software pyme construcción". Comparar CPL.

### M12. Retargeting de los que abandonaron
- **Vinculado a:** #5, #6
- **Esfuerzo:** M (FB pixel ya existe, configurar audiencias)
- **Impacto esperado:** Recuperar leads que vieron el form pero no agendaron
- **Acción:** Crear audiencia FB "vio /agendar/datos pero NO /agendar/listo" (ya tenemos los eventos). Servirles un ad distinto: testimonios, video corto del producto, descuento, etc.

### M13. Demo asincrónica grabada como alternativa
- **Vinculado a:** #3
- **Esfuerzo:** M (grabar video + página dedicada)
- **Impacto esperado:** Captura a los que no quieren hablar con un humano YA
- **Acción:** Botón secundario: "Mirar demo de 3 min sin agendar" → video Loom/YouTube. Pixel los marca para retargeting.

---

## 🔬 Experimentos / hipótesis a validar (no acción aún)

### E1. ¿La conversión es mejor un viernes laboral vs un sábado?
- Mirar agendarons por día de la semana → si hay un patrón claro, ajustar pauta publicitaria a esos días.

### E2. ¿Los usuarios que dejan teléfono opcional luego no contestan WhatsApp?
- Cruce: ContactoSDR.telefono vs reuniones efectivamente realizadas. Si los que dejaron teléfono no convierten en reunión real, M8 variante B (solo WA) no sirve.

### E3. ¿La pestaña "Planes" antes que "Agendá gratis" genera más conversión?
- Algunos usuarios necesitan validar precio antes de hablar. ¿Ven la sección Planes? Mirar heatmap.

---

## 📋 Pendientes técnicos no-bloqueantes
- Limpiar Meta Pixel duplicado (warning detectado en repro Chrome)
- Cancelar bookings de prueba "Test Claude" y "Test Mobile" del 22-may
- Deployar tracking granular + cambios backend + dashboard

---
