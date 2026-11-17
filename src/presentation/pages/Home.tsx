import { Globe } from "@/presentation/atoms/Globe";
import EntryForm from "@/presentation/organisms/EntryForm";


export default function Home() {
  return (
    <main className="home">
      <header className="brand">
        ✈ RUMBO MUNDIAL <span>EDICIÓN ENTRE AMIGOS</span>
      </header>
      <div className="home-grid">
        <section className="hero">
          <p className="eyebrow">PASE DE ABORDAR / SIN SALIR DE CASA</p>
          <h1 className="home-title">
            Rumbo mundial
            <br />
            online<span>.</span>
          </h1>
          <p>
            Juega con tus amigos en Rumbo Mundial, un juego de mesa multijugador
            para 2 a 6 personas. Compra países, construye casas y hoteles y negocia
            desde tu celular o computadora, sin descargar nada.
          </p>
          <Globe className="hero-globe" />
          <div className="route-art" aria-hidden="true">
            <span>MEX</span>
            <i>✈</i>
            <span>EL MUNDO</span>
          </div>
          <div className="facts">
            <div>
              <b>40</b>
              <small>destinos y sorpresas</small>
            </div>
            <div>
              <b>2–6</b>
              <small>viajeros por sala</small>
            </div>
            <div>
              <b>∞</b>
              <small>ganas de revancha</small>
            </div>
          </div>
        </section>
        <EntryForm />
      </div>
      <section className="home-help" aria-label="Cómo jugar con amigos">
        <details>
          <summary>¿Cómo jugar turista mundial online con amigos?</summary>
          <p>
            Crea una sala con tu nombre y color de ficha, y comparte el ID o el
            enlace. Tus amigos pueden entrar desde su navegador. Cuando haya de
            2 a 6 jugadores, el anfitrión inicia la partida. El banco automático
            administra compras, rentas y pagos.
          </p>
        </details>
        <details>
          <summary>¿Necesito una cuenta o instalar una aplicación?</summary>
          <p>
            No necesitas registrarte ni instalar una aplicación. Solo una conexión
            a internet y un navegador en tu celular, tableta o computadora. Puedes
            refrescar la página y recuperar tu lugar desde el mismo navegador,
            mientras conserves sus datos y la sala siga disponible.
          </p>
        </details>
        <details>
          <summary>¿Es la versión oficial de Fotorama?</summary>
          <p>
            No. Rumbo Mundial es una adaptación independiente con ilustraciones y
            textos propios; no está afiliada a Fotorama. Incluye países, aerolíneas,
            casas, hoteles, cartas E-Mail y SMS, subastas y tratos entre jugadores.
          </p>
        </details>
      </section>
      <footer>
        Rumbo Mundial · Un viaje entre amigos. Ilustraciones y textos originales.
      </footer>
    </main>
  );
}
