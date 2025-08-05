import { useState, useEffect } from 'react';

interface HeroSectionProps {
  onOpenChat: () => void;
}

const HeroSection = ({ onOpenChat }: HeroSectionProps) => {
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTyping(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-organic-gradient paper-texture">
      {/* Organic floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/8 organic-shape"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-secondary/8 organic-shape" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-accent/8 organic-shape" style={{ animationDelay: '6s' }}></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-slow">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight handwritten">
          You're not alone.{' '}
          <span className="text-primary">
            Imani
          </span> is here to listen.
        </h1>
        
        {/* Subtext */}
        <div className="sketch-border rounded-2xl bg-card/60 backdrop-blur-sm p-6 mb-8 shadow-organic">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Find comfort in a safe space where your feelings matter. 
            Let Imani guide you through difficult moments with compassion and understanding.
          </p>
        </div>

        {/* Typing Effect */}
        <div className="mb-12 h-8">
          {showTyping && (
            <p className="text-lg text-primary animate-typing inline-block handwritten">
              How are you feeling today? ✨
            </p>
          )}
        </div>

        {/* CTA Button */}
        <div className="relative inline-block">
          <button
            onClick={onOpenChat}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-full text-lg shadow-floating hover:shadow-xl transition-all duration-300"
          >
            <span className="flex items-center space-x-2">
              <svg
              className="w-5 h-5"
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
        <p className="mt-6 text-sm text-muted-foreground">
          Take a deep breath. Your healing journey starts here. 💛
        </p>
      </div>
    </section>
  );
};

export default HeroSection;