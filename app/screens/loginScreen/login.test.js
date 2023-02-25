import React from 'react';
import LoginScreen from './index';
import {render, fireEvent} from '@testing-library/react-native';
import {connect, useSelector} from 'react-redux';

it('should login', () => {
  const {getByTestId} = render(<LoginScreen />);

  const email = getByTestId('email');
  const password = getByTestId('password');
  const onlogin = getByTestId('login');

  fireEvent.changeText(email, 'venkat@mail.com');

  fireEvent.changeText(password, 'venkat@2022');
  fireEvent.press(onlogin);
});
