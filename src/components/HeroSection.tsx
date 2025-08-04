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
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-hero-gradient opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/40" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-slow">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          You're not alone.{' '}
          <span className="text-primary">
            Imani
          </span> is here to listen.
        </h1>
        
        {/* Subtext */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Find comfort in a safe space where your feelings matter. 
          Let Imani guide you through difficult moments with compassion and understanding.
        </p>

        {/* Typing Effect */}
        <div className="mb-12 h-8">
          {showTyping && (
            <p className="text-lg text-primary animate-typing inline-block">
              How are you feeling today?
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