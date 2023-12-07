type MenuItem = {
  name: string
  description: string
  basePrice: string
  image?: string
}

export default defineEventHandler(async event => {
  const body = await readBody<MenuItem>(event)

  if (body) {
    const menuItem = await MenuItem.create(body)
    return menuItem
  }
})
