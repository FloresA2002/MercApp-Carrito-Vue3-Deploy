<template>

  <div class="card">

    <!-- Imagen -->
    <img
      :src="product.imageUrl"
      :alt="product.name"
      class="product-image"
    />

    <!-- Información -->
    <h3>{{ product.name }}</h3>

    <p class="description">
      {{ shortDescription }}
    </p>

    <p class="price">
      ${{ product.price }}
    </p>

    <p class="stock">
      Stock: {{ product.stock }}
    </p>

    <!-- Botones -->
    <div class="actions">

      <button @click="handleAddToCart">
        Añadir
      </button>

      <router-link
        :to="`/product/${product.id}`"
        class="detail-link"
      >
        Ver detalle
      </router-link>

    </div>

  </div>

</template>

<script setup>

import { computed } from 'vue'

// =====================
// PROPS
// =====================

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// =====================
// EMITS
// =====================

const emit = defineEmits([
  'added-to-cart'
])

// =====================
// COMPUTED
// =====================

const shortDescription = computed(() => {

  if (
    props.product.description.length > 80
  ) {
    return (
      props.product.description.slice(0, 80)
      + '...'
    )
  }

  return props.product.description
})

// =====================
// EVENTO PERSONALIZADO
// =====================

const handleAddToCart = () => {

  emit(
    'added-to-cart',
    props.product
  )
}

</script>

<style scoped>

.card {

  background: white;

  border-radius: 12px;

  padding: 1rem;

  box-shadow:
    0 2px 8px rgba(0,0,0,.1);

  display: flex;
  flex-direction: column;

  gap: .8rem;

  transition: .2s;
}

.card:hover {

  transform: translateY(-3px);
}

.product-image {

  width: 100%;
  height: 220px;

  object-fit: cover;

  border-radius: 8px;
}

.description {

  color: #666;

  min-height: 50px;
}

.price {

  font-size: 1.2rem;
  font-weight: bold;
}

.stock {

  color: #555;
}

.actions {

  display: flex;

  gap: .5rem;

  margin-top: auto;
}

button {

  flex: 1;

  padding: .7rem;

  border: none;

  background: #222;

  color: white;

  border-radius: 6px;

  cursor: pointer;
}

.detail-link {

  flex: 1;

  text-align: center;

  padding: .7rem;

  background: #eee;

  border-radius: 6px;
}

</style>