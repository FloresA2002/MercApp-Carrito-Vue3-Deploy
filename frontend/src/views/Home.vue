<template>

  <div>

    <h1 class="title">
      Catálogo de Productos
    </h1>

    <router-link
  to="/product/new"
  class="new-product-btn"
>
  Nuevo Producto
</router-link>

    <!-- FILTROS -->
    <div class="filters">

      <input
        v-model="search"
        type="text"
        placeholder="Buscar por nombre o descripción..."
      />

      <select v-model="selectedCategory">

        <option value="">
          Todas las categorías
        </option>

        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>

      </select>

    </div>

    <!-- LOADING -->
    <div v-if="loading" class="message">
      Cargando productos...
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="message error">
      {{ error }}
    </div>

    <!-- SIN RESULTADOS -->
    <div
      v-else-if="filteredProducts.length === 0"
      class="message"
    >
      No se encontraron productos.
    </div>

    <!-- PRODUCTOS -->
    <div v-else class="products-grid">
<ProductCard
  v-for="product in filteredProducts"
  :key="product.id"
  :product="product"
  @added-to-cart="addToCart"
/>

    </div>

  </div>

</template>

<script setup>

import {
  ref,
  computed,
  onMounted
} from 'vue'

import ProductCard from '@/components/ProductCard.vue'

import {
  useProducts
} from '@/composables/useProducts'

import {
  useCart
} from '@/composables/useCart'

// ====================
// ESTADO REACTIVO
// ====================

const {
  products,
  categories,
  loading,
  error,
  fetchProducts,
  fetchCategories
} = useProducts()

const search = ref('')
const selectedCategory = ref('')

// ====================
// FETCH DATA
// ====================

const fetchData = async () => {

  await fetchProducts()

  await fetchCategories()
}

onMounted(fetchData)

// ====================
// COMPUTED FILTRADO
// ====================

const filteredProducts = computed(() => {

  return products.value.filter(product => {

    // Buscar por nombre o descripción
    const matchesSearch =

      product.name
        .toLowerCase()
        .includes(search.value.toLowerCase())

      ||

      product.description
        .toLowerCase()
        .includes(search.value.toLowerCase())

    // Filtro categoría
    const matchesCategory =

      !selectedCategory.value

      ||

      product.categoryId ==
      selectedCategory.value

    return (
      matchesSearch &&
      matchesCategory
    )
  })
})

// ====================
// EVENTO CARRITO
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

</script>

<style scoped>

.title {
  margin-bottom: 1.5rem;
}

.filters {

  display: flex;
  gap: 1rem;

  margin-bottom: 2rem;

  flex-wrap: wrap;
}

input,
select {

  padding: .8rem;

  border: 1px solid #ccc;

  border-radius: 8px;

  flex: 1;
}

.products-grid {

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));

  gap: 1.5rem;
}

.message {

  padding: 2rem;

  text-align: center;
}

.error {

  color: red;
}
.new-product-btn {

  display: inline-block;

  margin-bottom: 1.5rem;

  padding: .8rem 1.2rem;

  background: #222;

  color: white;

  border-radius: 8px;
}

</style>