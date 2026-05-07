import {
  ref,
  onUnmounted
} from 'vue'

export function useApi() {

  // ====================
  // ESTADOS
  // ====================

  const data = ref(null)

  const loading = ref(false)

  const error = ref(null)

  // ====================
  // ABORT CONTROLLER
  // ====================

  let controller = new AbortController()

  // ====================
  // FETCH
  // ====================

  const request = async (
    url,
    options = {},
    retry = true
  ) => {

    loading.value = true

    error.value = null

    try {

      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })

      if (!response.ok) {

        throw new Error(
          `Error ${response.status}`
        )
      }

      data.value =
        await response.json()

    } catch (err) {

      // Cancelación
      if (err.name === 'AbortError') {

        error.value =
          'Petición cancelada'

      } else {

        // Reintento simple
        if (retry) {

          console.warn(
            'Reintentando petición...'
          )

          return request(
            url,
            options,
            false
          )
        }

        error.value = err.message
      }

    } finally {

      loading.value = false
    }
  }

  // ====================
  // CANCEL REQUEST
  // ====================

  const cancel = () => {

    controller.abort()

    controller = new AbortController()
  }

  // ====================
  // CLEANUP
  // ====================

  onUnmounted(() => {

    cancel()
  })

  return {

    data,

    loading,

    error,

    request,

    cancel
  }
}