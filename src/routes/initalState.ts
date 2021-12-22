type InitialState = {
  isLoading: boolean
  isSignout: boolean
  userToken: string | null
}

export const initialState: InitialState = {
  isLoading: true,
  isSignout: false,
  userToken: null
}
