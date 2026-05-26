import { ref } from 'vue'

import { API_URL } from '@/config/api'

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
  `${API_URL}/api/products`
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
  `${API_URL}/api/categories`
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