import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme.js';

const DarkModeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Light mode' : 'Dark mode'}
    >
      <div className="relative w-5 h-5">
        <FaSun
          className={`absolute inset-0 text-yellow-500 transition-all duration-300 ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
            }`}
        />
        <FaMoon
          className={`absolute inset-0 text-gray-500 transition-all duration-300 ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
            }`}
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
