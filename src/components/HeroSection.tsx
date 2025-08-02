import { useState, useEffect } from 'react';

interface HeroSectionProps {
  onOpenChat: () => void;
}

const HeroSection = ({ onOpenChat }: HeroSectionProps) => {
  const [showTyping, setShowTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number}>>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTyping(true);
    }, 1000);

    // Generate initial particles
    const initialParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setParticles(initialParticles);

    // Animate particles
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - 0.5,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.5,
        opacity: particle.y < -50 ? Math.random() * 0.5 + 0.1 : particle.opacity
      })).map(particle => 
        particle.y < -50 ? {
          ...particle,
          y: window.innerHeight + 50,
          x: Math.random() * window.innerWidth
        } : particle
      ));
    };

    const particleInterval = setInterval(animateParticles, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(particleInterval);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-background via-muted/30 to-accent/20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/30 pointer-events-none animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}

      {/* Interactive background elements */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.1), transparent)`,
        }}
      />
      
      <div className="text-center max-w-4xl mx-auto animate-fade-in-slow">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight hover:scale-105 transition-all duration-500 hover:text-primary cursor-default">
          You're not alone.{' '}
          <span className="text-primary animate-pulse">
            Imani
          </span> is here to listen.
        </h1>
        
        {/* Subtext */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed hover:text-foreground transition-colors duration-300">
          Find comfort in a safe space where your feelings matter. 
          Let Imani guide you through difficult moments with compassion and understanding.
        </p>

        {/* Typing Effect */}
        <div className="mb-12 h-8">
          {showTyping && (
            <p className="text-lg text-primary animate-typing inline-block cursor-pointer hover:scale-110 transition-transform duration-300">
              How are you feeling today?
            </p>
          )}
        </div>

        {/* CTA Button */}
        <div className="relative inline-block">
          <button
            onClick={onOpenChat}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-full text-lg shadow-floating hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-float overflow-hidden border-2 border-transparent hover:border-primary/30"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Ripple effect */}
            <div className={`absolute inset-0 bg-white/20 rounded-full transform scale-0 transition-all duration-500 ${isHovering ? 'animate-ping scale-150' : ''}`} />
            <div className={`absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full transform scale-0 transition-all duration-300 ${isHovering ? 'scale-100 opacity-20' : ''}`} />
          
            <span className="flex items-center space-x-2 relative z-10">
              <svg
              className="w-5 h-5 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>Talk to Imani</span>
          </span>
          </button>
        </div>

        {/* Soft Encouragement */}
        <p className="mt-6 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 cursor-default">
          Take a deep breath. Your healing journey starts here. 💛
        </p>
      </div>

      {/* Interactive Floating Elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float hover:scale-150 hover:bg-primary/30 transition-all duration-500 cursor-pointer interactive-element" 
        style={{ animationDelay: '0.5s' }}
        onClick={() => setParticles(prev => [...prev, {
          id: Date.now(),
          x: mousePosition.x,
          y: mousePosition.y,
          size: Math.random() * 6 + 4,
          opacity: 0.8
        }])}
      ></div>
      <div 
        className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float hover:scale-150 hover:bg-secondary/30 transition-all duration-500 cursor-pointer interactive-element" 
        style={{ animationDelay: '1.5s' }}
        onClick={() => setParticles(prev => [...prev, {
          id: Date.now() + 1,
          x: mousePosition.x,
          y: mousePosition.y,
          size: Math.random() * 6 + 4,
          opacity: 0.8
        }])}
      ></div>
      <div 
        className="absolute top-1/2 right-1/3 w-12 h-12 bg-accent/30 rounded-full blur-xl animate-float hover:scale-150 hover:bg-accent/50 transition-all duration-500 cursor-pointer interactive-element" 
        style={{ animationDelay: '2s' }}
        onClick={() => setParticles(prev => [...prev, {
          id: Date.now() + 2,
          x: mousePosition.x,
          y: mousePosition.y,
          size: Math.random() * 6 + 4,
          opacity: 0.8
        }])}
      ></div>
    </section>
  );
};

export default HeroSection;