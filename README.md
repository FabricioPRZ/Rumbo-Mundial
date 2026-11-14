# Rumbo Mundial

Juego de mesa multijugador en español de México, con Next.js App Router, TypeScript estricto, Tailwind y Upstash Redis. Conserva los nombres y posiciones de los países del tablero de referencia aportado por el usuario, con ilustraciones SVG, billetes, casas, hoteles y textos de cartas creados en código. No muestra las fotografías ni utiliza logotipos o personajes del producto de referencia.

## Ejecutar el proyecto

Necesitas Node.js 22 y las credenciales de Redis que ya configuraste. No hay servidor adicional ni base SQL.

```sh
npm ci
cp .env.example .env.local
```

En `.env.local`, coloca el REST URL y REST TOKEN de Upstash:

```dotenv
UPSTASH_REDIS_REST_URL=https://TU_BASE.upstash.io
UPSTASH_REDIS_REST_TOKEN=TU_TOKEN
```

También se aceptan `KV_REST_API_URL` y `KV_REST_API_TOKEN`. No agregues `NEXT_PUBLIC_` a estas variables ni publiques `.env.local`.

```sh
npm run dev
```

Abre `http://localhost:3000`. Redis es indispensable para compartir salas en Vercel: las funciones serverless no conservan estado entre solicitudes. La aplicación no utiliza almacenamiento del servidor en memoria o archivos, WebSockets, Socket.io ni un proceso residente.

## Actualizar tu despliegue existente en Vercel

1. Sube los archivos modificados a la rama de producción de tu repositorio, normalmente `main`.
2. Vercel generará un despliegue automáticamente. Si subiste el proyecto con CLI, ejecuta `npx vercel --prod` desde esta carpeta.
3. Conserva las variables de Upstash en **Settings → Environment Variables**, habilitadas para Production. Si cambias variables, crea un nuevo despliegue para aplicarlas.
4. Abre la URL y **crea una sala nueva**. Las salas del tablero anterior se rechazan con un mensaje explícito para evitar mezclar países, posiciones y precios.

Las fotografías de referencia se conservan localmente en `public`, pero `.vercelignore` excluye sus seis carpetas del despliegue. No se cargan desde la interfaz. El proyecto no necesita esas fotos para compilar o funcionar. Los archivos de entrega también excluyen fotos y credenciales.

## Publicar por primera vez desde GitHub

Crea un repositorio vacío y ejecuta estos comandos, sustituyendo la URL por la tuya:

```sh
git init
git add .
git commit -m "Implementa Rumbo Mundial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/rumbo-mundial.git
git push -u origin main
```

En Vercel, importa el repositorio como proyecto Next.js. Usa la carpeta del proyecto como Root Directory. Desde Marketplace agrega o conecta Upstash Redis y comprueba que haya uno de los pares de variables admitidos. También puedes copiarlas manualmente desde Upstash. Habilítalas para Production y, si lo necesitas, Preview y Development. Ejecuta Deploy. No hace falta configurar otro backend.

## Aparecer en Google

La portada está preparada para búsquedas como **turista mundial online** y **jugar con amigos**: título y descripción, encabezado y contenido visible, datos estructurados del sitio, imagen para compartir, URL canónica, `robots.txt` y `sitemap.xml`. Las salas llevan `noindex` y no aparecen en el sitemap. Los despliegues Preview de Vercel y el servidor de desarrollo no permiten indexación. Esto no cambia las reglas ni el acceso a las partidas.

La dirección principal configurada es `https://rumbo-mundial-khaki.vercel.app/`. Si cambias de dominio, define `SITE_URL` en Vercel con la nueva URL pública y vuelve a desplegar. Usa siempre el dominio principal, no un enlace temporal de Preview. La configuración opcional es:

```dotenv
SITE_URL=https://rumbo-mundial-khaki.vercel.app
GOOGLE_SITE_VERIFICATION=
```

Después de desplegar:

