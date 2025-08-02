import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, CheckCircle2, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const challenges = [
  "Take a selfie and smile at yourself with genuine love",
  "Write 3 things you're grateful for about your body",
  "Say 'I love you' to your reflection in the mirror",
  "Give yourself a compliment about your personality",
  "Take 5 deep breaths and appreciate this moment",
  "Write down one achievement you're proud of this week",
  "Do something creative just for the joy of it",
  "Treat yourself to your favorite healthy snack mindfully",
  "Write a love letter to your future self",
  "Dance to your favorite song like nobody's watching",
  "Forgive yourself for one small mistake",
  "List 5 things that make you unique and wonderful",
  "Take a relaxing bath or shower with full presence",
  "Call or text someone who makes you feel good about yourself",
  "Wear something that makes you feel confident",
  "Practice saying 'no' to something that doesn't serve you",
  "Write down a dream you want to pursue",
  "Take a walk in nature and appreciate your senses",
  "Do a small act of kindness for yourself",
  "Celebrate a small win from today",
  "Practice gratitude for your mind and its capabilities",
  "Create a playlist of songs that uplift your spirit",
  "Write down your favorite physical feature and why you love it",
  "Spend 10 minutes doing something you genuinely enjoy",
  "Practice positive self-talk when you make a mistake",
  "Take a photo of something beautiful you notice today",
  "Write down one way you've grown in the past month",
  "Do gentle stretches while appreciating what your body can do",
  "Practice accepting a compliment without deflecting",
  "Set a small, achievable goal and work toward it today"
];

interface SelfLoveChallengeProps {
  onNavigate: (section: string) => void;
}

const SelfLoveChallenge = ({ onNavigate }: SelfLoveChallengeProps) => {
  const navigate = useNavigate();
  const [dailyChallenge, setDailyChallenge] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedDate, setCompletedDate] = useState<string | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Get today's challenge based on date
    const today = new Date();
    const dateString = today.toDateString();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % challenges.length;
    
    setChallengeIndex(index);
    setDailyChallenge(challenges[index]);
    
    // Check if challenge was completed today
    const storedDate = localStorage.getItem('challenge-completed-date');
    const completed = localStorage.getItem('challenge-completed') === 'true';
    
    if (storedDate === dateString && completed) {
      setIsCompleted(true);
      setCompletedDate(dateString);
    } else {
      setIsCompleted(false);
      setCompletedDate(null);
    }
  }, []);

  const handleCompleteChallenge = () => {
    const today = new Date().toDateString();
    localStorage.setItem('challenge-completed', 'true');
    localStorage.setItem('challenge-completed-date', today);
    setIsCompleted(true);
    setCompletedDate(today);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const handleResetChallenge = () => {
    localStorage.removeItem('challenge-completed');
    localStorage.removeItem('challenge-completed-date');
    setIsCompleted(false);
    setCompletedDate(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={(section) => {
        if (section === 'home') {
          navigate('/');
        } else if (section === 'challenge') {
          // Already on challenge page
        } else {
          onNavigate(section);
        }
      }} />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in-slow">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Heart className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Daily Self-Love Challenge
              </h1>
              <Heart className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each day brings a new opportunity to practice self-love and build a healthier relationship with yourself. 
              Take on today's gentle challenge and celebrate your journey of self-discovery.
            </p>
          </div>

          {/* Main Challenge Card */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-floating border border-border/50 hover:shadow-elegant transition-all duration-500 interactive-card">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full blur-sm"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-accent/30 rounded-full blur-sm"></div>
              
              {/* Date Header */}
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <p className="text-primary font-semibold">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              {/* Challenge Text */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Today's Challenge
                </h2>
                <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic">
                  "{dailyChallenge}"
                </blockquote>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                {!isCompleted ? (
                  <button
                    onClick={handleCompleteChallenge}
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-full text-lg shadow-floating hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Complete Challenge
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className={`flex items-center space-x-2 px-6 py-3 bg-green-100 text-green-800 rounded-full font-semibold ${showCelebration ? 'animate-bounce' : ''}`}>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Challenge Completed! 🎉</span>
                    </div>
                    <button
                      onClick={handleResetChallenge}
                      className="inline-flex items-center justify-center px-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-full transition-all duration-300 hover:scale-105"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </button>
                  </div>
                )}
              </div>

              {/* Celebration Animation */}
              {showCelebration && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-6xl animate-bounce">🎉</div>
                  </div>
                  <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-4xl animate-float">✨</div>
                  </div>
                  <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                    <div className="text-4xl animate-float" style={{ animationDelay: '0.5s' }}>💖</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all duration-300 interactive-card">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Heart className="w-5 h-5 text-primary mr-2" />
                Why Self-Love Matters
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Self-love isn't selfish—it's essential. When you practice self-compassion and appreciation, 
                you build resilience, improve your mental health, and create a foundation for healthier relationships with others.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all duration-300 interactive-card">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Calendar className="w-5 h-5 text-secondary mr-2" />
                How It Works
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Each day features a new self-love challenge designed to be gentle, achievable, and meaningful. 
                Complete them at your own pace and celebrate every small step toward loving yourself more fully.
              </p>
            </div>
          </div>

          {/* Encouragement Section */}
          <div className="text-center bg-gradient-to-r from-muted/30 to-accent/20 rounded-3xl p-8 border border-border/30">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Remember: You Are Worthy of Love
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every small act of self-love matters. Be patient with yourself, celebrate your progress, 
              and remember that healing and growth happen one gentle step at a time. 💛
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SelfLoveChallenge;