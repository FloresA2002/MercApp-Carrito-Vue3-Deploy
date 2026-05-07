<template>

  <Suspense>

    <!-- COMPONENTE ASYNC -->
    <AsyncAboutContent />

    <!-- FALLBACK -->
    <template #fallback>

      <div class="loader">

        <div class="spinner"></div>

        <p>Cargando vista...</p>

      </div>

    </template>

  </Suspense>

</template>

<script setup>

import {
  defineAsyncComponent
} from 'vue'

// Simulación async REAL
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

.loader {

  display: flex;

  flex-direction: column;

  align-items: center;

  padding: 4rem;
}

.spinner {

  width: 50px;
  height: 50px;

  border: 5px solid #ddd;
  border-top: 5px solid #222;

  border-radius: 50%;

  animation: spin 1s linear infinite;
}

@keyframes spin {

  to {
    transform: rotate(360deg);
  }
}

</style>