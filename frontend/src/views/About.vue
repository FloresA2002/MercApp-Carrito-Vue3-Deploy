<template>

  <Suspense>

    <!-- COMPONENTE ASYNC -->
    <AsyncAboutContent />

    <!-- FALLBACK -->
    <template #fallback>

      <div class="loader">

        <div class="spinner"></div>

        <h2>
          Cargando ...
        </h2>

        <p>
          Preparando experiencia MercApp
        </p>

      </div>

    </template>

  </Suspense>

</template>

<script setup>

import {
  defineAsyncComponent
} from 'vue'

// ====================
// ASYNC COMPONENT
// ====================

const AsyncAboutContent =
  defineAsyncComponent(() =>

    new Promise(resolve => {

      setTimeout(() => {

        resolve(
          import('@/components/AboutContent.vue')
        )

      }, 2000)

    })
  )

</script>

<style scoped>

/* ====================
   LOADER SCREEN
==================== */

.loader {

  min-height: 70vh;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 1rem;

  text-align: center;
}

/* ====================
   SPINNER
==================== */

.spinner {

  width: 70px;

  height: 70px;

  border:
    5px solid rgba(255,255,255,.08);

  border-top:
    5px solid #10B981;

  border-radius: 50%;

  animation:
    spin 1s linear infinite;

  box-shadow:
    0 0 20px rgba(16,185,129,.15);
}

/* ====================
   TEXT
==================== */

h2 {

  color: #111;

  font-size: 1.8rem;

  font-weight: 700;
}

p {

  color: #666;

  font-size: 1rem;
}

/* ====================
   ANIMATION
==================== */

@keyframes spin {

  to {

    transform: rotate(360deg);
  }
}

</style>