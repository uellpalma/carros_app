import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Logo from '../logo'

const SplachScreen = () => {
  return (
    <View style={styles.container}>
      <Logo />

      <Text style={styles.loadingText}>Aquecendo os motores...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  loadingText: {
    fontSize: 15,
    color: '#666',
    position: 'absolute',
    bottom: 20
  }
})

export default SplachScreen
