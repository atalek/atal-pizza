export default defineEventHandler(async event => {
  const menuItems = await MenuItem.find()

  return menuItems
})
