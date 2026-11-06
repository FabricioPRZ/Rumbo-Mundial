# Turista Mundial

Juego multijugador en español de México con Next.js App Router, TypeScript estricto, Tailwind y Upstash Redis. Adaptación independiente; no es una edición oficial. Los 40 espacios y valores están centralizados en `lib/game/board.ts`, con aviso `// VERIFICAR`.

## Ejecutar localmente

1. Instala Node.js 22 o posterior.
2. Ejecuta `npm install`.
3. Copia `.env.example` a `.env.local`.
4. Crea una base Redis en Upstash y copia su REST URL y REST TOKEN en `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`. También se admiten `KV_REST_API_URL` y `KV_REST_API_TOKEN`. No uses prefijos `NEXT_PUBLIC_`.
5. Ejecuta `npm run dev` y abre `http://localhost:3000`.
6. Ejecuta `npm test`, `npm run lint` y `npm run build` para verificar el proyecto.

No existe una persistencia alternativa en memoria o archivos. Sin credenciales Redis válidas la interfaz explica la configuración pendiente; crear salas requiere Redis.

## Publicar en Vercel desde GitHub

1. Crea un repositorio vacío en GitHub.
2. Desde la carpeta del proyecto ejecuta:

```sh
git init
git add .
git commit -m "Implementa Turista Mundial multijugador"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/turista-mundial.git
git push -u origin main
```

3. En Vercel selecciona **Add New → Project**, importa el repositorio y conserva el preset Next.js, con la raíz del repositorio como directorio raíz.
4. En Marketplace busca **Upstash Redis**, crea o conecta una base y asígnala al proyecto. Comprueba que las variables de entorno tengan uno de los dos pares admitidos. Si la integración usa otro prefijo, copia manualmente REST URL y REST TOKEN en los nombres indicados arriba.
5. Activa las variables para Production y, si vas a probar previews, también Preview y Development.
6. Ejecuta Deploy. Si agregaste variables después de un despliegue, usa Redeploy.
7. Abre la URL HTTPS, crea una sala y copia su enlace para compartirlo.

Alternativa por CLI: ejecuta `npx vercel`, enlaza el proyecto, configura las mismas variables en su panel y ejecuta `npx vercel --prod`. No requiere servidor separado, procesos persistentes, WebSockets ni dependencias nativas.

## Probar con amigos

- Abre el sitio en dos navegadores o en una ventana normal y otra privada. Cada perfil representa a un jugador distinto.
- Crea una sala, copia su ID de seis caracteres o el enlace `/sala/ABC234` y únete desde el otro navegador.
- Elige colores distintos en el lobby. El anfitrión inicia con 2–6 participantes.
- Tira, compra o declina, y termina el turno. Los dobles conceden otro tiro; el tercer doble envía a Oceanía.
- Refresca: el token en localStorage permite volver al mismo jugador. No borres los datos del sitio; el token es la llave privada de tu asiento y no debe compartirse.
- Prueba dos acciones a la vez: una operación que utiliza una versión desactualizada recibe HTTP 409 y debe revisarse con el estado actualizado.
- Cierra la pestaña del jugador activo. Tras 90 segundos sin heartbeat o acción, el anfitrión puede saltarlo o declararlo en quiebra; no se puede saltar una deuda pendiente.
- Reúne grupos, construye de forma pareja, intercambia bienes y continúa hasta que quede un jugador. También puedes crear una sala de 30, 60 o 90 minutos.

## Reglas y decisiones de esta adaptación

Cada jugador comienza con $1,500; el Banco no tiene límite. Los billetes solicitados en el enunciado sumarían $1,500: se presenta únicamente el saldo. Pasar o caer en México paga $200, excepto el traslado directo a Oceanía. Caer en la propia casilla Oceanía también detiene al jugador, conforme a las reglas solicitadas; no existe “solo de visita”. Una tirada fallida consume uno de tres turnos detenidos; luego se tira normalmente en el siguiente turno. Salir con dobles desde Oceanía no concede un tiro adicional.

No hay subastas. La renta de un país sin edificios se duplica al poseer todas las propiedades del color. La hipoteca anula la renta únicamente de la propiedad hipotecada. Aerolíneas y servicios cuentan todas las propiedades del tipo que posee el dueño, incluidas las hipotecadas. Los servicios usan la tirada del turno, también al llegar por carta.

Construir requiere poseer todas las propiedades del grupo y que ninguna esté hipotecada. Las construcciones se compran y venden de forma pareja, exclusivamente al Banco. Un hotel es el nivel cinco: al venderlo se recupera medio costo de una construcción y queda con cuatro restaurantes. No se impone inventario físico limitado de edificios. Para hipotecar, devolver o intercambiar una propiedad deben haberse vendido todos los edificios de su grupo. Devolver una propiedad hipotecada no paga nuevamente la mitad del precio: ese dinero ya se recibió en la hipoteca. Deshipotecar cuesta el principal más 10%, redondeado al peso superior.