1. Comprueba que la portada se abre sin iniciar sesión en Vercel y que funcionan [robots.txt](https://rumbo-mundial-khaki.vercel.app/robots.txt) y [sitemap.xml](https://rumbo-mundial-khaki.vercel.app/sitemap.xml).
2. Abre [Google Search Console](https://search.google.com/search-console), agrega una propiedad de **prefijo de URL** con `https://rumbo-mundial-khaki.vercel.app/` y elige la verificación por **etiqueta HTML**.
3. Copia únicamente el valor `content` de esa etiqueta en `GOOGLE_SITE_VERIFICATION` en las variables de Production de Vercel. Despliega de nuevo y pulsa **Verificar** en Search Console. La etiqueta de verificación es pública; no es una contraseña.
4. En **Sitemaps**, envía `sitemap.xml`. En **Inspección de URLs**, introduce la URL principal y solicita la indexación. Después consulta el rendimiento y las búsquedas reales en Search Console.

El código prepara el sitio, pero no registra automáticamente la propiedad en Search Console ni garantiza que Google lo indexe o lo coloque primero. Google no utiliza la etiqueta `meta keywords`; por eso las palabras clave se incorporan de forma natural al contenido y los títulos. Consulta la [guía oficial de SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). La indexación y los cambios de posición pueden tardar; no hay un plazo garantizado.

## Probar con amigos

1. Abre la página en dos perfiles distintos: dos navegadores o una ventana normal y otra privada.
2. Crea una sala; comparte el ID o el enlace. Cada participante elige nombre y color.
3. El anfitrión inicia. Cada jugador tira **un dado de salida**; el mayor comienza. Los empatados repiten.
4. Tira los dados y selecciona una casilla para abrir su título. Todos ven las tiradas, cartas y compras.
5. Compra seleccionando los billetes con un toque, o rechaza la propiedad para subastarla entre los demás. Rechazar te retira automáticamente: ya no aparecen controles de oferta para ti. Pasar una subasta tampoco mueve tu ficha. Las ofertas válidas se guardan en Redis; al terminar el plazo o retirarse los demás se adjudica automáticamente.
6. Refresca la página: debes seguir en tu mismo asiento. El token se conserva en localStorage. No compartas ese token ni borres los datos del navegador si quieres reconectarte.
7. Abre **Proponer trato**; el destinatario verá la propuesta y podrá aceptarla o rechazarla. Se puede negociar fuera del turno propio, excepto desde la cárcel o mientras haya un pago/subasta pendiente.
8. Completa un bloque y construye casas de forma pareja. Revisa la lista y cantidad de propiedades de los demás.
9. El turno termina automáticamente cuando se resuelven compras, pagos, subastas y elecciones. Si pasaste por Salida, el Banco abona el sueldo automáticamente al cerrar el turno. Los dobles habilitan otra tirada sin pulsar Continuar.
10. Cada tirada tiene **20 segundos**, contados después de las animaciones pendientes. Al vencer, el servidor salta el turno en la siguiente consulta; varios clientes no duplican el salto. La elección de salida también tiene límite. Las decisiones de compra, pago y deportación no se saltan por ese contador. Tras 90 segundos de inactividad, el anfitrión conserva sus opciones de moderación. Las subastas vencen por su propio plazo.

En móvil y tableta, la franja superior muestra tu saldo, casilla y acción pendiente: dado inicial, tirar dados, pagar una multa o cumplir espera. El cierre de turno es automático. No hace falta abrir «Mis opciones» para tirar. El tablero ajusta su escala al espacio restante; las propiedades siguen en paneles flotantes. La secuencia compartida es **dados → avión casilla por casilla → llegada → decisión**. Los avisos se cierran solos y no tienen botón Continuar; los paneles de compra, pago y tratos esperan su momento para no tapar el movimiento. Las animaciones respetan la preferencia de movimiento reducido.

En **Audio apagado → Activar audio** puedes encender la música original de fondo y los efectos compartidos de dados, compras, pagos, cartas, viajes y construcción, además de avisos de turno, tratos recibidos y final de partida. Hay volúmenes independientes de música y efectos (0–100%) y un botón **Silenciar todo** que conserva tus niveles. Las preferencias se guardan en este navegador, no afectan a tus amigos. El audio comienza tras una interacción, se pausa al ocultar la pestaña y libera sus recursos al salir de la sala. Se sintetiza con Web Audio: no descarga música, no necesita servicios externos y no usa canciones comerciales.

Para probar: abre la sala en dos navegadores, activa el audio en ambos, tira y compra; cada navegador debe oír los efectos al mostrar su escena. Cambia cada volumen, silencia todo, cambia de pestaña y vuelve, y refresca para comprobar las preferencias. La salida real de audio y los permisos del navegador deben comprobarse en el dispositivo.

## Chat de voz con micrófono

Cada participante puede abrir **Chat de voz → Activar micrófono y entrar** en la cabecera de la sala, desde el lobby o durante la partida. El navegador pide permiso de micrófono; no se solicita cámara. Hay un botón para silenciar/encender el micrófono, volumen independiente de voces, lista de participantes y botones para reconectar o salir. **Silenciar todo** corta tanto las voces recibidas como el envío de tu micrófono, además de música y efectos. Entrar a la conversación habilita el audio general; puedes bajar la música a cero si solo quieres hablar.

La voz usa WebRTC entre navegadores, con hasta seis participantes y STUN público de Cloudflare (`stun:stun.cloudflare.com:3478`), sin cuentas ni claves adicionales. Vercel y Redis coordinan las conexiones mediante `/api/rooms/[id]/voice`; **no transportan ni graban el audio**. Las señales SDP, que contienen datos de conexión, se almacenan temporalmente en una clave Redis separada con TTL de 120 s. Cada jugador solo recibe las señales dirigidas a su sesión. La presencia caduca tras 45 s sin respuesta. Los tokens existentes autorizan todas las solicitudes; nunca basta con conocer el ID de sala o enviar un playerId.

La negociación usa polling de aproximadamente un segundo únicamente mientras participas en la voz. Su contador de revisión y sus escrituras atómicas son independientes del juego. Esto añade solicitudes Redis cuando el chat está activo. Al salir, cerrar la sala, ocultar la pestaña o cambiar de página se detienen las pistas y conexiones. El micrófono no se activa automáticamente al refrescar ni al volver a la pestaña. Si el navegador impide escuchar, aparece **Tocar para escuchar voces**.

Para probar con amigos:

1. Despliega en Vercel y abre la misma sala en dos dispositivos, preferentemente con audífonos.
2. En ambos, pulsa **Activar micrófono y entrar**, permite el micrófono y espera a que el otro aparezca **En línea**.
3. Habla en ambas direcciones. Comprueba el botón de silencio, el volumen de voces y **Silenciar todo**.
4. Sal del chat y verifica que se apaga el indicador de uso del micrófono del navegador. Comprueba también cerrar la pestaña, cancelar mientras aparece el permiso y refrescar.
5. Prueba otra red (por ejemplo Wi-Fi y datos móviles). Si falla, usa **Reconectar**. Revisa los permisos del sitio si denegaste el micrófono.

El micrófono requiere HTTPS, que Vercel proporciona, o localhost en desarrollo. Algunas redes corporativas, cortafuegos o NAT restrictivos necesitan un **relay TURN**: STUN por sí solo no garantiza conexión en todas las redes. WebRTC explica esta limitación en su [documentación de conexiones](https://webrtc.org/getting-started/peer-connections); Cloudflare documenta su [STUN público](https://developers.cloudflare.com/realtime/turn/faq/).

El soporte TURN es opcional y ya está preparado. Si contratas o dispones de uno, configura en Vercel y vuelve a desplegar:

```dotenv
VOICE_TURN_URLS=turn:TU_HOST:3478,turns:TU_HOST:5349
VOICE_TURN_USERNAME=TU_USUARIO_TURN
VOICE_TURN_CREDENTIAL=TU_CREDENCIAL_TURN
```

Usa credenciales de cliente TURN con cuota/alcance limitados y mantenlas vigentes; no pongas una clave maestra del proveedor. Los participantes autenticados reciben estas credenciales porque el navegador las necesita para usar el relay. No se incluyen en el bundle público. Sin estas variables se usa únicamente STUN y conexión directa. No hace falta modificar las variables de Redis.

Las pruebas automatizadas validan permisos por token, aislamiento entre salas y destinatarios, concurrencia, caducidad, limpieza al cancelar permisos y silenciamiento de pistas. Una llamada real entre distintos dispositivos/redes todavía debe verificarse en el despliegue: este entorno no dispone de micrófonos ni de una sesión de navegador para comprobar audio real.

## Reglas implementadas

- 40 casillas, 24 países en ocho bloques, cuatro aerolíneas, Embajada y Consulado. Recorrido antihorario: Salida → Marruecos → Egipto. México es una propiedad, no la salida.
- Capital inicial de **$134,500**: dos billetes de $50,000, dos de $10,000, dos de $5,000, uno de $2,000, dos de $1,000 y uno de $500. El Banco da cambio y emite dinero sin límite. Hay denominaciones menores para intereses.
- Sueldo de **$20,000**, abonado automáticamente al cerrar el turno correspondiente. No se obtiene por el traslado de deportación/cárcel.
- Dobles dan un tiro extra que se habilita automáticamente. El tercer doble envía a Deportado. Las tiradas tienen 20 s; al vencer se pierde el turno. No hay botón Terminar turno: el servidor lo cierra cuando no hay decisiones pendientes y se han mostrado los acontecimientos.
- Caer con dados en Deportado o ser enviado allí permite pagar **$5,000** o perder tres turnos completos; después se vuelve a Salida sin sueldo. Se pueden administrar propiedades durante la deportación.
- Cárcel cobra **$10,000** de fianza y exige tres turnos completos, salvo una carta que indique otra duración. Los dobles no liberan. No permite rentas ni administración voluntaria. El pase diplomático cancela la detención y la fianza que siga pendiente.
- Australia es descanso al caer con dados. Una carta puede imponer una estancia adicional.
- Renta según el título; base doble con bloque completo, cero en una propiedad hipotecada. Aerolíneas: $2,500 / $5,000 / $10,000 / $20,000. Embajada y Consulado: dados × $500 o × $1,000 al tener ambas.
- Compra al Banco o subasta para los demás. Quien rechaza la compra queda retirado automáticamente y no puede ofertar en esa subasta; quien pulsa Pasar también se retira sin cambiar de casilla. Oferta inicial del **80% del precio impreso, redondeada hacia arriba a $500**, con incrementos mínimos de $500. Las subastas de edificios parten del costo de construcción correspondiente. Primera ronda de 30 s; una nueva oferta concede 20 s. Los jugadores en cárcel no participan. La oferta ganadora se paga automáticamente.
- Construcción uniforme en bloques completos sin hipotecas, hasta cuatro casas y un hotel. El hotel sustituye cuatro casas y cuesta una construcción más. Venta al Banco a mitad del costo. Se permite administrar fuera del turno.
- Inventario finito de 36 casas y 12 hoteles. Si queda una pieza y varios jugadores tienen países preparados, se subasta entre ellos. Si no hay piezas, se espera. **Vender edificios del bloque** permite liquidar todos a mitad de costo cuando no hay cuatro casas para deshacer un hotel.
- Hipoteca por la mitad del precio; liberación con 10% de interés. No se puede hipotecar/intercambiar una propiedad de un bloque con edificios. Devolver una propiedad hipotecada no genera un segundo pago.
- Tratos de propiedades y dinero revalidados al aceptar. No hay préstamos entre jugadores. Las propuestas sobreviven al cambio de turno; una aceptación invalida las demás para evitar ofertas desactualizadas.
- Dos mazos de 16 cartas, barajados con aleatoriedad criptográfica en cada partida. Incluyen cobros, pagos, pagos colectivos, viajes, reparaciones, pausas, permisos, bono de renta, devolución de compras y expropiaciones. Las cartas ordinarias vuelven al fondo; los permisos se conservan hasta usarlos. Textos originales; no son una transcripción de las cartas comerciales.
- Toda deuda queda pendiente hasta pagar o liquidar activos. Los pagos colectivos se procesan en cola identificando a cada deudor, incluso fuera de turno. Solo se admite quiebra cuando ni la liquidación cubriría la obligación.
- Al quebrar, los edificios se liquidan a mitad de precio. El acreedor recibe el efectivo y bienes; paga al Banco el 10% del valor original de las propiedades heredadas hipotecadas. Puede redimir pagando solo el principal durante ese turno; después vuelve a aplicar el interés normal. Si el acreedor es el Banco, los títulos se subastan mientras siga la partida.
- Gana el último superviviente. El modo de 30/60/90 minutos compara patrimonio neto: efectivo + precios originales + costo de edificios − hipotecas − deudas. Empates comparten puesto. Los quebrados aparecen detrás, del último eliminado al primero.

## Criterios de adaptación y referencias contradictorias

Los datos numéricos y nombres están centralizados en `lib/game/board.ts`. El documento de referencia original del usuario permanece en `reglas_turista_mundial.md` sin modificaciones. Para obtener un reglamento consistente:

- La sección general del instructivo dice que caer con dados en Deportado es visita; la sección dedicada dice “por algún motivo”. Por decisión del usuario, se aplica deportación también al caer con dados: multa de $5,000 o tres turnos completos, con regreso a Salida sin sueldo. La elección aparece en la franja superior móvil y en el panel del jugador; quedarse no descuenta el turno de llegada.
- La automatización de turnos, el plazo de 20 s para tirar y el abono automático del sueldo son reglas de esta adaptación solicitadas por el usuario. El servidor reserva el tiempo de las animaciones antes de iniciar el contador.
- Por decisión del usuario, rechazar una compra también excluye de la subasta a quien la rechazó. Esta adaptación difiere de la referencia que permitía que ese jugador volviera a ofertar.
- El ejemplo del instructivo agrupa Chile/Argentina/Perú, pero los títulos fotografiados agrupan **Brasil/Chile/Argentina** y **Colombia/Venezuela/Perú**. Se siguen los títulos.
- México vale $26,000 en el tablero; se aplica hipoteca de $13,000, coherente con la regla del 50%, aunque uno de sus reversos fotografiados indique $12,000.
- Se conservan valores inusuales impresos en títulos: Japón con tres casas $144,000; Brasil con cuatro casas $112,000. No se sustituyen por una progresión inventada.
- La transcripción no fija el número de piezas ni el protocolo digital de subasta. El inventario y los plazos indicados arriba son parámetros de esta adaptación. La subasta de edificios se activa con la última pieza disponible.
- Para que la fianza no bloquee una partida, la cárcel permite liquidación forzosa destinada a pagar una deuda, pero no gestión voluntaria ni cobro de rentas.
- Las cartas con pruebas físicas se sustituyen por efectos digitales. Algunas cartas también tienen ajustes explícitos en su nuevo texto. El permiso de adquisición exige completar un bloque sin edificios y usa la renta base del título como precio frente a otro propietario.
- La partida por tiempo utiliza patrimonio neto, descontando hipotecas y deudas para que endeudarse no aumente artificialmente el resultado.

El nombre nuevo y el arte propio no constituyen una comprobación de disponibilidad de marca ni una garantía legal.

## Comprobar el código

```sh
npm test
npm run lint
npm run build
```

La suite cubre secuencia dados/movimiento/llegada, cierre automático de avisos, temporizadores, salto único con polling concurrente, audio y sus recursos, tablero, precios, sueldo, construcción uniforme, inventario, hipotecas, detenciones, cartas, subastas, tratos, pagos, quiebra, ranking, tres partidas simuladas completas, tokens, reconexión, idempotencia y compras simultáneas. Los tests del almacén usan un doble de Redis **solo en pruebas**; la aplicación sigue usando exclusivamente Redis real.

Para verificar los Route Handlers contra Redis real con el servidor abierto:

```sh
npm run test:api
```

O contra tu despliegue:

```sh
TEST_BASE_URL=https://TU_PROYECTO.vercel.app npm run test:api
```

Esta prueba crea una sala de dos jugadores, valida tokens, reconexión, polling sin cambios y una carrera de solicitudes. No borra salas existentes; la sala de prueba expira en 24 horas. No reemplaza la prueba visual entre navegadores.

En el entorno de esta entrega se ejecutaron las pruebas, lint y compilación. La prueba visual y de API contra Redis real debe hacerse en tu equipo o despliegue: el entorno de edición no permite abrir el puerto del servidor ni ejecutar el navegador.

## Arquitectura

- `lib/game/engine.ts`: reducer determinista. Recibe dados, mazos y hora del servidor; nunca usa reloj o aleatoriedad propios.
- `lib/game/board.ts`, `cards.ts`, `rules.ts`, `money.ts`: datos y reglas centralizados.
- `lib/store.ts`: Redis REST, tokens UUID almacenados como hashes, control de versiones, recibos de idempotencia y presencia.
- `app/api/rooms/**`: Route Handlers dinámicos, runtime Node.js, respuestas sin caché.
- `components/Room.tsx`: polling secuencial cada segundo, pausa al ocultar pestaña, heartbeat cada 20 s y reconexión por token.
- `components/TravelArt.tsx`: ilustraciones originales de globo, billetes y edificios en SVG/CSS. No descarga imágenes ni fuentes externas.
- `components/Board.tsx`: posiciones visuales de fichas y colores de grupo reforzados, separados del indicador de dueño.
- `lib/game/playback.ts`, `lib/useGamePlayback.ts`, `lib/game/presentation.ts`: cola compartida para dados, movimiento y avisos; reconexión sin repetir historia, preferencias de movimiento y duraciones coordinadas con los plazos del servidor.
- `components/Victory.tsx`: podio con escalones, fichas, clasificación completa y confeti finito; empates y orden de eliminación conservan los puestos del motor. El confeti se omite con movimiento reducido.
- `components/MobileTurnBar.tsx`: información y acciones inmediatas sobre el tablero en móvil y tableta.
- `components/VoiceChat.tsx`, `lib/voice/client.ts`, `lib/voice/store.ts`: controles y conexiones WebRTC, SDP temporal autorizado por token y persistencia independiente del tablero.
- `components/AudioControls.tsx`, `lib/useGameAudio.ts`, `lib/audio.ts`: preferencias locales, música original sintetizada, efectos de las escenas, pausa por visibilidad y limpieza de recursos.
- `components/Activity.tsx`: escenas centrales compartidas, dados animados y fondo desenfocado. La bitácora no se muestra; el servidor conserva eventos para sincronizar las escenas. La cartera se presenta como una mano de billetes en la parte inferior.

Las escrituras usan un único script Lua que compara la versión y guarda el nuevo estado atómicamente. Una carrera pierde con HTTP 409. La caducidad de sala se renueva a 24 horas en cada acción guardada. Cada acción lleva un `requestId`; se conservan los últimos 100 recibos para no duplicar efectos al repetir solicitudes. Los mazos y los tokens no se incluyen en el estado público. No se confía en un playerId enviado por el cliente.

El vencimiento de partidas, subastas y tiradas, así como el cierre automático del turno, se resuelve durante la siguiente consulta o acción usando la hora del servidor, sin cron ni temporizadores persistentes. Los espectadores pueden leer, pero necesitan un token válido para actuar. El código conserva el prefijo interno `turista:` en las claves y en localStorage por compatibilidad; la presentación usa Rumbo Mundial.

## Entrega completa

`npm run entrega` genera `ENTREGA.md` con árbol y código completo archivo por archivo, README al final. El archivo `rumbo-mundial.zip` contiene el proyecto desplegable sin credenciales, dependencias instaladas, compilaciones o fotografías de referencia.

## Ilustraciones de los países y del mapa

Los 24 países usan ilustraciones raster originales, generadas individualmente con la herramienta integrada de imágenes. Cada casilla y tarjeta reutiliza la imagen correspondiente en `public/art/countries/`. `public/art/world-center.webp` es el mapa central ilustrado, con rótulos de regiones renderizados en HTML. El mapeo de países se encuentra en `lib/game/art.ts`; los prompts completos están en `public/art/PROMPTS.md`. Se entregan en WebP y se sirven con `next/image`. No requieren generación de imágenes, claves adicionales ni servicios gráficos cuando juegas.
