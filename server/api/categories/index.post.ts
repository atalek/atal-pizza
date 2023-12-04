export default defineEventHandler(async event => {
  const body = await readBody<{ name: string }>(event)
  console.log(body)
  if (body) {
    const category = await Category.create({ name: body.name })
    return category
  }
})
