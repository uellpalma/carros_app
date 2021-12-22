import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { IconButton } from 'react-native-paper'

export default function EmptyContent({ icon, title, subtitle }) {
  return(
    <View style={styles.container}>
      <IconButton
        icon={icon}
        color="#999"
        size={80}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#999' 
  },
  subtitle: { 
    fontSize: 16,
    color: '#999'
  }
})