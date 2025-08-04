import { useState, useEffect } from 'react';

const affirmations = [
  "You are worthy of peace.",
  "Today is a new beginning.",
  "Your feelings are valid.",
  "You have the strength to overcome.",
  "You deserve love and kindness.",
  "This too shall pass.",
  "You are enough, just as you are.",
  "Your healing journey matters.",
  "You are brave for facing today.",
  "Peace flows through you like gentle water.",
  "You are surrounded by love and light.",
  "Every breath brings you closer to calm."
];

const AffirmationSection = () => {
  const [dailyAffirmation, setDailyAffirmation] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState(false);
  const [shareAnimation, setShareAnimation] = useState(false);

  useEffect(() => {
    // Get today's date to ensure same affirmation per day
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('affirmation-date');
    const storedAffirmation = localStorage.getItem('daily-affirmation');

    if (storedDate === today && storedAffirmation) {
      setDailyAffirmation(storedAffirmation);
    } else {
      // Generate new affirmation for today
      const dateNum = new Date().getDate() + new Date().getMonth();
      const affirmationIndex = dateNum % affirmations.length;
      const newAffirmation = affirmations[affirmationIndex];
      
      setDailyAffirmation(newAffirmation);
      localStorage.setItem('affirmation-date', today);
      localStorage.setItem('daily-affirmation', newAffirmation);
    }

    // Intersection observer for animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('affirmation-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setHeartAnimation(true);
    setTimeout(() => setHeartAnimation(false), 600);
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
    setShareAnimation(true);
    setTimeout(() => setShareAnimation(false), 300);
  };

  const handleCopyAffirmation = async () => {
    try {
      await navigator.clipboard.writeText(`"${dailyAffirmation}" - Tulia`);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section 
      id="affirmation-section"
      className="py-20 px-4 relative"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-background/80" />
      <div className="absolute inset-0 bg-hero-gradient opacity-30" />
      <div className="relative z-10 container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Daily Affirmation
        </h2>
        <p className="text-muted-foreground mb-12 text-lg">
          A gentle reminder just for you today
        </p>

        <div 
          className={`relative max-w-2xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Floating Card */}
          <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-dynamic border border-border/50 interactive-card"
               style={{ boxShadow: 'var(--shadow-dynamic)' }}>
            
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-foreground"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
            </div>

            {/* Affirmation Text */}
            <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-6">
              "{dailyAffirmation}"
            </blockquote>

            {/* Interactive Actions */}
            <div className="flex justify-center items-center space-x-4 mb-4">
              {/* Heart/Like Button */}
              <button
                onClick={handleLike}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isLiked ? 'text-red-500 bg-red-50' : 'text-primary hover:bg-primary/10'
                }`}
              >
                <svg
                  className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border p-2 z-10 animate-scale-in">
                    <button
                      onClick={handleCopyAffirmation}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 w-full text-left"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Refresh Reminder */}
          <p className="mt-6 text-sm text-muted-foreground">
            A new affirmation will appear tomorrow 🌅
          </p>
        </div>
      </div>
    </section>
  );
};

export default AffirmationSection;