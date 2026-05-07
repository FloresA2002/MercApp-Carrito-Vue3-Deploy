import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '@/views/Home.vue'

import {
  defineAsyncComponent
} from 'vue'

// ====================
// ASYNC VIEWS
// ====================

const ProductDetail =
  defineAsyncComponent(() =>
    import('@/views/ProductDetail.vue')
  )

const Cart =
  defineAsyncComponent(() =>
    import('@/views/Cart.vue')
  )

  
const About =
 defineAsyncComponent(() =>
    import('@/views/About.vue')
  )

const ProductForm =
  defineAsyncComponent(() =>
    import('@/views/ProductForm.vue')
  )

const NotFound =
  defineAsyncComponent(() =>
    import('@/views/NotFound.vue')
  )

// ====================
// ROUTES
// ====================

const routes = [

  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetail,
    props: true
  },

  {
    path: '/product/new',
    name: 'product-new',
    component: ProductForm
  },

  {
    path: '/product/:id/edit',
    name: 'product-edit',
    component: ProductForm,
    props: true
  },

  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },

  {
    path: '/about',
    name: 'about',
    component: About
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

// ====================
// ROUTER
// ====================

const router = createRouter({

  history: createWebHistory(),

  routes
})

export default router