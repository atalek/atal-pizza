import { CartItem, MenuItem as MenuItemType } from '~/types'

export const useCart = () => {
  const cartItems = ref<CartItem[]>([])

  const totalItems = computed(() =>
    cartItems.value.reduce((acc, item) => {
      return acc + item.qty
    }, 0)
  )

  const totalPrice = computed(() =>
    cartItems.value.reduce((acc, item) => {
      let productPrice = item.product.basePrice
      // Add price of size if selected
      if (item.size) {
        productPrice += item.size.extraPrice
      }
      // Add price of each extra ingredient
      const extraIngredientsPrice =
        item.extraIngredients?.reduce((acc, ingredient) => {
          return acc + ingredient.extraPrice
        }, 0) || 0
      productPrice += extraIngredientsPrice
      return acc + productPrice * item.qty
    }, 0)
  )

  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      cartItems.value = JSON.parse(storedCart)
    }
  }

  function addItemToCart(item: MenuItemType) {
    const existingItem = cartItems.value.find(i => i.product._id === item._id)
    if (existingItem) {
      existingItem.qty++
    } else {
      const newItem = { product: item, qty: 1 }
      cartItems.value.push(newItem)
    }

    saveCartToLocalStorage()
  }

  function removeItemFromCart(item: MenuItemType) {
    const existingItemIndex = cartItems.value.findIndex(
      i => i.product._id === item._id
    )
    if (existingItemIndex !== -1) {
      cartItems.value.splice(existingItemIndex, 1)
    }
    saveCartToLocalStorage()
  }

  function clearCart() {
    localStorage.removeItem('cart')
    cartItems.value = []
  }

  return {
    cartItems,
    totalItems,
    totalPrice,
    saveCartToLocalStorage,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    loadCartFromLocalStorage,
  }
}
