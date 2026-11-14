import { Globe } from "@/components/TravelArt";
import EntryForm from "@/components/EntryForm";
export default function Home() {
  return (
    <main className="home">
      <header className="brand">
        ✈ RUMBO MUNDIAL <span>EDICIÓN ENTRE AMIGOS</span>
      </header>
      <div className="home-grid">
        <section className="hero">
          <p className="eyebrow">PASE DE ABORDAR / SIN SALIR DE CASA</p>
          <h1>
            El mundo
            <br />
            en tu mesa<span>.</span>
          </h1>
          <p>
            Compra países, construye casas y hoteles y negocia con tus amigos. La
            próxima escala la deciden los dados.
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
      <footer>
        Rumbo Mundial · Un viaje entre amigos. Ilustraciones y textos originales.
      </footer>
    </main>
  );
}
