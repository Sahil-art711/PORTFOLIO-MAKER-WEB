import { useAuth } from '../contexts/AuthContext';

type HeaderProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

export const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      onNavigate('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1150px] mx-auto flex items-center justify-between px-5 py-3.5">
        <div className="font-extrabold tracking-tight text-xl cursor-pointer" onClick={() => onNavigate('home')}>
          Portfolio Hub
        </div>
        <nav className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className={`text-sm font-semibold transition-colors ${
              currentPage === 'home' ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            Home
          </button>
          {user && (
            <>
              <button
                onClick={() => onNavigate('builder')}
                className={`text-sm font-semibold transition-colors ${
                  currentPage === 'builder' ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                Create
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`text-sm font-semibold transition-colors ${
                  currentPage === 'dashboard' ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('portfolio')}
                className={`text-sm font-semibold transition-colors ${
                  currentPage === 'portfolio' ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                Portfolio
              </button>
            </>
          )}
          {user ? (
            <button
              onClick={handleSignOut}
              className="text-sm font-semibold text-white/60 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className={`text-sm font-semibold transition-colors ${
                currentPage === 'login' ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
