<template>

  <nav class="navbar">

    <!-- LOGO -->
    <router-link
  to="/"
  class="logo"
  active-class=""
>

  <img
    :src="logo"
    alt="MercApp Logo"
    class="logo-image"
  />

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

import logo from '@/assets/logo.png'

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

.logo {

  display: flex;

  align-items: center;

  height: 150px;
}

.logo-image {

  max-height: 100%;

  width: auto;

  object-fit: contain;

  transition: all .3s ease;
}

.logo-image:hover {

  transform: scale(1.05);
}

.navbar {

  display: flex;

  justify-content: space-between;

  height: 80px;

  align-items: center;

  padding: 1.2rem 2rem;

  background: #111;

  position: sticky;

  top: 0;

  z-index: 100;

  box-shadow:
    0 4px 12px rgba(0,0,0,.12);
}


.links {

  display: flex;

  gap: 1rem;
}

.links a {

  color: #d1d5db;

  padding: .6rem 1rem;

  border-radius: 10px;

  transition: all .3s ease;
}

.links a:hover {

  background: rgba(255,255,255,.08);

  color: white;
}

.router-link-active {

  background: var(--primary);

  color: white !important;
}

@media (max-width: 768px) {

  .navbar {

    flex-direction: column;

    gap: 1rem;
  }

  .links {

    flex-wrap: wrap;

    justify-content: center;
  }
}

</style>