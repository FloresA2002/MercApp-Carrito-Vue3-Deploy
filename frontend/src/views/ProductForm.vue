<template>

  <div class="form-container">

    <h1>
      {{ isEdit ? 'Editar' : 'Nuevo' }}
      Producto
    </h1>

    <form @submit.prevent="handleSubmit">

      <!-- NOMBRE -->
      <div class="field">

        <label>Nombre</label>

        <input
          v-model="form.name"
          type="text"
        />

        <p v-if="errors.name" class="error">
          {{ errors.name }}
        </p>

      </div>

      <!-- DESCRIPCIÓN -->
      <div class="field">

        <label>Descripción</label>

        <textarea
          v-model="form.description"
        />

      </div>

      <!-- PRECIO -->
      <div class="field">

        <label>Precio</label>

        <input
          v-model.number="form.price"
          type="number"
          min="0"
          step="0.01"
        />

        <p v-if="errors.price" class="error">
          {{ errors.price }}
        </p>

      </div>

      <!-- IMAGEN -->
      <div class="field">

        <label>URL Imagen</label>

        <input
          v-model="form.imageUrl"
          type="text"
        />

        <p v-if="errors.imageUrl" class="error">
          {{ errors.imageUrl }}
        </p>

      </div>

      <!-- CATEGORÍA -->
      <div class="field">

        <label>Categoría</label>

        <select
          v-model.number="form.categoryId"
        >

          <option value="">
            Seleccione
          </option>

          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>

        </select>

        <p
          v-if="errors.categoryId"
          class="error"
        >
          {{ errors.categoryId }}
        </p>

      </div>

      <!-- STOCK -->
      <div class="field">

        <label>Stock</label>

        <input
          v-model.number="form.stock"
          type="number"
          min="0"
        />

        <p v-if="errors.stock" class="error">
          {{ errors.stock }}
        </p>

      </div>

      <button type="submit">

        {{ isEdit
          ? 'Actualizar'
          : 'Crear'
        }}

      </button>

    </form>

  </div>

</template>

<script setup>

import {
  ref,
  reactive,
  computed,
  onMounted
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import { API_URL } from '@/config/api'

// ====================
// ROUTER
// ====================

const route = useRoute()

const router = useRouter()

// ====================
// EDIT MODE
// ====================

const isEdit = computed(() =>
  !!route.params.id
)

// ====================
// FORM
// ====================

const form = reactive({

  name: '',

  description: '',

  price: 0,

  imageUrl: '',

  categoryId: '',

  stock: 0
})

// ====================
// ERRORS
// ====================

const errors = reactive({})

// ====================
// CATEGORIES
// ====================

const categories = ref([])

// ====================
// LOAD CATEGORIES
// ====================

const fetchCategories = async () => {

  const response = await fetch(
  `${API_URL}/api/categories`
)

  categories.value =
    await response.json()
}

// ====================
// LOAD PRODUCT (EDIT)
// ====================

const fetchProduct = async () => {

  if (!isEdit.value) return

  const response = await fetch(
  `${API_URL}/api/products/${route.params.id}`
)

  const product =
    await response.json()

  Object.assign(form, product)
}

// ====================
// VALIDATION
// ====================

const validate = () => {

  // limpiar errores
  Object.keys(errors)
    .forEach(key => delete errors[key])

  // Nombre
  if (!form.name.trim()) {

    errors.name =
      'El nombre es obligatorio'
  }

  // Precio
  if (
    form.price <= 0 ||
    isNaN(form.price)
  ) {

    errors.price =
      'El precio debe ser mayor a 0'
  }

  // Categoría
  if (!form.categoryId) {

    errors.categoryId =
      'Seleccione una categoría'
  }

  // Stock
  if (
    form.stock < 0 ||
    isNaN(form.stock)
  ) {

    errors.stock =
      'El stock no puede ser negativo'
  }

  // URL imagen
  try {

    new URL(form.imageUrl)

  } catch {

    errors.imageUrl =
      'Ingrese una URL válida'
  }

  return (
    Object.keys(errors).length === 0
  )
}

// ====================
// SUBMIT
// ====================

const handleSubmit = async () => {

  if (!validate()) return

  const url = isEdit.value

    ? `${API_URL}/api/products/${route.params.id}`

    : `${API_URL}/api/products`

  const method = isEdit.value
    ? 'PUT'
    : 'POST'

  await fetch(url, {

    method,

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(form)
  })

  alert(
    isEdit.value
      ? 'Producto actualizado'
      : 'Producto creado'
  )

  router.push('/')
}

// ====================
// INIT
// ====================

onMounted(async () => {

  await fetchCategories()

  await fetchProduct()
})

</script>

<style scoped>

.form-container {

  max-width: 600px;

  margin: auto;
}

form {

  display: flex;

  flex-direction: column;

  gap: 1rem;
}

.field {

  display: flex;

  flex-direction: column;

  gap: .4rem;
}

input,
textarea,
select {

  padding: .8rem;

  border: 1px solid #ccc;

  border-radius: 8px;
}

button {

  padding: 1rem;

  border: none;

  background: #222;

  color: white;

  border-radius: 8px;

  cursor: pointer;
}

.error {

  color: red;

  font-size: .9rem;
}

</style>