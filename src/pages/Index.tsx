import { useState, useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AffirmationSection from '@/components/AffirmationSection';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const homeRef = useRef<HTMLDivElement>(null);
  const affirmationsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (section: string) => {
    switch (section) {
      case 'home':
        homeRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'affirmations':
        affirmationsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'chat':
        setIsChatOpen(true);
        break;
      case 'contact':
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        
        <div ref={contactRef}>
          <Footer />
        </div>
      </main>

      <ChatBot isOpen={isChatOpen} onToggle={handleToggleChat} />
    </div>
  );
};

export default Index;
