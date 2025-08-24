import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter } from 'lucide-react';
import HexagonOrb3D from './HexagonOrb3D';
import StarField from './StarField';

const Home: React.FC = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time for Chisinau timezone
  const formatChisinauTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      timeZone: 'Europe/Chisinau',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <StarField />
      
      {/* Live Time Display */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
          <span className="text-white/80 text-sm font-mono">
            {formatChisinauTime(currentTime)}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-8 max-w-2xl mx-auto">
        {/* Hexagon with Orb */}
        <div className="mb-8">
          <HexagonOrb3D />
        </div>

        {/* Main Text */}
        <p className="text-white text-lg md:text-xl text-center leading-relaxed font-light tracking-wide opacity-90">
          We explore the passage of the soul, its trials, and the light that follows.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 mt-10">
          {/* X/Twitter Button */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-8 h-8 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
          >
            <Twitter 
              size={14} 
              className="text-white group-hover:text-blue-300 transition-colors duration-300" 
            />
          </a>

          {/* The Revival Button */}
          <Link
            to="/revival"
            className="px-4 py-1.5 border border-white/30 rounded-full text-white text-xs font-medium hover:border-white/60 hover:bg-white/5 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            The Revival
          </Link>

          {/* About Button */}
          <Link
            to="/about"
            className="px-4 py-1.5 border border-white/30 rounded-full text-white text-xs font-medium hover:border-white/60 hover:bg-white/5 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;