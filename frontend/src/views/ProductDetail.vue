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

    <!-- Imagen -->
    <img
      :src="product.imageUrl"
      :alt="product.name"
      class="image"
    />

    <!-- Información -->
    <div class="info">

      <h1>{{ product.name }}</h1>

      <p class="description">
        {{ product.description }}
      </p>

      <h2 class="price">
        ${{ product.price }}
      </h2>

      <p>
        Categoría:
        {{ categoryName }}
      </p>

      <p>
        Stock:
        {{ product.stock }}
      </p>

     <button @click="addToCart(product)">
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
      `http://localhost:3000/api/products/${route.params.id}`
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
        'http://localhost:3000/api/categories'
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
    repeat(auto-fit, minmax(300px, 1fr));

  gap: 2rem;

  align-items: start;
}

.image {

  width: 100%;

  border-radius: 12px;
}

.info {

  display: flex;

  flex-direction: column;

  gap: 1rem;
}

.description {

  line-height: 1.6;
}

.price {

  font-size: 2rem;
}

button {

  width: fit-content;

  padding: .8rem 1.5rem;

  border: none;

  background: #222;

  color: white;

  border-radius: 8px;

  cursor: pointer;
}

.message {

  padding: 2rem;

  text-align: center;
}

.error {

  color: red;
}
.edit-btn {

  width: fit-content;

  padding: .8rem 1.5rem;

  background: #eee;

  border-radius: 8px;
}

</style>