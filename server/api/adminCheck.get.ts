export default defineEventHandler(async event => {
  const loggedInUser = event.context.loggedInUser

  if (loggedInUser) {
    return loggedInUser.admin
  } else {
    return false
  }
})