La gestión de propiedades y las propuestas de trato se hacen durante el turno propio; el destinatario puede aceptar o rechazar durante ese turno. Terminar el turno cancela las propuestas. Las propiedades hipotecadas se pueden intercambiar conservando su hipoteca. Los tratos se revalidan al aceptar y no se permiten durante una deuda. No se cobra interés adicional por transferir una hipoteca; liberarla posteriormente sí cobra 10%.

Si falta efectivo, la deuda se conserva íntegra sin pagos parciales. El jugador vende edificios y puede hipotecar o devolver bienes. Solo se admite quiebra cuando sus activos realizables no cubren la deuda y ya no quedan edificios ni propiedades sin hipotecar. El acreedor recibe el efectivo y propiedades restantes con sus hipotecas; si es el Banco, las propiedades quedan libres. Las cartas de salida vuelven a su mazo.

El patrimonio para modo por tiempo suma efectivo, valor original de propiedades y costo original de edificios, menos el principal de hipotecas y deudas pendientes. Los empates comparten victoria. El vencimiento se calcula con hora del servidor y se materializa en la siguiente consulta o acción; no necesita cron. El anfitrión no se reasigna automáticamente.

## Pruebas automatizadas

`npm test` ejecuta 32 pruebas: reglas del motor, una partida completa simulada hasta quiebra, autenticación, reconexión, idempotencia y carreras de escritura. Las pruebas del almacén utilizan un doble de Redis exclusivamente dentro del archivo de prueba; la aplicación nunca usa ese estado simulado.

Con el sitio ejecutándose y Redis configurado, ejecuta `npm run test:api`. Para probar un despliegue usa `TEST_BASE_URL=https://TU_PROYECTO.vercel.app npm run test:api`. Crea una sala real de prueba y verifica tokens, dos jugadores, reconexión, polling sin cambios, idempotencia y dos tiradas concurrentes. La sala de prueba expira por TTL; la prueba no borra salas existentes.

## Estado de validación de esta entrega

- 32 pruebas Vitest ejecutadas y aprobadas usando paquetes disponibles en la caché local.
- Motor comprobado con TypeScript estricto; revisión adicional de código con reglas recomendadas de TypeScript ESLint aprobada.
- `npm run build` y la configuración completa de ESLint de Next.js no pudieron verificarse en este entorno: el acceso al registro npm falla por resolución DNS, y Next.js, su configuración de ESLint y el SDK de Upstash no están disponibles en la caché. No se afirma que el build haya pasado.
- No se ha ejecutado la prueba contra Redis real ni una partida en dos navegadores. No se han proporcionado credenciales Upstash ni publicado un despliegue.
- Ejecuta instalación, pruebas, lint, build y `test:api` con las variables reales antes de publicar.

## Arquitectura y seguridad

- `lib/game/engine.ts`: reducer puro, sin reloj, red ni aleatoriedad propios. Recibe dados, mazos y hora mediante contexto del servidor. Devuelve una copia o lanza un error sin mutar la entrada.
- `lib/game/rules.ts`: rentas, grupos, validación de activos y patrimonio.
- `lib/game/board.ts` y `cards.ts`: tablero y 16 cartas por mazo.
- `lib/store.ts`: Redis REST, tokens, creación y unión, control de versiones, expiración y presencia.
- `app/api/rooms/**`: Route Handlers dinámicos con runtime Node.js y respuestas sin caché.
- `components/Room.tsx`: polling secuencial aproximadamente cada segundo, pausa al ocultarse la pestaña, heartbeat cada 20 segundos y reconexión automática.

Redis conserva cada sala durante 24 horas desde su última creación, unión o acción guardada. Los tokens UUID se almacenan como hashes SHA-256 y nunca aparecen en el estado público. No se acepta un playerId del cliente como autenticación. La secuencia de mazos también se excluye de las respuestas. Los dados y barajados usan `node:crypto` en el servidor.

Cada escritura compara y cambia la versión dentro de un único script Lua atómico en Redis. Si otra solicitud ganó la carrera, se rechaza la escritura; no hay ventana de expiración de lock que permita una escritura tardía. El endpoint de acciones además acepta un `requestId` UUID y recuerda los últimos 100 recibos para evitar reejecuciones de solicitudes ya guardadas. La interfaz no reintenta automáticamente una acción cuando desconoce su resultado; el polling recupera el estado confirmado.

Las lecturas usan `GET /api/rooms/[id]?since=<version>` y devuelven `{changed:false}` cuando no cambió la sala. El token se transmite en Authorization para recuperar identidad y presencia. Los espectadores con el ID pueden leer el tablero pero no actuar. Los estados de presencia se guardan por separado en Redis y no incrementan la versión del juego.

El polling consume solicitudes Redis incluso sin cambios: dimensiona la cuota según jugadores y duración. Este proyecto no incluye un servicio antispam de terceros ni recuperación de tokens perdidos. Usa HTTPS y comparte enlaces únicamente con los participantes deseados.

## Referencias

- [Upstash Redis TypeScript SDK](https://upstash.com/docs/redis/sdks/ts/getstarted)
- [Redis EVAL](https://redis.io/docs/latest/commands/eval/)
- [Next.js Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route)

La versión mínima de Next.js es 15.5.29, conforme al [aviso oficial de seguridad del 3 de noviembre de 2026](https://nextjs.org/blog/november-2026-security-release).
