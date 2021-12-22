import React, { useContext, useCallback } from 'react'
import { View, Alert, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
import { Formik, FormikHelpers } from 'formik'
import { string, object, SchemaOf } from 'yup'

import { AppContextInterface, AuthContext } from '../../services/AuthContext'
import api from '../../services/api'
import { Logo, InputGroup } from '../../components'

interface FormValues {
  email: string
  pass: string
}

const LoginSchema: SchemaOf<FormValues> = object().shape({
  email: string()
    .email('Email invalido')
    .required('Digite um email'),
  pass: string()
    .min(6, 'Senha muito curta')
    .required('Digite sua senha')
})

export default function LoginScreen() {
  const contextAuth = useContext<AppContextInterface | null>(AuthContext)
  const initialValues: FormValues = { email: '', pass: '' }

  const login = useCallback(
    (values: FormValues, { setFieldValue }: FormikHelpers<FormValues>) => {
      const { email, pass } = values

      api
        .post('auth', {
          email,
          password: pass
        })
        .then(resp => {
          let data = resp.data.data
          setTokenStorage(data.token)
        })
        .catch(() => {
          Alert.alert(
            'Ops!',
            'Sua senha ou email está incorreto!',
            [
              {
                text: 'Tentar novamente',
                onPress: () => setFieldValue('pass', '')
              }
            ],
            { cancelable: false }
          )
        })
    },
    []
  )

  async function setTokenStorage(token: string) {
    try {
      await AsyncStorage.setItem('@userToken&EasyCarrosApp', token)

      contextAuth!.signIn({ token })
    } catch (error) {
      //
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.contentLogin}>
          <Logo />

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            enableReinitialize={true}
            onSubmit={login}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched
            }) => (
              <View>
                <InputGroup
                  label="Email"
                  mode="flat"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  underlineColor="#DDD"
                  error={(errors.email && touched.email) || false}
                  errorMessage={errors.email}
                />

                <InputGroup
                  label="Senha"
                  mode="flat"
                  value={values.pass}
                  secureTextEntry={true}
                  maxLength={100}
                  underlineColor="#DDD"
                  onChangeText={handleChange('pass')}
                  onBlur={handleBlur('pass')}
                  error={(errors.pass && touched.pass) || false}
                  errorMessage={errors.pass}
                />

                <Button
                  contentStyle={{ paddingVertical: 6 }}
                  style={styles.button}
                  mode="contained"
                  dark={true}
                  theme={{ colors: { primary: '#48bfdd' } }}
                  onPress={handleSubmit}
                >
                  Entrar
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  contentLogin: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  contentInput: {
    marginBottom: 10
  },
  button: {
    elevation: 0,
    marginTop: 20
  }
})
