import { ref } from 'vue'

import { useApi } from './useApi'

export function useProducts() {

  const api = useApi()

  const products = ref([])

  const categories = ref([])

  // ====================
  // PRODUCTS
  // ====================

  const fetchProducts = async () => {

    await api.request(
      'http://localhost:3000/api/products'
    )

    if (api.data.value) {

      products.value =
        api.data.value
    }
  }

  // ====================
  // CATEGORIES
  // ====================

  const fetchCategories = async () => {

    await api.request(
      'http://localhost:3000/api/categories'
    )

    if (api.data.value) {

      categories.value =
        api.data.value
    }
  }

  return {

    products,

    categories,

    loading: api.loading,

    error: api.error,

    fetchProducts,

    fetchCategories,

    cancel: api.cancel
  }
}