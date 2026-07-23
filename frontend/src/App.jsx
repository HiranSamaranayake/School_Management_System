import React from 'react';
import { AuthProvider } from './app/context/AuthContext';
import { ToastProvider } from './app/context/ToastContext';
import { NotificationProvider } from './app/context/NotificationContext';
import { QuickCreateProvider } from './app/context/QuickCreateContext';
import { AppRouter } from './app/router/AppRouter';

export function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <NotificationProvider>
          <QuickCreateProvider>
            <AppRouter />
          </QuickCreateProvider>
        </NotificationProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
