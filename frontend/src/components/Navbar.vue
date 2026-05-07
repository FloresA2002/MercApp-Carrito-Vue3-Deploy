<template>

  <nav class="navbar">

    <!-- LOGO -->
    <router-link
      to="/"
      class="logo"
    >
      MercApp
    </router-link>

    <!-- LINKS -->
    <div class="links">

      <router-link to="/">
        Inicio
      </router-link>

      <router-link to="/about">
        Acerca de
      </router-link>

      <router-link to="/cart">

        Carrito
        ({{ totalItems }})

      </router-link>

    </div>

  </nav>

</template>

<script setup>

import {
  useCart
} from '@/composables/useCart'

// ====================
// CART
// ====================

const {
  totalItems
} = useCart()

</script>

<style scoped>

.navbar {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 1rem 2rem;

  background: #222;

  color: white;
}

.logo {

  font-size: 1.4rem;

  font-weight: bold;

  color: white;

  text-decoration: none;
}

.links {

  display: flex;

  gap: 1rem;
}

.links a {

  color: white;

  text-decoration: none;

  transition: .2s;
}

.links a:hover {

  opacity: .7;
}

.router-link-active {

  font-weight: bold;

  text-decoration: underline;
}

</style>