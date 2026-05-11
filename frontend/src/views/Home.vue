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

  font-size: 2.4rem;

  margin-bottom: 2rem;

  font-weight: 700;
}

.filters {

  display: grid;

  grid-template-columns:
    1fr 250px;

  gap: 1rem;

  margin-bottom: 2rem;
}

.products-grid {

  display: grid;

  grid-template-columns:
    repeat(auto-fill, 280px);

  gap: 2rem;

  justify-content: center;
}

.message {

  padding: 3rem;

  text-align: center;

  color: var(--text-light);
}

.error {

  color: crimson;
}

.new-product-btn {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  margin-bottom: 2rem;

  background: var(--primary);

  color: white;

  padding: .9rem 1.4rem;

  border-radius: 12px;

  font-weight: 600;

  transition: all .3s ease;
}

.new-product-btn:hover {

  background: var(--primary-dark);

  transform: translateY(-2px);
}

@media (max-width: 768px) {

  .filters {
    grid-template-columns: 1fr;
  }
}


</style>