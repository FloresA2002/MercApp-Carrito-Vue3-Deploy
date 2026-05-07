import {
  ref,
  computed,
  watch
} from 'vue'

// ====================
// STATE GLOBAL
// ====================

const cartItems = ref(

  JSON.parse(
    localStorage.getItem('cart')
  ) || []
)

// ====================
// COMPOSABLE
// ====================

export function useCart() {

  // ====================
  // ADD
  // ====================

  const addToCart = (product) => {

    const existingItem =
      cartItems.value.find(

        item =>
          item.id === product.id
      )

    if (existingItem) {

      existingItem.quantity++

    } else {

      cartItems.value.push({

        ...product,

        quantity: 1
      })
    }
  }

  // ====================
  // REMOVE
  // ====================

  const removeFromCart = (productId) => {

    cartItems.value =
      cartItems.value.filter(

        item =>
          item.id !== productId
      )
  }

  // ====================
  // INCREASE
  // ====================

  const increaseQuantity = (productId) => {

    const item =
      cartItems.value.find(

        item =>
          item.id === productId
      )

    if (item) {

      item.quantity++
    }
  }

  // ====================
  // DECREASE
  // ====================

  const decreaseQuantity = (productId) => {

    const item =
      cartItems.value.find(

        item =>
          item.id === productId
      )

    if (!item) return

    if (item.quantity > 1) {

      item.quantity--

    } else {

      removeFromCart(productId)
    }
  }

  // ====================
  // TOTAL ITEMS
  // ====================

  const totalItems = computed(() => {

    return cartItems.value.reduce(

      (total, item) =>

        total + item.quantity,

      0
    )
  })

  // ====================
  // TOTAL PRICE
  // ====================

  const totalPrice = computed(() => {

    return cartItems.value.reduce(

      (total, item) =>

        total +
        (item.price * item.quantity),

      0
    )
  })

  // ====================
  // LOCAL STORAGE
  // ====================

  watch(

    cartItems,

    (newCart) => {

      localStorage.setItem(
        'cart',
        JSON.stringify(newCart)
      )
    },

    { deep: true }
  )

  return {

    cartItems,

    addToCart,

    removeFromCart,

    increaseQuantity,

    decreaseQuantity,

    totalItems,

    totalPrice
  }
}