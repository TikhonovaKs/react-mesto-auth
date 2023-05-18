import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ element: Component, ...props }) => {
  // хук useLocation - хук из React Router для получения текущего пути (pathname) URL. 
  // хук возвращает объект с информацией о текущем местоположении в приложении.
  const { pathname } = useLocation();
  // это тернарный оператор, который проверяет значение свойства loggedIn из props. 
  // Если loggedIn = true, возвращается компонент Component (компонент, переданный в качестве element). 
  // В этом случае, компонент Component будет отображаться со всеми props. 
  // Если loggedIn равно false, то происходит редирект на страницу входа (/login) с использованием компонента Navigate.
  // При редиректе также передается дополнительное состояние (state), в котором указывается backUrl 
  // со значением текущего пути (pathname). 
  // Это позволяет вернуть пользователя на исходную страницу после успешного входа.
  return props.loggedIn ? <Component {...props} /> : <Navigate to='/sign-up' state={{ backUrl: pathname }} />;
}