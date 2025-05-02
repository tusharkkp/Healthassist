import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DiagnosisProvider } from './context/DiagnosisContext';
import { XrayProvider } from './context/XrayContext';
import { ChatbotProvider } from './context/ChatbotContext';
import { PrivateRoute } from './utils/PrivateRoute';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { SymptomsPage } from './pages/SymptomsPage';
import { XrayPage } from './pages/XrayPage';
import { HistoryPage } from './pages/HistoryPage';
import { BloodTestPage } from './pages/BloodTestPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DiagnosisProvider>
          <XrayProvider>
            <ChatbotProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                
                {/* Protected routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/symptoms" element={<SymptomsPage />} />
                  <Route path="/xray" element={<XrayPage />} />
                  <Route path="/blood-test" element={<BloodTestPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                </Route>
                
                {/* Catch all */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </ChatbotProvider>
          </XrayProvider>
        </DiagnosisProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;