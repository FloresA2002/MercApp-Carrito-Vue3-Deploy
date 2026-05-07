<template>

  <div class="loader-container">

    <div class="spinner"></div>

    <p>Cargando vista...</p>

  </div>

</template>

<style scoped>

.loader-container {

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

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