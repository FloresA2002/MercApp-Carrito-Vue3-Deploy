<template>

  <div>

    <h1>Carrito</h1>

    <!-- VACÍO -->
    <div v-if="!cartItems.length">

      <p>
        El carrito está vacío
      </p>

    </div>

    <!-- ITEMS -->
    <div
      v-else
      class="cart-list"
    >

      <div
        v-for="item in cartItems"
        :key="item.id"
        class="cart-item"
      >

        <!-- Imagen -->
        <img
          :src="item.imageUrl"
          :alt="item.name"
        />

        <!-- Info -->
        <div class="info">

          <h3>{{ item.name }}</h3>

          <p>
            ${{ item.price }}
          </p>

          <!-- Cantidad -->
          <div class="quantity">

            <button
              @click="
                decreaseQuantity(item.id)
              "
            >
              -
            </button>

            <span>
              {{ item.quantity }}
            </span>

            <button
              @click="
                increaseQuantity(item.id)
              "
            >
              +
            </button>

          </div>

          <!-- Eliminar -->
          <button
            class="remove"
            @click="handleRemove(item.id)"
          >
            Eliminar
          </button>

        </div>

      </div>

      <!-- TOTAL -->
      <div class="total">

        <h2>
          Total:
          ${{ totalPrice.toFixed(2) }}
        </h2>

      </div>

    </div>

  </div>

</template>

<script setup>

import {
  useCart
} from '@/composables/useCart'

// ====================
// CONFIRM REMOVE
// ====================

const handleRemove = (id) => {

  const confirmed = confirm(
    '¿Eliminar producto del carrito?'
  )

  if (confirmed) {

    removeFromCart(id)
  }
}
const {

  cartItems,

  increaseQuantity,

  decreaseQuantity,

  removeFromCart,

  totalPrice

} = useCart()

</script>

<style scoped>

.cart-list {

  display: flex;

  flex-direction: column;

  gap: 1rem;
}

.cart-item {

  display: flex;

  gap: 1rem;

  background: white;

  padding: 1rem;

  border-radius: 12px;
}

img {

  width: 120px;

  height: 120px;

  object-fit: cover;

  border-radius: 8px;
}

.info {

  display: flex;

  flex-direction: column;

  gap: .5rem;
}

.quantity {

  display: flex;

  align-items: center;

  gap: .8rem;
}

.quantity button {

  width: 35px;
  height: 35px;
}

.remove {

  width: fit-content;

  background: crimson;

  color: white;

  border: none;

  padding: .6rem 1rem;

  border-radius: 6px;

  cursor: pointer;
}

.total {

  margin-top: 2rem;

  text-align: right;
}

button {

  cursor: pointer;
}

</style>