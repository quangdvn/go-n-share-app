import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';
import * as yup from 'yup';
import { COLORS, FONTS } from '../constants/theme';

const initialState = {
  username: '',
  password: '',
};

const logInSchema = yup.object().shape({
  username: yup
    .string()
    .label('Tên đăng nhập')
    .trim()
    .min(5, 'Tên đăng nhập độ dài từ 5 đến 20')
    .max(20, 'Tên đăng nhập độ dài từ 5 đến 20')
    .required('Tên đăng nhập không để trống'),
  password: yup
    .string()
    .label('Mật khẩu')
    .trim()
    .min(5, 'Mật khẩu độ dài từ 5 đến 20')
    .max(20, 'Mật khẩu độ dài từ 5 đến 20')
    .required('Mật khẩu không để trống'),
});

const LogInForm = ({ handleSubmit, borderColor, handleFocus, spinner }) => {
  return (
    <Formik
      initialValues={initialState}
      onSubmit={(values, action) => {
        Keyboard.dismiss();
        action.resetForm();
        handleSubmit(values);
      }}
      validationSchema={logInSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
        errors,
        touched,
      }) => (
        <View>
          <TextInput
            placeholder='Tên đăng nhập'
            autoCapitalize='none'
            autoCompleteType='off'
            autoCorrect={false}
            onFocus={() => handleFocus('username')}
            onChangeText={handleChange('username')}
            value={values.username}
            onBlur={handleBlur('username')}
            style={{
              ...styles.input,
              borderColor: borderColor === 'username' ? COLORS.valid : '#ddd',
              color: borderColor === 'username' ? COLORS.valid : 'gray',
            }}
          />

          <Text style={styles.error}>
            {touched.username && errors.username}
          </Text>

          <TextInput
            placeholder='Mật khẩu'
            autoCapitalize='none'
            autoCompleteType='off'
            onFocus={() => handleFocus('password')}
            secureTextEntry
            onChangeText={handleChange('password')}
            value={values.password}
            onBlur={handleBlur('password')}
            style={{
              ...styles.input,
              borderColor: borderColor === 'password' ? COLORS.valid : '#ddd',
              color: borderColor === 'password' ? COLORS.valid : 'gray',
            }}
          />

          <Text style={styles.error}>
            {touched.password && errors.password}
          </Text>

          <LinearGradient
            colors={COLORS.gradient}
            start={[1.5, 0]}
            end={[0, 0.5]}
            style={
              isValid
                ? styles.button
                : {
                    ...styles.button,
                    opacity: 0.7,
                  }
            }>
            <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
              {spinner ? (
                <ActivityIndicator
                  style={styles.spinner}
                  size='small'
                  color='white'
                />
              ) : (
                <Text style={styles.buttonText}>Đăng nhập</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    height: 50,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 30,
    fontSize: 14,
    borderRadius: 6,
  },
  spinner: {
    paddingTop: 10,
  },
  buttonText: {
    color: 'white',
    ...FONTS.h3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  button: {
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginHorizontal: 15,
    marginTop: 20,
  },
  loading: {
    marginTop: 40,
  },
  error: {
    color: 'crimson',
    ...FONTS.body3,
    marginHorizontal: 30,
    textAlign: 'left',
  },
});

export default LogInForm;
