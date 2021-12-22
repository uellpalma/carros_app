import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

type HeaderProps = {
  title: string
  logout: () => void
}

const Header = ({ title, logout }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>

      <Button
        icon="exit-to-app"
        style={{ elevation: 0, borderRadius: 50 }}
        theme={{
          colors: { primary: 'rgba(0, 0, 0, .1)' }
        }}
        mode="contained"
        onPress={logout}
      >
        Sair
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 15,
    paddingVertical: 30,
    backgroundColor: '#48bfdd',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold'
  }
})

export default Header
