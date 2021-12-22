import React, { useEffect, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack'
import AsyncStorage from '@react-native-community/async-storage'

import LoginScreen from '../screens/login'
import VehiclesScreen from '../screens/vehicles'
import { AuthContext } from '../services/AuthContext'
import SplachScreen from '../components/splashScreen'
import { RootStackParamList } from './types'
import { reducer } from './reducer'
import { initialState } from './initalState'

const Stack = createStackNavigator<RootStackParamList>()

export default function Route() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const optionsScreen: StackNavigationOptions = {
    headerShown: false
  }

  useEffect(() => {
    const reloadToken = async () => {
      let userToken: any

      try {
        userToken = await AsyncStorage.getItem('@userToken&EasyCarrosApp')
      } catch (error) {
        dispatch({ type: 'LOGOUT' })
      }

      setTimeout(() => {
        dispatch({ type: 'REFRESH_TOKEN', payload: { token: userToken } })
      }, 1000)
    }

    reloadToken()
  }, [])

  const authContext = useMemo(
    () => ({
      signIn: async ({ token }: { token: string }) => {
        dispatch({ type: 'LOGIN', payload: { token: token } })
      },
      signOut: () => dispatch({ type: 'LOGOUT' })
    }),
    []
  )

  if (state.isLoading) {
    return <SplachScreen />
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={optionsScreen}>
          {state.userToken == null ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <Stack.Screen name="Vehicles" component={VehiclesScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
