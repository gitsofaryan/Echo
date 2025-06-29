import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { CreatePersona } from './pages/CreatePersona';
import { PersonaDetail } from './pages/PersonaDetail';
import { Chat } from './pages/Chat';
import { VideoCall } from './pages/VideoCall';
import { PrebuiltPersonas } from './pages/PrebuiltPersonas';
import { PrebuiltChat } from './pages/PrebuiltChat';
import { PrebuiltVideo } from './pages/PrebuiltVideo';
import { Privacy } from './pages/Privacy';
import { Support } from './pages/Support';
import { About } from './pages/About';
import { Pricing } from './pages/Pricing';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
      retry: 2,
    },
  },
});

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="create-persona" element={<CreatePersona />} />
                <Route path="personas/:id" element={<PersonaDetail />} />
                <Route path="chat/:id" element={<Chat />} />
                <Route path="call/:id" element={<VideoCall />} />
                <Route path="prebuilt-personas" element={<PrebuiltPersonas />} />
                <Route path="prebuilt-chat/:id" element={<PrebuiltChat />} />
                <Route path="prebuilt-video/:id" element={<PrebuiltVideo />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="support" element={<Support />} />
                <Route path="about" element={<About />} />
                <Route path="pricing" element={<Pricing />} />
              </Route>
            </Routes>
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                  border: '1px solid var(--toast-border)',
                },
              }}
            />
          </div>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;