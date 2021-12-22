import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const api = axios.create({
	baseURL: 'http://localhost:8181/'
})

api.interceptors.request.use(async (config) => {
	const token = await AsyncStorage.getItem('@userToken&EasyCarrosApp')

	if (token)
		config.headers.common['Authorization'] = `Bearer ${token}`

	return config
}, (error) => {

	return Promise.reject(error)
})

export default api