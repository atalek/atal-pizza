import { toast } from 'vue3-toastify'
import { CartItem, MenuItem as MenuItemType, ExtraStuff } from '~/types'

const cartItems = ref<CartItem[]>([])

const totalPrice = computed(() =>
  cartItems.value.reduce((acc, item) => {
    const productPrice =
      item.product.basePrice +
      (item.product.sizes?.reduce((acc, size) => acc + size.extraPrice, 0) ||
        0) +
      (item.product.extraIngredients?.reduce(
        (acc, ingredient: ExtraStuff) => acc + ingredient.extraPrice,
        0
      ) || 0)

    return acc + productPrice * item.qty
  }, 0)
)

export const useCart = () => {
  const totalItems = computed(() =>
    cartItems.value.reduce((acc, item) => {
      return acc + item.qty
    }, 0)
  )
  function cartProductPrice(cartProduct: MenuItemType): number {
    let price = cartProduct.basePrice

    if (cartProduct.sizes) {
      // Assuming sizes is an array, so need to loop through each size
      for (const size of cartProduct.sizes) {
        price += size.extraPrice
      }
    }

    if (
      cartProduct.extraIngredients &&
      cartProduct.extraIngredients.length > 0
    ) {
      // Loop through each extra ingredient
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
    const existingItem = cartItems.value.find(i => i.product._id === item._id)
    if (existingItem) {
      existingItem.qty++
    } else {
      const newItem: CartItem = { product: item, qty: 1 }
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
