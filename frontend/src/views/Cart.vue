<template>

  <div>

    <h1 class="title">
      Carrito
    </h1>

    <!-- VACÍO -->
    <div
      v-if="!cartItems.length"
      class="empty-cart"
    >

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

          <h3>
            {{ item.name }}
          </h3>

          <p class="price">
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

        <!-- COMPRAR -->
        <button
          class="buy-btn"
          @click="handlePurchase"
        >
          Comprar
        </button>

        <!-- SUCCESS -->
        <transition name="fade">

          <div
            v-if="purchaseSuccess"
            class="success-message"
          >

            ✅ Compra realizada exitosamente

          </div>

        </transition>

      </div>

    </div>

  </div>

</template>

<script setup>

import { ref } from 'vue'

import {
  useCart
} from '@/composables/useCart'

const {

  cartItems,

  increaseQuantity,

  decreaseQuantity,

  removeFromCart,

  totalPrice,

  clearCart

} = useCart()

// ====================
// SUCCESS STATE
// ====================

const purchaseSuccess = ref(false)

// ====================
// REMOVE
// ====================

const handleRemove = (id) => {

  const confirmed = confirm(
    '¿Eliminar producto del carrito?'
  )

  if (confirmed) {

    removeFromCart(id)
  }
}

// ====================
// PURCHASE
// ====================

const handlePurchase = () => {

  if (!cartItems.value.length) {

    alert('El carrito está vacío')

    return
  }

  purchaseSuccess.value = true

  clearCart()

  setTimeout(() => {

    purchaseSuccess.value = false

  }, 3000)
}

</script>

<style scoped>

.title {

  margin-bottom: 2rem;
}

/* ====================
   EMPTY
==================== */

.empty-cart {

  text-align: center;

  padding: 4rem;

  background: white;

  border-radius: 20px;

  box-shadow:
    0 4px 12px rgba(0,0,0,.05);
}

/* ====================
   LIST
==================== */

.cart-list {

  display: flex;

  flex-direction: column;

  gap: 1.5rem;
}

/* ====================
   ITEM
==================== */

.cart-item {

  display: flex;

  gap: 1.5rem;

  background: white;

  padding: 1.5rem;

  border-radius: 20px;

  box-shadow:
    0 4px 12px rgba(0,0,0,.05);

  transition: all .3s ease;
}

.cart-item:hover {

  transform: translateY(-3px);

  box-shadow:
    0 10px 20px rgba(0,0,0,.08);
}

/* ====================
   IMAGE
==================== */

img {

  width: 160px;

  height: 160px;

  object-fit: cover;

  border-radius: 16px;
}

/* ====================
   INFO
==================== */

.info {

  display: flex;

  flex-direction: column;

  gap: .9rem;

  justify-content: center;
}

.price {

  font-size: 1.2rem;

  font-weight: 700;

  color: var(--primary);
}

/* ====================
   QUANTITY
==================== */

.quantity {

  display: flex;

  align-items: center;

  gap: .8rem;
}

.quantity button {

  width: 42px;

  height: 42px;

  border: none;

  border-radius: 12px;

  background: #f3f4f6;

  cursor: pointer;

  font-size: 1rem;

  transition: all .3s ease;
}

.quantity button:hover {

  background: var(--primary);

  color: white;
}

/* ====================
   REMOVE
==================== */

.remove {

  width: fit-content;

  border: none;

  background: crimson;

  color: white;

  padding: .8rem 1.2rem;

  border-radius: 12px;

  cursor: pointer;

  transition: all .3s ease;
}

.remove:hover {

  opacity: .9;

  transform: translateY(-2px);
}

/* ====================
   TOTAL
==================== */

.total {

  margin-top: 2rem;

  background: white;

  padding: 2rem;

  border-radius: 20px;

  box-shadow:
    0 4px 12px rgba(0,0,0,.05);

  text-align: right;
}

.total h2 {

  margin-bottom: 1.5rem;

  font-size: 2rem;
}

/* ====================
   BUY BUTTON
==================== */

.buy-btn {

  width: 100%;

  padding: 1rem;

  border: none;

  border-radius: 14px;

  background: var(--primary);

  color: white;

  font-size: 1rem;

  font-weight: 700;

  cursor: pointer;

  transition: all .3s ease;
}

.buy-btn:hover {

  background: var(--primary-dark);

  transform: translateY(-2px);

  box-shadow:
    0 12px 24px rgba(16,185,129,.25);
}

.buy-btn:active {

  transform: scale(.98);
}

/* ====================
   SUCCESS
==================== */

.success-message {

  margin-top: 1.5rem;

  padding: 1rem;

  border-radius: 14px;

  background:
    rgba(16,185,129,.12);

  color: var(--primary);

  text-align: center;

  font-weight: 600;
}

/* ====================
   ANIMATIONS
==================== */

.fade-enter-active,
.fade-leave-active {

  transition: all .3s ease;
}

.fade-enter-from,
.fade-leave-to {

  opacity: 0;

  transform: translateY(10px);
}

/* ====================
   RESPONSIVE
==================== */

@media (max-width: 768px) {

  .cart-item {

    flex-direction: column;
  }

  img {

    width: 100%;

    height: 240px;
  }

  .total {

    text-align: center;
  }
}

</style>