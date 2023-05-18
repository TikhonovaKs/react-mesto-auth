import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Authentication from './Authentication';
import * as auth from '../utils/auth.js';

function Register({}) {
  // Состояние формы:
  // Здесь используется хук useState, чтобы создать состояние formValue, которое представляет 
  // значения полей формы регистрации (электронная почта, пароль). 
  // setFormValue является функцией, используемой для обновления состояния formValue.
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  // Состояние сообщения об ошибке:
  const [errorMessage, setErrorMessage] = useState('');

  // вызываем useNavigate(), чтобы получить доступ к функции navigate, 
  // которую можем использовать для перехода на другие страницы.
  const navigate = useNavigate();

  // Обработчик изменения полей формы:
  // Функция handleChange принимает объект события в качестве аргумента. 
  // Объект события содержит информацию о произошедшем событии, в данном случае, изменении значения поля формы.
  // С помощью деструктуризации const { name, value } = e.target; 
  // извлекаются свойства name и value из объекта e.target. 
  // Свойство name содержит имя поля формы, а value содержит новое значение, введенное пользователем.
  // Затем используется функция setFormValue для обновления состояния formValue. 
  // С помощью синтаксиса расширения объекта (...formValue) создается новый объект, 
  // который содержит все предыдущие значения полей формы. 
  // Затем с использованием квадратных скобок [name] и оператора расширения value обновляется 
  // значение соответствующего поля формы. Это позволяет динамически обновлять только измененное поле, 
  // сохраняя остальные поля неизменными.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  // Обработчик отправки формы:
  const handleSubmit = (e) => {
    e.preventDefault();

    // извлекаются значения email и password из состояния formValue. 
    const { email, password } = formValue;

    // Вызывается функция duckAuth.register (Api) 
    // для регистрации пользователя с переданными данными. Если регистрация проходит успешно, 
    // происходит перенаправление на страницу входа (navigate('/login')). 
    // Если происходит ошибка, сообщение об ошибке устанавливается в состояние errorMessage.
    auth.register(password, email)
      .then(data => {
        navigate('/sing-in');
      })
      .catch(err => setErrorMessage(err));
  }

  return (
    <Authentication 
      authenticationName="register"
      authenticationTitle="Регистрация"
      onSubmit={handleSubmit}
      buttonName="Зарегистрироваться"
    >
      <input
        id="email"
        type="email"
        name="email"
        autoComplete="email"
        className="authentication__input authentication__input_data_email"
        required
        minLength="2"
        maxLength="40"
        placeholder="Email"
        value={formValue.email}
        onChange={handleChange}
      />
      <span id="input-email-error" className="error"></span>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        className="authentication__input authentication__input_data_password"
        required
        minLength="2"
        maxLength="200"
        placeholder="Пароль"
        value={formValue.password}
        onChange={handleChange}
      />
      <span id="input-password-error" className="error"></span>
    </Authentication>
  );
}

export default Register;
