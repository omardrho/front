import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserProvider from './contexts/userContext';
import TaskProvider from './contexts/taskContext';
import RouterProvider from './contexts/RouterContext';
import MyThemeProvider from './contexts/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MyThemeProvider>
    <RouterProvider>
      <UserProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </UserProvider>
    </RouterProvider>
  </MyThemeProvider>

);

