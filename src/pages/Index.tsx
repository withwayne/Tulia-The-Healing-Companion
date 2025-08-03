import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigation} />
      
      <main className="pt-20">
        <div ref={homeRef}>
          <HeroSection onOpenChat={handleOpenChat} />
        </div>
        
        <div ref={affirmationsRef}>
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
