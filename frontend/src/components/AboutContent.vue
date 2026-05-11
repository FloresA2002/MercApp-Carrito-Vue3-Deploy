<template>

  <section class="about-page">

    <!-- HERO -->
    <div class="hero">

      <span class="badge">
        MERCAPP
      </span>

      <h1>
        Sobre Nosotros
      </h1>

      <div class="line"></div>

      <p class="description">

        MercApp es una aplicación SPA desarrollada con Vue 3
        enfocada en ofrecer una experiencia moderna para la
        gestión y exploración de productos tecnológicos.

        El proyecto implementa consumo de API REST,
        routing dinámico, carrito persistente,
        filtros reactivos y componentes reutilizables,
        siguiendo buenas prácticas de desarrollo frontend moderno.

      </p>

    </div>

    <!-- CARDS -->
    <div class="features">

      <div class="feature-card">

        <div class="icon">
          ⚡
        </div>

        <h3>
          Vue 3 SPA
        </h3>

        <p>
          Aplicación moderna usando Composition API,
          componentes reutilizables y lazy loading.
        </p>

      </div>

      <div class="feature-card">

        <div class="icon">
          🛒
        </div>

        <h3>
          Carrito Persistente
        </h3>

        <p>
          Estado global reactivo con almacenamiento
          en localStorage.
        </p>

      </div>

      <div class="feature-card">

        <div class="icon">
          🔥
        </div>

        <h3>
          API REST
        </h3>

        <p>
          Backend completo con CRUD de productos,
          validaciones y manejo de errores.
        </p>

      </div>

    </div>

    <!-- SOCIALS -->
    <div class="socials">

      <a href="#" class="social">
        F
      </a>

      <a href="#" class="social">
        X
      </a>

      <a href="#" class="social">
        IG
      </a>

      <a href="#" class="social">
        YT
      </a>

    </div>

  </section>

</template>

<style scoped>

.about-page {

  min-height: 100vh;

  padding: 5rem 2rem;

  background:
    linear-gradient(
      180deg,
      #0f0f0f 0%,
      #181818 100%
    );

  color: white;
}

/* ====================
   HERO
==================== */

.hero {

  max-width: 900px;

  margin: 0 auto;

  text-align: center;
}

.badge {

  display: inline-block;

  padding: .5rem 1rem;

  background:
    rgba(16,185,129,.15);

  color: #10B981;

  border-radius: 999px;

  font-size: .9rem;

  font-weight: 600;

  margin-bottom: 1.5rem;

  letter-spacing: 1px;
}

.hero h1 {

  font-size: 4rem;

  font-weight: 800;

  margin-bottom: 1.5rem;

  line-height: 1.1;
}

.line {

  width: 120px;

  height: 4px;

  background: #10B981;

  margin:
    0 auto
    2rem;

  border-radius: 999px;
}

.description {

  color: #cfcfcf;

  line-height: 1.9;

  font-size: 1.1rem;

  max-width: 800px;

  margin: 0 auto;
}

/* ====================
   FEATURES
==================== */

.features {

  margin-top: 5rem;

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));

  gap: 2rem;
}

.feature-card {

  background:
    rgba(255,255,255,.04);

  border:
    1px solid rgba(255,255,255,.06);

  border-radius: 24px;

  padding: 2rem;

  text-align: center;

  transition: all .3s ease;

  backdrop-filter: blur(10px);
}

.feature-card:hover {

  transform: translateY(-8px);

  border-color:
    rgba(16,185,129,.3);

  box-shadow:
    0 15px 30px rgba(0,0,0,.25);
}

.icon {

  width: 70px;

  height: 70px;

  margin: 0 auto 1.5rem;

  border-radius: 20px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 2rem;

  background:
    rgba(16,185,129,.15);

  color: #10B981;
}

.feature-card h3 {

  margin-bottom: 1rem;

  font-size: 1.4rem;
}

.feature-card p {

  color: #bdbdbd;

  line-height: 1.7;
}

/* ====================
   SOCIALS
==================== */

.socials {

  margin-top: 5rem;

  display: flex;

  justify-content: center;

  gap: 1.5rem;

  flex-wrap: wrap;
}

.social {

  width: 70px;

  height: 70px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 20px;

  background:
    rgba(255,255,255,.05);

  border:
    1px solid rgba(255,255,255,.08);

  color: white;

  font-weight: 700;

  text-decoration: none;

  transition: all .3s ease;

  transform: rotate(45deg);
}

.social:hover {

  background: #10B981;

  color: black;

  transform:
    rotate(45deg)
    translateY(-5px);

  box-shadow:
    0 10px 25px rgba(16,185,129,.3);
}

.social::before {

  transform: rotate(-45deg);
}

/* ====================
   RESPONSIVE
==================== */

@media (max-width: 768px) {

  .hero h1 {

    font-size: 2.8rem;
  }

  .description {

    font-size: 1rem;
  }

  .about-page {

    padding: 4rem 1.2rem;
  }
}

</style>