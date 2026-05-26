<template>

  <div
    v-if="loading"
    class="message"
  >
    Cargando producto...
  </div>

  <div
    v-else-if="error"
    class="message error"
  >
    {{ error }}
  </div>

  <div
    v-else-if="product"
    class="product-detail"
  >

    <!-- IMAGE -->
    <div class="image-container">

      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="image"
      />

    </div>

    <!-- INFO -->
    <div class="info">

      <span class="badge">
        {{ categoryName }}
      </span>

      <h1>
        {{ product.name }}
      </h1>

      <p class="description">
        {{ product.description }}
      </p>

      <h2 class="price">
        ${{ product.price }}
      </h2>

      <p class="stock">
        Stock disponible:
        {{ product.stock }}
      </p>

      <!-- ACTIONS -->
      <div class="actions">

        <button
          @click="addToCart(product)"
        >
          Añadir al carrito
        </button>

        <router-link
          :to="`/product/${product.id}/edit`"
          class="edit-btn"
        >
          Editar producto
        </router-link>

      </div>

    </div>

  </div>

</template>

<script setup>

import {
  ref,
  computed,
  onMounted
} from 'vue'

import {
  useRoute
} from 'vue-router'

import {
  useCart
} from '@/composables/useCart'

import { API_URL } from '@/config/api'

// ====================
// ROUTE
// ====================

const route = useRoute()

// ====================
// CART
// ====================

const {
  addToCart: addProductToCart
} = useCart()

// ====================
// ADD TO CART
// ====================

const addToCart = (product) => {

  addProductToCart(product)

  alert(
    `${product.name} añadido al carrito`
  )
}

// ====================
// STATE
// ====================

const product = ref(null)

const categories = ref([])

const loading = ref(true)

const error = ref(null)

// ====================
// FETCH DATA
// ====================

const fetchProduct = async () => {

  try {

    loading.value = true

    // Producto
    const response = await fetch(
  `${API_URL}/api/products/${route.params.id}`
)

    if (!response.ok) {

      throw new Error(
        'Producto no encontrado'
      )
    }

    product.value =
      await response.json()

    // Categorías
    const categoriesResponse =
  await fetch(
    `${API_URL}/api/categories`
  )

    categories.value =
      await categoriesResponse.json()

  } catch (err) {

    error.value = err.message

  } finally {

    loading.value = false
  }
}

onMounted(fetchProduct)

// ====================
// COMPUTED CATEGORY
// ====================

const categoryName = computed(() => {

  const category = categories.value.find(

    c =>
      c.id === product.value?.categoryId
  )

  return category
    ? category.name
    : 'Sin categoría'
})

</script>

<style scoped>

.product-detail {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 4rem;

  align-items: start;

  background: white;

  border-radius: 24px;

  padding: 2.5rem;

  box-shadow:
    0 8px 24px rgba(0,0,0,.05);
}

/* ====================
   IMAGE
==================== */

.image-container {

  display: flex;

  align-items: center;

  justify-content: center;
}

.image {

  width: 100%;

  max-width: 500px;

  border-radius: 20px;

  object-fit: cover;

  box-shadow:
    0 10px 25px rgba(0,0,0,.08);
}

/* ====================
   INFO
==================== */

.info {

  display: flex;

  flex-direction: column;

  gap: 1.4rem;
}

.badge {

  width: fit-content;

  background: rgba(16,185,129,.12);

  color: var(--primary);

  padding: .5rem 1rem;

  border-radius: 999px;

  font-size: .9rem;

  font-weight: 600;
}

.info h1 {

  font-size: 3rem;

  line-height: 1.1;

  color: #111;
}

.description {

  font-size: 1.05rem;

  line-height: 1.8;

  color: #666;
}

.price {

  font-size: 2.7rem;

  color: var(--primary);

  font-weight: 700;
}

.stock {

  color: #666;

  font-size: 1rem;
}

/* ====================
   ACTIONS
==================== */

.actions {

  display: flex;

  gap: 1rem;

  margin-top: 1rem;

  flex-wrap: wrap;
}

button,
.edit-btn {

  border: none;

  padding: 1rem 1.6rem;

  border-radius: 14px;

  font-weight: 600;

  cursor: pointer;

  transition: all .3s ease;

  display: flex;

  align-items: center;

  justify-content: center;
}

/* BUY BUTTON */

button {

  background: var(--primary);

  color: white;
}

button:hover {

  background: var(--primary-dark);

  transform: translateY(-2px);

  box-shadow:
    0 10px 20px rgba(16,185,129,.25);
}

button:active {

  transform: scale(.97);
}

/* EDIT BUTTON */

.edit-btn {

  background: #f3f4f6;

  color: #111;
}

.edit-btn:hover {

  background: #e5e7eb;

  transform: translateY(-2px);
}

/* ====================
   STATES
==================== */

.message {

  text-align: center;

  padding: 4rem;
}

.error {

  color: crimson;
}

/* ====================
   RESPONSIVE
==================== */

@media (max-width: 900px) {

  .product-detail {

    grid-template-columns: 1fr;

    gap: 2rem;
  }

  .info h1 {

    font-size: 2.2rem;
  }

  .price {

    font-size: 2rem;
  }

  .actions {

    flex-direction: column;
  }

  button,
  .edit-btn {

    width: 100%;
  }
}
</style>