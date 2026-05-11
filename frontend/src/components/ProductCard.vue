<template>

  <div class="card">

    <!-- Imagen -->
    <img
      :src="product.imageUrl"
      :alt="product.name"
      class="image"
    />

    <!-- CONTENIDO -->
    <div class="content">

      <h3 class="title">
        {{ product.name }}
      </h3>

      <p class="description">
        {{ shortDescription }}
      </p>

      <p class="price">
        ${{ product.price }}
      </p>

      <p class="stock">
        Stock: {{ product.stock }}
      </p>

      <!-- BOTONES -->
      <div class="actions">

        <button @click="handleAddToCart">
          Añadir
        </button>

        <router-link
          :to="`/product/${product.id}`"
          class="details-btn"
        >
          Ver detalle
        </router-link>

      </div>

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

  border-radius: 18px;

  overflow: hidden;

  box-shadow:
    0 4px 12px rgba(0,0,0,.05);

  transition: all .3s ease;

  width: 280px;

  display: flex;

  flex-direction: column;
}

.card:hover {

  transform: translateY(-8px);

  box-shadow:
    0 15px 30px rgba(0,0,0,.12);
}

/* ====================
   IMAGE
==================== */

.image {

  width: 100%;

  height: 220px;

  object-fit: cover;

  background: #f3f4f6;
}

/* ====================
   CONTENT
==================== */

.content {

  padding: 1.3rem;

  display: flex;

  flex-direction: column;

  gap: .9rem;

  flex: 1;
}

.title {

  font-size: 1.15rem;

  font-weight: 700;

  color: #111;

  line-height: 1.3;
}

.description {

  color: #666;

  font-size: .95rem;

  line-height: 1.5;

  min-height: 45px;
}

.price {

  font-size: 1.5rem;

  font-weight: 700;

  color: var(--primary);
}

.stock {

  color: #666;

  font-size: .95rem;
}

/* ====================
   ACTIONS
==================== */

.actions {

  display: flex;

  gap: .8rem;

  margin-top: auto;
}

/* ====================
   BUTTONS
==================== */

button,
.details-btn {

  flex: 1;

  height: 46px;

  border: none;

  border-radius: 12px;

  cursor: pointer;

  font-weight: 600;

  font-size: .95rem;

  transition: all .3s ease;

  display: flex;

  align-items: center;

  justify-content: center;
}

/* ADD BUTTON */

button {

  background: var(--primary);

  color: white;
}

button:hover {

  background: var(--primary-dark);

  transform: translateY(-2px);

  box-shadow:
    0 8px 18px rgba(16,185,129,.25);
}

button:active {

  transform: scale(.96);
}

/* DETAILS BUTTON */

.details-btn {

  background: #f3f4f6;

  color: #111;
}

.details-btn:hover {

  background: #e5e7eb;

  transform: translateY(-2px);
}

.details-btn:active {

  transform: scale(.96);
}
</style>