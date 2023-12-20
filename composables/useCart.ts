import { toast } from 'vue3-toastify'
import { MenuItem as MenuItemType, ExtraStuff } from '~/types'

const cartItems = ref<MenuItemType[]>([])

const totalPrice = computed(() =>
  cartItems.value.reduce((acc, item) => {
    const productPrice =
      item.basePrice +
      (item.sizes?.reduce((acc, size) => acc + size.extraPrice, 0) || 0) +
      (item.extraIngredients?.reduce(
        (acc, ingredient: ExtraStuff) => acc + ingredient.extraPrice,
        0
      ) || 0)

    return acc + productPrice
  }, 0)
)

export const useCart = () => {
  const totalItems = computed(() => {
    return cartItems.value.length
  })
  function cartProductPrice(cartProduct: MenuItemType): number {
    let price = cartProduct.basePrice

    if (cartProduct.sizes) {
      for (const size of cartProduct.sizes) {
        price += size.extraPrice
      }
    }

    if (
      cartProduct.extraIngredients &&
      cartProduct.extraIngredients.length > 0
    ) {
      for (const extra of cartProduct.extraIngredients) {
        price += extra.extraPrice
      }
    }

    return price
  }

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
    cartItems.value.push(item)

    saveCartToLocalStorage()
  }

  function removeItemFromCart(item: MenuItemType) {
    const existingItemIndex = cartItems.value.findIndex(i => i._id === item._id)
    if (existingItemIndex !== -1) {
      cartItems.value.splice(existingItemIndex, 1)
    }
    toast.success('Product removed')
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
    cartProductPrice,
    saveCartToLocalStorage,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    loadCartFromLocalStorage,
  }
}
