import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Auth } from './components/Auth';
import { Builder } from './components/Builder';
import { Dashboard } from './components/Dashboard';
import { Portfolio } from './components/Portfolio';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, loading } = useAuth();

  const handleNavigate = (page: string) => {
    if (!user && ['builder', 'dashboard', 'portfolio'].includes(page)) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f14] flex items-center justify-center">
        <p className="text-white/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
      {currentPage === 'login' && <Auth onNavigate={handleNavigate} />}
      {currentPage === 'builder' && <Builder onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'portfolio' && <Portfolio />}

      <footer className="max-w-[1150px] mx-auto mt-16 px-5 py-6 text-white/60 text-center text-sm">
        © 2025 Portfolio Maker — Built for developers •{' '}
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        {' · '}
        <a href="#" className="hover:text-white transition-colors">Terms</a>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
