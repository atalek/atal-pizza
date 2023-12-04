type UserInfoResponse = {
  userInfo: {
    admin: boolean
  }
}

export const useIsAdmin = async () => {
  const { data, pending, refresh } = await useFetch('/api/profile', {
    transform(input: UserInfoResponse): boolean {
      return input.userInfo.admin
    },
  })

  return { data, pending, refresh }
}
