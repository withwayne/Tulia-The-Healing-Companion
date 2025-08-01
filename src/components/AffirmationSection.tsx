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

  return (
    <section 
      id="affirmation-section"
      className="py-20 px-4 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto max-w-4xl text-center">
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
          <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-floating border border-border/50">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full blur-sm"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-accent/30 rounded-full blur-sm"></div>
            
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

            {/* Heart Icon */}
            <div className="flex justify-center">
              <div className="text-primary animate-float">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
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