type UserInfoResponse = {
  userInfo: {
    admin: boolean
  }
}

export const useIsAdmin = async () => {
  const isAdmin = await $fetch('/api/adminCheck')

  return isAdmin
}
