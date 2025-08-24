import React from 'react';

const HexagonOrb: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Hexagon Shape */}
      <svg
        width="120"
        height="104"
        viewBox="0 0 120 104"
        className="absolute"
      >
        <polygon
          points="60,8 105,30 105,74 60,96 15,74 15,30"
          fill="none"
          stroke="white"
          strokeWidth="1"
          className="opacity-80"
        />
        
        {/* Thin connecting lines */}
        <g className="opacity-40">
          <line x1="60" y1="8" x2="60" y2="52" stroke="white" strokeWidth="0.5" />
          <line x1="105" y1="30" x2="60" y2="52" stroke="white" strokeWidth="0.5" />
          <line x1="105" y1="74" x2="60" y2="52" stroke="white" strokeWidth="0.5" />
          <line x1="60" y1="96" x2="60" y2="52" stroke="white" strokeWidth="0.5" />
          <line x1="15" y1="74" x2="60" y2="52" stroke="white" strokeWidth="0.5" />
          <line x1="15" y1="30" x2="60" y2="52" stroke="white" strokeWidth="0.5" />
        </g>
      </svg>

      {/* Glowing Orb */}
      <div className="relative">
        <div 
          className="w-6 h-6 rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, #87CEEB 0%, #4169E1 70%, transparent 100%)',
            boxShadow: '0 0 20px #87CEEB, 0 0 40px #4169E1, 0 0 60px #4169E1'
          }}
        />
        
        {/* Additional glow layers */}
        <div 
          className="absolute inset-0 w-6 h-6 rounded-full animate-ping"
          style={{
            background: 'radial-gradient(circle, transparent 40%, #87CEEB 70%, transparent 100%)',
            animationDuration: '3s'
          }}
        />
      </div>
    </div>
  );
};

export default HexagonOrb;