export default defineEventHandler(async event => {
  const body = event.context.params
  const menuItem = await MenuItem.findById({ _id: body?.id })

  return menuItem
})
