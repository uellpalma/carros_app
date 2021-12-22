import React, { memo } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import { Vehicles } from '../../screens/vehicles'

interface Vehicle extends Vehicles {
  onDelete: () => void
}

const Vehicle = ({ plate, onDelete }: Vehicle) => {
  return (
    <View style={styles.vehicleCard}>
      <Image
        style={styles.vehicleCardImage}
        source={require('../../resources/img/carro.png')}
      />
      <View style={styles.vehicleCardText}>
        <Text style={styles.vehiclePlateLabel}>Placa</Text>
        <Text style={styles.vehiclePlate}>{plate}</Text>
      </View>

      <IconButton
        style={styles.iconDelete}
        icon="close"
        color="#999"
        size={20}
        onPress={onDelete}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  vehicleCard: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  vehicleCardImage: {
    width: 100,
    height: 51
  },
  vehicleCardText: {
    marginLeft: 15
  },
  vehiclePlateLabel: {
    fontSize: 15,
    color: '#999'
  },
  vehiclePlate: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(0,0,0,.6)'
  },
  iconDelete: {
    position: 'absolute',
    right: 0
  }
})

export default memo(Vehicle)
