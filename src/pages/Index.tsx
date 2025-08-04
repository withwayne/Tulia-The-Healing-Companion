import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollColors } from '@/hooks/useScrollColors';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutModal from '@/components/AboutSection';
import AffirmationSection from '@/components/AffirmationSection';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const navigate = useNavigate();
  const { currentTheme, scrollProgress } = useScrollColors();
  
  const homeRef = useRef<HTMLDivElement>(null);
  const affirmationsRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (section: string) => {
    switch (section) {
      case 'home':
        homeRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'challenge':
        navigate('/challenge');
        break;
      case 'targets':
        navigate('/targets');
        break;
      case 'about':
        setIsAboutOpen(true);
        break;
    }
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div 
      className="min-h-screen page-home color-transition bg-dynamic-gradient"
      style={{
        '--dynamic-primary': currentTheme.primary,
        '--dynamic-secondary': currentTheme.secondary,
        '--dynamic-accent': currentTheme.accent,
        '--dynamic-bg': currentTheme.gradient,
      } as React.CSSProperties}
    >
      <Header onNavigate={handleNavigation} />
      
      <main className="pt-20 relative">
        {/* Scroll Progress Indicator */}
        <div 
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
        
        <div ref={homeRef} className="relative">
          <HeroSection onOpenChat={handleOpenChat} />
        </div>
        
        <div ref={affirmationsRef} className="relative">
          <AffirmationSection />
        </div>
        
        <Footer />
      </main>

      <ChatBot isOpen={isChatOpen} onToggle={handleToggleChat} />
      <AboutModal isOpen={isAboutOpen} onOpenChange={setIsAboutOpen} />
    </div>
  );
};

export default Index;
